# EarnNear

Part-time jobs right around YOU. A location-based part-time job platform connecting job seekers with nearby employers through instant shift booking, hourly work, and real-time communication.

## Tech Stack

**Frontend:** React (Vite), Tailwind CSS, React Router, Axios, Leaflet
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Multer

## Project Structure
## Getting Started

### Prerequisites
- Node.js v20.19+ or v22.12+ (check with `node -v`)
- MongoDB (local install or MongoDB Atlas connection string)
- Git

### 1. Clone the repo
```bash
git clone <repo-url>
cd EarnNear
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
```
Fill in `.env` values, then:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs at `http://localhost:5173`, backend at `http://localhost:5000`.

## Branching Workflow

- `main` — stable code only, no direct pushes.
- `feature/xxx` — all work happens in feature branches, merged via Pull Request.

| Area | Branch prefix |
|---|---|
| Backend | `feature/backend-<feature-name>` |
| Frontend | `feature/frontend-<feature-name>` |

## Team

| Role | Owns |
|---|---|
| Backend Dev A | auth, user, recruiter modules |
| Backend Dev B | job, shift, application, recommendation engine |
| Frontend Dev A | auth pages, user dashboard, job discovery |
| Frontend Dev B | recruiter dashboard, admin panel, shift booking UI |