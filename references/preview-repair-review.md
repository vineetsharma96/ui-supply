# Preview repair review

Reviewed the 304-entry catalog on 29 October 2026. Changes are local for review.

## Repairs

- Synchronized the HTML dark class with the selected theme. Shader and keyboard demos that inspect the class now agree with the catalog's theme.
- Repaired the preview grid's minimum track sizing and centered oversized examples safely. Fitted device frames, canvases, cards, tabs, logos, and keyboards to smaller preview windows.
- Sized and centered Morph Text; fitted Interactive Book to an open two-page spread, restored its 3D stacking, hid closed pages, and made page content scrollable.
- Restored Glass Dock's seven icons and removed duplicate nested button actions.
- Supplied Animated Rays' missing stripe variable and animation, Rainbow Button's missing color variables, and shared accent/secondary tokens. Corrected invalid `boxShadow` declarations in pulse keyframes.
- Restored FAQ text contrast in dark mode and corrected narrow-screen headline sizing.
- Gave Text Hover Effect a full-width canvas. Image Slider now shows its heading and action immediately, even if a remote image is slow or unavailable.
- Corrected the duplicated Parallax Scroll reference so motion observes the scrollable element; reduced empty padding before the gallery.
- Fitted Awwwards navigation and Skiper 16/53 examples on mobile. Kept Text Reveal Card's description at its normal reading size.
- Increased detail-preview height and added **Open full preview** for scroll-heavy demonstrations.

## Verification and evidence

The health sweep visits every standalone preview at 840 × 460 in dark mode and 390 × 460 in light mode. It records runtime exceptions, missing roots, horizontal document overflow, and broken image elements, with screenshots for visual review. All 304 entries completed both captures; two initial capture timeouts passed in fresh browser sessions.

Local evidence is intentionally ignored by Git:

- `references/preview-health/final/results.json`: all 304 capture results.
- `references/preview-health/final/*-desktop.jpg` and `*-mobile.jpg`: individual captures.
- `references/preview-health/final/sheet-mobile-*.jpg`: contact sheets covering the complete catalog.
- `references/preview-health/repairs/results.json`: focused repair checks.
- `references/interaction-check-results.json`: navigation, copy/download, responsive widths, and representative interaction checks.

The broad interaction suite passed 29 groups. All 10 focused repair checks passed, including book opening/page turning, a failed image host, the real parallax scroll transform, mobile navigation bounds, and the full-preview link. The final production build and catalog/source coverage audit passed. The build retains existing chunk-size and mixed static/dynamic syntax-highlighter import warnings.

The capture sweep is a rendering/layout check, not a claim that every possible interaction state has been tested. Remote photos, video, and models can load after the first capture. Screenshot runs block remote font requests to check fallback layouts; camera and microphone access are not enabled by the health sweep. The normal app retains its font and media requests.

## Recheck

Build and serve the production output with `npm run build` and `npm run preview`. Set `PREVIEW_URL` to that server, then run:

```sh
node scripts/check-preview-health.mjs
node scripts/verify-preview-repairs.mjs
node scripts/verify-interactions.mjs
```

Use `AUDIT_PHASE` to name a capture folder, and `node scripts/render-preview-sheets.mjs <phase> mobile` to generate mobile contact sheets.
