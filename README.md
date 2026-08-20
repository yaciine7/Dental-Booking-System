# Dental Booking System

A full-stack dental clinic booking system built with the MERN stack (MongoDB, Express, React, Node.js). It allows patients to book appointments online while giving clinic admins a dashboard to manage bookings, availability, and stats.

## Features

- **Real-time slot availability** — patients only see time slots that are actually open.
- **Double-booking prevention** — backend logic ensures no two patients can book the same slot.
- **Patient-facing scheduler** — simple, intuitive interface for booking appointments.
- **Admin dashboard** — view, manage, and track bookings with stats overview.
- **Clean, medical-themed UI** — blue color scheme built with CSS Modules for a professional, trustworthy look.
- **Routing** — handled with React Router for smooth navigation between pages.

## Tech Stack

**Frontend:**
- React
- React Router
- CSS Modules

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)

**Deployment:**
- Netlify (frontend)
- Render (backend)
- MongoDB Atlas (database)

## Project Structure

```
Dental-Booking-System/
├── dental-clinic/   # React frontend - main patient-facing site
├── dashboard/       # React frontend - admin panel
├── dental-back/     # Express backend (API, models, routes)
│   ├── models/
│   ├── routes/
│   └── controllers/
└── README.md
```

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB instance)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yaciine7/Dental-Booking-System.git
cd Dental-Booking-System
```

2. Install backend dependencies
```bash
cd dental-back
npm install
```

3. Install main site dependencies
```bash
cd ../dental-clinic
npm install
```

4. Install admin dashboard dependencies
```bash
cd ../dashboard
npm install
```

5. Set up environment variables (create a `.env` file in the `dental-back` folder)
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

6. Run the backend
```bash
cd dental-back
npm start
```

7. Run the main site
```bash
cd dental-clinic
npm run dev
```

8. Run the admin dashboard
```bash
cd dashboard
npm run dev
```

## Future Improvements

- JWT-based authentication for admins
- Email/SMS appointment reminders
- Patient appointment history
- Payment integration

## Author

Built by Yacine — full-stack developer specializing in the MERN stack.
