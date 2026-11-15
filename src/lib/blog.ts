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
    autor: String(data.autor ?? 'Equipo Servis Digital'),
    minutos: Math.max(1, Math.round(words / 220)),
    contenido: content,
  };
}

export function getPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(read)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function getCategorias(): string[] {
  return [...new Set(getPosts().map((p) => p.categoria))];
}

export const formatFecha = (iso: string) =>
  new Intl.DateTimeFormat('es', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso));
