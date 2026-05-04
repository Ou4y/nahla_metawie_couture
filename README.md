# Nahla Couture

Nahla Couture is a monolithic Express + EJS application with a service layer and a MySQL database.

## Quick Start

1. Copy the environment file:

   ```bash
   cp .env.example .env
   ```

2. Start the database:

   ```bash
   docker compose up -d
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the app in development:

   ```bash
   npm run dev
   ```

## Run with Docker

1. Build and start the app and database:

   ```bash
   docker compose up --build
   ```

2. Open the app at http://localhost:3000

3. phpMyAdmin is available at http://localhost:8080

## Database

- MySQL runs locally via Docker.
- phpMyAdmin is available at http://localhost:8080
- Schema and seed files are in the sql folder.
