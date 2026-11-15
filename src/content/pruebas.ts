/**
 * Real evidence only. Every list starts empty on purpose: nothing here may be invented.
 * Sections that read from this file render only when it has entries; in development an
 * empty list shows a dashed placeholder saying what to add.
 */

export type Caso = {
  cliente: string;
  sector: string;
  pais: 'Ecuador' | 'España';
  /** What was wrong before, in one sentence. */
  antes: string;
  /** What we did. */
  solucion: string;
  /** Measured outcome, only if it was measured. */
  resultado?: string;
  url?: string;
};

export type Cifra = { valor: string; etiqueta: string; fuente: string };

export type Testimonio = { texto: string; nombre: string; cargo: string; empresa: string };

export const CASOS: Caso[] = [];

export const CIFRAS: Cifra[] = [];

export const TESTIMONIOS: Testimonio[] = [];

/** Client company names allowed to appear as a logo/name strip. */
export const CLIENTES: string[] = [];
