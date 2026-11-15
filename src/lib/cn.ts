import clsx, { type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/** Class names with conflict resolution that knows the project's theme tokens. */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: ['tinta', 'tinta-2', 'tinta-3', 'plano', 'plano-hover', 'plano-claro', 'plano-suave', 'papel', 'papel-2', 'superficie', 'texto', 'texto-2', 'texto-3', 'linea', 'acento', 'fondo', 'primer'],
      font: ['display', 'mono'],
    },
  },
});

export const cn = (...v: ClassValue[]) => twMerge(clsx(v));
