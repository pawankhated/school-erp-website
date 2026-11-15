'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  BookOpenCheck,
  Bus,
  CalendarCheck2,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  CloudOff,
  GraduationCap,
  HeartPulse,
  IndianRupee,
  Languages,
  Library,
  Lock,
  MessagesSquare,
  Smartphone,
  Sparkles,
  UserPlus,
  Users,
  Wallet,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { rupees, useSite } from '@/lib/site';
import { CountUp, Reveal, Stagger, StaggerItem, Tilt } from './motion';
import { Button, Card, Container, Eyebrow, SectionTitle } from './ui';

// ==================================================================== hero

export function Hero() {
  const { site } = useSite();
  return (
    <section className="relative overflow-hidden">
      <div className="aurora" />
      <div className="grid-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
      <Container className="relative grid items-center gap-14 pt-14 pb-20 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
        <div>
          <Reveal>
            <Eyebrow>{site.trialDays}-day free trial · No card needed</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-[2.6rem] leading-[1.08] tracking-tight text-ink sm:text-6xl">
              The calm way to <span className="text-gradient">run your school</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Admissions, attendance, fees, exams, transport, staff and AI-powered learning in one simple app for principals, teachers, parents and
              students. Every daily task in three taps, even without internet.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/signup/">
                Start free trial <ArrowRight size={16} />
              </Button>
              <Button href="/pricing/" variant="ghost">
                See pricing
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
              {['Android, iPhone & web', 'Hindi + 21 Indian languages', 'Your data stays private'].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-sea-500" /> {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
        <HeroVisual />
      </Container>
    </section>
  );
}

function HeroVisual() {
  const days = [96, 92, 98, 94, 97];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="relative mx-auto w-full max-w-lg"
    >
      <Tilt className="relative">
        {/* Dashboard */}
        <div className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-lift backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted">Today at a glance</p>
              <p className="text-lg font-bold">Good morning, Principal</p>
            </div>
            <span className="rounded-full bg-sea-50 px-3 py-1 text-xs font-semibold text-sea-700">Live</span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { l: 'Present', v: '96%', c: 'bg-sea-50 text-sea-700' },
              { l: 'Fees today', v: '₹1.8L', c: 'bg-sky-100 text-sky-500' },
              { l: 'Buses', v: '6 / 6', c: 'bg-lilac-100 text-lilac-500' },
            ].map((k) => (
              <div key={k.l} className={`rounded-2xl p-3 ${k.c}`}>
                <p className="text-[11px] font-medium opacity-80">{k.l}</p>
                <p className="mt-1 text-lg font-bold">{k.v}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl bg-mist p-4">
            <p className="text-xs font-semibold text-muted">Attendance this week</p>
            <div className="mt-3 flex h-24 items-end gap-3">
              {days.map((d, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-lg bg-gradient-to-t from-sea-500 to-sky-300"
                  initial={{ height: 0 }}
                  animate={{ height: `${(d - 80) * 5}%` }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-muted">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>
        </div>
      </Tilt>
      {/* Phone */}
      <div className="floaty absolute -bottom-10 -left-6 w-44 rounded-[26px] border-4 border-white bg-white p-3 shadow-lift sm:-left-12">
        <p className="text-[10px] font-semibold text-muted">Class 5-A · Mark attendance</p>
        {['Aarav', 'Diya', 'Kabir', 'Meera'].map((n, i) => (
          <div key={n} className="mt-2 flex items-center justify-between rounded-xl bg-mist px-2 py-1.5">
            <span className="text-xs font-medium">{n}</span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.1 + i * 0.25, type: 'spring' }}
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${i === 2 ? 'bg-sun-100 text-amber-600' : 'bg-sea-50 text-sea-700'}`}
            >
              {i === 2 ? 'A' : 'P'}
            </motion.span>
          </div>
        ))}
      </div>
      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="floaty-slow absolute -top-6 -right-2 w-60 rounded-2xl border border-white bg-white/95 p-3 shadow-lift sm:-right-8"
      >
        <div className="flex gap-2.5">
          <span className="rounded-xl bg-sky-100 p-2 text-sky-500">
            <Bell size={16} />
          </span>
          <div>
            <p className="text-xs font-semibold">Bus 2 is 5 minutes away</p>
            <p className="text-[11px] text-muted">Diya&apos;s stop: Kothrud Depot</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute -right-3 -bottom-14 w-56 rounded-2xl border border-white bg-white/95 p-3 shadow-lift sm:-right-6"
      >
        <div className="flex gap-2.5">
          <span className="rounded-xl bg-lilac-100 p-2 text-lilac-500">
            <Sparkles size={16} />
          </span>
          <div>
            <p className="text-xs font-semibold">New chapter to learn</p>
            <p className="text-[11px] text-muted">&ldquo;Super Senses&rdquo; in Hindi, with a quick check</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ==================================================================== boards marquee

export function Boards() {
  const items = ['CBSE', 'ICSE', 'State boards', 'NIOS', 'IB', 'Cambridge IGCSE', 'US Common Core', 'UK National Curriculum', 'Australia', 'Pre-primary'];
  return (
    <section className="border-y border-line bg-white/60 py-6">
      <p className="text-center text-xs font-semibold tracking-widest text-muted uppercase">For every board, every state, Class 1 to 12</p>
      <div className="relative mt-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee flex w-max gap-10">
          {[...items, ...items].map((b, i) => (
            <span key={i} className="flex items-center gap-2 text-lg font-semibold whitespace-nowrap text-ink/60">
              <GraduationCap size={18} className="text-sea-500" /> {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================================================================== roles

const ROLES = [
  {
    key: 'Principal',
    icon: BadgeCheck,
    title: 'See the whole school in one glance',
    points: ['Attendance, fees and buses live on one screen', 'Approve admissions, leave and expenses from your phone', 'Reports for every class, teacher and rupee'],
  },
  {
    key: 'Teacher',
    icon: ClipboardList,
    title: 'Less paperwork, more teaching',
    points: ['Mark attendance in three taps, even offline', 'Homework, marks and report cards without registers', 'AI explanations of each chapter, ready to review'],
  },
  {
    key: 'Parent',
    icon: Users,
    title: 'Know everything, without calling the school',
    points: ['Attendance, homework, marks and notices instantly', 'Pay fees online, track the school bus live', 'Your child’s chapters explained in your language'],
  },
  {
    key: 'Office',
    icon: IndianRupee,
    title: 'A front desk that runs itself',
    points: ['Online admission form with documents and fee', 'Receipts, reminders and dues in a click', 'Visitors, certificates and enquiries in one place'],
  },
];

export function Roles() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % ROLES.length), 5000);
    return () => clearInterval(t);
  }, [active]);
  const r = ROLES[active];
  return (
    <section className="py-24">
      <Container>
        <SectionTitle eyebrow="One app, every role" title="Made for the people who make a school" sub="Each person sees only what they need, with their most common task one tap away." />
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {ROLES.map((x, i) => (
            <button
              key={x.key}
              onClick={() => setActive(i)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${i === active ? 'text-white' : 'text-muted hover:text-ink'}`}
            >
              {i === active && <motion.span layoutId="role-pill" className="absolute inset-0 -z-10 rounded-full bg-sea-600" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />}
              {x.key}
            </button>
          ))}
        </div>
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={r.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="mx-auto grid max-w-4xl items-center gap-8 rounded-[32px] border border-line bg-gradient-to-br from-white to-sea-50/60 p-8 shadow-soft md:grid-cols-[auto_1fr] md:p-12"
            >
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[28px] bg-white text-sea-600 shadow-lift">
                <r.icon size={52} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display text-2xl sm:text-3xl">{r.title}</h3>
                <ul className="mt-5 space-y-3">
                  {r.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-muted">
                      <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-sea-500" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

// ==================================================================== features

export const FEATURES = [
  { icon: UserPlus, title: 'Admissions', text: 'Online form with documents and fee, entrance test, merit list and one-click admission.', tone: 'sea' },
  { icon: CalendarCheck2, title: 'Attendance', text: 'Three taps per class, offline on phones, parents told at once.', tone: 'sky' },
  { icon: Wallet, title: 'Fees & payments', text: 'Fee plans, receipts, late fines, reminders, UPI and online payment.', tone: 'lilac' },
  { icon: BookOpenCheck, title: 'Exams & report cards', text: 'Marks entry, grades and beautiful printable report cards.', tone: 'sea' },
  { icon: Bus, title: 'Transport', text: 'Routes, live bus tracking on the map, boarding alerts to parents.', tone: 'sky' },
  { icon: Users, title: 'HR & payroll', text: 'Staff records, attendance, leave, salary with PF, ESI and TDS.', tone: 'lilac' },
  { icon: Library, title: 'Library & store', text: 'Books, fines, inventory, uniform sales and purchase orders.', tone: 'sea' },
  { icon: HeartPulse, title: 'Health & hostel', text: 'Infirmary, medicines, vaccinations, rooms and roll call.', tone: 'sky' },
  { icon: MessagesSquare, title: 'Communication', text: 'Notices, push, SMS, WhatsApp and parent-teacher messages.', tone: 'lilac' },
] as const;

const TONE = {
  sea: 'bg-sea-50 text-sea-600',
  sky: 'bg-sky-100 text-sky-500',
  lilac: 'bg-lilac-100 text-lilac-500',
};

export function FeatureGrid() {
  return (
    <section className="py-24">
      <Container>
        <SectionTitle eyebrow="Everything in one place" title="All your school's work, beautifully simple" sub="Twenty modules that share one database, so nothing is typed twice." />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <StaggerItem key={f.title}>
              <div className="group h-full rounded-3xl border border-line bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span className={`inline-flex rounded-2xl p-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${TONE[f.tone]}`}>
                  <f.icon size={24} />
                </span>
                <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-10 text-center">
          <Button href="/features/" variant="soft">
            Explore all features <ArrowRight size={16} />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

// ==================================================================== smart learning

const GREETINGS = [
  { lang: 'English', text: 'Plants make their own food using sunlight.' },
  { lang: 'हिन्दी', text: 'पौधे सूरज की रोशनी से अपना भोजन बनाते हैं।' },
  { lang: 'मराठी', text: 'वनस्पती सूर्यप्रकाशाने स्वतःचे अन्न तयार करतात.' },
  { lang: 'தமிழ்', text: 'தாவரங்கள் சூரிய ஒளியால் தங்கள் உணவைத் தயாரிக்கின்றன.' },
  { lang: 'বাংলা', text: 'গাছ সূর্যের আলো দিয়ে নিজের খাবার তৈরি করে।' },
  { lang: 'ગુજરાતી', text: 'છોડ સૂર્યપ્રકાશથી પોતાનો ખોરાક બનાવે છે.' },
];

export function SmartLearning() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % GREETINGS.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-lilac-100/50 via-sky-100/40 to-transparent" />
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionTitle
            center={false}
            eyebrow="New · Smart Learning"
            title={
              <>
                Understand, don&apos;t memorise. <span className="text-gradient">In every child&apos;s language.</span>
              </>
            }
            sub="When a teacher starts a chapter, students get a simple explanation with everyday examples, key points and a quick check, in English and 22 Indian languages. They can listen to it and ask doubts. Teachers approve every word."
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              [Languages, '22 Indian languages'],
              [Sparkles, 'Your choice of AI tool'],
              [BookOpenCheck, 'Online tests & question bank'],
              [CloudOff, 'Read offline on phones'],
            ].map(([I, t]) => {
              const Icon = I as typeof Languages;
              return (
                <li key={t as string} className="flex items-center gap-3 rounded-2xl border border-white bg-white/70 p-3 text-sm font-medium shadow-soft">
                  <Icon size={18} className="text-lilac-500" /> {t as string}
                </li>
              );
            })}
          </ul>
          <div className="mt-8">
            <Button href="/smart-learning/">
              How Smart Learning works <ArrowRight size={16} />
            </Button>
          </div>
        </div>
        <Reveal>
          <div className="relative mx-auto max-w-md rounded-[32px] border border-white bg-white/90 p-6 shadow-lift backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-sea-50 px-3 py-1 text-xs font-semibold text-sea-700">Science · Chapter 6</span>
              <span className="text-xs text-muted">Food from plants</span>
            </div>
            <div className="mt-5 h-24">
              <AnimatePresence mode="wait">
                <motion.div key={i} initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }} transition={{ duration: 0.5 }}>
                  <p className="text-xs font-bold text-lilac-500">{GREETINGS[i].lang}</p>
                  <p className="mt-2 font-display text-xl leading-snug">{GREETINGS[i].text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-4 rounded-2xl bg-sun-100/70 p-4">
              <p className="text-xs font-bold text-amber-700">Everyday example</p>
              <p className="mt-1 text-sm text-ink/80">Like your mother cooks on a stove, a leaf &ldquo;cooks&rdquo; food using sunlight, water and air.</p>
            </div>
            <div className="mt-4 rounded-2xl border border-line p-4">
              <p className="text-xs font-bold text-muted">Quick check</p>
              <p className="mt-1 text-sm font-semibold">Where do plants make their food?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Roots', 'Leaves', 'Flowers'].map((o) => (
                  <span key={o} className={`rounded-full px-3 py-1 text-xs font-semibold ${o === 'Leaves' ? 'bg-sea-600 text-white' : 'bg-mist text-muted'}`}>
                    {o}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

// ==================================================================== trust

export function Trust() {
  const items = [
    { icon: Smartphone, title: 'Works offline', text: 'Teachers mark attendance with no signal; it syncs when back online.' },
    { icon: Lock, title: 'Private by design', text: 'Each school’s data is fully separated and encrypted on devices.' },
    { icon: Languages, title: 'Speaks your language', text: 'Content in 22 Indian languages, reports in English and Hindi.' },
  ];
  return (
    <section className="py-12">
      <Container className="grid gap-5 md:grid-cols-3">
        {items.map((x, i) => (
          <Reveal key={x.title} delay={i * 0.08}>
            <Card className="flex h-full gap-4">
              <span className="h-fit rounded-2xl bg-sea-50 p-3 text-sea-600">
                <x.icon size={22} />
              </span>
              <div>
                <h3 className="font-bold">{x.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{x.text}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}

export function Numbers() {
  return (
    <section className="py-16">
      <Container>
        <div className="grid gap-6 rounded-[32px] bg-gradient-to-br from-sea-600 via-sea-500 to-sky-500 p-10 text-white shadow-lift sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: 20, s: '+', l: 'modules in one app' },
            { n: 23, s: '', l: 'languages for learning' },
            { n: 3, s: ' taps', l: 'for every daily task' },
            { n: 100, s: '%', l: 'works offline for attendance' },
          ].map((x) => (
            <div key={x.l}>
              <p className="font-display text-4xl sm:text-5xl">
                <CountUp to={x.n} suffix={x.s} />
              </p>
              <p className="mt-2 text-sm text-white/80">{x.l}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ==================================================================== how it works

export function HowItWorks() {
  const { site } = useSite();
  const steps = [
    { n: '1', t: 'Sign up in two minutes', d: 'Tell us about your school and verify your mobile number.' },
    { n: '2', t: 'We approve and set you up', d: 'Our team checks your request, usually the same working day, and creates your school.' },
    { n: '3', t: `Use everything free for ${site.trialDays} days`, d: 'Add classes and students (or import from Excel), invite teachers and parents.' },
  ];
  return (
    <section className="py-24">
      <Container>
        <SectionTitle eyebrow="Getting started" title="Live in a day, not a semester" />
        <div className="relative mt-14 grid gap-6 md:grid-cols-3">
          <div className="absolute top-10 right-[16%] left-[16%] hidden h-0.5 bg-gradient-to-r from-sea-300 via-sky-300 to-lilac-300 md:block" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12}>
              <div className="relative text-center">
                <span className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full border-8 border-paper bg-white font-display text-2xl text-sea-600 shadow-lift">{s.n}</span>
                <h3 className="mt-5 text-lg font-bold">{s.t}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ==================================================================== pricing teaser

export function PricingTeaser() {
  const { site } = useSite();
  return (
    <section className="py-16">
      <Container>
        <SectionTitle eyebrow="Simple pricing" title="Pay per student. Nothing hidden." sub="Every plan includes the parent, teacher and student apps, unlimited staff logins within your plan, updates and support." />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {site.plans.map((p) => (
            <StaggerItem key={p.code}>
              <div className={`relative h-full rounded-3xl border p-7 transition duration-300 hover:-translate-y-1 ${p.featured ? 'border-sea-300 bg-gradient-to-b from-sea-50 to-white shadow-lift' : 'border-line bg-white shadow-soft'}`}>
                {p.featured && <span className="absolute -top-3 left-7 rounded-full bg-sea-600 px-3 py-1 text-xs font-bold text-white">Most complete</span>}
                <h3 className="text-lg font-bold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted">{p.tagline}</p>
                <p className="mt-5">
                  <span className="font-display text-4xl">{rupees(p.pricePerStudentMonth)}</span>
                  <span className="text-sm text-muted"> / student / month</span>
                </p>
                <p className="mt-1 text-xs text-muted">Billed yearly · plus GST</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-10 text-center">
          <Button href="/pricing/">
            Compare plans <ArrowRight size={16} />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

// ==================================================================== FAQ + CTA

export function Faq({ items }: { items: [string, string][] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto mt-12 max-w-3xl divide-y divide-line rounded-3xl border border-line bg-white shadow-soft">
      {items.map(([q, a], i) => (
        <div key={q}>
          <button className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            {q}
            <motion.span animate={{ rotate: open === i ? 180 : 0 }}>
              <ChevronDown size={18} className="text-muted" />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-muted">{a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export function useFaq(): [string, string][] {
  const { site } = useSite();
  return [
    ['How does the free trial work?', `Sign up, verify your mobile and our team approves your school, usually within one working day. You then get every feature of your chosen plan free for ${site.trialDays} days. No card is needed to start.`],
    ['Do parents and teachers need to pay?', 'No. The school pays per student; the parent, teacher and student apps are free for them.'],
    ['Can we move our existing data?', 'Yes. Import students from Excel or CSV in minutes, and our team helps you set up classes, fees and timetables.'],
    ['Does it work without internet?', 'Yes. On phones and computers, attendance and student records work offline and sync automatically when you are back online.'],
    ['Is our data safe?', 'Each school’s data is kept separately with strict access rules, encrypted on devices, and never shared or sold. See our Privacy policy.'],
    ['Can we use our own SMS, WhatsApp or payment account?', 'Yes. Connect your own SMS provider, WhatsApp Business number or payment gateway (Razorpay, PayPal, UPI QR), or use ours.'],
  ];
}

export function CtaBand() {
  const { site } = useSite();
  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] border border-sea-100 bg-gradient-to-br from-sea-50 via-sky-100/60 to-lilac-100/70 px-8 py-16 text-center shadow-soft">
            <div className="floaty absolute -top-10 -left-10 h-40 w-40 rounded-full bg-sea-300/30 blur-2xl" />
            <div className="floaty-slow absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-lilac-300/40 blur-2xl" />
            <h2 className="relative font-display text-3xl sm:text-5xl">Give your school a calmer day.</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-muted">Start your {site.trialDays}-day free trial. We&apos;ll help you set up everything.</p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/signup/">
                Start free trial <ArrowRight size={16} />
              </Button>
              <Button href="/contact/" variant="ghost">
                Talk to us
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function HomeFaq() {
  return <Faq items={useFaq()} />;
}
