import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';

type TierId = 'solo' | 'guided' | 'total';
type Course = {
  id: string;
  title: string;
  label: string;
  number: string;
  headline: string;
  summary: string;
  duration: string;
  modules: string[];
  detail: string;
  focus: string;
};

const courses: Course[] = [
  {
    id: 'planning',
    title: 'Planning',
    label: 'Before the positive test',
    number: '01 / BEGIN HERE',
    headline: 'A softer start to trying',
    summary:
      'Thoughtful, evidence-aware guidance for the months before pregnancy—so you can make sense of the basics without turning your life into a checklist.',
    duration: '6 short chapters · learn at your pace',
    focus: 'Prepare with less pressure',
    detail:
      'Trying to conceive can hold a lot at once: hope, questions, and the sense that you should already know what to do. This course helps you build a calm foundation, with practical steps you can take and permission to leave the rest for later.',
    modules: [
      'Understanding your cycle and fertile window',
      'Everyday nutrition, movement, and supplements',
      'Making sense of appointments and common tests',
      'Talking together about timing, feelings, and support',
    ],
  },
  {
    id: 'pregnancy',
    title: 'Pregnancy',
    label: 'From first weeks to birth',
    number: '02 / GROWING',
    headline: 'Your pregnancy, one step at a time',
    summary:
      'A steady companion for the changes ahead: what may be happening, what can help, and how to find your footing through each trimester.',
    duration: '12 weekly chapters · revisit anytime',
    focus: 'Feel more at home in change',
    detail:
      'No two pregnancies feel the same. Get clear, compassionate explanations of body changes, appointments, and birth choices—without the pressure to feel a certain way or follow a perfect plan.',
    modules: [
      'What to expect across the three trimesters',
      'Common symptoms and gentle ways to feel better',
      'Appointments, screening, and questions to ask',
      'Building a birth preferences plan that can flex',
    ],
  },
  {
    id: 'postpartum',
    title: 'Postpartum',
    label: 'The first weeks together',
    number: '03 / NEW RHYTHMS',
    headline: 'Care for the person becoming a parent',
    summary:
      'Realistic support for recovery, feeding, sleep, and the big feelings of early parenthood—designed for the days when your hands are full.',
    duration: '8 bite-size chapters · always here',
    focus: 'Make room for your recovery',
    detail:
      'The early weeks are tender and unpredictable. This course helps you prepare for recovery and feeding, understand when to ask for help, and shape a circle of care around the whole family.',
    modules: [
      'Physical recovery and signs that deserve attention',
      'Feeding support without judgement or assumptions',
      'Newborn sleep, soothing, and realistic expectations',
      'Emotional wellbeing and finding your support people',
    ],
  },
];

const tiers: { id: TierId; name: string; price: string; description: string }[] = [
  { id: 'solo', name: 'Solo', price: '€5', description: 'The complete self-paced course' },
  { id: 'guided', name: 'Guided', price: '€10', description: 'Course plus gentle weekly prompts' },
  { id: 'total', name: 'Total Care', price: '€20', description: 'Course, prompts, and personal support' },
];

function BrandMark() {
  return (
    <a href="#top" className="brand" aria-label="Kindred, back to top" data-testid="link-brand">
      <span className="brand-mark" aria-hidden="true" />
      <span>kindred</span>
    </a>
  );
}

function CourseDetailDialog({
  course,
  onClose,
}: {
  course: Course;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="dialog-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      data-testid={`dialog-backdrop-${course.id}`}
    >
      <section
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        data-testid={`dialog-course-${course.id}`}
      >
        <button
          type="button"
          className="dialog-close"
          aria-label="Close course details"
          onClick={onClose}
          data-testid="button-close-details"
        >
          <X size={19} strokeWidth={1.7} />
        </button>
        <div className="eyebrow">{course.number}</div>
        <h2 id="dialog-title">{course.title}, with room to be human</h2>
        <p className="dialog-lead">{course.detail}</p>
        <h4>Inside this course</h4>
        <ul className="dialog-list">
          {course.modules.map((module) => <li key={module}>{module}</li>)}
        </ul>
        <div className="dialog-bottom">
          Choose the level of support that feels right for you. The prices shown are sample
          subscription tiers for this demo; nothing is purchased here. Course content is
          educational and does not replace care from your midwife or doctor.
        </div>
      </section>
    </div>
  );
}

function CoursePanel({
  course,
  selectedTier,
  onTier,
  onDetails,
}: {
  course: Course;
  selectedTier: TierId;
  onTier: (tier: TierId) => void;
  onDetails: () => void;
}) {
  return (
    <div className="details-pane" key={course.id} data-testid={`panel-course-${course.id}`}>
      <div className="detail-topline">
        <span className="course-number">{course.number}</span>
        <span className="format-note">Made for real life</span>
      </div>
      <h3>{course.headline}</h3>
      <p className="detail-summary">{course.summary}</p>
      <div className="detail-actions">
        <button type="button" className="text-link" onClick={onDetails} data-testid={`link-course-details-${course.id}`}>
          Explore this course <ArrowUpRight size={14} aria-hidden="true" />
        </button>
        <span className="duration">{course.duration}</span>
      </div>
      <p className="tier-label">Choose your kind of support</p>
      <div className="tier-grid" role="group" aria-label={`${course.title} subscription tiers`}>
        {tiers.map((tier) => (
          <button
            type="button"
            className="tier-card"
            key={tier.id}
            aria-pressed={selectedTier === tier.id}
            onClick={() => onTier(tier.id)}
            data-testid={`tier-${course.id}-${tier.id}`}
          >
            <span className="tier-name">{tier.name}</span>
            <span className="tier-price">{tier.price}<span className="tier-unit"> / month</span></span>
            <span className="tier-description">{tier.description}</span>
          </button>
        ))}
      </div>
      <p className="selection-note" aria-live="polite">
        {tiers.find((tier) => tier.id === selectedTier)?.name} selected for {course.title}. No payment is taken here.
      </p>
      <div className="detail-footer">
        <span><Check className="check-mark" size={15} /> Clear, bite-size learning</span>
        <span><Check className="check-mark" size={15} /> Revisit whenever you need</span>
      </div>
    </div>
  );
}

function Home() {
  const [activeCourse, setActiveCourse] = useState<string | null>('planning');
  const [selectedTiers, setSelectedTiers] = useState<Record<string, TierId>>({
    planning: 'guided',
    pregnancy: 'guided',
    postpartum: 'guided',
  });
  const [dialogCourse, setDialogCourse] = useState<Course | null>(null);
  const active = courses.find((course) => course.id === activeCourse);

  return (
    <main className="site-shell" id="top">
      <header className="topbar">
        <BrandMark />
        <span className="top-note">A little more held, every step</span>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-art" aria-hidden="true">
          <span className="art-stem" />
          <span className="art-leaf leaf-one" />
          <span className="art-leaf leaf-two" />
          <span className="art-dot" />
        </div>
        <div className="hero-copy">
          <div className="eyebrow">A kinder kind of preparation</div>
          <h1 id="hero-title">There’s no one right way <em>to begin.</em></h1>
          <p className="hero-intro">
            Wherever you are in the becoming, find clear, caring guidance for what comes next.
            No perfect plans required.
          </p>
        </div>
      </section>

      <section className="course-section" aria-labelledby="course-heading">
        <div className="section-inner">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Find your next small step</div>
              <h2 id="course-heading">Support for your season.</h2>
            </div>
            <p>Choose where you are. We’ll meet you there—with useful information and plenty of breathing room.</p>
          </div>

          <div className="discovery">
            <nav className="course-list" aria-label="Choose a course">
              <div className="list-label">Explore by season</div>
              {courses.map((course) => (
                <button
                  key={course.id}
                  type="button"
                  className="course-tab"
                  aria-expanded={activeCourse === course.id}
                  aria-controls="course-details"
                  onClick={() => setActiveCourse(activeCourse === course.id ? null : course.id)}
                  data-testid={`button-course-${course.id}`}
                >
                  <span>
                    <span className="tab-title">{course.title}</span>
                    <span className="tab-kicker">{course.label}</span>
                  </span>
                  <span className="tab-arrow" aria-hidden="true">{activeCourse === course.id ? '−' : '›'}</span>
                </button>
              ))}
            </nav>
            <div id="course-details" aria-live="polite" aria-atomic="true">
              {active ? (
                <CoursePanel
                  course={active}
                  selectedTier={selectedTiers[active.id]}
                  onTier={(tier) => setSelectedTiers((previous) => ({ ...previous, [active.id]: tier }))}
                  onDetails={() => setDialogCourse(active)}
                />
              ) : (
                <div className="details-pane empty-panel" data-testid="status-course-collapsed">
                  <div className="eyebrow">Take your time</div>
                  <h3>Start wherever you are.</h3>
                  <p className="detail-summary">Choose a season on the left to see what kind of support might feel helpful.</p>
                </div>
              )}
            </div>
          </div>

          <div className="reassurance">
            <div>
              <div className="quote-mark" aria-hidden="true">“</div>
              <p className="quote">You don’t need to have it all figured out to take one good next step.</p>
              <span className="quote-by">A note from the Kindred team</span>
            </div>
            <div className="support-copy">
              <strong>Care that makes space for you.</strong>
              Our courses are written with experienced birth and postpartum educators. They offer grounded information—not medical advice, pressure, or a promise that every journey looks the same.
            </div>
          </div>
        </div>
      </section>
      <footer className="site-footer">
        <span className="footer-brand">kindred</span>
        <span>Gentle guidance for the becoming.</span>
        <span>Educational support, not a substitute for clinical care.</span>
      </footer>
      {dialogCourse && <CourseDetailDialog course={dialogCourse} onClose={() => setDialogCourse(null)} />}
    </main>
  );
}

export default Home;
