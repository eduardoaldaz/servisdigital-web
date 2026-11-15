'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

/** The four-step route of the method: draws itself when it scrolls into view. */
export function Ruta({ pasos }: { pasos: { nombre: string; corto: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [vista, setVista] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVista(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ol ref={ref} className={cn('relative grid gap-10 md:grid-cols-4 md:gap-6', vista && 'ruta-vista')}>
      <span aria-hidden className="absolute bottom-3 left-[11px] top-3 w-px bg-linea md:left-3 md:right-3 md:top-[11px] md:bottom-auto md:h-px md:w-auto" />
      <span aria-hidden className="ruta-linea absolute bottom-3 left-[11px] top-3 w-0.5 bg-plano-claro md:left-3 md:right-3 md:top-[10.5px] md:bottom-auto md:h-0.5 md:w-auto" />
      {pasos.map((m, i) => (
        <li key={m.nombre} className="ruta-paso relative pl-10 md:pl-0 md:pt-12" style={{ transitionDelay: `${250 + i * 320}ms` }}>
          <span
            aria-hidden
            className={cn(
              'absolute left-0 top-0 flex size-[23px] items-center justify-center rounded-full border-2 border-plano-claro',
              i === pasos.length - 1 ? 'bg-plano-claro' : 'bg-fondo',
            )}
          >
            <span className={cn('size-[7px] rounded-full', i === pasos.length - 1 ? 'bg-tinta' : 'bg-plano-claro')} />
          </span>
          <h3 className="font-display text-[24px] font-bold tracking-[-0.02em] text-primer">{m.nombre}</h3>
          <p className="mt-1.5 text-[16px] text-secundario">{m.corto}</p>
        </li>
      ))}
    </ol>
  );
}
