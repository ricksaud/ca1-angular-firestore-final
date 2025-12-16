# ---- Build stage ----
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build Angular/Ionic
RUN npm run build

# Normalize build output into /out (supports www/ or dist/* output)
RUN set -eux; \
    mkdir -p /out; \
    if [ -d "www" ] && [ -f "www/index.html" ]; then \
      echo "Using build output: www/"; \
      cp -r www/* /out/; \
    elif [ -d "dist" ]; then \
      echo "Searching for index.html under dist/"; \
      OUTDIR="$(dirname "$(find dist -type f -name index.html | head -n 1)")"; \
      if [ -z "$OUTDIR" ] || [ ! -f "$OUTDIR/index.html" ]; then \
        echo "ERROR: Could not find dist output (index.html)"; \
        exit 1; \
      fi; \
      echo "Using build output: $OUTDIR"; \
      cp -r "$OUTDIR"/* /out/; \
    else \
      echo "ERROR: No www/ or dist/ build output found"; \
      ls -la; \
      exit 1; \
    fi

# ---- Run stage ----
FROM nginx:alpine
COPY --from=build /out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
