# UI Supply

A local React component library built from the selections in `libary.txt`. All **26 selected components** have live previews, individual detail pages, and copyable JSX and CSS.

Repository: [vineetsharma96/ui-supply](https://github.com/vineetsharma96/ui-supply).

## Run locally

```powershell
npm.cmd install
npm.cmd run dev -- --port 5173
```

Open [localhost:5173](http://localhost:5173). Build with `npm.cmd run build`; serve the build with `npm.cmd run preview`.

The completed review build is currently available at [127.0.0.1:5186](http://127.0.0.1:5186). To restart it, run `npm.cmd run preview -- --port 5186 --strictPort` after building.

## Using the library

- Browse the collection, select a category, or search by component, reference library, or keyword. Search covers all categories.
- Open a component to switch between Preview and Code, replay its animation, or inspect a narrow preview.
- Copy the JSX into a React project, then copy the shared CSS to `components.css` beside it. Include the CSS once when using multiple components.
- The source view displays the actual implementation used by the preview. Download source exports the JSX and shared CSS together, with labels, as a text file.
- Scroll effects use scrollable preview containers, so they can be explored without leaving the component page.
- Motion is enabled by default on desktop and mobile, including devices with reduced-motion preferences. Use Pause motion to stop the previews manually. The light catalog uses ivory (`#FFFFF0`); previews retain their individual visual palettes.

The standalone components require React and plain CSS. Lucide is used by the catalog interface only. Photos come from Unsplash, the Video Text clip comes from Magic UI's CDN, and catalog fonts come from Google Fonts. Those media need network access; typography falls back to system fonts, and Video Text includes a color fallback.

## Selections

| Category | Components |
| --- | --- |
| Text & typography | Stats Counter, Flip Fade Text, Stagger Text, Horizontal Text Reveal (#72), Video Text, Scroll Based Velocity, Apple Hello Effect |
| Interactive | Share Sheet, Cylinder Carousel |
| Cards & layouts | Verse Cards, Testimonials Card, Team Reveal Grid |
| Navigation | FAQ Accordion, Notch Navbar, Animated Tooltip, CSS Link (#40) |
| Scroll effects | SVG Follow Scroll (#19) |
| Special effects | Animated Beam, Border Beam, Animated Theme Toggler, Ripple Button, Cool Mode, Interactive Hover Button |
| Data display | Marquee, Terminal, File Tree |

The general Kokonut UI, Skiper UI, and Magic UI links were reviewed as library references. They did not identify additional mandatory individual components.

## Implementation and references

These are local implementations inspired by the selected references, with consistent demo content. They are not installed upstream packages or guaranteed drop-in replacements for upstream APIs. Each detail page links to its original reference.

- Skiper #72 is Horizontal Text Reveal. Its source requires a Pro license; its public preview was inspected and captured, then the behavior was independently authored.
- The supplied Cylinder Carousel registry URL returns 404. Its public preview and documented behavior were inspected and captured, then a CSS 3D cylinder was independently authored.
- Apple Hello Effect uses SVG path data adapted from Chánh Đại's MIT-licensed registry component, which credits JaceThings / SF-Hello. The upstream MIT notice is retained in the component source.
- Skiper #40 and #19 are credited to Skiper UI / gxuri; #19 also credits comgio.ai. Their local implementations use independent CSS and SVG.

See [reference notes](references/README.md) for evidence and [third-party credits](THIRD_PARTY.md) for attribution. Sample names and testimonials are demonstration content.

## Structure

```text
libary.txt                 Original selection list, preserved
src/catalog.js             Component metadata, categories, source links
src/main.jsx               Catalog, navigation, live previews, source viewer
src/styles.css             Catalog layout and responsive styles
src/components/*.jsx       One reusable component per file
src/components/components.css  Shared, scoped component styles
references/                Retrieved source references and browser evidence
```

## Verification

Production build passed. Browser review exercised all 26 detail previews and JSX source views, all 26 detail pages at a 390px viewport without page overflow, search and reset, source copying, the share dialog and link copying, FAQ disclosure, file selection, navbar states, theme toggling, particles, ripples, motion pause, and both scroll-progress effects. See [browser review](references/browser-review.md).

This is a local review build. No hosted deployment is configured.
