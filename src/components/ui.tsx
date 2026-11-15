import Link from 'next/link';
import type { ReactNode } from 'react';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-sea-100 bg-white/70 px-3 py-1 text-xs font-semibold tracking-wide text-sea-700 uppercase backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-sea-500" />
      {children}
    </span>
  );
}

export function SectionTitle({ eyebrow, title, sub, center = true }: { eyebrow?: string; title: ReactNode; sub?: ReactNode; center?: boolean }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{sub}</p>}
    </div>
  );
}

export function Button({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'soft';
  className?: string;
}) {
  const styles = {
    primary: 'bg-sea-600 text-white shadow-lift hover:bg-sea-700',
    ghost: 'border border-line bg-white/80 text-ink hover:border-sea-300 hover:bg-white',
    soft: 'bg-sea-50 text-sea-700 hover:bg-sea-100',
  }[variant];
  const external = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${styles} ${className}`;
  return external ? (
    <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-line bg-white p-6 shadow-soft ${className}`}>{children}</div>;
}
