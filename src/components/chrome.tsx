'use client';

import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Mail, Menu, MessageCircle, Phone, X, Youtube } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { appUrl, useSite } from '@/lib/site';
import { LogoMark } from './brand';
import { Container } from './ui';

const NAV = [
  { href: '/features/', label: 'Features' },
  { href: '/smart-learning/', label: 'Smart Learning' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];

export function Navbar() {
  const { site } = useSite();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  return (
    <>
      {site.announcement && (
        <div className="bg-sea-600 px-4 py-2 text-center text-sm font-medium text-white">{site.announcement}</div>
      )}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled ? 'border-b border-line/80 bg-paper/80 shadow-soft backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <motion.div className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-sea-500 via-sky-500 to-lilac-500" style={{ scaleX: progress }} />
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.brandName} home`}>
            <LogoMark />
            <span className="text-lg font-bold tracking-tight">{site.brandName}</span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  path === n.href ? 'text-sea-700' : 'text-muted hover:text-ink'
                }`}
              >
                {path === n.href && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-sea-50" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <a href={appUrl(site)} className="rounded-full px-4 py-2 text-sm font-semibold text-ink hover:text-sea-700">
              Log in
            </a>
            <Link href="/signup/" className="rounded-full bg-sea-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-sea-700">
              Start free trial
            </Link>
          </div>
          <button className="rounded-full p-2 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </Container>
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-line bg-paper lg:hidden"
            >
              <Container className="flex flex-col gap-1 py-4">
                {NAV.map((n) => (
                  <Link key={n.href} href={n.href} className="rounded-xl px-3 py-3 font-medium hover:bg-mist">
                    {n.label}
                  </Link>
                ))}
                <a href={appUrl(site)} className="rounded-xl px-3 py-3 font-medium hover:bg-mist">
                  Log in
                </a>
                <Link href="/signup/" className="mt-2 rounded-full bg-sea-600 px-5 py-3 text-center font-semibold text-white">
                  Start free trial
                </Link>
              </Container>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

export function Footer() {
  const { site } = useSite();
  const c = site.contact;
  const social = [
    { k: 'facebook', I: Facebook },
    { k: 'instagram', I: Instagram },
    { k: 'linkedin', I: Linkedin },
    { k: 'youtube', I: Youtube },
  ] as const;
  return (
    <footer className="mt-24 border-t border-line bg-mist/60">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <LogoMark />
            <span className="text-lg font-bold">{site.brandName}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {site.tagline ?? 'Calm, simple school management for principals, teachers, parents and students. One app, every device, even offline.'}
          </p>
          <div className="mt-5 flex flex-col gap-2 text-sm text-muted">
            {c.supportEmail && (
              <a href={`mailto:${c.supportEmail}`} className="flex items-center gap-2 hover:text-sea-700">
                <Mail size={16} /> {c.supportEmail}
              </a>
            )}
            {c.supportPhone && (
              <a href={`tel:${c.supportPhone}`} className="flex items-center gap-2 hover:text-sea-700">
                <Phone size={16} /> {c.supportPhone}
              </a>
            )}
            {c.whatsapp && (
              <a href={`https://wa.me/${c.whatsapp.replace(/\D/g, '')}`} className="flex items-center gap-2 hover:text-sea-700" target="_blank" rel="noreferrer">
                <MessageCircle size={16} /> WhatsApp us
              </a>
            )}
          </div>
          <div className="mt-5 flex gap-2">
            {social.map(({ k, I }) =>
              site.social[k] ? (
                <a key={k} href={site.social[k]} target="_blank" rel="noreferrer" aria-label={k} className="rounded-full border border-line bg-white p-2 text-muted transition hover:-translate-y-0.5 hover:text-sea-700">
                  <I size={16} />
                </a>
              ) : null,
            )}
          </div>
        </div>
        <FooterCol title="Product" links={[['/features/', 'Features'], ['/smart-learning/', 'Smart Learning'], ['/pricing/', 'Pricing'], ['/signup/', 'Start free trial'], ['/signup/#status', 'Sign-up status']]} />
        <FooterCol title="Company" links={[['/about/', 'About us'], ['/contact/', 'Contact'], ['/security/', 'Security & privacy']]} />
        <FooterCol title="Legal" links={[['/privacy/', 'Privacy policy'], ['/terms/', 'Terms & conditions'], ['/refund/', 'Refund & cancellation']]} />
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.company.legalName}. All rights reserved.
            {site.company.gstin ? ` GSTIN ${site.company.gstin}.` : ''}
          </span>
          <span>Made in India with care for schools.</span>
        </Container>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm text-muted">
        {links.map(([href, label]) => (
          <li key={href}>
            <Link href={href} className="transition hover:text-sea-700">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
