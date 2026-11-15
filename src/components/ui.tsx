import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-[1200px] px-5 sm:px-8', className)}>{children}</div>;
}

/** A band of the page. `tono="oscuro"` flips every role token (text, lines, button) for navy bands. */
export function Section({
  tono = 'claro',
  className,
  children,
  id,
  'aria-labelledby': labelledBy,
}: {
  tono?: 'claro' | 'blanco' | 'oscuro';
  className?: string;
  children: React.ReactNode;
  id?: string;
  'aria-labelledby'?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'relative py-20 sm:py-28',
        tono === 'oscuro' && 'oscuro bg-tinta text-primer',
        tono === 'claro' && 'bg-papel text-primer',
        tono === 'blanco' && 'bg-superficie text-primer',
        className,
      )}
    >
      {children}
    </section>
  );
}

export function H2({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className={cn('font-display text-[clamp(32px,4.4vw,54px)] font-extrabold leading-[1.02] tracking-[-0.032em] text-primer', className)}>
      {children}
    </h2>
  );
}

export function Lead({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn('max-w-[60ch] text-[18px] leading-relaxed text-secundario', className)}>{children}</p>;
}

type ButtonProps = {
  href: string;
  variant?: 'primario' | 'secundario' | 'texto';
  size?: 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  external?: boolean;
};

export function ButtonLink({ href, variant = 'primario', size = 'md', className, children, external }: ButtonProps) {
  const isExternal = external ?? /^https?:/.test(href);
  const cls = cn(
    'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,color,border-color,transform] duration-200 active:translate-y-px',
    size === 'lg' ? 'h-13 px-7 text-[16px]' : 'h-11 px-5 text-[15px]',
    variant === 'primario' && 'bg-[var(--boton)] text-[var(--boton-texto)] hover:bg-[var(--boton-hover)]',
    variant === 'secundario' && 'border border-[color-mix(in_oklab,var(--primer)_22%,transparent)] text-primer hover:border-primer',
    variant === 'texto' && 'h-auto px-0 text-acento hover:underline',
    className,
  );
  const Icon = isExternal ? ArrowUpRight : ArrowRight;
  const inner = (
    <>
      {children}
      <Icon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
    </>
  );
  return isExternal ? (
    <a href={href} className={cls} target="_blank" rel="noopener">
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Development-only marker for content the owner must supply (real cases, figures). Renders nothing in production. */
export function Pendiente({ children, className }: { children: React.ReactNode; className?: string }) {
  if (process.env.NODE_ENV === 'production') return null;
  return (
    <div className={cn('rounded-xl border border-dashed border-[color-mix(in_oklab,var(--primer)_30%,transparent)] p-5 text-[14px] text-secundario', className)}>
      <span className="mr-2 rounded bg-[#ffd84d] px-1.5 py-0.5 font-mono text-[11px] font-semibold text-tinta">PENDIENTE</span>
      {children}
    </div>
  );
}
