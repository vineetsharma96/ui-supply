# UI Supply

A React component catalog with **304 unique entries**, live previews, searchable categories, and copyable JSX and CSS. The original 26 entries are retained. Related reference variants share configurable entries rather than duplicate cards.

## Run locally

```sh
npm install
npm run dev
```

The homepage is intentionally blank. Open **Components** to browse. Dark mode is the default; the theme switch remembers your choice. The catalog itself uses its own library components for navigation, buttons, search, and theme controls.

## Sources and scope

Individual components from Vengeance UI, Magic UI, Aceternity UI, and Skiper UI are included. Templates, section blocks, and a non-UI animation hook are excluded. TinyFish researched component/block indexes; Playwright captured public previews and checks local behavior.

Public registry adaptations retain credits and licenses. Paid previews are represented by independent visual and interaction studies based on public screenshots. These are interpretations, not pixel-identical reproductions or upstream API replacements. See [component coverage](references/component-coverage.md) for every source URL, duplicate resolution, and exclusion, and [credits](THIRD_PARTY.md).

## Use a component

Open a detail page and select Code. Copy JSX and CSS or download both. Original and independent components use the shared scoped styles in `src/components/components.css`. Registry adaptations may also require their listed packages, Tailwind CSS 4, and the theme/animations supplied in the CSS tab. Some demos use remote images, video, or models.

Preview frames and source files load on demand. Large 3D and syntax highlighting dependencies are loaded separately.

## Verification

```sh
npm run build
node scripts/audit-library.mjs
node scripts/verify-components.mjs
```

Preview checks use a running server; set `PREVIEW_URL` to check another server. For a complete sweep, build first and run `npm run preview`, then run `node scripts/check-preview-health.mjs` with `PREVIEW_URL` pointing to that server. It captures every entry at desktop/dark and mobile/light sizes, checks runtime errors, image failures, and horizontal overflow, and saves local screenshots under `references/preview-health/`. Set `AUDIT_PHASE` to name a capture run; pass `--retry` to retry incomplete captures. `node scripts/render-preview-sheets.mjs <phase>` makes contact sheets for visual inspection.

`scripts/verify-interactions.mjs` checks navigation, themes, copy/download, responsive widths, and representative interactions. `scripts/verify-preview-repairs.mjs` checks the repaired preview layouts and missing visuals, including image-host failure behavior. The detail toolbar also offers **Open full preview** for larger scroll demos. Research scripts and audit data are in `scripts/` and `references/`.
