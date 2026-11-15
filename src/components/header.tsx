'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { NAV } from '@/lib/site';
import { cn } from '@/lib/cn';
import { Logo } from './logo';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'oscuro sticky top-0 z-50 bg-tinta/95 text-primer backdrop-blur-md transition-[box-shadow,border-color] duration-300',
        scrolled ? 'border-b border-white/10 shadow-[0_10px_30px_-18px_rgb(0_0_0/0.6)]' : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center gap-8 px-5 sm:px-8">
        <Link href="/" aria-label="Servis Digital, inicio" className="rounded-md">
          <Logo />
        </Link>
        <nav aria-label="Principal" className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn('rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors', active ? 'text-white' : 'text-secundario hover:text-white')}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/contacto"
          className="ml-auto hidden h-10 items-center rounded-full bg-plano-claro px-5 text-[15px] font-semibold text-tinta transition-colors hover:bg-[#c9d4ff] sm:inline-flex lg:ml-2"
        >
          Agenda una reunión
        </Link>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className="-mr-2 ml-auto flex size-11 items-center justify-center rounded-full text-white sm:ml-0 lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      <div
        id="menu-movil"
        hidden={!open}
        className="fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto border-t border-white/10 bg-tinta px-5 pb-10 pt-4 lg:hidden"
      >
        <nav aria-label="Principal móvil" className="flex flex-col">
          {[{ href: '/', label: 'Inicio' }, ...NAV, { href: '/contacto', label: 'Contacto' }].map((item) => (
            <Link key={item.href} href={item.href} className="border-b border-white/10 py-4 font-display text-[26px] font-bold tracking-[-0.02em] text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contacto" className="mt-8 flex h-13 items-center justify-center rounded-full bg-plano-claro text-[16px] font-semibold text-tinta">
          Agenda una reunión
        </Link>
      </div>
    </header>
  );
}
