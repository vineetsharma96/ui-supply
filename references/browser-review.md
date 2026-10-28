# Browser review

Reviewed on 28 October 2026 in Chromium through Playwright.

## Completed

| Check | Result |
| --- | --- |
| Production build | `npm.cmd run build` passed after final implementation changes. |
| All selected components | All 26 detail previews rendered; all 26 JSX source views contained their corresponding component implementation. |
| Mobile layout | All 26 detail pages checked at 390 × 844; no document-level horizontal overflow. |
| Catalog search | “beam” returned Animated Beam and Border Beam, including when starting from the Interactive category. No-results state and Clear filters worked; reset restored 26 cards. |
| Category filter | Interactive showed the two selected interactive components. |
| Clipboard | JSX copy returned the actual Stats Counter source. Share Sheet copied its configured sample URL. |
| Source download | Download action produced `verse-cards-source.txt`. CSS tab displayed shared component CSS. |
| Share dialog | Opened, copied link, and closed with Escape. |
| FAQ | Native disclosure opened its answer. |
| File Tree | Selecting `button.jsx` updated the visible selection. |
| Notch Navbar | Selecting Journal updated the active state and demo content. |
| Theme toggler | Preview toggle changed its pressed state and theme. |
| Ripple and Cool Mode | Clicking created a ripple and eight particles respectively. |
| Horizontal Text Reveal | Scrolling its container revealed the final word at full opacity. |
| SVG Follow Scroll | Scrolling its container changed the stroke dash offset from about 0.93 to 0. |
| Pause motion | Flip Fade Text retained its current word across a full cycle interval while paused. |
| Motion default (updated after review) | Motion now remains enabled regardless of the device's reduced-motion preference, as requested. At 1440px and 390px widths with reduced motion emulated, Flip Fade Text cycled and the Marquee transform advanced. Manual Pause still stopped CSS motion. |
| Narrow preview | Desktop preview resized to approximately 320px after clicking Mobile preview. |
| Mobile navigation | Drawer opened and closed through its visible controls. |
| Visual review | Desktop and mobile catalog screenshots reviewed, plus Video Text, Cylinder Carousel, Verse Cards, Apple Hello Effect, Border Beam, and Team Reveal Grid. Fixed the video mask aspect and a global button-layout conflict affecting Verse Cards. |
| Built-app smoke check | Served `dist` at `http://127.0.0.1:5186`; confirmed correct title, 26 catalog entries, working detail preview, responsive preview, and source tab. Browser console reported no errors or warnings on this final production run. |

## Scope and limits

- This review used Chromium; other browser engines were not exercised.
- Screenshots and functional checks complement the source build. They are not a full accessibility audit or a claim of pixel parity with upstream libraries.
- External share destinations were not invoked. The sample data, destination URLs, portraits, and testimonial names are demonstration content.
- Network media and fonts loaded during the review. Offline support is not implemented; Video Text has a color fallback and fonts have system fallbacks.
- The public Skiper #72 preview and the Cylinder Carousel page were captured under their respective source-access exceptions. Local implementations are recreations with their own APIs.

The final preview is running locally for user review. Nothing was published.

User review update: replaced the light catalog background, white surfaces, and white component accents with ivory (`#FFFFF0`). Rebuilt the production preview and confirmed the ivory background at desktop and mobile sizes. Final console check reported no errors or warnings.
