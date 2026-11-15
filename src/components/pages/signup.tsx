'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock, Loader2, PartyPopper, Search, ShieldCheck, XCircle } from 'lucide-react';
import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { Reveal } from '@/components/motion';
import { Container, Eyebrow } from '@/components/ui';
import { appUrl, get, post, useSite } from '@/lib/site';

const BOARD_LABELS: Record<string, string> = {
  CBSE: 'CBSE', ICSE: 'ICSE / ISC', STATE: 'State board', NIOS: 'NIOS', IB: 'IB', IGCSE: 'Cambridge IGCSE',
  CAMBRIDGE: 'Cambridge (other)', US: 'US curriculum', UK: 'UK curriculum', AUSTRALIA: 'Australian curriculum', OTHER: 'Other',
};

type Step = 'form' | 'code' | 'done';
interface Status {
  id: string;
  schoolName: string;
  status: 'pending' | 'approved' | 'rejected' | 'unverified';
  rejectReason: string | null;
  schoolCode: string | null;
  trialEndsAt: string | null;
  appUrl: string | null;
}

const input =
  'w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-sea-300 focus:ring-4 focus:ring-sea-100';

function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function SignupPage() {
  const { site } = useSite();
  const [step, setStep] = useState<Step>('form');
  const [plan, setPlan] = useState('premium');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signup, setSignup] = useState<{ id: string; phone: string } | null>(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState<Status | null>(null);
  const [f, setF] = useState({
    schoolName: '', board: 'CBSE', city: '', state: '', studentsEstimate: '', contactName: '', designation: 'Principal', phone: '', email: '', message: '', website: '',
  });
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('plan');
    if (p) setPlan(p);
  }, []);
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((x) => ({ ...x, [k]: e.target.value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const r = await post<{ id: string; phone: string }>('/public/website/signup', {
        ...f,
        state: f.state || undefined,
        email: f.email || undefined,
        message: f.message || undefined,
        website: f.website || undefined,
        studentsEstimate: f.studentsEstimate ? Number(f.studentsEstimate) : undefined,
        planCode: plan,
      });
      setSignup(r);
      setStep('code');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function verify(e: FormEvent) {
    e.preventDefault();
    if (!signup) return;
    setBusy(true);
    setError(null);
    try {
      setResult(await post<Status>(`/public/website/signup/${signup.id}/verify`, { code }));
      setStep('done');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function resend() {
    if (!signup) return;
    setError(null);
    try {
      await post(`/public/website/signup/${signup.id}/resend`, {});
      setError('A new code is on its way.');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <section className="relative overflow-hidden">
      <div className="aurora" />
      <Container className="relative grid gap-12 pt-14 pb-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:pt-8">
          <Reveal>
            <Eyebrow>Free for {site.trialDays} days</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
              Bring your school to <span className="text-gradient">{site.brandName}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-lg text-muted">Tell us about your school. After a quick check by our team, your account is ready and every feature of your plan is free for {site.trialDays} days.</p>
          </Reveal>
          <Reveal delay={0.24}>
            <ol className="mt-8 space-y-4">
              {[
                ['Fill in the form', 'Two minutes. No card needed.'],
                ['Verify your mobile', 'We send a 6-digit code by SMS.'],
                ['We approve your school', 'Usually within one working day. We call you to help set up.'],
                ['Log in and start', 'Use your mobile number; set a password the first time.'],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sea-600 text-sm font-bold text-white">{i + 1}</span>
                  <div>
                    <p className="font-semibold">{t}</p>
                    <p className="text-sm text-muted">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-8 flex items-center gap-2 text-sm text-muted">
              <ShieldCheck size={18} className="text-sea-500" /> We use your details only to set up your school. See our privacy policy.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-[32px] border border-white bg-white/90 p-6 shadow-lift backdrop-blur sm:p-8">
            <AnimatePresence mode="wait">
              {step === 'form' && (
                <motion.form key="form" onSubmit={submit} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                  {!site.signupOpen && <p className="rounded-2xl bg-sun-100 p-4 text-sm">Sign-ups are paused right now. Please contact us.</p>}
                  <div>
                    <span className="mb-2 block text-sm font-semibold">Plan</span>
                    <div className="grid grid-cols-3 gap-2">
                      {site.plans.map((p) => (
                        <button type="button" key={p.code} onClick={() => setPlan(p.code)} className={`relative rounded-2xl border px-3 py-3 text-left transition ${plan === p.code ? 'border-sea-500 bg-sea-50' : 'border-line hover:border-sea-300'}`}>
                          <p className="text-sm font-bold">{p.name}</p>
                          <p className="text-xs text-muted">₹{p.pricePerStudentMonth}/student/mo</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <Field label="School name">
                    <input required minLength={2} className={input} value={f.schoolName} onChange={set('schoolName')} placeholder="e.g. Sunrise Public School" />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Board">
                      <select className={input} value={f.board} onChange={set('board')}>
                        {site.boards.map((b) => (
                          <option key={b} value={b}>
                            {BOARD_LABELS[b] ?? b}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Number of students (about)">
                      <input type="number" min={1} max={100000} className={input} value={f.studentsEstimate} onChange={set('studentsEstimate')} placeholder="e.g. 600" />
                    </Field>
                    <Field label="City">
                      <input required minLength={2} className={input} value={f.city} onChange={set('city')} placeholder="e.g. Pune" />
                    </Field>
                    <Field label="State">
                      <input className={input} value={f.state} onChange={set('state')} placeholder="e.g. Maharashtra" />
                    </Field>
                    <Field label="Your name">
                      <input required minLength={2} className={input} value={f.contactName} onChange={set('contactName')} />
                    </Field>
                    <Field label="Your role">
                      <select className={input} value={f.designation} onChange={set('designation')}>
                        {['Principal', 'Owner / Trustee', 'Director', 'Administrator', 'Teacher', 'Other'].map((d) => (
                          <option key={d}>{d}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Mobile number" hint="You log in with this number.">
                      <input required inputMode="tel" className={input} value={f.phone} onChange={set('phone')} placeholder="98765 43210" />
                    </Field>
                    <Field label="Email (optional)">
                      <input type="email" className={input} value={f.email} onChange={set('email')} placeholder="principal@school.in" />
                    </Field>
                  </div>
                  <Field label="Anything we should know? (optional)">
                    <textarea rows={2} className={input} value={f.message} onChange={set('message')} />
                  </Field>
                  <input tabIndex={-1} autoComplete="off" aria-hidden className="hidden" value={f.website} onChange={set('website')} />
                  {error && <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                  <button disabled={busy || !site.signupOpen} className="flex w-full items-center justify-center gap-2 rounded-full bg-sea-600 py-3.5 font-semibold text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-sea-700 disabled:opacity-60">
                    {busy ? <Loader2 className="animate-spin" size={18} /> : null} Continue <ArrowRight size={16} />
                  </button>
                  <p className="text-center text-xs text-muted">
                    By continuing you agree to our <a href="/terms/" className="underline">Terms</a> and <a href="/privacy/" className="underline">Privacy policy</a>.
                  </p>
                </motion.form>
              )}

              {step === 'code' && (
                <motion.form key="code" onSubmit={verify} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 py-6 text-center">
                  <h2 className="font-display text-3xl">Check your phone</h2>
                  <p className="text-muted">We sent a 6-digit code to {signup?.phone}.</p>
                  <input
                    autoFocus
                    inputMode="numeric"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                    className="mx-auto block w-56 rounded-2xl border border-line bg-white px-4 py-4 text-center font-mono text-3xl tracking-[0.5em] outline-none focus:border-sea-300 focus:ring-4 focus:ring-sea-100"
                    placeholder="••••••"
                  />
                  {error && <p className="text-sm text-red-700">{error}</p>}
                  <button disabled={busy || code.length !== 6} className="mx-auto flex items-center justify-center gap-2 rounded-full bg-sea-600 px-10 py-3.5 font-semibold text-white shadow-lift disabled:opacity-60">
                    {busy ? <Loader2 className="animate-spin" size={18} /> : null} Verify
                  </button>
                  <button type="button" onClick={resend} className="text-sm font-semibold text-sea-700 underline underline-offset-4">
                    Send the code again
                  </button>
                </motion.form>
              )}

              {step === 'done' && result && (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-8 text-center">
                  <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }} className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sea-50 text-sea-600">
                    <PartyPopper size={38} />
                  </motion.div>
                  <h2 className="mt-6 font-display text-3xl">Thank you!</h2>
                  <p className="mx-auto mt-3 max-w-sm text-muted">
                    {result.schoolName} is waiting for approval. Our team will call you soon, usually within one working day. You can check the status below with your mobile number.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </Container>
      <StatusCheck />
    </section>
  );
}

function StatusCheck() {
  const { site } = useSite();
  const [phone, setPhone] = useState('');
  const [s, setS] = useState<Status | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  async function check(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setS(null);
    try {
      setS(await get<Status>(`/public/website/signup/status?phone=${encodeURIComponent(phone)}`));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Container className="relative pb-16" >
      <div id="status" className="mx-auto max-w-2xl scroll-mt-24 rounded-[28px] border border-line bg-white p-6 shadow-soft sm:p-8">
        <h2 className="text-lg font-bold">Already signed up? Check your status</h2>
        <form onSubmit={check} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input required inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your mobile number" className={input} />
          <button disabled={busy} className="flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">
            {busy ? <Loader2 className="animate-spin" size={16} /> : <Search size={16} />} Check
          </button>
        </form>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        <AnimatePresence>
          {s && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-2xl bg-mist p-5">
              {s.status === 'pending' && (
                <p className="flex items-start gap-3">
                  <Clock className="mt-0.5 shrink-0 text-sky-500" size={20} /> <span><b>{s.schoolName}</b> is waiting for approval. We will call you soon.</span>
                </p>
              )}
              {s.status === 'approved' && (
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-sea-600" size={20} />
                  <div>
                    <p>
                      <b>{s.schoolName}</b> is ready. Your school code is <b className="rounded bg-white px-2 py-0.5 font-mono">{s.schoolCode}</b>.
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      Open the app, enter the school code, choose &ldquo;Forgot or set password&rdquo; and use your mobile number to set a password.
                      {s.trialEndsAt ? ` Your free trial runs until ${new Date(s.trialEndsAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}.` : ''}
                    </p>
                    <a href={appUrl(site)} className="mt-3 inline-flex items-center gap-2 rounded-full bg-sea-600 px-5 py-2.5 text-sm font-semibold text-white">
                      Open the app <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              )}
              {s.status === 'rejected' && (
                <p className="flex items-start gap-3">
                  <XCircle className="mt-0.5 shrink-0 text-red-500" size={20} />
                  <span>
                    We could not approve this request{s.rejectReason ? `: ${s.rejectReason}` : '.'} Please contact us if you think this is a mistake.
                  </span>
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Container>
  );
}
