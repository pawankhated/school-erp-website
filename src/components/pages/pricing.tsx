'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, Minus, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Faq } from '@/components/home';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { Button, Container, Eyebrow, SectionTitle } from '@/components/ui';
import { rupees, useSite } from '@/lib/site';

const ALWAYS = ['Parent, teacher and student apps', 'Notices, messages and notifications', 'Reports and dashboards', 'Works offline on phones', 'Updates and support'];

export function PricingPage() {
  const { site } = useSite();
  const [students, setStudents] = useState(400);
  const plans = site.plans;
  const allModules = useMemo(() => {
    const order = Object.keys(site.modules);
    const used = new Set(plans.flatMap((p) => p.modules));
    return order.filter((m) => used.has(m));
  }, [plans, site.modules]);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="aurora" />
        <Container className="relative pt-16 pb-8 text-center">
          <Reveal>
            <Eyebrow>{site.trialDays}-day free trial on every plan</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-4xl sm:text-6xl">
              Fair pricing, <span className="text-gradient">per student</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">Pay only for the students you have. Teachers, staff and parents use the apps free. Billed yearly, plus GST.</p>
          </Reveal>
        </Container>
      </section>

      <Container>
        <Stagger className="grid gap-6 pt-6 lg:grid-cols-3">
          {plans.map((p) => (
            <StaggerItem key={p.code}>
              <div className={`relative flex h-full flex-col rounded-[30px] border p-8 transition duration-300 hover:-translate-y-1 ${p.featured ? 'border-sea-300 bg-gradient-to-b from-sea-50 via-white to-white shadow-lift' : 'border-line bg-white shadow-soft'}`}>
                {p.featured && (
                  <span className="absolute -top-3.5 left-8 flex items-center gap-1 rounded-full bg-sea-600 px-3 py-1 text-xs font-bold text-white">
                    <Sparkles size={12} /> Most complete
                  </span>
                )}
                <h2 className="text-xl font-bold">{p.name}</h2>
                <p className="mt-1 text-sm text-muted">{p.tagline}</p>
                <p className="mt-6">
                  <span className="font-display text-5xl">{rupees(p.pricePerStudentMonth)}</span>
                  <span className="text-sm text-muted"> / student / month</span>
                </p>
                <p className="mt-1 text-xs text-muted">
                  {rupees(p.pricePerStudentYear)} per student per year{p.minAnnual > 0 ? ` · minimum ${rupees(p.minAnnual)} a year` : ''}
                </p>
                <Link
                  href={`/signup/?plan=${p.code}`}
                  className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${p.featured ? 'bg-sea-600 text-white shadow-lift hover:bg-sea-700' : 'bg-sea-50 text-sea-700 hover:bg-sea-100'}`}
                >
                  Start free trial <ArrowRight size={16} />
                </Link>
                <ul className="mt-8 space-y-3 text-sm">
                  {(p.highlights.length ? p.highlights : p.modules.map((m) => site.modules[m]?.label ?? m)).map((h) => (
                    <li key={h} className="flex items-start gap-2.5">
                      <Check size={18} className="mt-0.5 shrink-0 text-sea-500" /> {h}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-6 text-xs text-muted">
                  Up to {p.maxStudents?.toLocaleString('en-IN') ?? 'unlimited'} students · {p.maxBranches ?? 'unlimited'} campus{p.maxBranches === 1 ? '' : 'es'}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-6 text-center text-sm text-muted">
          Bigger group or many campuses? <Link href="/contact/" className="font-semibold text-sea-700 underline underline-offset-4">Ask for Enterprise pricing</Link>
        </Reveal>
      </Container>

      {/* Calculator */}
      <section className="py-24">
        <Container>
          <SectionTitle eyebrow="Calculator" title="What would it cost my school?" />
          <Reveal>
            <div className="mx-auto mt-10 max-w-3xl rounded-[30px] border border-line bg-white p-8 shadow-soft">
              <div className="flex items-baseline justify-between">
                <label htmlFor="students" className="font-semibold">
                  Number of students
                </label>
                <motion.span key={students} initial={{ scale: 1.2, opacity: 0.4 }} animate={{ scale: 1, opacity: 1 }} className="font-display text-3xl text-sea-700">
                  {students.toLocaleString('en-IN')}
                </motion.span>
              </div>
              <input id="students" type="range" min={50} max={5000} step={50} value={students} onChange={(e) => setStudents(Number(e.target.value))} className="mt-5 w-full accent-[#2b8f7b]" />
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {plans.map((p) => {
                  const year = Math.max(p.pricePerStudentYear * students, p.minAnnual);
                  return (
                    <div key={p.code} className={`rounded-2xl p-4 ${p.featured ? 'bg-sea-50' : 'bg-mist'}`}>
                      <p className="text-sm font-semibold">{p.name}</p>
                      <p className="mt-2 font-display text-2xl">{rupees(Math.round(year / 12))}</p>
                      <p className="text-xs text-muted">a month · {rupees(year)} a year + GST</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Comparison */}
      <section className="pb-12">
        <Container>
          <SectionTitle eyebrow="Compare" title="What each plan includes" />
          <Reveal>
            <div className="mt-10 overflow-x-auto rounded-[28px] border border-line bg-white shadow-soft">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-line bg-mist/60">
                    <th className="px-6 py-4 text-left font-semibold">Module</th>
                    {plans.map((p) => (
                      <th key={p.code} className="px-4 py-4 text-center font-semibold">
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ALWAYS.map((a) => (
                    <tr key={a} className="border-b border-line/70">
                      <td className="px-6 py-3.5 text-muted">{a}</td>
                      {plans.map((p) => (
                        <td key={p.code} className="text-center">
                          <Check size={18} className="mx-auto text-sea-500" />
                        </td>
                      ))}
                    </tr>
                  ))}
                  {allModules.map((m) => (
                    <tr key={m} className="border-b border-line/70 transition hover:bg-mist/40">
                      <td className="px-6 py-3.5">
                        <p className="font-medium">{site.modules[m]?.label ?? m}</p>
                        <p className="text-xs text-muted">{site.modules[m]?.description}</p>
                      </td>
                      {plans.map((p) => (
                        <td key={p.code} className="text-center">
                          {p.modules.includes(m) ? <Check size={18} className="mx-auto text-sea-500" /> : <Minus size={18} className="mx-auto text-line" />}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="px-6 py-3.5">
                      <p className="font-medium">Smart Learning (AI)</p>
                      <p className="text-xs text-muted">Chapter explanations, doubts, online tests</p>
                    </td>
                    {plans.map((p) => (
                      <td key={p.code} className="text-center">
                        {p.smartLearning ? <Check size={18} className="mx-auto text-sea-500" /> : <Minus size={18} className="mx-auto text-line" />}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionTitle eyebrow="Billing questions" title="Pricing FAQ" />
          <Faq
            items={[
              ['How is the price calculated?', 'Plan price × active students × 12 months, billed once a year, plus 18% GST. Students who leave during the year are not charged at renewal.'],
              ['What happens after the free trial?', 'Choose a plan and pay the yearly invoice online. If you do not, the account becomes read-only after a short grace period. Your data is never deleted for non-payment.'],
              ['Are SMS and WhatsApp included?', 'Every plan includes a monthly allowance per student. More can be bought as packs, or connect your own SMS / WhatsApp account at no extra charge from us.'],
              ['Can we change plans later?', 'Yes. Upgrade any time; the difference is adjusted on a pro-rata basis. Downgrades apply from the next billing year.'],
              ['Do you offer refunds?', `Yes, within ${site.refundDays} days of a payment for a new subscription. See the Refund & cancellation policy for details.`],
            ]}
          />
          <div className="mt-10 text-center">
            <Button href="/signup/">
              Start free trial <ArrowRight size={16} />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
