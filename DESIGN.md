# Design

Servis Digital is the parent brand of FacServis and DocusAI. The site shares the family grammar and has its own color.

## Family

| | Servis Digital | FacServis | DocusAI |
|---|---|---|---|
| Dark band | `#0b1430` navy | `#08191c` teal-black | `#150e38` → `#281a66` violet |
| Accent | `#2347e8` cobalt / `#aebfff` on dark | `#ffb020` amber | `#5b3df5` / `#b9a6ff` on dark |
| Wordmark | Servis**Digital** | Fac**Servis** | Docus**AI** |

Shared: Figtree (text), Bricolage Grotesque 800 (headlines, wordmarks), two-tone wordmark, alternating dark and light bands, pill buttons.
Product colors appear only inside each product's own panel (`components/productos.tsx`).

## World: the process blueprint

- The thesis is a process drawn as a blueprint (`components/process-blueprint.tsx`): steps, who does each one (persona / IA / sistema), Hoy versus Con IA. The measuring grid (`.plano-grid`) is used only under that drawing and the home hero; nowhere else.
- Mono (JetBrains Mono) only for drawing annotations (process title, actor labels, "Ejemplo ilustrativo") and code.
- No eyebrows above headings, no icon-card grids: lists separated by 1px lines, headings carry the hierarchy.

## Tokens (`src/app/globals.css`)

- Role tokens switch per band: a section with `.oscuro` turns `--primer`, `--secundario`, `--linea`, `--acento` and the button colors to their dark-band values. Use `text-primer`, `text-secundario`, `border-linea`, `text-acento` inside sections, never fixed colors.
- Bands: `Section tono="claro" | "blanco" | "oscuro"`. Every page closes with `CtaBand` (cobalt field, the strongest color moment).
- Headlines: `font-display font-extrabold`, tracking -0.03 to -0.038em, `text-wrap: balance`.
- Radius: 12–22px panels, pills for buttons and chips.

## Content rules

- Real evidence only: `src/content/pruebas.ts`. Empty lists hide their section in production and show a dashed `PENDIENTE` box in development.
- Illustrative data (process examples, product mockups) is labeled as such.
