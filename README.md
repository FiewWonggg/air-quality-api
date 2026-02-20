# 🌤️ Air Quality & Environmental Data API

A RESTful API service for tracking and managing air quality (PM2.5) and environmental data across different locations. Built with a modern Node.js stack, demonstrating strong backend development practices, relational database design, and clean architecture.

## 🚀 Tech Stack
* **Runtime:** Node.js
* **Language:** TypeScript
* **Framework:** Express.js
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Architecture:** 3-Layer Architecture (Routes, Controllers, Config)

## ✨ Core Features
* **Location Management:** Register new monitoring stations with geolocation data (Latitude/Longitude).
* **Environmental Tracking:** Record real-time PM2.5, AQI, Temperature, and Humidity.
* **Relational Data Querying:** Fetch air quality measurements integrated seamlessly with their respective location data.

## 📂 Project Structure
```text
src/
├── config/       # Database connection and environment configurations
├── controllers/  # Business logic and request handling
├── routes/       # API endpoint definitions
└── app.ts        # Express application entry point

🛠️ Installation & Setup (How to run locally)
Clone the repository:
    git clone [https://github.com/FiewWonggg/air-quality-api.git](https://github.com/FiewWonggg/air-quality-api.git)
    cd air-quality-api

Install dependencies:
    npm install

Set up Environment Variables:
    Create a .env file in the root directory and add your PostgreSQL connection string:
        DATABASE_URL="postgresql://[USER]:[PASSWORD]@127.0.0.1:5432/air_quality_db?schema=public"

Initialize the Database:
    npx prisma db push
    npx prisma generate

Start the server:
    npx ts-node src/app.ts
    **The server should run on http://localhost:3000**

📡 API Endpoints
Locations
    GET /api/locations - Retrieve all monitoring locations
    POST /api/locations - Add a new location
Measurements
    GET /api/measurements - Retrieve all air quality records (includes location data)
    POST /api/measurements - Submit a new air quality measurement