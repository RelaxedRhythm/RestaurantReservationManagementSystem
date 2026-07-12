# 🍽️ Restaurant Reservation Management System

A full-stack Restaurant Reservation Management System that enables customers to book tables online while providing administrators with comprehensive tools to manage reservations, restaurant tables, and booking statistics.

The application is built using the MERN stack (MongoDB, Express.js, React, Node.js) and follows a RESTful architecture with JWT-based authentication and role-based authorization.

---

# 📌 Table of Contents

* Project Overview
* Features
* Technology Stack
* System Architecture
* Project Structure
* Installation
* Environment Variables
* Database Seeding
* Authentication
* Reservation Workflow
* Admin Dashboard
* REST API
* Validation & Business Rules
* Future Improvements
* Challenges & Learnings

---

# 📖 Project Overview

Managing restaurant reservations manually often leads to scheduling conflicts, inefficient table utilization, and poor customer experience.

This project digitizes the reservation process by allowing customers to:

* Register and log in securely
* View available restaurant tables
* Make reservations
* View reservation history
* Cancel reservations

Administrators have access to a dedicated dashboard where they can:

* Monitor all reservations
* Filter reservations by date
* Update reservation status
* Cancel any reservation
* Manage restaurant tables
* View reservation statistics

The backend enforces booking rules to prevent conflicting reservations and ensure data consistency.

---

# ✨ Features

## User Features

* User Registration
* Secure Login using JWT Authentication
* View available tables
* Create reservations
* Prevent duplicate/conflicting bookings
* View reservation history
* Cancel own reservations
* Responsive UI

---

## Admin Features

* Dashboard Overview
* View all reservations
* Filter reservations by date
* Update reservation details
* Cancel any reservation
* Add new tables
* Edit existing tables
* Delete tables
* View reservation statistics
* Monitor reservation statuses

---

# 🛠 Tech Stack

## Frontend

* React
* Vite
* React Router DOM
* Axios
* Tailwind CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt

---

# 🏗 System Architecture

```
React Frontend
        │
        ▼
 REST API (Express.js)
        │
Authentication Middleware
        │
Controllers
        │
Mongoose Models
        │
MongoDB Database
```

---

# 📂 Project Structure

```text
RestaurantReservationManagementSystem/

├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── server/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   │   ├── connect.js
│   │   └── jwt.js
│   ├── seed.js
│   ├── index.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Install Backend

```bash
cd server
npm install
```

---

## Install Frontend

```bash
cd client
npm install
```

---

## Start Backend

```bash
npm start
```

---

## Start Frontend

```bash
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# 🌱 Database Seeding

The project includes a `seed.js` script that populates the database with sample restaurant tables.

This allows the application to be used immediately without manually creating tables through the admin dashboard.

Example seeded information includes:

* Table Number
* Seating Capacity
* Availability Status

Run the seed script using:

```bash
node seed.js
```

The script automatically:

* Connects to MongoDB
* Clears previous seeded table data (if configured)
* Inserts sample restaurant tables
* Closes the database connection

Using a seed script makes testing easier and ensures every developer starts with a consistent dataset.

---

# 🔐 Authentication

Authentication is implemented using **JSON Web Tokens (JWT).**

Workflow:

1. User registers
2. Password is hashed using bcrypt
3. User logs in
4. Server generates JWT
5. Token is stored on the client
6. Token is sent in Authorization header
7. Protected routes verify the token before processing requests

Role-based authorization ensures that only administrators can access admin routes.

---

# 📅 Reservation Workflow

1. User logs in
2. User selects a restaurant table
3. User chooses reservation date and time
4. Backend validates request
5. Backend checks for conflicting reservations
6. Reservation is created
7. Reservation appears in user dashboard
8. User or administrator may cancel the reservation

---

# 👨‍💼 Admin Dashboard

The administrator dashboard provides a centralized interface for restaurant management.

### Dashboard Statistics

* Total Reservations
* Active Reservations
* Cancelled Reservations
* Total Tables

### Reservation Management

* View every reservation
* Filter by reservation date
* Update reservation status
* Cancel reservations

### Table Management

* Create new tables
* Edit existing tables
* Delete tables
* Monitor seating capacity

---

# 🌐 REST API

## Authentication

```
POST /auth/register
POST /auth/login
```

---

## Reservations

```
GET    /reservations
POST   /reservations
DELETE /reservations/:id/cancel
```

---

## Tables

```
GET    /tables
POST   /tables
PUT    /tables/:id
DELETE /tables/:id
```

---

## Admin

```
GET /admin/dashboard
GET /admin/reservations
```

---

# ✅ Validation & Business Rules

The application validates all important reservation operations.

Implemented rules include:

* JWT authentication required for protected routes
* Role-based authorization for admin endpoints
* Password hashing before storage
* Reservation conflict prevention
* Reservation existence validation
* Ownership verification for user actions
* Admin override permissions
* Invalid request handling
* Proper HTTP status codes
* Centralized error responses

---

# 🚀 Future Improvements

Potential enhancements include:

* Email confirmations
* SMS notifications
* Online payments
* Table availability calendar
* Search and filtering
* Pagination
* Analytics dashboard
* Customer reviews
* Waiting list support
* QR code reservation check-in
* Docker deployment
* Automated testing

---

# 📚 Challenges & Learnings

This project provided practical experience in designing and developing a full-stack web application.

Key learning outcomes include:

* Designing RESTful APIs
* JWT Authentication
* Role-based access control
* MongoDB schema design
* React state management
* CRUD operations
* Reservation conflict handling
* Backend validation
* API integration
* Error handling
* Database seeding
* Full-stack project organization

---

# 👨‍💻 Author

**Rhythm Sharma**

Built as part of a full-stack web development assignment to demonstrate backend development, REST API design, authentication, authorization, database management, and frontend integration using the MERN stack.
