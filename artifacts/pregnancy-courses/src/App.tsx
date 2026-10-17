import { useEffect, useState } from 'react';
import { Link, Route, Switch, useLocation } from 'wouter';
import {
  ArrowRight, ArrowUpRight, Baby, BookOpen, Brain, CalendarDays,
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
    id: 'planning', title: 'Planning', label: 'Before the positive test', number: '01 / BEGIN HERE',
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
      <button className="dialog-close" type="button" aria-label="Close course details" onClick={close}><X size={19}/></button>
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
  const [active, setActive] = useState<Course | null>(courses[1]);
  const [selectedTiers, setSelectedTiers] = useState<Record<string, TierId>>({
    planning: 'silver', pregnancy: 'silver', postpartum: 'silver',
  });
  const [dialog, setDialog] = useState<Course | null>(null);
  const chosenTier = active ? selectedTiers[active.id] : null;
  return <main className="home-shell">
    <section className="course-section" aria-labelledby="course-heading">
      <div className="section-inner">
        <h1 id="course-heading">Support for your season.</h1>
        <div className="discovery">
          <nav className="course-list" aria-label="Choose a course">
            {courses.map((course) => <button key={course.id} type="button" className="course-tab"
              aria-expanded={active?.id === course.id} aria-controls="course-details"
              onClick={() => setActive(active?.id === course.id ? null : course)}>
              <span><span className="tab-title">{course.title}</span><span className="tab-kicker">{course.label}</span></span>
              <span className="tab-arrow" aria-hidden="true">{active?.id === course.id ? '−' : '›'}</span>
            </button>)}
          </nav>
          <div id="course-details" className="course-content" aria-live="polite">
            {active && <div className="details-pane" key={active.id}>
              <h2>{active.headline}</h2>
              <p className="detail-summary">{active.summary}</p>
              <button type="button" className="text-link" onClick={() => setDialog(active)}>Explore this course <ArrowUpRight size={14}/></button>
              <div className="tier-grid" role="group" aria-label={`${active.title} tiers`}>
                {tiers.map((tier) => <button key={tier.id} type="button" className={`tier-card tier-${tier.id}`}
                  aria-pressed={selectedTiers[active.id] === tier.id}
                  onClick={() => setSelectedTiers((prev) => ({ ...prev, [active.id]: tier.id }))}>
                  <span className="tier-name">{tier.name}</span>
                  <span className="tier-price">{tier.price}<span className="tier-unit"> / month</span></span>
                </button>)}
              </div>
              <button type="button" className="move-button"
                disabled={active.id !== 'postpartum' || chosenTier !== 'platinum'}
                onClick={() => navigate('/postpartum')}>Move to course content</button>
            </div>}
          </div>
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

function Tile({ icon: Icon, title, subtitle }: { icon: typeof Baby; title: string; subtitle?: string }) {
  return <div className="dashboard-tile">
    <Icon className="tile-icon" strokeWidth={1.45}/>
    <span className="tile-copy">{title}{subtitle && <small>{subtitle}</small>}</span>
    <ArrowRight className="tile-arrow" size={17}/>
  </div>;
}
function Dashboard() {
  const [mobileNav, setMobileNav] = useState(false);
  const [mode, setMode] = useState<'W' | 'M'>('W');
  const [monthOffset, setMonthOffset] = useState(0);
  const date = new Date(2026, 9 + monthOffset, 1);
  const month = date.toLocaleString('en', { month: 'long' });
  const year = date.getFullYear();
  const visibleCells = monthOffset === 0 ? calendarCells : buildCalendar(date.getFullYear(), date.getMonth());
  return <main className="dashboard">
    <button className="mobile-menu" type="button" aria-label="Toggle navigation" aria-expanded={mobileNav} onClick={() => setMobileNav(!mobileNav)}><Menu/></button>
    <aside className={`side-nav ${mobileNav ? 'side-nav-open' : ''}`}>
      <div className="logo-box">LOGO</div><button className="side-close" aria-label="Close navigation" onClick={() => setMobileNav(false)}><X size={17}/></button>
      <nav>{navItems.map(({ label, icon: Icon, active: isActive }) => <div key={label} className={`nav-item ${isActive ? 'nav-active' : ''}`}><Icon size={20} strokeWidth={1.6}/><span>{label}</span></div>)}</nav>
      <div className="nav-rule"/><div className="nav-item"><LogOut size={20} strokeWidth={1.6}/><span>Log out</span></div>
    </aside>
    <section className="dashboard-main">
      <header className="dashboard-top">
        <div className="mode-switch" role="group" aria-label="W/M toggle">
          {(['W', 'M'] as const).map((m) => <button type="button" key={m} aria-pressed={mode === m} onClick={() => setMode(m)}>{m}</button>)}
        </div>
        <div className="account-actions"><span className="basket" aria-label="Cart"><ShoppingBasket size={25}/><span>1</span></span><span className="signin">Sign in</span></div>
      </header>
      <div className="dashboard-layout">
        <div className="dashboard-content">
          <h1 className="dashboard-title"><span className="mother-icon"><Baby size={42} strokeWidth={1.3}/></span>Post-partum</h1>
          <SectionTitle icon={Play} title="Videos with the experts"/>
          <div className="tile-grid two">
            <Tile icon={Stethoscope} title="Gynecologist:" subtitle="Postpartum Recovery"/>
            <Tile icon={Brain} title="Psychologist:" subtitle="Emotions and Mental Health"/>
            <Tile icon={Brain} title="Neurologist:" subtitle="Sleep and Nervous System"/>
            <Tile icon={Heart} title="Pelvic Floor Specialist:" subtitle="Body Recovery"/>
          </div>
          <SectionTitle icon={Dumbbell} title="Sport and Nutrition"/>
          <div className="tile-grid two"><Tile icon={Dumbbell} title="Physical Training"/><Tile icon={Sparkles} title="Meditation"/></div>
          <SectionTitle icon={UserRound} title="Book a Session"/>
          <div className="tile-grid three">
            <Tile icon={Dumbbell} title="Personal Trainer"/>
            <Tile icon={Heart} title="Nutritionist"/>
            <Tile icon={Sparkles} title="Astrologer"/>
          </div>
          <SectionTitle icon={Play} title="Webinars"/>
          <div className="tile-grid two">
            <Tile icon={Baby} title="Baby Care Basics"/>
            <Tile icon={Heart} title="Returning to Yourself"/>
          </div>
        </div>
        <aside className="events-card">
          <div className="events-heading"><h2><CalendarDays size={22}/>Events</h2><span>See all <ArrowRight size={15}/></span></div>
          <div className="calendar-month"><button aria-label="Previous month" onClick={() => setMonthOffset(monthOffset - 1)}>‹</button><strong>{month} {year}</strong><button aria-label="Next month" onClick={() => setMonthOffset(monthOffset + 1)}>›</button></div>
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
    </section>
  </main>;
}
function SectionTitle({ icon: Icon, title }: { icon: typeof Play; title: string }) {
  return <div className="section-title"><Icon size={23} strokeWidth={1.7}/><h2>{title}</h2><span/></div>;
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
