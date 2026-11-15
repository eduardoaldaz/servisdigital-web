# Design

Servis Digital is the parent brand of FacServis and DocusAI. The site shares the family grammar and has its own color.

## Family

| | Servis Digital | FacServis | DocusAI |
|---|---|---|---|
| Dark band | `#08191c` petrol | `#0a1b33` navy | `#150e38` → `#281a66` violet |
| Accent | `#ffb020` amber (fills), `#9a5a00` (text on light) | `#3d7bff` blue / `#6699ff` on dark | `#5b3df5` / `#b9a6ff` on dark |
| Wordmark | Servis**Digital** | Fac**Servis** | Docus**AI** |

Shared: Figtree (text), Bricolage Grotesque 800 (headlines, wordmarks), two-tone wordmark, alternating dark and light bands, pill buttons.
Product colors appear only inside each product's own panel (`components/productos.tsx`).
Petrol + amber were the original FacServis web colors; since 2026-11 they belong to the parent brand and FacServis moves to the blue of its app.

## World: the process blueprint

- The thesis is a process drawn as a blueprint (`components/process-blueprint.tsx`): steps, who does each one (persona / IA / sistema), Hoy versus Con IA. The measuring grid (`.plano-grid`) is used only under that drawing and the home hero; nowhere else.
- Mono (JetBrains Mono) only for drawing annotations (process title, actor labels, "Ejemplo ilustrativo") and code.
- No eyebrows above headings, no icon-card grids: lists separated by 1px lines, headings carry the hierarchy.

## Tokens (`src/app/globals.css`)

- Role tokens switch per band: a section with `.oscuro` turns `--primer`, `--secundario`, `--linea`, `--acento` and the button colors to their dark-band values. Use `text-primer`, `text-secundario`, `border-linea`, `text-acento` inside sections, never fixed colors.
- Bands: `Section tono="claro" | "blanco" | "oscuro"`. Every page closes with `CtaBand` (amber field, the strongest color moment).
- Headlines: `font-display font-extrabold`, tracking -0.03 to -0.038em, `text-wrap: balance`.
- Radius: 12–22px panels, pills for buttons and chips.

## Content rules

- Real evidence only: `src/content/pruebas.ts`. Empty lists hide their section in production and show a dashed `PENDIENTE` box in development.
- Illustrative data (process examples, product mockups) is labeled as such.
