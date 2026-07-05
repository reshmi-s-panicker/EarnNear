import { useState, useRef, useEffect, useCallback } from "react";
import {
  MapPin, Search, Briefcase, Clock, Star, Bookmark, ArrowRight,
  Bell, MessageSquare, Settings, LogOut, Menu, X, Eye, EyeOff, Check,
  LayoutDashboard, FileText, Calendar, Heart, Users, User, Building2,
  TrendingUp, ChevronRight, Shield, Award, Coffee, ShoppingBag,
  Truck, Music, Monitor, Pen, Phone, Mail, Lock, DollarSign, RefreshCw, Globe,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Page =
  | "landing" | "login" | "signup-role"
  | "seeker-register" | "seeker-otp"
  | "recruiter-register" | "recruiter-otp"
  | "seeker-dashboard" | "recruiter-dashboard";

// ─── Palette ─────────────────────────────────────────────────────────────────
const P = {
  emerald:        "#0E6E4E",
  emeraldDark:    "#0A4F38",
  emeraldTint:    "#E4F0EA",
  emeraldBg:      "#F6FAF8",
  recruiter:      "#12302F",
  recruiterTint:  "#E4EBEA",
  bg:             "#FAFAF8",
  card:           "#FFFFFF",
  ink:            "#14181A",
  stone:          "#5C6660",
  border:         "#E3E6E3",
  success:        "#1E8F5E",
  warning:        "#C98A2A",
  error:          "#C4453D",
  info:           "#3B6FD6",
};

// ─── Badge ───────────────────────────────────────────────────────────────────
function Badge({ children, variant = "emerald" }: { children: React.ReactNode; variant?: "emerald" | "teal" | "stone" | "warning" | "error" }) {
  const s = {
    emerald: { bg: P.emeraldTint, color: P.emeraldDark },
    teal:    { bg: P.recruiterTint, color: P.recruiter },
    stone:   { bg: "#EFEFED", color: P.stone },
    warning: { bg: "#FAF0DF", color: P.warning },
    error:   { bg: "#FAEAE9", color: P.error },
  }[variant];
  return (
    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: s.bg, color: s.color }}>
      {children}
    </span>
  );
}

function StarRow({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={11} fill={i <= n ? P.warning : "none"} stroke={i <= n ? P.warning : "#D0D5D0"} />
      ))}
    </div>
  );
}

// ─── Map Composition ─────────────────────────────────────────────────────────
function MapCanvas({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden ${compact ? "h-64" : "h-[480px]"}`}
      style={{ background: "linear-gradient(145deg, #dceee6 0%, #c8e0d4 100%)" }}>
      {/* grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.15]">
        <defs>
          <pattern id="g" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke={P.emerald} strokeWidth="0.6"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#g)"/>
      </svg>
      {/* roads */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 52% L 100% 52%" stroke="white" strokeWidth="7" opacity="0.75"/>
        <path d="M 0 28% L 100% 28%" stroke="white" strokeWidth="4" opacity="0.55"/>
        <path d="M 34% 0 L 34% 100%" stroke="white" strokeWidth="6" opacity="0.65"/>
        <path d="M 67% 0 L 67% 100%" stroke="white" strokeWidth="4" opacity="0.5"/>
        <path d="M 55% 0 Q 65% 45% 75% 100%" stroke="white" strokeWidth="3" fill="none" opacity="0.35"/>
      </svg>
      {/* radius */}
      <div className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full"
        style={{ border: `2px dashed ${P.emerald}`, background: `${P.emerald}0D` }}/>
      {/* markers */}
      {[
        { x: "22%", y: "22%", pay: "₹280/hr" },
        { x: "55%", y: "35%", pay: "₹220/hr" },
        { x: "30%", y: "63%", pay: "₹300/hr" },
        { x: "66%", y: "20%", pay: "₹250/hr" },
      ].map((m, i) => (
        <div key={i} className="absolute flex flex-col items-center" style={{ left: m.x, top: m.y, transform: "translate(-50%,-110%)" }}>
          <div className="px-2 py-1 rounded-md text-white text-[10px] font-bold shadow-sm" style={{ background: P.emerald }}>{m.pay}</div>
          <div className="w-1.5 h-1.5 rounded-full mt-0.5" style={{ background: P.emerald }}/>
        </div>
      ))}
      {/* user dot */}
      <div className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
        <div className="w-4 h-4 rounded-full border-2 border-white shadow-md" style={{ background: P.info }}/>
        <span className="text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full shadow" style={{ background: P.info }}>You</span>
      </div>
      {/* floating card */}
      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl border p-3.5 shadow-md flex gap-3 items-center" style={{ borderColor: P.border }}>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: P.emerald }}>UC</div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold text-[#14181A] truncate">Restaurant Helper</div>
          <div className="text-[10px] text-[#5C6660]">Urban Café · 1.8 km away</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xs font-bold" style={{ color: P.emerald }}>₹250/hr</div>
          <div className="text-[10px]" style={{ color: P.stone }}>4 hr shift</div>
        </div>
      </div>
    </div>
  );
}

// ─── Job Card ─────────────────────────────────────────────────────────────────
type JobData = { logo: string; title: string; company: string; distance: string; rate: string; type: string; shift: string; posted: string; color: string };
function JobCard({ job, onAuthRequired }: { job: JobData; onAuthRequired?: () => void }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="bg-white rounded-xl border p-5 flex flex-col gap-4 hover:shadow-sm hover:-translate-y-px transition-all" style={{ borderColor: P.border }}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ background: job.color }}>{job.logo}</div>
          <div>
            <div className="font-semibold text-sm" style={{ color: P.ink }}>{job.title}</div>
            <div className="flex items-center gap-1 mt-0.5">
              <Shield size={9} style={{ color: P.emerald }}/>
              <span className="text-[11px]" style={{ color: P.stone }}>{job.company}</span>
            </div>
          </div>
        </div>
        <button onClick={() => setSaved(!saved)} className="p-1.5 rounded-lg hover:bg-[#F6FAF8] transition-colors shrink-0">
          <Bookmark size={15} fill={saved ? P.emerald : "none"} stroke={saved ? P.emerald : P.stone}/>
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Badge variant="stone"><MapPin size={9}/>{job.distance}</Badge>
        <Badge variant="emerald">{job.type}</Badge>
        <Badge variant="warning">{job.shift}</Badge>
      </div>
      <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: P.border }}>
        <div><span className="font-bold text-sm" style={{ color: P.ink }}>{job.rate}</span><span className="text-[11px]" style={{ color: P.stone }}>/hr</span></div>
        <div className="flex items-center gap-2">
          <span className="text-[11px]" style={{ color: P.stone }}>{job.posted}</span>
          <button onClick={onAuthRequired} className="text-[11px] font-semibold px-3 py-1.5 rounded-lg text-white transition-all hover:opacity-90" style={{ background: P.emerald }}>View Job</button>
        </div>
      </div>
    </div>
  );
}

// ─── Shift Card ───────────────────────────────────────────────────────────────
type ShiftData = { logo: string; title: string; company: string; date: string; time: string; duration: string; rate: string; earn: string; slots: number; distance: string; color: string };
function ShiftCard({ shift, onAuthRequired }: { shift: ShiftData; onAuthRequired?: () => void }) {
  return (
    <div className="bg-white rounded-xl border p-5 flex flex-col gap-3 hover:shadow-sm hover:-translate-y-px transition-all" style={{ borderColor: P.border }}>
      <div className="flex gap-3 items-center">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ background: shift.color }}>{shift.logo}</div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm" style={{ color: P.ink }}>{shift.title}</div>
          <div className="text-[11px]" style={{ color: P.stone }}>{shift.company}</div>
        </div>
        <Badge variant="stone"><MapPin size={9}/>{shift.distance}</Badge>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg p-2.5" style={{ background: P.emeraldBg }}>
          <div className="text-[9px] font-bold uppercase tracking-wide mb-0.5" style={{ color: P.stone }}>Date & Time</div>
          <div className="text-[11px] font-semibold" style={{ color: P.ink }}>{shift.date}</div>
          <div className="text-[11px]" style={{ color: P.stone }}>{shift.time}</div>
        </div>
        <div className="rounded-lg p-2.5" style={{ background: P.emeraldBg }}>
          <div className="text-[9px] font-bold uppercase tracking-wide mb-0.5" style={{ color: P.stone }}>Duration</div>
          <div className="text-[11px] font-semibold" style={{ color: P.ink }}>{shift.duration}</div>
          <div className="text-[11px]" style={{ color: P.stone }}>{shift.rate}</div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="rounded-lg px-3 py-2" style={{ background: P.emeraldTint }}>
          <div className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: P.emeraldDark }}>You earn</div>
          <div className="text-base font-extrabold" style={{ color: P.emerald }}>{shift.earn}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px]" style={{ color: P.stone }}>{shift.slots} spots left</div>
          <button onClick={onAuthRequired} className="mt-1.5 text-[11px] font-semibold px-4 py-2 rounded-lg text-white hover:opacity-90 transition-all" style={{ background: P.emerald }}>Book Shift</button>
        </div>
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ onNav }: { onNav: (p: Page) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/96 backdrop-blur-sm border-b" style={{ borderColor: P.border }}>
      <div className="max-w-7xl mx-auto px-6 h-15 flex items-center justify-between" style={{ height: 60 }}>
        <button onClick={() => onNav("landing")} className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: P.emerald }}>
            <MapPin size={14} color="white" fill="white"/>
          </div>
          <span className="font-bold text-base tracking-tight" style={{ color: P.ink }}>EarnNear</span>
        </button>
        <div className="hidden md:flex items-center gap-7">
          {["Find Jobs","Find Shifts","Companies","How It Works"].map(l => (
            <button key={l} className="text-sm font-medium transition-colors hover:opacity-80" style={{ color: P.stone }}>{l}</button>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button onClick={() => onNav("login")} className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors hover:bg-[#F6FAF8]" style={{ color: P.ink }}>Log In</button>
          <button onClick={() => onNav("signup-role")} className="text-sm font-semibold px-4 py-2 rounded-lg text-white hover:opacity-90 transition-all" style={{ background: P.emerald }}>Get Started</button>
        </div>
        <button className="md:hidden p-1" onClick={() => setOpen(!open)}>{open ? <X size={20}/> : <Menu size={20}/>}</button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-5 flex flex-col gap-4" style={{ borderColor: P.border }}>
          {["Find Jobs","Find Shifts","Companies","How It Works"].map(l => (
            <button key={l} className="text-sm font-medium text-left" style={{ color: P.stone }}>{l}</button>
          ))}
          <div className="flex gap-2 pt-3 border-t" style={{ borderColor: P.border }}>
            <button onClick={() => { onNav("login"); setOpen(false); }} className="flex-1 text-sm font-semibold py-2.5 rounded-lg border" style={{ borderColor: P.border, color: P.ink }}>Log In</button>
            <button onClick={() => { onNav("signup-role"); setOpen(false); }} className="flex-1 text-sm font-semibold py-2.5 rounded-lg text-white" style={{ background: P.emerald }}>Get Started</button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── OTP Input ────────────────────────────────────────────────────────────────
function OtpInput({ length = 6, error, onComplete }: { length?: number; error?: boolean; onComplete?: (val: string) => void }) {
  const [vals, setVals] = useState<string[]>(Array(length).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !vals[i] && i > 0) refs.current[i - 1]?.focus();
  };
  const handleChange = (i: number, v: string) => {
    const digit = v.replace(/\D/g, "").slice(-1);
    const next = [...vals];
    next[i] = digit;
    setVals(next);
    if (digit && i < length - 1) refs.current[i + 1]?.focus();
    if (next.every(d => d) && onComplete) onComplete(next.join(""));
  };
  const handlePaste = (e: React.ClipboardEvent) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!paste) return;
    const next = Array(length).fill("");
    paste.split("").forEach((c, i) => { next[i] = c; });
    setVals(next);
    const focus = Math.min(paste.length, length - 1);
    refs.current[focus]?.focus();
    if (paste.length >= length && onComplete) onComplete(paste.slice(0, length));
    e.preventDefault();
  };

  return (
    <div className="flex gap-2.5 justify-center">
      {vals.map((v, i) => (
        <input
          key={i}
          ref={el => { refs.current[i] = el; }}
          type="text" inputMode="numeric" maxLength={1}
          value={v}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKey(i, e)}
          onPaste={handlePaste}
          className="w-11 h-13 text-center text-lg font-bold rounded-xl border-2 outline-none transition-all"
          style={{
            height: 52,
            borderColor: error ? P.error : v ? P.emerald : P.border,
            background: error ? "#FAEAE9" : v ? P.emeraldTint : P.card,
            color: error ? P.error : P.ink,
          }}
        />
      ))}
    </div>
  );
}

// ─── Countdown ────────────────────────────────────────────────────────────────
function Countdown({ onResend }: { onResend?: () => void }) {
  const [secs, setSecs] = useState(30);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (secs <= 0) { setActive(true); return; }
    const t = setTimeout(() => setSecs(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secs]);

  const resend = () => { setSecs(30); setActive(false); onResend?.(); };

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  return (
    <div className="text-sm text-center" style={{ color: P.stone }}>
      {active
        ? <><span>Didn't get a code? </span><button onClick={resend} className="font-semibold underline underline-offset-2" style={{ color: P.emerald }}>Resend Code</button></>
        : <><span>Didn't get a code? Resend in </span><span className="font-semibold tabular-nums">{mm}:{ss}</span></>
      }
    </div>
  );
}

// ─── Landing ──────────────────────────────────────────────────────────────────
const JOBS: JobData[] = [
  { logo: "UC", title: "Restaurant Helper",      company: "Urban Café",       distance: "1.2 km", rate: "₹250", type: "Part-time", shift: "Evening",  posted: "2h ago",  color: P.emerald },
  { logo: "RF", title: "Retail Sales Assistant", company: "Reliance Fresh",   distance: "2.1 km", rate: "₹200", type: "Part-time", shift: "Morning",  posted: "5h ago",  color: P.recruiter },
  { logo: "ES", title: "Event Support Staff",    company: "EventSpark",       distance: "3.4 km", rate: "₹350", type: "One-day",   shift: "Full day", posted: "1d ago",  color: P.warning },
  { logo: "CS", title: "Customer Service Asst",  company: "ClearSupport",     distance: "4.0 km", rate: "₹280", type: "Part-time", shift: "Flexible", posted: "3h ago",  color: P.info },
];
const SHIFTS: ShiftData[] = [
  { logo: "UC", title: "Restaurant Helper", company: "Urban Café",    date: "Tomorrow",   time: "6:00–10:00 PM", duration: "4 hrs", rate: "₹250/hr", earn: "₹1,000", slots: 2, distance: "1.8 km", color: P.emerald },
  { logo: "BD", title: "Barista",           company: "Brew District",  date: "Sat, Jul 5", time: "7:00–11:00 AM", duration: "4 hrs", rate: "₹220/hr", earn: "₹880",   slots: 3, distance: "0.9 km", color: "#5D4037" },
  { logo: "ES", title: "Event Crew",        company: "EventSpark",     date: "Sun, Jul 6", time: "2:00–8:00 PM",  duration: "6 hrs", rate: "₹300/hr", earn: "₹1,800", slots: 5, distance: "2.5 km", color: P.warning },
];
const CATS = [
  { icon: Coffee,     label: "Restaurant & Hospitality", count: 240, color: "#5D4037" },
  { icon: ShoppingBag,label: "Retail",                   count: 185, color: P.emerald },
  { icon: Truck,      label: "Delivery & Logistics",     count: 310, color: P.info },
  { icon: Music,      label: "Events",                   count: 90,  color: P.warning },
  { icon: Monitor,    label: "Office & Admin",            count: 145, color: P.recruiter },
  { icon: Pen,        label: "Creative & Digital",        count: 75,  color: "#7B4F9E" },
];

function LandingPage({ onNav }: { onNav: (p: Page) => void }) {
  const authGate = () => onNav("login");
  return (
    <div className="bg-[#FAFAF8]" style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* ── Hero ── */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6 text-xs font-semibold" style={{ borderColor: P.emeraldTint, background: P.emeraldBg, color: P.emeraldDark }}>
                <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: P.emerald }}/>
                1,240 opportunities near you
              </div>
              <h1 className="text-5xl md:text-[3.6rem] font-extrabold leading-[1.05] tracking-tight mb-5" style={{ color: P.ink }}>
                Flexible work.<br/>
                <span style={{ color: P.emerald }}>Right around you.</span>
              </h1>
              <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: P.stone }}>
                Discover part-time jobs and book flexible hourly shifts from trusted businesses around your location.
              </p>
              <div className="flex gap-3 mb-10 flex-wrap">
                <button onClick={() => onNav("signup-role")} className="px-6 py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all" style={{ background: P.emerald }}>
                  Find Jobs Near Me
                </button>
                <button onClick={() => onNav("signup-role")} className="px-6 py-3 rounded-xl text-sm font-semibold border-2 bg-white hover:border-[#0E6E4E] transition-all" style={{ borderColor: P.border, color: P.ink }}>
                  I'm Hiring
                </button>
              </div>
              {/* Search */}
              <div className="bg-white rounded-xl border shadow-sm p-1.5 flex flex-col sm:flex-row gap-1.5" style={{ borderColor: P.border }}>
                <div className="flex-1 flex items-center gap-2 px-3 py-2">
                  <Search size={14} style={{ color: P.stone }}/><input className="flex-1 text-sm outline-none bg-transparent placeholder:text-[#5C6660]" placeholder="Job title, skill, or company"/>
                </div>
                <div className="hidden sm:block w-px self-stretch" style={{ background: P.border }}/>
                <div className="flex-1 flex items-center gap-2 px-3 py-2">
                  <MapPin size={14} style={{ color: P.emerald }}/><input className="flex-1 text-sm outline-none bg-transparent placeholder:text-[#5C6660]" placeholder="Your location"/>
                </div>
                <button className="px-5 py-2.5 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-all" style={{ background: P.emerald }}>Search Jobs</button>
              </div>
            </div>
            <div className="hidden md:block"><MapCanvas/></div>
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section className="border-y py-4 bg-white" style={{ borderColor: P.border }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-14">
          {[
            { icon: Building2, t: "Trusted local businesses" },
            { icon: Shield,    t: "Verified job opportunities" },
            { icon: Clock,     t: "Flexible shift booking" },
            { icon: Award,     t: "Secure profiles" },
          ].map(({ icon: Icon, t }) => (
            <div key={t} className="flex items-center gap-2">
              <Icon size={15} style={{ color: P.emerald }}/>
              <span className="text-sm font-medium" style={{ color: P.stone }}>{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-1.5" style={{ color: P.ink }}>Explore work that fits your life</h2>
            <p className="text-sm" style={{ color: P.stone }}>Browse opportunities across popular categories near you</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATS.map(({ icon: Icon, label, count, color }) => (
              <button key={label} className="bg-white rounded-xl border p-5 flex flex-col items-start gap-3 hover:shadow-sm hover:-translate-y-px hover:border-[#0E6E4E] transition-all text-left" style={{ borderColor: P.border }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
                  <Icon size={18} style={{ color }}/>
                </div>
                <div>
                  <div className="text-xs font-semibold leading-tight" style={{ color: P.ink }}>{label}</div>
                  <div className="text-[11px] mt-0.5" style={{ color: P.stone }}>{count} openings</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nearby Jobs ── */}
      <section className="py-16 md:py-20 border-y bg-white" style={{ borderColor: P.border }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-1" style={{ color: P.ink }}>Jobs near you</h2>
              <p className="text-sm" style={{ color: P.stone }}>Opportunities selected based on your location</p>
            </div>
            <button className="hidden md:flex items-center gap-1 text-sm font-semibold hover:opacity-75 transition-opacity" style={{ color: P.emerald }}>
              View all jobs <ArrowRight size={13}/>
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {JOBS.map((j, i) => <JobCard key={i} job={j} onAuthRequired={authGate}/>)}
          </div>
        </div>
      </section>

      {/* ── Shifts ── */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-1" style={{ color: P.ink }}>Pick a shift. Work. Get paid.</h2>
              <p className="text-sm" style={{ color: P.stone }}>Book open shifts and start earning today</p>
            </div>
            <button className="hidden md:flex items-center gap-1 text-sm font-semibold hover:opacity-75 transition-opacity" style={{ color: P.emerald }}>
              View all shifts <ArrowRight size={13}/>
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SHIFTS.map((s, i) => <ShiftCard key={i} shift={s} onAuthRequired={authGate}/>)}
          </div>
        </div>
      </section>

      {/* ── Map discovery ── */}
      <section className="py-16 md:py-24 border-y bg-white" style={{ borderColor: P.border }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: P.ink }}>See what's hiring around you</h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: P.stone }}>Explore jobs and shifts on a live map. See exactly how far each opportunity is from where you are right now.</p>
              <div className="flex flex-col gap-2.5 mb-8">
                {["View jobs within 5 km of your location","See real-time slot availability","Get directions instantly"].map(t => (
                  <div key={t} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: P.emeraldTint }}>
                      <Check size={10} style={{ color: P.emerald }}/>
                    </div>
                    <span className="text-sm" style={{ color: P.stone }}>{t}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => onNav("signup-role")} className="px-6 py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all" style={{ background: P.emerald }}>Explore the map</button>
            </div>
            <MapCanvas compact/>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-1.5" style={{ color: P.ink }}>How it works</h2>
            <p className="text-sm" style={{ color: P.stone }}>Start earning in three steps</p>
          </div>
          <div className="relative grid md:grid-cols-3 gap-6">
            {/* connector */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+40px)] right-[calc(16.67%+40px)] h-px" style={{ background: `linear-gradient(to right, ${P.emeraldTint}, ${P.emeraldTint})` }}/>
            {[
              { n: "01", icon: Search,     title: "Discover nearby work", desc: "Browse jobs and shifts within walking or commuting distance." },
              { n: "02", icon: FileText,   title: "Apply or book a shift", desc: "Submit applications in seconds or instantly book an open slot." },
              { n: "03", icon: DollarSign, title: "Work and earn",         desc: "Show up, complete the work, and track your earnings in one place." },
            ].map(({ n, icon: Icon, title, desc }) => (
              <div key={n} className="bg-white rounded-xl border p-7 flex flex-col gap-4" style={{ borderColor: P.border }}>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: P.emeraldBg }}>
                    <Icon size={20} style={{ color: P.emerald }}/>
                  </div>
                  <span className="text-3xl font-black opacity-[0.08]" style={{ color: P.ink }}>{n}</span>
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1.5" style={{ color: P.ink }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: P.stone }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Two journeys ── */}
      <section className="py-16 md:py-24" style={{ background: P.ink }}>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-5">
          {[
            {
              icon: User, label: "For Job Seekers", accent: P.emerald,
              title: "Work on your terms.",
              desc: "Find nearby jobs, book flexible hourly shifts, build your reputation, and work entirely on your own schedule.",
              features: ["Find jobs near your location","Book hourly shifts instantly","Build your work reputation","Set your own availability"],
              cta: "Find Work", page: "signup-role" as Page,
            },
            {
              icon: Building2, label: "For Businesses", accent: P.recruiter,
              title: "Find reliable people, faster.",
              desc: "Post jobs, create open shifts, discover nearby verified workers, and manage your entire hiring pipeline.",
              features: ["Post jobs in minutes","Create bookable shifts","Access nearby verified workers","Manage applicants easily"],
              cta: "Start Hiring", page: "signup-role" as Page,
            },
          ].map(({ icon: Icon, label, accent, title, desc, features, cta, page }) => (
            <div key={label} className="rounded-2xl p-9 flex flex-col gap-5" style={{ background: accent }}>
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center"><Icon size={20} color="white"/></div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1">{label}</div>
                <h3 className="text-2xl font-extrabold text-white mb-2">{title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{desc}</p>
              </div>
              <ul className="flex flex-col gap-2">
                {features.map(f => (
                  <li key={f} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center shrink-0"><Check size={9} color="white"/></div>
                    <span className="text-sm text-white/85">{f}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => onNav(page)} className="self-start px-6 py-2.5 rounded-xl bg-white text-sm font-bold hover:bg-white/90 transition-all" style={{ color: accent }}>{cta}</button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 border-y bg-white" style={{ borderColor: P.border }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { v: "8,400+",  l: "Active Jobs" },
            { v: "3,200+",  l: "Available Shifts" },
            { v: "1,800+",  l: "Local Businesses" },
            { v: "24,000+", l: "Successful Bookings" },
          ].map(({ v, l }) => (
            <div key={l} className="py-4">
              <div className="text-3xl font-extrabold mb-1" style={{ color: P.emerald }}>{v}</div>
              <div className="text-sm font-medium" style={{ color: P.stone }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold leading-tight mb-4" style={{ color: P.ink }}>
            Your next opportunity could be closer than you think.
          </h2>
          <p className="text-sm mb-8" style={{ color: P.stone }}>Join thousands of people already earning with EarnNear.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => onNav("signup-role")} className="px-8 py-3.5 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-all" style={{ background: P.emerald }}>Find Work</button>
            <button onClick={() => onNav("signup-role")} className="px-8 py-3.5 rounded-xl font-semibold text-sm border-2 bg-white hover:border-[#0E6E4E] transition-all" style={{ borderColor: P.border, color: P.ink }}>Start Hiring</button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: P.ink }}>
        <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
          <div className="grid md:grid-cols-5 gap-10 pb-10 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: P.emerald }}><MapPin size={13} color="white" fill="white"/></div>
                <span className="font-bold text-white">EarnNear</span>
              </div>
              <p className="text-xs text-white/40 leading-relaxed">Part time jobs right around YOU.</p>
            </div>
            {[
              { h: "Platform",      links: ["Find Jobs","Find Shifts","Companies"] },
              { h: "Job Seekers",   links: ["Create Profile","Saved Jobs","My Applications"] },
              { h: "Businesses",    links: ["Post a Job","Create a Shift","Find Workers"] },
              { h: "Support",       links: ["Help Centre","Safety","Contact"] },
            ].map(({ h, links }) => (
              <div key={h}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-4">{h}</div>
                <ul className="flex flex-col gap-2">
                  {links.map(l => <li key={l}><a href="#" className="text-sm text-white/55 hover:text-white transition-colors">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-6 flex flex-col md:flex-row justify-between gap-4">
            <p className="text-xs text-white/30">© 2026 EarnNear. All rights reserved.</p>
            <div className="flex gap-6">{["Privacy","Terms","Cookies"].map(l => <a key={l} href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">{l}</a>)}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Login ─────────────────────────────────────────────────────────────────────
function LoginPage({ onNav }: { onNav: (p: Page) => void }) {
  const [role, setRole] = useState<"seeker"|"recruiter">("seeker");
  const [showPw, setShowPw] = useState(false);
  const isR = role === "recruiter";
  const accent = isR ? P.recruiter : P.emerald;

  const bgFeatures = isR
    ? ["Active job posts tracked","Applicant pipeline managed","Workers booked and confirmed"]
    : ["Nearby jobs discovered","Flexible shifts booked","Earnings tracked automatically"];

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Manrope', sans-serif" }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden" style={{ background: accent }}>
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]">
          <defs><pattern id="dp" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="white"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#dp)"/>
        </svg>
        <div className="relative flex flex-col justify-between h-full p-12">
          <button onClick={() => onNav("landing")} className="flex items-center gap-2 self-start">
            <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center"><MapPin size={13} color="white" fill="white"/></div>
            <span className="font-bold text-white">EarnNear</span>
          </button>
          <div>
            <h2 className="text-5xl font-extrabold text-white leading-[1.1] mb-4">
              {isR ? "Find reliable people,\nfaster." : "Flexible work,\nyour way."}
            </h2>
            <p className="text-white/65 text-base max-w-xs leading-relaxed">
              {isR ? "Post jobs, create shifts, and discover nearby workers ready to help your business." : "Discover part-time jobs and book shifts from trusted businesses right around you."}
            </p>
            <ul className="mt-8 flex flex-col gap-2.5">
              {bgFeatures.map(f => (
                <li key={f} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center shrink-0"><Check size={9} color="white"/></div>
                  <span className="text-sm text-white/75">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <span className="text-xs text-white/30">Part time jobs right around YOU.</span>
        </div>
      </div>
      {/* Right form */}
      <div className="flex-1 lg:max-w-md flex flex-col justify-center px-8 md:px-12 py-12" style={{ background: P.bg }}>
        <div className="max-w-sm mx-auto w-full">
          {/* Role switcher */}
          <div className="flex rounded-xl border p-1 mb-8 bg-white" style={{ borderColor: P.border }}>
            {(["seeker","recruiter"] as const).map(r => (
              <button key={r} onClick={() => setRole(r)} className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
                style={role === r ? { background: accent, color: "white" } : { color: P.stone }}>
                {r === "seeker" ? "Job Seeker" : "Recruiter"}
              </button>
            ))}
          </div>
          <h1 className="text-2xl font-extrabold mb-1" style={{ color: P.ink }}>Welcome back</h1>
          <p className="text-sm mb-7" style={{ color: P.stone }}>
            {isR ? "Ready to find your next great hire?" : "Ready to find your next opportunity?"}
          </p>
          <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); onNav(isR ? "recruiter-dashboard" : "seeker-dashboard"); }}>
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: P.ink }}>{isR ? "Work Email" : "Email"}</label>
              <div className="flex items-center gap-2 bg-white border rounded-xl px-3 py-2.5 transition-colors focus-within:ring-1" style={{ borderColor: P.border }}>
                <Mail size={14} style={{ color: P.stone }}/><input className="flex-1 text-sm outline-none bg-transparent" type="email" placeholder="you@example.com"/>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: P.ink }}>Password</label>
              <div className="flex items-center gap-2 bg-white border rounded-xl px-3 py-2.5" style={{ borderColor: P.border }}>
                <Lock size={14} style={{ color: P.stone }}/><input className="flex-1 text-sm outline-none bg-transparent" type={showPw ? "text" : "password"} placeholder="Your password"/>
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ color: P.stone }}>{showPw ? <EyeOff size={14}/> : <Eye size={14}/>}</button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="w-4 h-4 rounded border bg-white flex items-center justify-center" style={{ borderColor: P.border }}>
                  <Check size={9} style={{ color: accent }}/>
                </div>
                <span className="text-xs" style={{ color: P.stone }}>Remember me</span>
              </label>
              <button type="button" className="text-xs font-semibold hover:opacity-75" style={{ color: accent }}>Forgot password?</button>
            </div>
            <button type="submit" className="mt-1 py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-all" style={{ background: accent }}>
              {isR ? "Log in as Recruiter" : "Log in as Job Seeker"}
            </button>
          </form>
          <p className="text-center text-xs mt-6" style={{ color: P.stone }}>
            New to EarnNear?{" "}
            <button onClick={() => onNav("signup-role")} className="font-semibold hover:opacity-75" style={{ color: accent }}>
              {isR ? "Create a recruiter account" : "Create an account"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Signup Role Selection ─────────────────────────────────────────────────────
function SignupRolePage({ onNav }: { onNav: (p: Page) => void }) {
  const [selected, setSelected] = useState<"seeker"|"recruiter"|null>(null);
  const cards = [
    {
      key: "seeker" as const, icon: User, accent: P.emerald, tint: P.emeraldTint,
      sub: "For job seekers", title: "I want to find work",
      features: ["Find nearby part-time jobs","Book hourly shifts instantly","Build your work profile"],
      cta: "Continue as Job Seeker", next: "seeker-register" as Page,
    },
    {
      key: "recruiter" as const, icon: Building2, accent: P.recruiter, tint: P.recruiterTint,
      sub: "For businesses", title: "I want to hire people",
      features: ["Post jobs and create shifts","Discover nearby workers","Manage your applicants"],
      cta: "Continue as Recruiter", next: "recruiter-register" as Page,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Manrope', sans-serif", background: P.bg }}>
      <div className="p-5 border-b bg-white" style={{ borderColor: P.border }}>
        <button onClick={() => onNav("landing")} className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: P.emerald }}><MapPin size={13} color="white" fill="white"/></div>
          <span className="font-bold" style={{ color: P.ink }}>EarnNear</span>
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-2" style={{ color: P.ink }}>Join EarnNear</h1>
          <p className="text-sm" style={{ color: P.stone }}>How would you like to use EarnNear?</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5 max-w-xl w-full">
          {cards.map(({ key, icon: Icon, accent, tint, sub, title, features, cta, next }) => (
            <div key={key} role="button" tabIndex={0}
              onClick={() => setSelected(key)}
              onKeyDown={e => e.key === "Enter" && setSelected(key)}
              className="rounded-2xl border-2 p-7 flex flex-col gap-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-sm cursor-pointer"
              style={{ borderColor: selected === key ? accent : P.border, background: selected === key ? tint : P.card }}>
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: selected === key ? accent : `${accent}15` }}>
                  <Icon size={20} color={selected === key ? "white" : accent}/>
                </div>
                {selected === key && (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: accent }}>
                    <Check size={11} color="white"/>
                  </div>
                )}
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: accent }}>{sub}</div>
                <h3 className="text-lg font-bold" style={{ color: P.ink }}>{title}</h3>
              </div>
              <ul className="flex flex-col gap-2">
                {features.map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: `${accent}20` }}>
                      <Check size={8} style={{ color: accent }}/>
                    </div>
                    <span className="text-xs" style={{ color: P.stone }}>{f}</span>
                  </li>
                ))}
              </ul>
              {selected === key && (
                <button onClick={e => { e.stopPropagation(); onNav(next); }}
                  className="py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all"
                  style={{ background: accent }}>{cta}</button>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs mt-7" style={{ color: P.stone }}>
          Already have an account?{" "}
          <button onClick={() => onNav("login")} className="font-semibold hover:opacity-75" style={{ color: P.emerald }}>Log in</button>
        </p>
      </div>
    </div>
  );
}

// ─── Registration ─────────────────────────────────────────────────────────────
function RegisterPage({ onNav, type }: { onNav: (p: Page) => void; type: "seeker"|"recruiter" }) {
  const [showPw, setShowPw] = useState(false);
  const isR = type === "recruiter";
  const accent = isR ? P.recruiter : P.emerald;
  const steps = isR
    ? ["Account","Verify","Company Profile","Start Hiring"]
    : ["Account","Verify","Profile","Ready to Explore"];

  const fields = isR
    ? [
        { label: "Full Name",         icon: User,      type: "text",  ph: "Sarah Johnson",          optional: false },
        { label: "Company Name",      icon: Building2, type: "text",  ph: "Urban Café Pvt Ltd",      optional: false },
        { label: "Work Email",        icon: Mail,      type: "email", ph: "sarah@urbancafe.in",      optional: false },
        { label: "Phone",             icon: Phone,     type: "tel",   ph: "+91 98765 43210",         optional: false },
        { label: "Business Location", icon: MapPin,    type: "text",  ph: "Koramangala, Bengaluru",  optional: false },
        { label: "Website",           icon: Globe,     type: "url",      ph: "https://urbancafe.in",                                       optional: true  },
        { label: "Description",       icon: Pen,       type: "textarea", ph: "Tell us about your business, the kind of work you offer...",  optional: false },
      ]
    : [
        { label: "Full Name",    icon: User,     type: "text",  ph: "Aaron Mathew",          optional: false },
        { label: "Email",        icon: Mail,     type: "email", ph: "aaron@example.com",     optional: false },
        { label: "Phone",        icon: Phone,    type: "tel",   ph: "+91 98765 43210",       optional: false },
        { label: "Date of Birth",icon: Calendar, type: "date",  ph: "",                      optional: false },
        { label: "Location",     icon: MapPin,   type: "text",  ph: "Indiranagar, Bengaluru",optional: false },
      ];

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Manrope', sans-serif", background: P.bg }}>
      {/* Header */}
      <div className="p-5 border-b bg-white flex items-center justify-between flex-wrap gap-4" style={{ borderColor: P.border }}>
        <button onClick={() => onNav("landing")} className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: accent }}><MapPin size={13} color="white" fill="white"/></div>
          <span className="font-bold" style={{ color: P.ink }}>EarnNear</span>
        </button>
        {/* Progress */}
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={i === 0 ? { background: accent, color: "white" } : { background: P.border, color: P.stone }}>
                  {i === 0 ? <Check size={11}/> : i + 1}
                </div>
                <span className="hidden md:block text-xs font-medium" style={{ color: i === 0 ? accent : P.stone }}>{s}</span>
              </div>
              {i < steps.length - 1 && <ChevronRight size={12} style={{ color: P.border }}/>}
            </div>
          ))}
        </div>
      </div>
      {/* Form */}
      <div className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="max-w-md w-full">
          <div className="mb-7">
            <h1 className="text-2xl font-extrabold mb-1" style={{ color: P.ink }}>
              {isR ? "Create your recruiter account" : "Create your job seeker account"}
            </h1>
            <p className="text-sm" style={{ color: P.stone }}>
              {isR ? "Start finding reliable people for your business." : "Start discovering opportunities near you."}
            </p>
          </div>
          <form className="flex flex-col gap-4 bg-white rounded-xl border p-7" style={{ borderColor: P.border }}
            onSubmit={e => { e.preventDefault(); onNav(isR ? "recruiter-otp" : "seeker-otp"); }}>
            {fields.map(({ label, icon: Icon, type: t, ph, optional }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold" style={{ color: P.ink }}>{label}</label>
                  {optional && <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ background: P.border, color: P.stone }}>Optional</span>}
                </div>
                {t === "textarea" ? (
                  <div className="border rounded-xl px-3 py-2.5 transition-colors" style={{ borderColor: P.border, background: P.bg }}>
                    <textarea rows={3} className="w-full text-sm outline-none bg-transparent placeholder:opacity-50 resize-none" placeholder={ph}/>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 border rounded-xl px-3 py-2.5 transition-colors" style={{ borderColor: P.border, background: P.bg }}>
                    <Icon size={13} style={{ color: P.stone }}/><input className="flex-1 text-sm outline-none bg-transparent placeholder:opacity-50" type={t} placeholder={ph}/>
                  </div>
                )}
              </div>
            ))}
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: P.ink }}>Password</label>
              <div className="flex items-center gap-2 border rounded-xl px-3 py-2.5" style={{ borderColor: P.border, background: P.bg }}>
                <Lock size={13} style={{ color: P.stone }}/><input className="flex-1 text-sm outline-none bg-transparent" type={showPw ? "text" : "password"} placeholder="Create a password"/>
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ color: P.stone }}>{showPw ? <EyeOff size={13}/> : <Eye size={13}/>}</button>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: P.ink }}>Confirm Password</label>
              <div className="flex items-center gap-2 border rounded-xl px-3 py-2.5" style={{ borderColor: P.border, background: P.bg }}>
                <Lock size={13} style={{ color: P.stone }}/><input className="flex-1 text-sm outline-none bg-transparent" type="password" placeholder="Repeat your password"/>
              </div>
            </div>
            <label className="flex items-start gap-2.5 mt-1 cursor-pointer">
              <div className="w-4 h-4 rounded border bg-white flex items-center justify-center mt-0.5 shrink-0" style={{ borderColor: P.border }}>
                <Check size={9} style={{ color: accent }}/>
              </div>
              <span className="text-xs leading-relaxed" style={{ color: P.stone }}>
                I agree to the <span className="font-semibold" style={{ color: accent }}>Terms of Service</span> and <span className="font-semibold" style={{ color: accent }}>Privacy Policy</span>
              </span>
            </label>
            <button type="submit" className="mt-1 py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all" style={{ background: accent }}>
              {isR ? "Create Recruiter Account" : "Create Job Seeker Account"}
            </button>
          </form>
          <div className="text-center mt-5 flex flex-col gap-1.5">
            <p className="text-xs" style={{ color: P.stone }}>Already have an account? <button onClick={() => onNav("login")} className="font-semibold" style={{ color: accent }}>Log in</button></p>
            <p className="text-xs" style={{ color: P.stone }}>
              {isR ? "Looking for work?" : "Want to hire?"}{" "}
              <button onClick={() => onNav(isR ? "seeker-register" : "recruiter-register")} className="font-semibold" style={{ color: accent }}>
                {isR ? "Job Seeker signup" : "Recruiter signup"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── OTP Page ─────────────────────────────────────────────────────────────────
function OtpPage({ onNav, type }: { onNav: (p: Page) => void; type: "seeker"|"recruiter" }) {
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const isR = type === "recruiter";
  const accent = isR ? P.recruiter : P.emerald;
  const dest: Page = isR ? "recruiter-dashboard" : "seeker-dashboard";
  const steps = isR
    ? ["Account","Verify","Company Profile","Start Hiring"]
    : ["Account","Verify","Profile","Ready to Explore"];

  const handleComplete = (val: string) => {
    if (val === "000000") {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    } else {
      setError(false);
      setTimeout(() => onNav(dest), 300);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Manrope', sans-serif", background: P.bg }}>
      {/* Header with progress */}
      <div className="p-5 border-b bg-white flex items-center justify-between flex-wrap gap-4" style={{ borderColor: P.border }}>
        <button onClick={() => onNav("landing")} className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: accent }}><MapPin size={13} color="white" fill="white"/></div>
          <span className="font-bold" style={{ color: P.ink }}>EarnNear</span>
        </button>
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={i <= 1 ? { background: accent, color: "white" } : { background: P.border, color: P.stone }}>
                  {i < 1 ? <Check size={11}/> : i + 1}
                </div>
                <span className="hidden md:block text-xs font-medium" style={{ color: i <= 1 ? accent : P.stone }}>{s}</span>
              </div>
              {i < steps.length - 1 && <ChevronRight size={12} style={{ color: P.border }}/>}
            </div>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-sm w-full text-center flex flex-col items-center gap-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: isR ? P.recruiterTint : P.emeraldTint }}>
            <Phone size={22} style={{ color: accent }}/>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold mb-2" style={{ color: P.ink }}>
              {isR ? "Verify your business number" : "Verify your number"}
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: P.stone }}>
              We've sent a 6-digit code to{" "}
              <span className="font-semibold" style={{ color: P.ink }}>+91 98765 XXXXX</span>.
              <br/>Enter it below to continue.
            </p>
          </div>

          {/* OTP cells */}
          <div className={shake ? "animate-[shake_0.5s_ease]" : ""} style={shake ? { animation: "shake 0.5s ease" } : {}}>
            <style>{`@keyframes shake{0%,100%{transform:translateX(0)}15%{transform:translateX(-6px)}30%{transform:translateX(6px)}45%{transform:translateX(-4px)}60%{transform:translateX(4px)}75%{transform:translateX(-2px)}90%{transform:translateX(2px)}}`}</style>
            <OtpInput error={error} onComplete={handleComplete}/>
          </div>

          {error && (
            <p className="text-xs font-semibold" style={{ color: P.error }}>Incorrect code, try again.</p>
          )}

          <Countdown/>

          <button onClick={() => onNav(dest)} className="w-full py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-all" style={{ background: accent }}>
            Verify &amp; Continue
          </button>

          <button onClick={() => onNav(isR ? "recruiter-register" : "seeker-register")} className="text-xs font-medium hover:opacity-75" style={{ color: P.stone }}>
            ← Back to registration
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ type, active, onNav }: { type: "seeker"|"recruiter"; active: string; onNav: (p: Page) => void }) {
  const isR = type === "recruiter";
  const accent = isR ? P.recruiter : P.emerald;
  const links = isR
    ? [
        { icon: LayoutDashboard, label: "Dashboard",       id: "dashboard" },
        { icon: Briefcase,       label: "My Jobs",          id: "jobs" },
        { icon: Calendar,        label: "My Shifts",        id: "shifts" },
        { icon: Users,           label: "Applicants",       id: "applicants" },
        { icon: FileText,        label: "Bookings",         id: "bookings" },
        { icon: Building2,       label: "Company Profile",  id: "company" },
      ]
    : [
        { icon: LayoutDashboard, label: "Dashboard",    id: "dashboard" },
        { icon: Search,          label: "Find Jobs",    id: "find-jobs" },
        { icon: Clock,           label: "Find Shifts",  id: "find-shifts" },
        { icon: FileText,        label: "Applications", id: "applications" },
        { icon: Calendar,        label: "My Bookings",  id: "bookings" },
        { icon: Heart,           label: "Saved Jobs",   id: "saved" },
        { icon: Users,           label: "Network",      id: "network" },
        { icon: User,            label: "Profile",      id: "profile" },
      ];

  return (
    <div className="w-56 shrink-0 bg-white border-r flex flex-col h-screen sticky top-0" style={{ borderColor: P.border }}>
      <div className="p-4 border-b" style={{ borderColor: P.border }}>
        <button onClick={() => onNav("landing")} className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: accent }}><MapPin size={13} color="white" fill="white"/></div>
          <span className="font-bold text-sm" style={{ color: P.ink }}>EarnNear</span>
        </button>
      </div>
      <nav className="flex-1 p-2.5 overflow-y-auto">
        {links.map(({ icon: Icon, label, id }) => (
          <button key={id} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold mb-0.5 transition-colors text-left"
            style={active === id ? { background: isR ? `${accent}12` : P.emeraldBg, color: accent } : { color: P.stone }}>
            <Icon size={15}/>{label}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t" style={{ borderColor: P.border }}>
        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left hover:bg-[#F6FAF8] transition-colors mb-0.5" style={{ color: P.stone }}>
          <Settings size={14}/>Settings
        </button>
        <button onClick={() => onNav("landing")} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left hover:bg-[#F6FAF8] transition-colors mb-2" style={{ color: P.stone }}>
          <LogOut size={14}/>Log out
        </button>
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl" style={{ background: P.emeraldBg }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{ background: accent }}>
            {isR ? "SJ" : "AM"}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold truncate" style={{ color: P.ink }}>{isR ? "Sarah Johnson" : "Aaron Mathew"}</div>
            <div className="text-[10px] truncate" style={{ color: P.stone }}>{isR ? "Urban Café" : "Job Seeker"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard header ─────────────────────────────────────────────────────────
function DashHeader({ title, isRecruiter }: { title: string; isRecruiter?: boolean }) {
  const accent = isRecruiter ? P.recruiter : P.emerald;
  return (
    <div className="h-14 bg-white border-b flex items-center justify-between px-7 shrink-0" style={{ borderColor: P.border }}>
      <h1 className="text-sm font-bold" style={{ color: P.ink }}>{title}</h1>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 border rounded-xl px-3 py-2 w-44" style={{ borderColor: P.border, background: P.bg }}>
          <Search size={12} style={{ color: P.stone }}/><input className="text-xs outline-none bg-transparent placeholder:opacity-50 w-full" placeholder="Search…"/>
        </div>
        <button className="relative p-2 rounded-xl border hover:bg-[#F6FAF8] transition-colors" style={{ borderColor: P.border }}>
          <Bell size={15} style={{ color: P.stone }}/>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: P.error }}/>
        </button>
        <button className="p-2 rounded-xl border hover:bg-[#F6FAF8] transition-colors" style={{ borderColor: P.border }}>
          <MessageSquare size={15} style={{ color: P.stone }}/>
        </button>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: accent }}>
          {isRecruiter ? "SJ" : "AM"}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, icon: Icon, color }: { label: string; value: string; sub?: string; icon: React.ElementType; color: string }) {
  return (
    <div className="bg-white rounded-xl border p-5 flex flex-col gap-3" style={{ borderColor: P.border }}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: P.stone }}>{label}</span>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
          <Icon size={14} style={{ color }}/>
        </div>
      </div>
      <div className="text-2xl font-extrabold" style={{ color: P.ink }}>{value}</div>
      {sub && <div className="text-[11px]" style={{ color: P.stone }}>{sub}</div>}
    </div>
  );
}

// ─── Seeker Dashboard ─────────────────────────────────────────────────────────
function SeekerDashboard({ onNav }: { onNav: (p: Page) => void }) {
  const recJobs: JobData[] = [
    { logo: "UC", title: "Restaurant Helper",      company: "Urban Café",    distance: "1.2 km", rate: "₹250", type: "Part-time", shift: "Evening", posted: "2h ago", color: P.emerald },
    { logo: "BD", title: "Barista",                company: "Brew District", distance: "0.9 km", rate: "₹220", type: "Part-time", shift: "Morning", posted: "4h ago", color: "#5D4037" },
    { logo: "ES", title: "Event Crew",             company: "EventSpark",    distance: "2.5 km", rate: "₹300", type: "One-day",   shift: "Flexible",posted: "1d ago", color: P.warning },
  ];
  const nearbyShifts: ShiftData[] = [
    { logo: "UC", title: "Restaurant Helper", company: "Urban Café",   date: "Tomorrow",   time: "6:00–10:00 PM", duration: "4 hrs", rate: "₹250/hr", earn: "₹1,000", slots: 2, distance: "1.8 km", color: P.emerald },
    { logo: "BD", title: "Barista",           company: "Brew District",date: "Sat, Jul 5", time: "7:00–11:00 AM", duration: "4 hrs", rate: "₹220/hr", earn: "₹880",   slots: 3, distance: "0.9 km", color: "#5D4037" },
  ];
  const activity = [
    { text: "Application submitted to Event Support Staff at EventSpark", time: "2h ago",   icon: FileText },
    { text: "Shift confirmed — Barista at Brew District on Jul 5",        time: "Yesterday", icon: Check },
    { text: "Job saved — Customer Service Asst at ClearSupport",          time: "2d ago",    icon: Heart },
    { text: "Profile viewed by Urban Café recruiter",                     time: "3d ago",    icon: Eye },
  ];

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: "'Manrope', sans-serif", background: P.bg }}>
      <Sidebar type="seeker" active="dashboard" onNav={onNav}/>
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashHeader title="Dashboard"/>
        <div className="flex-1 p-7">
          <div className="mb-7">
            <h2 className="text-xl font-extrabold mb-0.5" style={{ color: P.ink }}>Good morning, Aaron 👋</h2>
            <p className="text-sm" style={{ color: P.stone }}>Here's what's happening with your job search.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
            <StatCard label="Applied Jobs"    value="12" sub="3 under review"  icon={Briefcase} color={P.emerald}/>
            <StatCard label="Booked Shifts"   value="5"  sub="2 upcoming"      icon={Calendar}  color={P.info}/>
            <StatCard label="Saved Jobs"      value="28" sub="6 new matches"   icon={Heart}     color={P.warning}/>
            <StatCard label="Upcoming Shifts" value="2"  sub="Next: Tomorrow"  icon={Clock}     color={P.recruiter}/>
          </div>
          {/* Upcoming shift */}
          <div className="mb-7">
            <h3 className="text-sm font-bold mb-3" style={{ color: P.ink }}>Upcoming Shift</h3>
            <div className="bg-white rounded-xl border p-5 flex flex-col md:flex-row gap-4 items-start md:items-center" style={{ borderColor: P.border }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shrink-0" style={{ background: P.emerald }}>UC</div>
              <div className="flex-1 min-w-0">
                <div className="font-bold" style={{ color: P.ink }}>Restaurant Helper</div>
                <div className="text-xs flex items-center gap-1 mt-0.5"><Shield size={9} style={{ color: P.emerald }}/><span style={{ color: P.stone }}>Urban Café</span></div>
                <div className="flex flex-wrap gap-3 mt-2">
                  {["Tomorrow, Jul 4","6:00–10:00 PM (4 hrs)","1.8 km · Koramangala"].map((t, i) => (
                    <span key={i} className="text-[11px] flex items-center gap-1" style={{ color: P.stone }}>
                      {[<Calendar size={10}/>, <Clock size={10}/>, <MapPin size={10}/>][i]}{t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="px-4 py-2 rounded-lg text-xs font-semibold border hover:bg-[#F6FAF8] transition-colors" style={{ borderColor: P.border, color: P.ink }}>Directions</button>
                <button className="px-4 py-2 rounded-lg text-xs font-semibold text-white hover:opacity-90" style={{ background: P.emerald }}>Details</button>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-7">
            <div className="lg:col-span-2 flex flex-col gap-7">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold" style={{ color: P.ink }}>Recommended Jobs</h3>
                  <button className="text-xs font-semibold hover:opacity-75" style={{ color: P.emerald }}>View all</button>
                </div>
                <div className="flex flex-col gap-3">{recJobs.map((j, i) => <JobCard key={i} job={j}/>)}</div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold" style={{ color: P.ink }}>Nearby Shifts</h3>
                  <button className="text-xs font-semibold hover:opacity-75" style={{ color: P.emerald }}>View all</button>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">{nearbyShifts.map((s, i) => <ShiftCard key={i} shift={s}/>)}</div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-3" style={{ color: P.ink }}>Recent Activity</h3>
              <div className="bg-white rounded-xl border p-4 flex flex-col" style={{ borderColor: P.border }}>
                {activity.map(({ text, time, icon: Icon }, i) => (
                  <div key={i} className={`flex gap-3 py-3.5 ${i < activity.length - 1 ? "border-b" : ""}`} style={{ borderColor: P.border }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: P.emeraldBg }}>
                      <Icon size={11} style={{ color: P.emerald }}/>
                    </div>
                    <div>
                      <p className="text-[11px] leading-relaxed" style={{ color: P.ink }}>{text}</p>
                      <span className="text-[10px] block mt-0.5" style={{ color: P.stone }}>{time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Recruiter Dashboard ──────────────────────────────────────────────────────
function RecruiterDashboard({ onNav }: { onNav: (p: Page) => void }) {
  const applicants = [
    { name: "Riya Sharma",  role: "Restaurant Helper",    skills: ["Service","POS","English"],             rating: 4, time: "1h ago",   avatar: "RS" },
    { name: "Kiran Patel",  role: "Barista",              skills: ["Coffee","Latte Art","Customer Care"],  rating: 5, time: "3h ago",   avatar: "KP" },
    { name: "Ananya Nair",  role: "Event Support Staff",  skills: ["Coordination","Setup","Team player"],  rating: 4, time: "Yesterday",avatar: "AN" },
  ];
  const upcomingShifts = [
    { title: "Restaurant Helper", date: "Jul 4", time: "6–10 PM", required: 3, confirmed: 2 },
    { title: "Morning Barista",   date: "Jul 5", time: "7–11 AM", required: 2, confirmed: 2 },
    { title: "Event Crew",        date: "Jul 6", time: "2–8 PM",  required: 5, confirmed: 3 },
  ];
  const activePosts = [
    { title: "Restaurant Helper",    apps: 14, views: 128, status: "Active", posted: "2d ago" },
    { title: "Retail Sales Asst",    apps: 8,  views: 74,  status: "Active", posted: "4d ago" },
    { title: "Office Admin Support", apps: 3,  views: 31,  status: "Draft",  posted: "1d ago" },
  ];

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: "'Manrope', sans-serif", background: P.bg }}>
      <Sidebar type="recruiter" active="dashboard" onNav={onNav}/>
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashHeader title="Dashboard" isRecruiter/>
        <div className="flex-1 p-7">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-7">
            <div>
              <h2 className="text-xl font-extrabold mb-0.5" style={{ color: P.ink }}>Good morning, Sarah 👋</h2>
              <p className="text-sm" style={{ color: P.stone }}>Here's what's happening with your hiring.</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg text-xs font-semibold border hover:bg-[#F6FAF8] transition-colors" style={{ borderColor: P.border, color: P.ink }}>Post a Job</button>
              <button className="px-4 py-2 rounded-lg text-xs font-semibold text-white hover:opacity-90 transition-all" style={{ background: P.recruiter }}>Create a Shift</button>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
            <StatCard label="Active Jobs"     value="3"  sub="1 draft"        icon={Briefcase}    color={P.recruiter}/>
            <StatCard label="Active Shifts"   value="5"  sub="2 filling fast" icon={Calendar}     color={P.emerald}/>
            <StatCard label="New Applicants"  value="25" sub="12 unreviewed"  icon={Users}        color={P.warning}/>
            <StatCard label="Workers Booked"  value="18" sub="This month"     icon={TrendingUp}   color={P.success}/>
          </div>
          <div className="grid lg:grid-cols-3 gap-7">
            <div className="lg:col-span-2 flex flex-col gap-7">
              {/* Applicants */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold" style={{ color: P.ink }}>Recent Applicants</h3>
                  <button className="text-xs font-semibold hover:opacity-75" style={{ color: P.recruiter }}>View all</button>
                </div>
                <div className="flex flex-col gap-3">
                  {applicants.map(({ name, role, skills, rating, time, avatar }) => (
                    <div key={name} className="bg-white rounded-xl border p-4 flex gap-3 items-start hover:shadow-sm transition-all" style={{ borderColor: P.border }}>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ background: P.recruiter }}>{avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div>
                            <div className="font-semibold text-xs" style={{ color: P.ink }}>{name}</div>
                            <div className="text-[10px]" style={{ color: P.stone }}>Applied for {role}</div>
                          </div>
                          <span className="text-[10px] shrink-0" style={{ color: P.stone }}>{time}</span>
                        </div>
                        <StarRow n={rating}/>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {skills.map(s => <Badge key={s} variant="teal">{s}</Badge>)}
                        </div>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        <button className="px-2.5 py-1.5 rounded-lg text-[10px] font-semibold border hover:bg-[#F6FAF8] transition-colors" style={{ borderColor: P.border, color: P.ink }}>Profile</button>
                        <button className="px-2.5 py-1.5 rounded-lg text-[10px] font-semibold text-white hover:opacity-90" style={{ background: P.recruiter }}>Shortlist</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Active posts */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold" style={{ color: P.ink }}>Active Job Posts</h3>
                  <button className="text-xs font-semibold hover:opacity-75" style={{ color: P.recruiter }}>View all</button>
                </div>
                <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: P.border }}>
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b" style={{ borderColor: P.border, background: P.bg }}>
                        {["Job Title","Apps","Views","Status","Posted"].map(h => (
                          <th key={h} className="text-left py-2.5 px-4 text-[9px] font-bold uppercase tracking-wide" style={{ color: P.stone }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {activePosts.map(({ title, apps, views, status, posted }) => (
                        <tr key={title} className="border-b last:border-0 hover:bg-[#FAFAF8] transition-colors" style={{ borderColor: P.border }}>
                          <td className="py-3 px-4 font-semibold" style={{ color: P.ink }}>{title}</td>
                          <td className="py-3 px-4" style={{ color: P.stone }}>{apps}</td>
                          <td className="py-3 px-4" style={{ color: P.stone }}>{views}</td>
                          <td className="py-3 px-4"><Badge variant={status === "Active" ? "emerald" : "stone"}>{status}</Badge></td>
                          <td className="py-3 px-4" style={{ color: P.stone }}>{posted}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Upcoming shifts */}
            <div>
              <h3 className="text-sm font-bold mb-3" style={{ color: P.ink }}>Upcoming Shifts</h3>
              <div className="flex flex-col gap-3">
                {upcomingShifts.map(({ title, date, time, required, confirmed }) => (
                  <div key={title} className="bg-white rounded-xl border p-4 flex flex-col gap-3" style={{ borderColor: P.border }}>
                    <div>
                      <div className="font-semibold text-xs" style={{ color: P.ink }}>{title}</div>
                      <div className="text-[10px] mt-0.5" style={{ color: P.stone }}>{date} · {time}</div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] mb-1.5">
                        <span style={{ color: P.stone }}>Workers confirmed</span>
                        <span className="font-bold" style={{ color: confirmed === required ? P.emerald : P.warning }}>{confirmed}/{required}</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: P.border }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${(confirmed/required)*100}%`, background: confirmed === required ? P.emerald : P.warning }}/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const nav = useCallback((p: Page) => {
    setPage(p);
    if (!["seeker-dashboard","recruiter-dashboard"].includes(p)) window.scrollTo({ top: 0 });
  }, []);

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif" }}>
      {page === "landing" && <><Navbar onNav={nav}/><LandingPage onNav={nav}/></>}
      {page === "login"             && <LoginPage         onNav={nav}/>}
      {page === "signup-role"       && <SignupRolePage     onNav={nav}/>}
      {page === "seeker-register"   && <RegisterPage       onNav={nav} type="seeker"/>}
      {page === "recruiter-register"&& <RegisterPage       onNav={nav} type="recruiter"/>}
      {page === "seeker-otp"        && <OtpPage            onNav={nav} type="seeker"/>}
      {page === "recruiter-otp"     && <OtpPage            onNav={nav} type="recruiter"/>}
      {page === "seeker-dashboard"  && <SeekerDashboard    onNav={nav}/>}
      {page === "recruiter-dashboard"&&<RecruiterDashboard onNav={nav}/>}
    </div>
  );
}
