'use client';

import {
  ArrowRight,
  BookOpenCheck,
  Bot,
  Bus,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  CloudOff,
  Database,
  Eye,
  FileLock2,
  Globe2,
  GraduationCap,
  Headphones,
  HeartHandshake,
  KeyRound,
  Languages,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Mic,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  WifiOff,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { CtaBand, FEATURES } from '@/components/home';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { Button, Card, Container, Eyebrow, SectionTitle } from '@/components/ui';
import { useSite } from '@/lib/site';

export function PageHero({ eyebrow, title, sub, children }: { eyebrow: string; title: ReactNode; sub: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      <div className="aurora" />
      <Container className="relative pt-16 pb-14 text-center">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">{title}</h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">{sub}</p>
        </Reveal>
        {children && <Reveal delay={0.24}>{children}</Reveal>}
      </Container>
    </section>
  );
}

// ==================================================================== features

const GROUPS = [
  {
    title: 'Students & academics',
    icon: GraduationCap,
    items: [
      ['Admissions', 'Public online form, documents, application fee, entrance test and interview, merit list, one-click admission with sibling linking.'],
      ['Students', 'Complete profiles, guardians, documents, house, promotions to the next class, Excel import.'],
      ['Attendance', 'Three taps per class, period-wise if you want, offline on phones, absent alerts to parents.'],
      ['Timetable', 'Class and teacher timetables with clash checks, substitutions for absent teachers.'],
      ['Homework & syllabus', 'Homework with attachments, checking, study material and syllabus progress per section.'],
      ['Exams & report cards', 'Exam schedules, marks entry, grading scales, remarks and printable report cards.'],
    ],
  },
  {
    title: 'Office & finance',
    icon: ClipboardCheck,
    items: [
      ['Fees', 'Fee heads, instalments, concessions, late fines, receipts, reminders, online and UPI payment.'],
      ['Front office', 'Enquiries with follow-ups, visitors and gate passes, bonafide and transfer certificates.'],
      ['Expenses & accounting', 'Bills with approvals, petty cash, ledgers, day book and balance sheet.'],
      ['Inventory', 'Stock, purchase orders, uniform and book sales, assets.'],
    ],
  },
  {
    title: 'People',
    icon: Users,
    items: [
      ['HR', 'Staff profiles, documents, departments and designations.'],
      ['Staff attendance & leave', 'Check-in / out, leave types and balances, approvals on the phone.'],
      ['Payroll', 'Salary structures, PF, ESI, professional tax and TDS, payslips in the app.'],
      ['Communication', 'Notices to school, class or role; push, SMS and WhatsApp; parent-teacher messages.'],
    ],
  },
  {
    title: 'Campus life',
    icon: Bus,
    items: [
      ['Transport', 'Routes and stops, live bus location on the map, boarding and drop alerts.'],
      ['Canteen', 'Menus, meal plans, cashless wallet with counter scanning.'],
      ['Hostel', 'Rooms and beds, roll call, out-passes, visitors.'],
      ['Health', 'Infirmary visits, medicines, vaccinations, allergies and check-ups.'],
    ],
  },
];

export function FeaturesPage() {
  return (
    <>
      <PageHero eyebrow="Features" title={<>Everything your school does, <span className="text-gradient">in one calm place</span></>} sub="Twenty connected modules. Each person sees only their part, and the most common tasks are one tap away.">
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/signup/">Start free trial <ArrowRight size={16} /></Button>
          <Button href="/pricing/" variant="ghost">See pricing</Button>
        </div>
      </PageHero>
      <Container>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <StaggerItem key={f.title}>
              <Card className="h-full transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                <f.icon size={26} className="text-sea-600" />
                <h3 className="mt-4 font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted">{f.text}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-24 space-y-20">
          {GROUPS.map((g, gi) => (
            <section key={g.title} className={`grid gap-10 lg:grid-cols-[0.8fr_1.2fr] ${gi % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <Reveal>
                <div className="sticky top-28 rounded-[32px] bg-gradient-to-br from-sea-50 via-sky-100/60 to-lilac-100/60 p-10">
                  <g.icon size={44} className="text-sea-600" strokeWidth={1.5} />
                  <h2 className="mt-6 font-display text-3xl">{g.title}</h2>
                </div>
              </Reveal>
              <Stagger className="grid gap-4 sm:grid-cols-2">
                {g.items.map(([t, d]) => (
                  <StaggerItem key={t}>
                    <div className="h-full rounded-3xl border border-line bg-white p-6 shadow-soft">
                      <h3 className="flex items-center gap-2 font-bold">
                        <CheckCircle2 size={18} className="text-sea-500" /> {t}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          ))}
        </div>
        <section className="mt-24">
          <SectionTitle eyebrow="Built right" title="The things you don't see, done properly" />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              [WifiOff, 'Offline first', 'Phones and computers keep working without internet and sync safely later.'],
              [ShieldCheck, 'Separate and secure', 'Each school’s data is isolated at the database level, encrypted on devices.'],
              [Globe2, 'Every device', 'Android, iPhone, web browser and desktop: one app, one login.'],
            ].map(([I, t, d]) => {
              const Icon = I as typeof WifiOff;
              return (
                <StaggerItem key={t as string}>
                  <Card className="h-full">
                    <Icon size={26} className="text-sky-500" />
                    <h3 className="mt-4 font-bold">{t as string}</h3>
                    <p className="mt-2 text-sm text-muted">{d as string}</p>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>
      </Container>
      <CtaBand />
    </>
  );
}

// ==================================================================== smart learning

export function SmartLearningPage() {
  return (
    <>
      <PageHero
        eyebrow="Smart Learning · Premium"
        title={<>Every chapter explained simply, <span className="text-gradient">in the child&apos;s own language</span></>}
        sub="AI-written, teacher-approved explanations that follow your syllabus as it is taught, with everyday examples, a quick check, doubts and online tests."
      />
      <Container>
        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            [BookOpenCheck, 'Follows the class', 'When a teacher taps “Start chapter”, the explanation reaches that section the same day.'],
            [Languages, '22 Indian languages', 'English, Hindi, Marathi, Tamil, Bengali, Telugu and more. Right-to-left for Urdu.'],
            [CheckCircle2, 'Teacher approved', 'Nothing reaches students until a teacher reads and approves it. Edit anything.'],
            [Mic, 'Listen and ask', 'Read aloud on the phone, and ask doubts that are answered from the chapter only.'],
            [ClipboardCheck, 'Quick checks & tests', 'Instant quick checks, a question bank and timed online tests marked automatically.'],
            [Bot, 'Your choice of AI', 'Use Gemini, OpenAI, Claude or Sarvam with your own key, or our account with credits.'],
            [CloudOff, 'Offline reading', 'Chapters opened once can be read again without internet.'],
            [Leaf, 'Privacy first', 'Only chapter details go to the AI tool. Never names, marks or phone numbers.'],
          ].map(([I, t, d]) => {
            const Icon = I as typeof Leaf;
            return (
              <StaggerItem key={t as string}>
                <Card className="h-full transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className="inline-flex rounded-2xl bg-lilac-100 p-3 text-lilac-500">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-4 font-bold">{t as string}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{d as string}</p>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
        <section className="mt-24 grid items-center gap-10 lg:grid-cols-2">
          <SectionTitle center={false} eyebrow="How it works" title="From the textbook to understanding in four steps" />
          <ol className="space-y-5">
            {[
              ['The school adds its books', 'Pick from shared lists or take a photo of the contents page.'],
              ['A teacher starts a chapter', 'Explanations are prepared in the school’s languages.'],
              ['The teacher approves', 'Read, edit, regenerate or add notes for the class.'],
              ['Students learn and check', 'Read, listen, ask doubts, take the quick check and tests. Teachers see who understood.'],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <li className="flex gap-4 rounded-3xl border border-line bg-white p-5 shadow-soft">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sea-500 to-lilac-500 font-bold text-white">{i + 1}</span>
                  <div>
                    <p className="font-semibold">{t}</p>
                    <p className="text-sm text-muted">{d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>
      </Container>
      <CtaBand />
    </>
  );
}

// ==================================================================== about

export function AboutPage() {
  const { site } = useSite();
  return (
    <>
      <PageHero eyebrow="About us" title={<>We build calm software <span className="text-gradient">for busy schools</span></>} sub={`${site.brandName} was started to take the paperwork and the chasing out of school life, so principals, teachers and parents can spend their time on children.`} />
      <Container className="grid gap-6 md:grid-cols-3">
        {[
          [HeartHandshake, 'Simple first', 'If a teacher needs training to use it, we have not finished building it. Every daily task fits in three taps.'],
          [Sparkles, 'Every child understands', 'Learning in a child’s own language, with examples from their own life, is at the heart of what we do.'],
          [FileLock2, 'Trust by default', 'A school’s data belongs to the school. We keep it separate, secure and never sell it.'],
        ].map(([I, t, d], i) => {
          const Icon = I as typeof Leaf;
          return (
            <Reveal key={t as string} delay={i * 0.08}>
              <Card className="h-full">
                <Icon size={28} className="text-sea-600" />
                <h2 className="mt-4 text-lg font-bold">{t as string}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d as string}</p>
              </Card>
            </Reveal>
          );
        })}
      </Container>
      <Container className="mt-20">
        <Reveal>
          <div className="rounded-[32px] border border-line bg-white p-10 shadow-soft md:p-14">
            <h2 className="font-display text-3xl">Our promise to schools</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {['A real person answers when you call', 'Help moving your data in, at no extra cost', 'No hidden charges; prices are on our website', 'Your data is exported for you whenever you ask', 'Updates every month, included in your plan', 'We listen: most features come from schools'].map((p) => (
                <li key={p} className="flex items-start gap-3 text-muted">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-sea-500" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
      <CtaBand />
    </>
  );
}

// ==================================================================== contact

export function ContactPage() {
  const { site } = useSite();
  const c = site.contact;
  const cards = [
    c.supportPhone && { I: Phone, t: 'Call us', d: c.supportPhone, href: `tel:${c.supportPhone}` },
    c.whatsapp && { I: MessageCircle, t: 'WhatsApp', d: c.whatsapp, href: `https://wa.me/${c.whatsapp.replace(/\D/g, '')}` },
    c.salesEmail && { I: Mail, t: 'Sales', d: c.salesEmail, href: `mailto:${c.salesEmail}` },
    c.supportEmail && { I: Headphones, t: 'Support', d: c.supportEmail, href: `mailto:${c.supportEmail}` },
  ].filter(Boolean) as { I: typeof Phone; t: string; d: string; href: string }[];
  return (
    <>
      <PageHero eyebrow="Contact" title={<>We&apos;d love to <span className="text-gradient">hear from you</span></>} sub="Questions, a demo for your staff, or help with setting up: we usually reply within one working day." />
      <Container>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((x) => (
            <StaggerItem key={x.t}>
              <a href={x.href} className="block h-full rounded-3xl border border-line bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                <x.I size={24} className="text-sea-600" />
                <p className="mt-4 font-bold">{x.t}</p>
                <p className="mt-1 text-sm break-all text-muted">{x.d}</p>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
        {cards.length === 0 && <p className="text-center text-muted">Contact details will appear here soon.</p>}
        {c.address && (
          <Reveal className="mt-8">
            <Card className="flex items-start gap-4">
              <MapPin className="mt-1 shrink-0 text-sea-600" />
              <div>
                <p className="font-bold">{site.company.legalName}</p>
                <p className="text-sm whitespace-pre-line text-muted">{c.address}</p>
              </div>
            </Card>
          </Reveal>
        )}
        <Reveal className="mt-12">
          <div className="rounded-[32px] bg-gradient-to-br from-sea-50 via-sky-100/60 to-lilac-100/60 p-10 text-center">
            <h2 className="font-display text-3xl">Want to see it with your staff?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted">Start a free trial and we&apos;ll walk your team through it on a video call.</p>
            <div className="mt-6 flex justify-center gap-3">
              <Button href="/signup/">Start free trial</Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}

// ==================================================================== security

export function SecurityPage() {
  return (
    <>
      <PageHero eyebrow="Security & privacy" title={<>Your school&apos;s data, <span className="text-gradient">kept safe</span></>} sub="How we protect students, parents and staff, in plain words." />
      <Container>
        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            [Database, 'Separated per school', 'Every record carries its school; the database itself refuses to show one school’s data to another.'],
            [KeyRound, 'Strong sign-in', 'Passwords are stored as one-way hashes, sessions expire, and company staff need two-factor login.'],
            [FileLock2, 'Encrypted', 'Data travels over HTTPS. On phones and computers the offline copy is encrypted with a key kept in the device’s secure store.'],
            [Eye, 'Every change logged', 'Fees, marks, salary and attendance changes are recorded with who did it and when.'],
            [ShieldCheck, 'Support only with consent', 'Our support team can open a school only when the school switches it on, and every action is logged.'],
            [CalendarCheck2, 'Backups', 'Regular backups so a mistake or an outage never loses your data.'],
          ].map(([I, t, d]) => {
            const Icon = I as typeof Leaf;
            return (
              <StaggerItem key={t as string}>
                <Card className="h-full">
                  <Icon size={24} className="text-sea-600" />
                  <h2 className="mt-4 font-bold">{t as string}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{d as string}</p>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </>
  );
}
