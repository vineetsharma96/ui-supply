const source = "https://skiper-ui.com/v1/skiper";
// Related public previews are variants of one implementation, rather than duplicate cards.
const studies = [
  ["amount-input", "Amount Input", "Interactive", [68,105], "Rolling digits and automatically scaled amounts."],
  ["dynamic-island", "Dynamic Island", "Interactive", [2], "An expanding status island with eleven interactive states."],
  ["knockout-bracket", "Knockout Bracket", "Data display", [107], "Pick winners and advance them through a tournament bracket."],
  ["timeline-calendar", "Timeline Calendar", "Data display", [74], "Complete and add tasks in a grouped, chronological list."],
  ["inline-sign-in", "Inline Sign In", "Interactive", [56], "A minimal email field transitions into a code and welcome state."],
  ["prompt-input", "Prompt Input", "Interactive", [81,82,83,84,85], "Five composer treatments with attachments and keyboard submission."],
  ["adaptive-navigation", "Adaptive Navigation", "Navigation", [38,57,75], "Mega menu, product bar, and workspace navigation variants."],
  ["tooltip-toolbar", "Tooltip Toolbar", "Navigation", [43,98], "Horizontal and vertical toolbars with accessible hover labels."],
  ["expandable-tabs", "Expandable Tabs", "Navigation", [96], "A compact icon navigation expands the selected label."],
  ["gooey-menu", "Gooey Menu", "Navigation", [46], "A soft, morphing action menu with working selections."],
  ["curtain-menu", "Curtain Menu", "Navigation", [13], "A full-height panel reveals oversized menu links."],
  ["country-dialog", "Country Dialog", "Interactive", [20], "Search and select a country in a native modal dialog."],
  ["wallet-sign-in", "Wallet Sign In", "Interactive", [21], "A compact wallet sign-in flow, presented as a local preview."],
  ["token-swap", "Token Swap", "Interactive", [22], "Two-way amount entry and an illustrative swap calculation."],
  ["expanding-tiles", "Expanding Tiles", "Cards & layouts", [23], "A four-tile collection expands into a single detailed card."],
  ["receive-button", "Receive Button", "Interactive", [45], "A blue pill expands into a receive panel and copy action."],
  ["infinite-canvas", "Infinite Canvas", "Interactive", [5,73], "Pan and zoom a repeating grid of pictures or graphic objects."],
  ["preloader-studies", "Preloader Studies", "Special effects", [7,8,9,10,11,15], "Six independently authored entrance and loading treatments."],
  ["drawing-cursor", "Drawing Cursor", "Special effects", [59], "Draw fading strokes with a pointer or touch input."],
  ["scroll-image-studies", "Scroll Image Studies", "Scroll effects", [32,33,71,79,104], "Grid, masonry, curtain, and team layouts respond to scroll progress."],
  ["scroll-text-studies", "Scroll Text Studies", "Scroll effects", [27,70,88], "Rolling, box reveal, and perspective text share one scroll study."],
  ["liquid-mark", "Liquid Mark", "Special effects", [12], "An SVG interpretation of a rippling chrome mark."],
  ["scroll-spy-navigation", "Scroll Spy Navigation", "Navigation", [60], "A table of contents follows the visible article section."],
  ["draggable-snap-button", "Draggable Snap Button", "Interactive", [100], "A floating control snaps to an edge after dragging."],
  ["product-feature-tour", "Product Feature Tour", "Interactive", [76,77], "A selectable feature list and carousel treatment for a product image."],
  ["interactive-cube-scene", "Interactive Cube Scene", "Interactive", [36], "Drag three-dimensional cubes and orbit their scene."],
  ["video-player", "Video Player", "Interactive", [67,91,97], "Compact, portrait, and cinema controls for the same video player."],
];
const independentlyAuthored = studies.map(([id,name,category,previews,description]) => ({
  id,name,category,source:"Skiper UI",description,url:source+previews[0],
  references:previews.map(number=>source+number),
  hint:"Independently authored from public preview screenshots. Related reference variants share one component. No premium source was accessed. Sample forms, wallet actions, and amounts are local previews.",
  imported:true,independent:true,
}));
independentlyAuthored.push(...[
  ["loading-indicators","Loading Indicators","Special effects","loader","Four lightweight loading indicators."],
  ["signup-form","Sign Up Form","Interactive","signup-form","A responsive form with native validation and a local completion state."],
  ["expandable-card","Expandable Card","Cards & layouts","expandable-card","A compact image card opens into a complete story."],
  ["shooting-stars","Shooting Stars","Special effects","shooting-stars-and-stars-background","Twinkling stars and occasional bright trails."],
].map(([id,name,category,slug,description])=>({id,name,category,source:"Aceternity UI",description,url:"https://ui.aceternity.com/components/"+slug,hint:"Independent React and CSS implementation informed by the public documentation and preview. No paid source was used.",imported:true,independent:true})));
export default independentlyAuthored;
