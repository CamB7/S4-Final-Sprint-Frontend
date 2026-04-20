# SkyBeacon ✈

*Is it delayed? Probably.*

SkyBeacon is a modern, React-based web application for tracking and managing flight schedules. It features a public-facing dashboard for users to check arriving and departing flights, along with a secure Admin Dashboard for managing flight data.

## Features

- **Public Flight Dashboard:** View real-time (scheduled vs actual) flight statuses, arrival/departure times, and gate information.
- **Admin Authentication:** Secure login system for administrators.
- **Admin Dashboard:** Full CRUD operations allowing authorized users to Add, Edit, and Delete flights.
- **Interactive UI:** Dynamic filtering by Arrivals/Departures and specific airports, paired with a custom WebGL animated background.

## Tech Stack

- **Frontend Framework:** React 19, built with Vite
- **Routing:** React Router v7
- **Styling:** Custom Vanilla CSS with responsive glassmorphism design
- **Testing:** Vitest & React Testing Library
- **Graphics:** OGL for lightweight WebGL background animations

## Getting Started

### Prerequisites
Make sure you have Node.js installed and the corresponding backend server running locally on `http://localhost:8080`.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd SkyBeacon
   ```
2. Install the dependancies:
   ```bash
   npm install
   ```

### Scripts
npm run dev - Starts the Vite development server.
npm run build - Builds the app for production.
npm run test - Runs the Vitest test suite.

## User Stories

**Authentication & Security**
* **As an Airport Administrator**, I want to securely log in with my credentials, so only authorized personnel can make changes to the flight schedule.
* **As an Airport Administrator**, I want my session to be securely protected, so my administrative access cannot be hijacked.

**Flight Dashboard**
* **As a User**, I want to view a real-time dashboard of all flights, so I can see up-to-date departure and arrival information.
* **As a User**, I want to filter the dashboard by specific airports, so I can easily find the flights I am looking for.

**Flight Management (Admin)**
* **As an Airport Administrator**, I want to add new flights to the system and assign valid aircraft, airports, and gates via dropdowns, so the daily schedule reflects accurate operational data.
* **As an Airport Administrator**, I want to edit existing flights to update their times, gates, or status (e.g., DELAYED, BOARDING, CANCELLED), so passengers receive the latest flight information.
* **As an Airport Administrator**, I want to delete flights from the system, so cancelled or duplicate records do not clutter the public dashboard.
