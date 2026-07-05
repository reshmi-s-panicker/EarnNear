# EarnNear

**Part-time jobs right around you.**

EarnNear is a location-based part-time job platform that connects job seekers with nearby employers offering flexible work opportunities. Unlike traditional job portals, EarnNear focuses on proximity, instant shift booking, and hourly work — built for students, freelancers, and anyone looking for flexible income close to home.

## The Problem

Traditional job platforms are built around full-time hiring cycles — long applications, distant commutes, and slow responses. For someone looking to pick up a few hours of work this week, near their own neighborhood, there's no purpose-built solution. EarnNear closes that gap.

## Key Features

- **Nearby Job Discovery** — Browse part-time and one-day jobs filtered by distance, salary, shift timing, and job type
- **Instant Shift Booking** — Reserve open shifts directly (e.g. "Monday, 9 AM–1 PM, ₹200/hr") without a lengthy application process
- **Professional Profiles** — LinkedIn-style profiles for job seekers, showcasing skills, education, and work history
- **Recruiter Tools** — Employers can post jobs or one-off shifts, manage applicants, and track bookings from a dedicated dashboard
- **Trust & Ratings** — Two-way reviews between job seekers and employers build a transparent trust score
- **Map-Based Search** — Visualize nearby opportunities and calculate distance/travel routes
- **Real-Time Communication** — Direct WhatsApp contact between applicants and recruiters

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Tailwind CSS, React Router, Axios, Leaflet |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Auth | JWT-based authentication |
| File Handling | Multer |

## Project Structure

```
EarnNear/
├── backend/     → REST API (Express + MongoDB)
└── frontend/    → Client application (React + Vite)
```

## User Roles

- **Job Seeker** — discovers jobs, books shifts, builds a profile, applies and tracks applications
- **Recruiter (Employer)** — posts jobs and shifts, manages applicants, verifies company presence
- **Administrator** — oversees platform integrity, verifies recruiters, moderates content

## Getting Started

### Prerequisites
- Node.js v20.19+ or v22.12+
- A MongoDB connection (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

```bash
git clone https://github.com/reshmi-s-panicker/EarnNear.git
cd EarnNear
```

**Backend:**
```bash
cd backend
npm install
# create a .env file — see .env.example for required variables
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
# create a .env file — see .env.example for required variables
npm run dev
```

The frontend runs at `http://localhost:5173` and the backend at `http://localhost:5000` by default.

## Roadmap

- [x] Authentication (Job Seeker & Recruiter)
- [x] Job posting and discovery
- [x] Shift posting and booking
- [ ] Ratings and reviews
- [ ] Map-based job search
- [ ] AI-powered job recommendations
- [ ] In-app chat
- [ ] Digital payments

## License

This project is currently under active development as part of an academic/hackathon initiative.

---

*Built with focus on making flexible work accessible, one shift at a time.*
