# servisdigital.com

Web de Servis Digital: IA aplicada a empresas, procesos y software a medida. Empresa madre de FacServis y DocusAI.

## Desarrollo

```bash
pnpm install
cp .env.example .env.local   # opcional
pnpm dev                     # http://localhost:3200
pnpm build && pnpm start
```

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| Servicios (lista y páginas `/servicios/...`) | `src/content/servicios.ts` |
| Sectores | `src/content/sectores.ts` |
| Productos (FacServis, DocusAI) | `src/content/productos.ts` |
| Procesos del plano de la portada | `src/content/procesos.ts` |
| Método | `src/content/metodo.ts` |
| Casos, cifras y testimonios reales | `src/content/pruebas.ts` |
| Artículos del blog | `src/content/blog/*.mdx` |
| Email, WhatsApp, agenda | `.env` (ver `.env.example`) y `src/lib/site.ts` |

### Nuevo artículo del blog

Crea `src/content/blog/mi-articulo.mdx`:

```mdx
---
titulo: Título del artículo
resumen: Una o dos frases para la lista y para Google.
fecha: 2026-11-20
categoria: IA en empresas
autor: Equipo Servis Digital
---

Texto en Markdown. Admite tablas, listas y enlaces.
```

Aparece solo en `/blog`, en la portada (últimos 3), en el sitemap y en el RSS (`/blog/feed.xml`).

## Contacto y reuniones

- `NEXT_PUBLIC_BOOKING_URL`: enlace de Cal.com. Si existe, `/contacto` muestra la agenda incrustada; si no, botones de WhatsApp y correo.
- `NEXT_PUBLIC_WHATSAPP_EC` / `NEXT_PUBLIC_WHATSAPP_ES`: números de WhatsApp (solo dígitos con prefijo).

## Publicación

Sitio estático (`output: 'export'`) servido por GitHub Pages en https://servisdigital.com.
Cada push a `main` lo publica con `.github/workflows/pages.yml`. Los valores públicos se configuran en
GitHub → Settings → Secrets and variables → Actions → **Variables**: `BOOKING_URL`, `WHATSAPP_EC`, `WHATSAPP_ES`.
El dominio está en `public/CNAME`; los DNS (Namecheap) apuntan a GitHub Pages.

## Diseño

Ver `DESIGN.md` (familia de marca, tokens y reglas) y `PRODUCT.md` (posicionamiento y público).
