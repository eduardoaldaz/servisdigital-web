import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const DIR = path.join(process.cwd(), 'src/content/blog');

export type PostMeta = {
  slug: string;
  titulo: string;
  resumen: string;
  fecha: string; // ISO date
  categoria: string;
  autor: string;
  minutos: number;
};

export type Post = PostMeta & { contenido: string };

function read(file: string): Post {
  const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug: file.replace(/\.mdx?$/, ''),
    titulo: String(data.titulo),
    resumen: String(data.resumen),
    fecha: new Date(data.fecha).toISOString().slice(0, 10),
    categoria: String(data.categoria ?? 'General'),
    autor: String(data.autor ?? 'Eduardo Aldaz'),
    minutos: Math.max(1, Math.round(words / 220)),
    contenido: content,
  };
}

/**
 * Published posts, newest first. A post dated in the future stays hidden until its day
 * (the Pages workflow rebuilds every morning), so articles can be written ahead and drip out.
 * `next dev` shows them all, to preview drafts.
 */
export function getPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  const hoy = new Date().toISOString().slice(0, 10);
  const verTodos = process.env.NODE_ENV === 'development';
  return fs
    .readdirSync(DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(read)
    .filter((p) => verTodos || p.fecha <= hoy)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function getCategorias(): string[] {
  return [...new Set(getPosts().map((p) => p.categoria))];
}

/** URL slug for a category: "IA en empresas" -> "ia-en-empresas". */
export const slugCategoria = (c: string) =>
  c
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const formatFecha = (iso: string) =>
  new Intl.DateTimeFormat('es', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso));
