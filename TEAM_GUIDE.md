# EarnNear

Part-time jobs right around YOU. A location-based part-time job platform connecting job seekers with nearby employers through instant shift booking, hourly work, and real-time communication.

## Tech Stack

**Frontend:** React (Vite), Tailwind CSS, React Router, Axios, Leaflet
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Multer

## Project Structure

```
EarnNear/
├── backend/     → Express API server
└── frontend/    → React (Vite) client
```

See `backend/src` and `frontend/src` for detailed folder breakdowns.

## Getting Started (step by step, after cloning)

### Prerequisites (check before you start)
- Node.js v20.19+ or v22.12+ — check with `node -v`. If lower, download the LTS installer from https://nodejs.org and reinstall.
- Git installed
- VS Code (recommended)

### Step 1: Clone the repo

```bash
git clone https://github.com/reshmi-s-panicker/EarnNear.git
cd EarnNear
```

### Step 2: Switch to main and pull latest

```bash
git checkout main
git pull origin main
```

### Step 3: Backend setup

```bash
cd backend
npm install
```

Create your own `.env` file (this is NOT committed to git, you must create it yourself):
```bash
New-Item .env -ItemType File        # Windows PowerShell
# or: touch .env                    # Mac/Linux
```

Open `.env` and paste in (ask the team lead — Reshmi — for the real `MONGO_URI` value, since it's a shared Atlas database):
```
PORT=5000
NODE_ENV=development

MONGO_URI=<ask team lead for this>

JWT_SECRET=someSuperSecretKeyChangeThisLater
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=anotherSecretKeyHere

CLIENT_URL=http://localhost:5173
```

Run the dev server:
```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected
```

**If you see a `querySrv ECONNREFUSED` DNS error instead** (known Windows + Node issue): this is already fixed in `src/server.js` with a DNS fallback — make sure you pulled the latest `main` (Step 2) before reporting this as a bug. If it still happens, ping the team lead.

### Step 4: Frontend setup

Open a **second terminal** (keep the backend running in the first one):
```bash
cd frontend
npm install
```

Create your own `.env`:
```bash
New-Item .env -ItemType File
```
Paste in:
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_MAP_API_KEY=
```

Run the dev server:
```bash
npm run dev
```

Open the URL it gives you (usually `http://localhost:5173`) in your browser — you should see the app running.

### You're set up when:
- [ ] Backend terminal shows `Server running on port 5000` and `MongoDB connected`
- [ ] Frontend terminal shows a `Local: http://localhost:5173/` link
- [ ] Opening that link in browser shows the app, not an error page

## Branching Workflow

- `main` — shared foundation + reviewed features only.
- `feature/xxx` — all new feature work happens here, merged via Pull Request.

### What's okay to push straight to `main` (no PR needed)
Only shared foundational things that everyone needs immediately, and that don't touch actual feature logic:
- Project scaffolding, folder structure, configs
- `.gitignore`, `.env.example`, README updates
- Core server skeleton (`app.js`, `server.js`, `db.js`)
- Critical fixes that block everyone from running the app at all (e.g. the DNS connection fix)

**Ask yourself: "if this didn't exist, would literally nobody's code run?"** If yes → okay for `main` directly. If it's actual feature logic (an API, a page, a model) → always a feature branch + PR.

### Branch naming convention

| Area | Branch prefix |
|---|---|
| Backend | `feature/backend-<feature-name>` |
| Frontend | `feature/frontend-<feature-name>` |

Example: `feature/backend-auth-user`, `feature/frontend-recruiter-dashboard`

### Daily workflow

```bash
git checkout main
git pull origin main                        # always start from latest
git checkout -b feature/backend-auth-user    # create your branch
# ...make changes, commit...
git add .
git commit -m "Add login API"
git push origin feature/backend-auth-user
```

Then open a Pull Request on GitHub into `main`. Team lead reviews and merges.

**Before starting new work each day:** always `git checkout main` and `git pull origin main` first, so you're building on the latest merged code.

## Team — Who Works Where

Each person works **only inside their own files** below to avoid merge conflicts. If you need to touch a file outside your section (e.g. `app.js` to wire up a new route), message the team first.

---

### 🔵 Backend Dev A — Auth, User, Recruiter (People & Accounts)

**Branch:** `feature/backend-auth-user`

**Owns these features:**
- Register (Job Seeker + Recruiter)
- Login (shared endpoint for all roles)
- OTP verification, Forgot Password
- JWT auth middleware, role-based access
- User profile (view/edit, resume upload)
- Recruiter profile (view/edit, verification status)
- User dashboard data aggregation

**Files to create/modify:**
```
backend/src/models/User.js
backend/src/models/Recruiter.js
backend/src/models/RefreshToken.js
backend/src/controllers/auth.controller.js
backend/src/controllers/user.controller.js
backend/src/controllers/recruiter.controller.js
backend/src/routes/auth.routes.js
backend/src/routes/user.routes.js
backend/src/routes/recruiter.routes.js
backend/src/services/auth.service.js
backend/src/services/user.service.js
backend/src/services/recruiter.service.js
backend/src/middleware/auth.middleware.js
backend/src/middleware/authorize.middleware.js
backend/src/utils/generateToken.js
backend/src/utils/hashPassword.js
backend/src/utils/comparePassword.js
backend/src/utils/sendEmail.js
backend/src/utils/generateOTP.js
```

---

### 🟢 Backend Dev B — Jobs, Shifts, Applications (Core Marketplace)

**Branch:** `feature/backend-job-shift`

**Owns these features:**
- Job CRUD (create/edit/delete/close) — recruiter side
- Job discovery + filters, Job details — user side
- Shift posting, shift booking, booking status management
- Application submission, applicant management, save job
- Recruiter dashboard data aggregation

**Files to create/modify:**
```
backend/src/models/Job.js
backend/src/models/Shift.js
backend/src/models/ShiftBooking.js
backend/src/models/Application.js
backend/src/controllers/job.controller.js
backend/src/controllers/shift.controller.js
backend/src/controllers/application.controller.js
backend/src/routes/job.routes.js
backend/src/routes/shift.routes.js
backend/src/routes/application.routes.js
backend/src/services/job.service.js
backend/src/services/shift.service.js
backend/src/services/application.service.js
backend/src/utils/distance.js
```

**Depends on:** Dev A's `User.js` and `Recruiter.js` models must exist first (for `ref` fields). Check with Dev A before starting if these aren't in `main` yet.

---

### 🟣 Frontend Dev A — Auth Pages + User Experience

**Branch:** `feature/frontend-auth-user`

**Owns these features:**
- Login page (with Job Seeker/Recruiter toggle)
- Register pages (separate for Job Seeker and Recruiter)
- OTP verify, Forgot Password pages
- User profile page
- Job Discovery page + filters
- Job Details page
- User Dashboard (applied jobs, saved jobs, booked shifts)

**Files to create/modify:**
```
frontend/src/pages/auth/Login.jsx
frontend/src/pages/auth/Register.jsx
frontend/src/pages/auth/OTPVerify.jsx
frontend/src/pages/auth/ForgotPassword.jsx
frontend/src/pages/user/Profile.jsx
frontend/src/pages/user/JobDiscovery.jsx
frontend/src/pages/user/JobDetails.jsx
frontend/src/pages/user/Dashboard.jsx
frontend/src/components/jobs/JobCard.jsx
frontend/src/components/jobs/JobFilters.jsx
frontend/src/components/profile/ProfileHeader.jsx
frontend/src/components/profile/ResumeUpload.jsx
frontend/src/services/authApi.js
frontend/src/services/userApi.js
frontend/src/services/jobApi.js
frontend/src/context/AuthContext.jsx
frontend/src/hooks/useAuth.js
```

---

### 🟠 Frontend Dev B — Recruiter + Shift Experience

**Branch:** `feature/frontend-recruiter-shift`

**Owns these features:**
- Recruiter profile/company page
- Post Job page
- Post Shift page + shift slot picker
- Applicant management UI (view, accept/reject, shortlist)
- Recruiter Dashboard
- Shift booking confirmation UI (user-facing, but tied to shift feature)

**Files to create/modify:**
```
frontend/src/pages/recruiter/Profile.jsx
frontend/src/pages/recruiter/PostJob.jsx
frontend/src/pages/recruiter/PostShift.jsx
frontend/src/pages/recruiter/Applicants.jsx
frontend/src/pages/recruiter/Dashboard.jsx
frontend/src/components/shifts/ShiftCard.jsx
frontend/src/components/shifts/ShiftSlotPicker.jsx
frontend/src/components/shifts/BookingConfirm.jsx
frontend/src/services/shiftApi.js
frontend/src/services/recruiterApi.js
```

---

### Shared files (edit carefully, message the team before changing)

```
backend/src/app.js                  → adding new route groups (one line each)
backend/src/server.js               → already set up, rarely touched
backend/src/config/db.js            → already set up, rarely touched
frontend/src/routes/AppRoutes.jsx   → adding new page routes (coordinate to avoid both editing same lines at once)
frontend/src/App.jsx                → already set up, rarely touched
```

**Rule of thumb:** if two people need to add a route to `AppRoutes.jsx` or `app.js` on the same day, whoever finishes first pushes/merges first, and the second person pulls `main` before adding their line — avoids both editing the same file blind.

---

## Environment Variables

Never commit `.env` files. Use `.env.example` as the template — copy it to `.env` and fill in real values locally.
