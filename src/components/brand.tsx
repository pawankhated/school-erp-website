/** The mark: an open book with a leaf (learning that grows). */
export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3aa892" />
          <stop offset="0.6" stopColor="#5b9bd8" />
          <stop offset="1" stopColor="#8d78d6" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="url(#lg)" />
      <path d="M9 27.5c4-1.6 7.3-1.4 11 .9 3.7-2.3 7-2.5 11-.9V13.6c-4-1.6-7.3-1.4-11 .9-3.7-2.3-7-2.5-11-.9z" fill="#fff" opacity=".92" />
      <path d="M20 14.5v13.9" stroke="#2b8f7b" strokeWidth="1.4" />
      <path d="M24.5 10.5c2.6-.4 4.6.6 5.6 2.6-2.6.6-4.7-.2-5.6-2.6z" fill="#fff" />
    </svg>
  );
}
