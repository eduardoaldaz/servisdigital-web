import { useId } from 'react';
import { SITE } from '@/lib/site';
import { cn } from '@/lib/cn';

/**
 * Servis Digital mark: an "S" drawn as a process route between two nodes,
 * the start (blueprint blue) and the finished step (light). Same rounded-square family as DocusAI's mark.
 */
export function LogoMark({ className }: { className?: string }) {
  const id = `sd-${useId().replace(/[:«»]/g, '')}`;
  return (
    <svg viewBox="0 0 24 24" className={cn('size-7', className)} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2f55ff" />
          <stop offset="1" stopColor="#1a2fa8" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="22" height="22" rx="6.5" fill={`url(#${id})`} />
      <path d="M16.6 7.2H10a2.4 2.4 0 0 0 0 4.8h4a2.4 2.4 0 0 1 0 4.8H7.4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16.8" cy="7.2" r="1.7" fill="#aebfff" />
      <circle cx="7.2" cy="16.8" r="1.7" fill="#fff" />
    </svg>
  );
}

/** Two-tone wordmark, the family pattern (Fac|Servis, Docus|AI). */
export function Wordmark({ className, tone = 'auto' }: { className?: string; tone?: 'auto' | 'light' | 'dark' }) {
  const [a, b] = SITE.wordmark;
  return (
    <span
      className={cn(
        'font-display font-extrabold leading-none tracking-[-0.03em]',
        tone === 'light' ? 'text-white' : tone === 'dark' ? 'text-texto' : 'text-primer',
        className,
      )}
    >
      {a}
      <span className={tone === 'light' ? 'text-plano-claro' : tone === 'dark' ? 'text-plano' : 'text-acento'}>{b}</span>
    </span>
  );
}

export function Logo({ className, tone }: { className?: string; tone?: 'auto' | 'light' | 'dark' }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <Wordmark tone={tone} className="text-[21px]" />
    </span>
  );
}

/** Product wordmarks in their own colors, for the family sections. */
export function FacServisWordmark({ className, tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  return (
    <span className={cn('font-display font-extrabold leading-none tracking-[-0.03em]', tone === 'light' ? 'text-white' : 'text-[var(--fs-tinta)]', className)}>
      Fac<span className="text-[var(--fs-ambar)]">Servis</span>
    </span>
  );
}

export function DocusAIWordmark({ className, tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  return (
    <span className={cn('font-display font-extrabold leading-none tracking-[-0.03em]', tone === 'light' ? 'text-white' : 'text-[var(--da-from)]', className)}>
      Docus<span className={tone === 'light' ? 'text-[var(--da-accent)]' : 'text-[var(--da-brand)]'}>AI</span>
    </span>
  );
}
