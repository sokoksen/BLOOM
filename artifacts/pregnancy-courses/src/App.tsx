import { useEffect, useState } from 'react';
import { Link, Route, Switch, useLocation } from 'wouter';
import {
  ArrowRight, ArrowUpRight, Baby, BookOpen, Brain, CalendarDays, Check,
  Dumbbell, FileText, Heart, HelpCircle, LogOut, Menu, MessageCircle, Moon,
  Play, Settings, ShoppingBasket, Sparkles, Stethoscope, UserRound, Users, X,
} from 'lucide-react';

type TierId = 'silver' | 'gold' | 'platinum';
type Course = {
  id: string; title: string; label: string; number: string; headline: string;
  summary: string; detail: string; modules: string[];
};
const courses: Course[] = [
  {
    id: 'planning', title: 'Plan', label: 'Before the positive test', number: '01 / BEGIN HERE',
    headline: 'A softer start to trying',
    summary: 'Thoughtful, evidence-aware guidance for the months before pregnancy—so you can make sense of the basics without turning your life into a checklist.',
    detail: 'Trying to conceive can hold a lot at once: hope, questions, and the sense that you should already know what to do. This course helps you build a calm foundation, with practical steps you can take and permission to leave the rest for later.',
    modules: ['Understanding your cycle and fertile window', 'Everyday nutrition, movement, and supplements', 'Making sense of appointments and common tests', 'Talking together about timing, feelings, and support'],
  },
  {
    id: 'pregnancy', title: 'Pregnancy', label: 'From first weeks to birth', number: '02 / GROWING',
    headline: 'Your pregnancy, one step at a time',
    summary: 'A steady companion for the changes ahead: what may be happening, what can help, and how to find your footing through each trimester.',
    detail: 'No two pregnancies feel the same. Get clear, compassionate explanations of body changes, appointments, and birth choices—without the pressure to feel a certain way or follow a perfect plan.',
    modules: ['What to expect across the three trimesters', 'Common symptoms and gentle ways to feel better', 'Appointments, screening, and questions to ask', 'Building a birth preferences plan that can flex'],
  },
  {
    id: 'postpartum', title: 'Postpartum', label: 'The first weeks together', number: '03 / NEW RHYTHMS',
    headline: 'Care for the person becoming a parent',
    summary: 'Realistic support for recovery, feeding, sleep, and the big feelings of early parenthood—designed for the days when your hands are full.',
    detail: 'The early weeks are tender and unpredictable. This course helps you prepare for recovery and feeding, understand when to ask for help, and shape a circle of care around the whole family.',
    modules: ['Physical recovery and signs that deserve attention', 'Feeding support without judgement or assumptions', 'Newborn sleep, soothing, and realistic expectations', 'Emotional wellbeing and finding your support people'],
  },
];
const tiers: { id: TierId; name: string; price: string }[] = [
  { id: 'silver', name: 'Silver', price: '€5' },
  { id: 'gold', name: 'Gold', price: '€10' },
  { id: 'platinum', name: 'Platinum', price: '€20' },
];

function DetailDialog({ course, close }: { course: Course; close: () => void }) {
  useEffect(() => {
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); };
    document.addEventListener('keydown', key);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', key); document.body.style.overflow = ''; };
  }, [close]);
  return <div className="dialog-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
    <section className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <button className="dialog-close" type="button" aria-label="Close course details" data-testid="button-close-course-details" onClick={close}><X size={19}/></button>
      <span className="course-number">{course.number}</span>
      <h2 id="dialog-title">{course.title}</h2>
      <p>{course.detail}</p>
      <h3>Inside this course</h3>
      <ul>{course.modules.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  </div>;
}

function Home() {
  const [, navigate] = useLocation();
  const [dialog, setDialog] = useState<Course | null>(null);
  return <main className="home-shell">
    <header className="home-header"><div className="reserved-logo" aria-label="Logo area reserved" data-testid="logo-reserved"/></header>
    <section className="course-section" aria-labelledby="course-heading">
      <div className="section-inner">
        <h1 id="course-heading" className="sr-only">Courses</h1>
        <div className="course-cards" aria-label="Courses">
          {courses.map((course) => <article className={`course-card course-card-${course.id}`} key={course.id} data-testid={`card-course-${course.id}`}>
            <h2 data-testid={`text-course-title-${course.id}`}>{course.title}</h2>
            <div className="course-art" aria-hidden="true"><span className="art-orbit"/><span className="art-shape"/><span className="art-dot"/></div>
            <p>{course.summary}</p>
            <button type="button" className="learn-button" data-testid={`button-learn-${course.id}`}
              onClick={() => course.id === 'postpartum' ? navigate('/postpartum') : setDialog(course)}>
              Learn more <ArrowUpRight size={17}/>
            </button>
          </article>)}
        </div>
      </div>
    </section>
    {dialog && <DetailDialog course={dialog} close={() => setDialog(null)} />}
  </main>;
}

const navItems = [
  { label: 'Profile', icon: UserRound },
  { label: 'Community', icon: Users },
  { label: 'Post-partum', icon: Heart, active: true },
  { label: 'Plans', icon: FileText },
  { label: 'Settings', icon: Settings },
  { label: 'Help & Support', icon: HelpCircle },
];
const events = [
  { day: 17, time: '10:00–11:00', title: 'Postpartum Yoga', place: 'Tallinn', image: 'yoga' },
  { day: 20, time: '11:00–13:00', title: 'Moms Coffee Meetup', place: 'Tallinn', image: 'coffee' },
  { day: 24, time: '10:00–12:00', title: 'Stroller Walk', place: 'Kadriorg Park', image: 'walk' },
  { day: 28, time: '19:00–20:00', title: 'Expert Webinar: Postpartum Recovery', place: 'Online', image: 'webinar' },
];
const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const calendarCells = [28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1];

const tierDetails: Record<TierId, string[]> = {
  silver: ['50 videos with experts', 'Checklists', 'Event calendar · events at additional prices'],
  gold: ['50 videos with experts', 'Checklists', 'Event calendar', 'Nutrition package: guides, articles, and checklists', '1 free event of your choice'],
  platinum: ['50 videos with experts', 'Checklists', 'Event calendar', 'Nutrition package: guides, articles, and checklists', '2 free events', '1 personal training session', '1 session with a psychologist or nutritionist'],
};
function Tile({ icon: Icon, title, subtitle, locked = false, note }: { icon: typeof Baby; title: string; subtitle?: string; locked?: boolean; note?: string }) {
  return <div className={`dashboard-tile ${locked ? 'tile-locked' : ''}`} aria-disabled={locked} data-testid={`tile-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
    <Icon className="tile-icon" strokeWidth={1.45}/>
    <span className="tile-copy">{title}{subtitle && <small>{subtitle}</small>}{note && <small className="tile-note">{note}</small>}</span>
    <ArrowRight className="tile-arrow" size={17}/>
  </div>;
}
function Dashboard() {
  const [mobileNav, setMobileNav] = useState(false);
  const [mode, setMode] = useState<'W' | 'M'>('W');
  const [monthOffset, setMonthOffset] = useState(0);
  const [tier, setTier] = useState<TierId>('silver');
  const date = new Date(2026, 9 + monthOffset, 1);
  const month = date.toLocaleString('en', { month: 'long' });
  const year = date.getFullYear();
  const visibleCells = monthOffset === 0 ? calendarCells : buildCalendar(date.getFullYear(), date.getMonth());
  return <main className="dashboard">
    <button className="mobile-menu" type="button" aria-label="Toggle navigation" aria-expanded={mobileNav} data-testid="button-toggle-navigation" onClick={() => setMobileNav(!mobileNav)}><Menu/></button>
    <aside className={`side-nav ${mobileNav ? 'side-nav-open' : ''}`}>
      <div className="logo-box" aria-label="Logo area reserved" data-testid="logo-reserved"/><button className="side-close" aria-label="Close navigation" data-testid="button-close-navigation" onClick={() => setMobileNav(false)}><X size={17}/></button>
      <nav>{navItems.map(({ label, icon: Icon, active: isActive }) => <div key={label} className={`nav-item ${isActive ? 'nav-active' : ''}`}><Icon size={20} strokeWidth={1.6}/><span>{label}</span></div>)}</nav>
      <div className="nav-rule"/><div className="nav-item"><LogOut size={20} strokeWidth={1.6}/><span>Log out</span></div>
    </aside>
    <section className="dashboard-main">
      <header className="dashboard-top">
        <div className="mode-switch" role="group" aria-label="W/M toggle">
          {(['W', 'M'] as const).map((m) => <button type="button" key={m} data-testid={`button-calendar-mode-${m.toLowerCase()}`} aria-pressed={mode === m} onClick={() => setMode(m)}>{m}</button>)}
        </div>
        <div className="account-actions"><span className="basket" aria-label="Cart"><ShoppingBasket size={25}/><span>1</span></span><span className="signin">Sign in</span></div>
      </header>
      <div className="dashboard-layout">
        <div className="dashboard-content">
          <h1 className="dashboard-title"><span className="mother-icon"><Baby size={42} strokeWidth={1.3}/></span>Post-partum</h1>
          <SectionTitle icon={Play} title="Videos with the experts"/>
          <div className="tile-grid two" data-testid="group-videos">
            <Tile icon={Stethoscope} title="Gynecologist:" subtitle="Postpartum Recovery"/>
            <Tile icon={Brain} title="Psychologist:" subtitle="Emotions and Mental Health"/>
            <Tile icon={Brain} title="Neurologist:" subtitle="Sleep and Nervous System"/>
            <Tile icon={Heart} title="Pelvic Floor Specialist:" subtitle="Body Recovery"/>
          </div>
          <SectionTitle icon={Dumbbell} title="Sport and Nutrition"/>
          <div className={`tile-grid two access-group ${tier === 'silver' ? 'access-locked' : ''}`} aria-disabled={tier === 'silver'} data-testid="group-sport-nutrition"><Tile icon={Dumbbell} title="Physical Training" locked={tier === 'silver'} note={tier === 'silver' ? 'Available with Gold' : undefined}/><Tile icon={Sparkles} title="Nutrition" locked={tier === 'silver'} note={tier === 'silver' ? 'Available with Gold' : undefined}/></div>
          <SectionTitle icon={UserRound} title="Book a Session"/>
          <div className={`tile-grid three access-group ${tier !== 'platinum' ? 'access-locked' : ''}`} aria-disabled={tier !== 'platinum'} data-testid="group-book-session">
            <Tile icon={Dumbbell} title="Personal Trainer" locked={tier !== 'platinum'} note={tier !== 'platinum' ? 'Available with Platinum' : undefined}/>
            <Tile icon={Heart} title="Nutritionist" locked={tier !== 'platinum'} note={tier !== 'platinum' ? 'Available with Platinum' : undefined}/>
            <Tile icon={Brain} title="Psychologist" locked={tier !== 'platinum'} note={tier !== 'platinum' ? 'Available with Platinum' : undefined}/>
          </div>
          <SectionTitle icon={Play} title="Webinars"/>
          <div className={`tile-grid two access-group ${tier === 'silver' ? 'access-locked' : ''}`} aria-disabled={tier === 'silver'} data-testid="group-webinars">
            <Tile icon={Baby} title="Baby Care Basics"/>
            <Tile icon={Heart} title="Returning to Yourself"/>
          </div>
          <SectionTitle icon={FileText} title="Checklists"/>
          <div className="checklist-grid" data-testid="section-checklists">
            {['Vaccination calendar', 'Breastfeeding', 'First-Year Essentials'].map((item) => <div className="checklist-item" key={item} data-testid={`checklist-${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}><span><Check size={15}/></span>{item}</div>)}
          </div>
        </div>
        <aside className="events-card" data-testid="section-events">
          <div className="events-heading"><h2><CalendarDays size={22}/>Events</h2><span className="event-access">{tier === 'silver' ? 'Additional price' : tier === 'gold' ? '1 free event' : '2 free events'} <ArrowRight size={15}/></span></div>
          <div className="calendar-month"><button aria-label="Previous month" data-testid="button-previous-month" onClick={() => setMonthOffset(monthOffset - 1)}>‹</button><strong data-testid="text-calendar-month">{month} {year}</strong><button aria-label="Next month" data-testid="button-next-month" onClick={() => setMonthOffset(monthOffset + 1)}>›</button></div>
          <div className="calendar-grid">
            {weekdays.map((day) => <span className="weekday" key={day}>{day}</span>)}
            {visibleCells.map((day, index) => <span key={`${index}-${day}`} className={`date-cell ${monthOffset === 0 && (day === 17 || day === 20) ? 'date-highlight' : ''} ${monthOffset === 0 && index < 3 || monthOffset === 0 && index === 34 ? 'date-outside' : ''}`}>{day}</span>)}
          </div>
          <div className="event-list">{events.map((event) => <article className="event-row" key={event.day}>
            <div className={`event-thumb thumb-${event.image}`} aria-hidden="true">{event.image === 'yoga' ? <Moon/> : event.image === 'coffee' ? <MessageCircle/> : event.image === 'walk' ? <Baby/> : <BookOpen/>}</div>
            <div className="event-copy"><span>{event.day} Oct 2026&nbsp; {event.time}</span><strong>{event.title}</strong><small>{event.place === 'Online' ? <><Play size={13}/> Online</> : <><span className="pin">⌖</span> {event.place}</>}</small></div>
            <ArrowRight className="event-arrow" size={16}/>
          </article>)}</div>
        </aside>
      </div>
      <section className="plan-panel" aria-labelledby="plan-heading" data-testid="section-subscription-plans">
        <div className="plan-heading"><div><span className="eyebrow">Choose your level of support</span><h2 id="plan-heading">Your membership</h2></div><span className="plan-caption">Monthly · change anytime</span></div>
        <div className="plan-grid" role="group" aria-label="Subscription plans">
          {tiers.map((item) => <button type="button" key={item.id} className={`plan-card plan-${item.id}`} data-testid={`button-tier-${item.id}`}
            aria-pressed={tier === item.id} onClick={() => setTier(item.id)}>
            <span className="plan-card-head"><span className="plan-name">{item.name}</span><span className="plan-price">{item.price}<small> / month</small></span></span>
            <span className="plan-includes">{tierDetails[item.id].map((feature) => <span key={feature}><Check size={14}/>{feature}</span>)}</span>
            <span className="plan-select">{tier === item.id ? 'Selected plan' : 'Select plan'}</span>
          </button>)}
        </div>
      </section>
    </section>
  </main>;
}
function SectionTitle({ icon: Icon, title }: { icon: typeof Play; title: string }) {
  return <div className="section-title" data-testid={`heading-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}><Icon size={23} strokeWidth={1.7}/><h2>{title}</h2><span/></div>;
}
function buildCalendar(year: number, month: number) {
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const count = new Date(year, month + 1, 0).getDate();
  const prevCount = new Date(year, month, 0).getDate();
  return Array.from({ length: 35 }, (_, i) => i < firstDay ? prevCount - firstDay + i + 1 : i - firstDay >= count ? i - firstDay - count + 1 : i - firstDay + 1);
}
function NotFound() { return <main className="not-found"><Link href="/">Support for your season.</Link></main>; }
export default function App() {
  return <Switch><Route path="/" component={Home}/><Route path="/postpartum" component={Dashboard}/><Route component={NotFound}/></Switch>;
}
