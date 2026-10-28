# Reference inspection

Reviewed on 28 October 2026. The original `libary.txt` remains unchanged.

All supplied component documentation links were opened/read. Public registry JSON was also retrieved for the Vengeance selections and the two free numbered Skiper selections. General Kokonut UI, Skiper UI, and Magic UI landing pages were inspected for library structure.

## Source access exceptions

| Component | Evidence | Result |
| --- | --- | --- |
| Cylinder Carousel | `cylinder-carousel.response.txt`, `cylinder-carousel.png` | Supplied raw GitHub registry returned HTTP 404. The public webpage and carousel preview were accessible. Behavior independently recreated with CSS 3D transforms. |
| Horizontal Text Reveal (#72) | `skiper72-source-unavailable.png` | Official page identifies this as a Pro component. Public preview video and documentation were accessible. Screenshot captured from the public component card. Behavior independently recreated without obtaining Pro code. |

The three numbered selections resolve to:

- `@skiper-ui/skiper72`: [Horizontal Text Reveal](https://skiper-ui.com/v1/skiper72).
- `@skiper-ui/skiper40`: [CSS Link](https://skiper-ui.com/v1/skiper40).
- `@skiper-ui/skiper19`: [SVG Follow Scroll](https://skiper-ui.com/v1/skiper19).

The JSON files are upstream research snapshots retained only in the local workspace and excluded from Git, along with the retrieval scripts and raw HTTP response. The actual code served in the library is under `src/components/`. Screenshots and these reference notes are included in the repository.

## Local preview evidence

- `library-desktop.png`: catalog at desktop size.
- `library-mobile.png`: catalog at 390px width.
- `review-*.png`: selected component preview screenshots.
- `browser-review.md`: completed functional checks and limits.
