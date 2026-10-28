/*
MIT License

Copyright (c) 2025-2026 Ashutoshx7

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
// Adapted from https://www.vengenceui.com/components/ascii-glitch-ripple
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/ascii-glitch-ripple.tsx
import { useEffect, useRef } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/ascii-glitch-ripple.tsx
import { jsx } from "react/jsx-runtime";
var WAVE_THRESH = 3;
var CHAR_MULT = 3;
var ANIM_STEP = 40;
var WAVE_BUF = 5;
function AsciiGlitchRipple({
  children,
  as = "a",
  className,
  dur = 1e3,
  chars = '.,\xB7-\u2500~+:;=*\u03C0""\u2510\u250C\u2518\u2534\u252C\u2557\u2554\u255D\u255A\u256C\u2560\u2563\u2569\u2566\u2551\u2591\u2592\u2593\u2588\u2584\u2580\u258C\u2590\u25A0!?&#$@0123456789*',
  preserveSpaces = true,
  spread = 1,
  ...props
}) {
  const Component2 = as;
  const elRef = useRef(null);
  const stateRef = useRef({
    origTxt: children,
    origChars: children.split(""),
    isAnim: false,
    cursorPos: 0,
    waves: [],
    animId: null,
    isHover: false,
    origW: null,
    dur,
    chars,
    preserveSpaces,
    spread
  });
  useEffect(() => {
    stateRef.current.origTxt = children;
    stateRef.current.origChars = children.split("");
    stateRef.current.dur = dur;
    stateRef.current.chars = chars;
    stateRef.current.preserveSpaces = preserveSpaces;
    stateRef.current.spread = spread;
    if (stateRef.current.origW !== null && elRef.current) {
      elRef.current.style.width = "";
      stateRef.current.origW = null;
    }
    if (!stateRef.current.isAnim && elRef.current) {
      elRef.current.textContent = children;
    }
  }, [children, dur, chars, preserveSpaces, spread]);
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    el.textContent = children;
    const updateCursorPos = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const len = stateRef.current.origTxt.length;
      const pos = Math.round(x / rect.width * len);
      stateRef.current.cursorPos = Math.max(0, Math.min(pos, len - 1));
    };
    const stop = () => {
      el.textContent = stateRef.current.origTxt;
      el.classList.remove("as");
      if (stateRef.current.origW !== null) {
        el.style.width = "";
        stateRef.current.origW = null;
      }
      stateRef.current.isAnim = false;
      if (stateRef.current.animId) {
        cancelAnimationFrame(stateRef.current.animId);
        stateRef.current.animId = null;
      }
    };
    const start = () => {
      if (stateRef.current.isAnim) return;
      if (stateRef.current.origW === null) {
        stateRef.current.origW = el.getBoundingClientRect().width;
        el.style.width = `${stateRef.current.origW}px`;
      }
      stateRef.current.isAnim = true;
      el.classList.add("as");
      const animate = () => {
        const t = Date.now();
        stateRef.current.waves = stateRef.current.waves.filter(
          (w) => t - w.startTime < stateRef.current.dur
        );
        if (stateRef.current.waves.length === 0) {
          stop();
          return;
        }
        el.textContent = genScrambledTxt(t);
        stateRef.current.animId = requestAnimationFrame(animate);
      };
      stateRef.current.animId = requestAnimationFrame(animate);
    };
    const startWave = () => {
      stateRef.current.waves.push({
        startPos: stateRef.current.cursorPos,
        startTime: Date.now(),
        id: Math.random()
      });
      if (!stateRef.current.isAnim) start();
    };
    const calcWaveEffect = (charIdx, t) => {
      let shouldAnim = false;
      let resultChar = stateRef.current.origChars[charIdx];
      for (const w of stateRef.current.waves) {
        const age = t - w.startTime;
        const prog = Math.min(age / stateRef.current.dur, 1);
        const dist = Math.abs(charIdx - w.startPos);
        const maxDist = Math.max(w.startPos, stateRef.current.origChars.length - w.startPos - 1);
        const rad = prog * (maxDist + WAVE_BUF) / stateRef.current.spread;
        if (dist <= rad) {
          shouldAnim = true;
          const intens = Math.max(0, rad - dist);
          if (intens <= WAVE_THRESH && intens > 0) {
            const index = (dist * CHAR_MULT + Math.floor(age / ANIM_STEP)) % stateRef.current.chars.length;
            resultChar = stateRef.current.chars[index];
          }
        }
      }
      return { shouldAnim, char: resultChar };
    };
    const genScrambledTxt = (t) => stateRef.current.origChars.map((char, i) => {
      if (stateRef.current.preserveSpaces && char === " ") return " ";
      const res = calcWaveEffect(i, t);
      return res.shouldAnim ? res.char : char;
    }).join("");
    const handleEnter = (e) => {
      stateRef.current.isHover = true;
      updateCursorPos(e);
      startWave();
    };
    const handleMove = (e) => {
      if (!stateRef.current.isHover) return;
      const old = stateRef.current.cursorPos;
      updateCursorPos(e);
      if (stateRef.current.cursorPos !== old) startWave();
    };
    const handleLeave = () => {
      stateRef.current.isHover = false;
    };
    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      if (stateRef.current.animId) {
        cancelAnimationFrame(stateRef.current.animId);
      }
    };
  }, [children]);
  return /* @__PURE__ */ jsx(
    Component2,
    {
      ref: elRef,
      className: cn(
        "cursor-pointer select-none relative inline-block transition-colors duration-200",
        className
      ),
      ...props
    }
  );
}

// entry.jsx
import React2 from "react";

// registry:components/docs/ascii-glitch-ripple-demo.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function AsciiGlitchRippleDemo() {
  const books = [
    { title: "Roadside Picnic \u2014 Arkady & Boris Strugatsky", dur: 1200 },
    { title: "The City & the City \u2014 China Mi\xE9ville", dur: 1e3 },
    { title: "Parable of the Sower \u2014 Octavia E. Butler", dur: 800 },
    { title: "The Fifth Head of Cerberus \u2014 Gene Wolfe", dur: 1e3 },
    { title: "His Master's Voice \u2014 Stanis\u0142aw Lem", dur: 1100 },
    { title: "The Left Hand of Darkness \u2014 Ursula K. Le Guin", dur: 900 }
  ];
  return /* @__PURE__ */ jsx2("div", { className: "flex w-full min-h-[400px] flex-col items-center justify-center p-4 font-mono", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md w-full space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "border-b border-zinc-200 dark:border-zinc-800 pb-4", children: [
      /* @__PURE__ */ jsx2("h4", { className: "text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1", children: "ASCII Glitch Ripple" }),
      /* @__PURE__ */ jsx2("p", { className: "text-xs text-zinc-500 dark:text-zinc-400", children: "Hover over the links below to trigger the ripple wave." })
    ] }),
    /* @__PURE__ */ jsx2("ul", { className: "space-y-4", children: books.map((book, idx) => /* @__PURE__ */ jsxs("li", { className: "relative group pl-6", children: [
      /* @__PURE__ */ jsx2("span", { className: "absolute left-0 top-[60%] w-3 h-[1px] bg-zinc-400 dark:bg-zinc-600 origin-right transition-transform duration-300 scale-x-100 group-hover:scale-x-150 group-hover:bg-zinc-900 dark:group-hover:bg-white" }),
      /* @__PURE__ */ jsx2(
        AsciiGlitchRipple,
        {
          as: "a",
          href: "#",
          dur: book.dur,
          spread: 1.2,
          "aria-label": book.title,
          className: "text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-200",
          children: book.title
        }
      )
    ] }, idx)) }),
    /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-zinc-400 dark:text-zinc-600 flex justify-between pt-2 border-t border-zinc-200 dark:border-zinc-900", children: [
      /* @__PURE__ */ jsx2("span", { children: "Spread: 1.2" }),
      /* @__PURE__ */ jsx2("span", { children: "Char Pool: Default ASCII" }),
      /* @__PURE__ */ jsx2("span", { children: "\u2605 Vengeance UI" })
    ] })
  ] }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(AsciiGlitchRippleDemo, {}) }) });
}
export {
  AsciiGlitchRipple,
  Component as default
};
