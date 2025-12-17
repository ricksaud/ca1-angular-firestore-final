# CA1 – Angular Firestore Cloud Deployment

## Application Overview
This project is a cloud-native web application built with **Angular**.  
The application demonstrates deployment of a frontend web application to **Google Cloud Platform (GCP)** using a fully automated **CI/CD pipeline**.

The focus of this project is **cloud deployment, automation, and orchestration**, rather than application development.

---

## GCP Services Used
- **Cloud Run** – Hosts the containerised Angular application
- **Cloud Build** – Automated CI/CD pipeline triggered by GitHub pushes
- **Artifact Registry** – Stores Docker container images
- **Firestore** – NoSQL cloud database (Firebase project)

---

## Architecture Overview
- Users access the application via a public Cloud Run URL
- The Angular application runs inside a Docker container served by Nginx
- Cloud Build automatically builds and deploys the app on every push to `main`
- Firestore is used as the backend database (hosted in Firebase)

---

## CI/CD Pipeline
1. Code is pushed to the `main` branch on GitHub
2. Cloud Build trigger starts automatically
3. Dependencies are installed (`npm ci`)
4. Angular application is built
5. Docker image is created and pushed to Artifact Registry
6. Cloud Run service is deployed/updated automatically

No manual deployment steps are required.

---

## Deployment
The application is deployed automatically using **Cloud Build**.

**Live URL:**  
https://ca1-propertyapp-306680597774.europe-west1.run.app

---

## Local Development
```bash
npm install
npm run build
ionic serve
