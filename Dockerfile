# ---- Build stage ----
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Collect Angular output into /out
RUN set -eux; \
    mkdir -p /out; \
    if [ -d "www" ] && [ -f "www/index.html" ]; then \
      echo "Using www/ output"; \
      cp -r www/* /out/; \
    elif [ -d "dist" ]; then \
      OUTDIR="$(dirname "$(find dist -type f -name index.html | head -n 1)")"; \
      echo "Using dist output: $OUTDIR"; \
      cp -r "$OUTDIR"/* /out/; \
    else \
      echo "ERROR: No Angular build output found"; \
      exit 1; \
    fi

# Copy marker into output
RUN cp marker.txt /out/marker.txt

# ---- Runtime stage ----
FROM nginx:alpine
COPY --from=build /out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

