# EarnNear — Figma Design Brief

Design a premium, production-ready web application UI for **EarnNear**, a location-based part-time job and hourly shift booking platform.

**Tagline:** "Part time jobs right around YOU."

The final design must look like a real, funded startup product — not a generic template, student project, or AI-default layout. Prioritize visual hierarchy, premium typography, generous spacing, and realistic content over decorative elements.

---

## 1. DESIGN SYSTEM (build this first)

**Typography:** Manrope, single family throughout.
Styles: Display, H1, H2, H3, H4, Large Body, Body, Small Body, Label, Caption, Button.
Comfortable line height, restrained letter spacing. Not every heading should be bold — vary weight for hierarchy.

**Color palette (muted, jewel-toned — deliberately avoids bright "Material Design green" defaults):**
- Primary emerald: `#0E6E4E`
- Emerald hover/dark: `#0A4F38`
- Emerald tint (badges, highlights): `#E4F0EA`
- Emerald section background (paper sage): `#F6FAF8`
- Recruiter accent (deep ink teal): `#12302F`
- Recruiter tint: `#E4EBEA`
- Page background (warm paper): `#FAFAF8`
- Card background: `#FFFFFF`
- Text primary (graphite ink): `#14181A`
- Text secondary (stone grey): `#5C6660`
- Border (hairline grey): `#E3E6E3`
- Success: `#1E8F5E` · Warning: `#C98A2A` · Error: `#C4453D` · Info: `#3B6FD6`

Keep all status/accent colors desaturated relative to typical UI kits — this is what separates "premium fintech" from "generic SaaS template."

**Layout:** 1440px desktop frame, 12-column grid, 8px spacing system, Auto Layout on every component. Responsive variants for tablet and mobile.

**Avoid:** gradients, glassmorphism, cartoon illustrations, neon, oversized blobs, overcrowded cards, excessive shadows/icons.

**Core components (build as reusable variants — default/hover/pressed/disabled/loading, and error/focus/filled states for inputs):**
Buttons (primary, secondary, outline, ghost, destructive, icon), text/email/password/search/location inputs, **OTP input (4–6 individual boxed digit cells, with default/focus/filled/error states + auto-advance behavior)**, select, multi-select, checkbox, radio, toggle, textarea, navbar, dashboard header, sidebar (user + recruiter), avatar, avatar group, company logo, tooltip, dropdown, modal, toast, tabs, pagination, breadcrumbs, empty state, skeleton loader, filter chip, rating stars, status/job type/shift type/verification badges, Job Card, Shift Card, Company Card, User Card, Applicant Card, Statistic Card, Notification Item.

---

## 2. SCREEN 1 — LANDING PAGE

**Navbar:** Logo (left) · Find Jobs / Find Shifts / Companies / How It Works (center) · Log In / **Get Started** (right, primary CTA).

**Hero:**
- Headline: "Flexible work. Right around you."
- Subtext: "Discover part-time jobs and book flexible hourly shifts from trusted businesses around your location."
- Primary CTA: "Find Jobs Near Me" · Secondary CTA: "I'm Hiring"
- Search bar: Field 1 "Job title, skill, or company" · Field 2 "Your location" · Button "Search Jobs"
- Visual: sophisticated map composition with location markers, floating realistic job cards, distance radius. No cartoon illustration.

**Trust strip:** Trusted local businesses · Verified job opportunities · Flexible shift booking · Secure profiles. Minimal, single row.

**Job categories** — heading "Explore work that fits your life": Restaurant & Hospitality, Retail, Delivery & Logistics, Events, Office & Administration, Creative & Digital. Icon + name + opportunity count per card, subtle hover.

**Nearby Jobs** — heading "Jobs near you," subtext "Opportunities selected based on your location," link "View all jobs." Four Job Cards with: company logo, title, verified company name, location, distance (e.g. "1.2 km away"), rate, job type, shift type, posted time, bookmark, View Job button. Examples: Restaurant Helper, Retail Sales Assistant, Event Support Staff, Customer Service Assistant.

**Available Shifts** — heading "Pick a shift. Work. Get paid." Shift Cards with: company logo, title, company, date, start–end time, duration, hourly pay, **estimated total earnings (visually prominent)**, remaining slots, distance, Book Shift button.
Example: Restaurant Helper · Urban Café · Tomorrow · 6:00–10:00 PM · 4 hrs · ₹250/hr · Earn ₹1,000 · 2 spots left · 1.8 km away.

**Auth gate:** if a signed-out visitor clicks "Book Shift" (or any "Apply"/"Book" action anywhere on the public site), they must be redirected to the Role-Aware Login screen first — never straight into a booking flow while unauthenticated. After successful login, return them to complete the original action.

**Map discovery preview** — heading "See what's hiring around you." Map with user location, job/company markers, radius, selected job preview card.

**How it works** — three steps: 01 Discover nearby work · 02 Apply or book a shift · 03 Work and earn. Use a connected visual flow, not plain three-box grid.

**Two journeys section:**
- Job Seekers (emerald): "Work on your terms." — find nearby jobs, book flexible shifts, build reputation, work on your schedule. CTA "Find Work."
- Businesses (dark teal): "Find reliable people, faster." — post jobs, create shifts, discover nearby workers, manage applicants. CTA "Start Hiring."

**Stats:** Active Jobs · Available Shifts · Local Businesses · Successful Bookings (realistic numbers).

**Final CTA:** "Your next opportunity could be closer than you think." — Find Work / Start Hiring buttons.

**Footer:** Logo + tagline. Columns — Platform (Find Jobs, Find Shifts, Companies) · Job Seekers (Create Profile, Saved Jobs, My Applications) · Businesses (Post a Job, Create a Shift, Find Workers) · Support (Help Centre, Safety, Contact). Social icons + legal links.

---

## 3. SCREEN 2 — ROLE-AWARE LOGIN

One login page, split-screen layout, with a visible role switcher: **[ Job Seeker ] [ Recruiter ]**.

**Job Seeker state (emerald):** "Welcome back" / "Ready to find your next opportunity?" — Email, Password (visibility toggle), Remember me, Forgot password. Button: "Log in as Job Seeker." Bottom: "New to EarnNear? Create an account." Visual communicates nearby jobs, shifts, earnings.

**Recruiter state (dark teal):** "Welcome back" / "Ready to find your next great hire?" — Work email, Password (visibility toggle), Remember me, Forgot password. Button: "Log in as Recruiter." Bottom: "New to EarnNear? Create a recruiter account." Visual communicates active posts, applicants, hiring activity.

Switching roles updates accent color, copy, button label, and visual — smoothly, same brand throughout.

---

## 4. SCREEN 3 — SIGNUP ROLE SELECTION

Heading: "Join EarnNear" / "How would you like to use EarnNear?"

**Job Seeker card (emerald):** "I want to find work" — find nearby jobs, book hourly shifts, build your profile. CTA "Continue as Job Seeker."

**Recruiter card (dark teal):** "I want to hire people" — post jobs, create shifts, manage applicants. CTA "Continue as Recruiter."

Selected card: stronger border, tinted background, clear selected indicator.

---

## 5. SCREEN 4 — JOB SEEKER REGISTRATION

"Create your job seeker account" / "Start discovering opportunities near you."
Fields: Full Name, Email, Phone, Location, Password, Confirm Password. Terms checkbox. Button: "Create Job Seeker Account." Link to login and to Recruiter signup.
Progress: Account → Verify → Profile → Ready to Explore. Keep it to account basics only — no education/skills/resume at this step.

**Sub-screen 4a — OTP Verification (Job Seeker):**
Heading: "Verify your number" / "We've sent a 6-digit code to +91 XXXXX XXXXX."
6-cell OTP input (boxed digits, auto-advance, auto-submit on completion).
Below: "Didn't get a code? Resend in 00:30" (countdown, becomes an active "Resend Code" link at 0:00).
Primary button: "Verify & Continue." Error state: shake/red-outline OTP cells + inline "Incorrect code, try again."
On success → proceeds to User Dashboard.

---

## 6. SCREEN 5 — RECRUITER REGISTRATION

"Create your recruiter account" / "Start finding reliable people for your business."
Fields: Full Name, Company Name, Work Email, Phone, Business Location, Password, Confirm Password. Terms checkbox. Button: "Create Recruiter Account." Link to login and to Job Seeker signup.
Progress: Account → Verify → Company Profile → Start Hiring. Dark teal accent.

**Sub-screen 5a — OTP Verification (Recruiter):**
Heading: "Verify your business number" / "We've sent a 6-digit code to +91 XXXXX XXXXX."
Same 6-cell OTP component, dark-teal accent instead of emerald.
"Didn't get a code? Resend in 00:30" countdown → active resend link.
Primary button: "Verify & Continue."
On success → proceeds to Recruiter Dashboard.

---

## 7. SCREEN 6 — JOB SEEKER DASHBOARD

**Sidebar:** Logo · Dashboard, Find Jobs, Find Shifts, Applications, My Bookings, Saved Jobs, Network, Profile · Settings/Help/Logout + mini profile card.
**Header:** Greeting/page title, search, notifications, messages, avatar.
**Main:** "Good morning, Aaron" / "Here's what's happening with your job search."
Stat cards: Applied Jobs, Booked Shifts, Saved Jobs, Upcoming Shifts.
Prominent upcoming-shift card: company, role, date, time, location, distance, Directions + Details buttons.
Sections: Recommended Jobs (Job Cards), Nearby Shifts (Shift Cards), Recent Activity feed (application submitted, shift confirmed, job saved, profile viewed).

---

## 8. SCREEN 7 — RECRUITER DASHBOARD

Same structure, dark teal accent.
**Sidebar:** Dashboard, My Jobs, My Shifts, Applicants, Bookings, Company Profile.
**Main:** "Good morning, Sarah" / "Here's what's happening with your hiring."
Primary actions: Post a Job / Create a Shift.
Stat cards: Active Jobs, Active Shifts, New Applicants, Workers Booked.
Recent Applicants: photo, name, role applied for, skills, rating, applied time, View Profile / Shortlist.
Upcoming Shifts: shift, date, time, required vs confirmed workers.
Active Job Posts: title, applications, views, status, posted date.

---

## 9. RESPONSIVE / MOBILE

Design intentional mobile versions (not shrunk desktop) for: Landing, Login, Signup Role Selection, Job Seeker Registration, Recruiter Registration, User Dashboard.
Use hamburger nav, full-width inputs, large touch targets, bottom nav where relevant, cards instead of grids.

---

## 10. PROTOTYPE / INTERACTION NOTES

Wire these connections in Figma prototype mode:
- Get Started → Role Selection · Login → Role-Aware Login · Find Jobs/Find Shifts → placeholder pages
- Role Selection: Job Seeker → Job Seeker Registration · Recruiter → Recruiter Registration
- Login tabs swap state in place (smart animate) · Successful login → respective dashboard
- Registration submit → OTP Verification screen (matching role's accent) → Verify & Continue → respective dashboard
- **Book Shift / Apply / Book Slot (any signed-out entry point)** → Role-Aware Login screen, not directly to a dashboard or confirmation state

**Scroll behavior:** Apply Smart Animate + scroll-triggered interactions on the landing page — fade/slide-up on section entry (Hero → Trust Strip → Categories → Nearby Jobs → Shifts → Map → How It Works → Journeys → Stats → Final CTA). This is a Figma prototyping-tab setup, done manually per section after frames are built — not something the pasted text alone will generate.

---

## FINAL QA CHECKLIST

- [ ] Homepage impressive within 5 seconds
- [ ] "Nearby work" and distance visually obvious throughout
- [ ] Shift booking reads as a core feature, not an add-on
- [ ] Job Seeker vs Recruiter instantly distinguishable by color/copy
- [ ] Auth feels like one unified system, not four separate pages
- [ ] All components are true reusable variants with proper states
- [ ] Auto Layout used consistently, 8px spacing honored
- [ ] Desktop and mobile each feel intentionally designed
- [ ] OTP verification step exists for both registration flows, matching each role's accent color
- [ ] Booking/applying while signed out redirects to login first, never bypasses it
- [ ] Palette reads muted/jewel-toned, not bright Material-style green