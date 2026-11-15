import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { PRODUCTOS, type Producto } from '@/content/productos';
import { cn } from '@/lib/cn';
import { DocusAIWordmark, FacServisWordmark } from './logo';

/** Each product shown inside its own world (colors and UI), framed by the parent brand. */
export function ProductPanels({ className }: { className?: string }) {
  return (
    <div className={cn('grid gap-5 lg:grid-cols-2', className)}>
      {PRODUCTOS.map((p) => (
        <ProductPanel key={p.id} p={p} />
      ))}
    </div>
  );
}

function ProductPanel({ p }: { p: Producto }) {
  const fs = p.id === 'facservis';
  return (
    <article
      className={cn('group relative flex flex-col overflow-hidden rounded-[22px] text-white', fs ? 'bg-[var(--fs-tinta)]' : '')}
      style={
        fs
          ? { background: 'radial-gradient(90% 60% at 85% 0%, rgb(24 95 165 / 0.55), transparent 60%), var(--fs-tinta)' }
          : { background: 'radial-gradient(110% 70% at 10% 0%, rgb(185 166 255 / 0.20), transparent 60%), linear-gradient(160deg, var(--da-to), var(--da-from) 75%)' }
      }
    >
      <div className="flex items-center justify-between gap-4 px-7 pt-7 sm:px-9 sm:pt-9">
        {fs ? <FacServisWordmark className="text-[30px]" /> : <DocusAIWordmark className="text-[30px]" />}
        <span className="flex items-center gap-2 text-[13px] text-white/70">
          <span className={cn('size-1.5 rounded-full', fs ? 'bg-[#25c685]' : 'bg-[var(--da-accent)]')} aria-hidden />
          {p.estado} · {p.pais}
        </span>
      </div>
      <div className="px-7 pt-6 sm:px-9">
        <h3 className="font-display text-[26px] font-bold leading-[1.1] tracking-[-0.025em]">{p.titular}</h3>
      </div>

      <div className="relative mx-7 mt-7 sm:mx-9">{fs ? <FacServisMock /> : <DocusAIMock />}</div>

      <p className="mx-7 mt-6 flex gap-2.5 rounded-xl bg-white/[0.07] px-4 py-3 text-[14.5px] text-white/85 sm:mx-9">
        <Sparkles className={cn('mt-0.5 size-4 shrink-0', fs ? 'text-[var(--fs-ambar)]' : 'text-[var(--da-accent)]')} aria-hidden />
        <span>
          <span className="font-semibold text-white">IA dentro: </span>
          {p.ia}
        </span>
      </p>
      <div className="mt-auto px-7 pb-7 pt-8 sm:px-9 sm:pb-9">
        <a
          href={p.url}
          target="_blank"
          rel="noopener"
          className={cn(
            'inline-flex h-11 items-center gap-2 rounded-full px-5 text-[15px] font-semibold transition-colors',
            fs ? 'bg-[var(--fs-ambar)] text-[var(--fs-tinta)] hover:bg-[#b5d3f5]' : 'bg-white text-[var(--da-from)] hover:bg-[#ece7ff]',
          )}
        >
          Visitar {p.urlLabel}
          <ArrowUpRight className="size-4" aria-hidden />
        </a>
      </div>
    </article>
  );
}

/** Miniature of a FacServis invoice being authorised by the SRI (synthetic data). */
function FacServisMock() {
  const rows = [
    ['Cemento 50 kg × 12', '96,00'],
    ['Varilla 12 mm × 40', '418,00'],
    ['IVA 15 %', '77,10'],
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--fs-papel)] p-4 text-[var(--fs-tinta)] shadow-[0_24px_50px_-30px_rgb(0_0_0/0.8)]">
      <div className="flex items-center justify-between">
        <p className="font-display text-[15px] font-bold">Factura</p>
        <span className="rounded-full bg-[#25c685]/15 px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.06em] text-[#0f7a4f]">Autorizada SRI</span>
      </div>
      <p className="mt-2 font-mono text-[11px] text-[#4a5d59]">001-002-000000016 · Comercial El Sauce</p>
      <div className="mt-3 divide-y divide-[#e6ece5] text-[13px]">
        {rows.map(([a, b]) => (
          <div key={a} className="flex justify-between py-1.5">
            <span>{a}</span>
            <span className="tnum font-medium">{b}</span>
          </div>
        ))}
        <div className="flex justify-between pt-2 font-display text-[15px] font-bold">
          <span>Total</span>
          <span className="tnum">$591,10</span>
        </div>
      </div>
    </div>
  );
}

/** Miniature of DocusAI reading an invoice: document on the left, extracted fields on the right (synthetic data). */
function DocusAIMock() {
  const fields = [
    ['Proveedor', 'Suministros Levante SL'],
    ['NIF', 'B12345674'],
    ['Base imponible', '1.240,00 €'],
    ['IVA 21 %', '260,40 €'],
  ];
  return (
    <div className="grid grid-cols-[0.9fr_1.1fr] gap-3 rounded-2xl border border-white/10 bg-white p-3 text-[var(--da-from)] shadow-[0_24px_50px_-30px_rgb(0_0_0/0.8)]">
      <div className="rounded-lg bg-[#f5f5f3] p-3" aria-hidden>
        <div className="h-2 w-16 rounded bg-[#d4d3ce]" />
        <div className="mt-2 inline-block rounded bg-[#fff2a8] px-1 text-[10px] font-semibold">Suministros Levante SL</div>
        <div className="mt-1 h-1.5 w-20 rounded bg-[#e7e6e2]" />
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 w-full rounded bg-[#e7e6e2]" />
          <div className="h-1.5 w-4/5 rounded bg-[#e7e6e2]" />
          <div className="h-1.5 w-full rounded bg-[#e7e6e2]" />
        </div>
        <div className="mt-3 flex justify-end">
          <span className="rounded bg-[#fff2a8] px-1 text-[10px] font-semibold tnum">1.500,40 €</span>
        </div>
      </div>
      <dl className="flex flex-col justify-center gap-1.5 text-[12px]">
        {fields.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-2 border-b border-[#e7e6e2] pb-1.5 last:border-0">
            <dt className="text-[#6e7178]">{k}</dt>
            <dd className="tnum truncate font-medium">{v}</dd>
          </div>
        ))}
        <p className="mt-1 flex items-center gap-1.5 text-[11.5px] font-medium text-[#157f3c]">
          <Check className="size-3.5" aria-hidden /> Cuadre de IVA correcto
        </p>
      </dl>
    </div>
  );
}
