'use client';

import { useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';

type Estado = { tipo: 'idle' } | { tipo: 'enviando' } | { tipo: 'ok' } | { tipo: 'error'; mensaje: string };

const field =
  'mt-1.5 block w-full rounded-xl border border-papel-2 bg-superficie px-4 text-[16px] text-texto transition-[border-color,box-shadow] placeholder:text-texto-3 hover:border-[#c9ccc3] focus:border-plano focus:shadow-[0_0_0_4px_rgb(35_71_232/0.14)] focus:outline-none';

export function ContactForm() {
  const [estado, setEstado] = useState<Estado>({ tipo: 'idle' });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setEstado({ tipo: 'enviando' });
    try {
      const res = await fetch('/api/contacto', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error ?? 'No se ha podido enviar. Inténtalo de nuevo en unos minutos.');
      setEstado({ tipo: 'ok' });
    } catch (err) {
      setEstado({ tipo: 'error', mensaje: (err as Error).message });
    }
  };

  if (estado.tipo === 'ok') {
    return (
      <div className="rounded-2xl bg-superficie p-8" role="status">
        <span className="flex size-11 items-center justify-center rounded-full bg-plano text-white">
          <Check className="size-5" aria-hidden />
        </span>
        <h3 className="mt-5 font-display text-[26px] font-bold tracking-[-0.02em] text-texto">Recibido. Te escribiremos para proponerte horarios.</h3>
        <p className="mt-3 text-[16px] text-texto-2">Leemos cada solicitud personalmente. Si es urgente, escríbenos también por WhatsApp.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5 rounded-2xl bg-superficie p-6 sm:p-8" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-[14px] font-semibold text-texto">
          Nombre
          <input name="nombre" required autoComplete="name" className={cn(field, 'h-12')} />
        </label>
        <label className="block text-[14px] font-semibold text-texto">
          Email de trabajo
          <input name="email" type="email" required autoComplete="email" className={cn(field, 'h-12')} />
        </label>
        <label className="block text-[14px] font-semibold text-texto">
          Empresa
          <input name="empresa" required autoComplete="organization" className={cn(field, 'h-12')} />
        </label>
        <label className="block text-[14px] font-semibold text-texto">
          País
          <select name="pais" required defaultValue="" className={cn(field, 'h-12 appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2016%2016%27%3E%3Cpath%20d=%27m4.5%206.5%203.5%203.5%203.5-3.5%27%20fill=%27none%27%20stroke=%27%23636c84%27%20stroke-width=%271.5%27%20stroke-linecap=%27round%27/%3E%3C/svg%3E")] bg-[length:18px] bg-[right_14px_center] bg-no-repeat pr-10')}>
            <option value="" disabled>
              Elige un país
            </option>
            <option>Ecuador</option>
            <option>España</option>
            <option>Otro</option>
          </select>
        </label>
      </div>
      <label className="block text-[14px] font-semibold text-texto">
        ¿Qué proceso te gustaría mejorar?
        <textarea
          name="mensaje"
          required
          rows={5}
          placeholder="Por ejemplo: recibimos 300 pedidos al mes por WhatsApp y dos personas los pasan a mano al sistema."
          className={cn(field, 'resize-y py-3 leading-relaxed')}
        />
      </label>
      {/* Honeypot: humans never see it */}
      <input name="web" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] size-px opacity-0" />
      {estado.tipo === 'error' && (
        <p role="alert" className="rounded-xl bg-[#fdeeed] px-4 py-3 text-[14px] text-[#b8322a]">
          {estado.mensaje}
        </p>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-texto-3">
          Usamos tus datos solo para responderte. <a href="/privacidad" className="underline">Privacidad</a>.
        </p>
        <button
          type="submit"
          disabled={estado.tipo === 'enviando'}
          className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-plano px-6 text-[16px] font-semibold text-white transition-colors hover:bg-plano-hover disabled:opacity-70"
        >
          {estado.tipo === 'enviando' ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
          {estado.tipo === 'enviando' ? 'Enviando…' : 'Enviar y pedir reunión'}
          {estado.tipo !== 'enviando' && <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}
        </button>
      </div>
    </form>
  );
}
