const skiper = "https://skiper-ui.com/v1/skiper";
// Existing components are referenced instead of registering the same interaction twice.
export const extraAliases = [
  ["scroll-progress",[1,89,94,95]],
  ["image-reveal-list",[24,80]],
  ["parallax-scroll",[29,55]],
  ["animated-tooltip",[101]],
  ["animated-theme-toggler",[4,26]],
  ["stats-counter",[37,69]],
  ["skiper99",[42]],
  ["svg-mask-effect",[66]],
  ["backlight",[86]],
  ["faq-accordion",[103]],
  ["team-reveal-grid",[6]],
  ["image-trail",[18]],
  ["skiper52",[35]],
  ["glare-hover",[90]],
  ["ascii-art",[14]],
  ["progressive-blur",[41]],
  ["skiper87",[44]],
  ["search-modal",[92]],
  ["perspective-carousel",[47]],
  ["skiper51",[78]],
].flatMap(([id,numbers])=>numbers.map(number=>({id,url:skiper+number})));
extraAliases.push(
  {id:"typing-animation",url:"https://ui.aceternity.com/components/typewriter-effect"},
  {id:"globe",url:"https://ui.aceternity.com/components/github-globe"},
);
