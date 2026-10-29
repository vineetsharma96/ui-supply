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
// Adapted from https://www.vengenceui.com/components/typing-keyboard
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/typing-keyboard.tsx
import { useEffect, useRef } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/typing-keyboard.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Key({ size = "", accent = "" }) {
  const s = size ? `--${size}` : "";
  const a1 = accent === "b" ? " tk-face--b" : accent === "o" ? " tk-face--o" : "";
  return /* @__PURE__ */ jsxs("div", { className: `tk-key tk-flex${size ? ` tk-key${s}` : ""}`, children: [
    /* @__PURE__ */ jsx("div", { className: `tk-key__front tk-face${size ? ` tk-key__front${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b3" : a1 === " tk-face--o" ? " tk-face--o3" : ""}` }),
    /* @__PURE__ */ jsx("div", { className: `tk-key__back tk-face${size ? ` tk-key__back${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b1" : a1 === " tk-face--o" ? " tk-face--o1" : ""}` }),
    /* @__PURE__ */ jsx("div", { className: `tk-key__right tk-face${size ? ` tk-key__right${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b1" : a1 === " tk-face--o" ? " tk-face--o1" : ""}` }),
    /* @__PURE__ */ jsx("div", { className: `tk-key__left tk-face${size ? ` tk-key__left${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b2" : a1 === " tk-face--o" ? " tk-face--o2" : ""}` }),
    /* @__PURE__ */ jsx("div", { className: `tk-key__top tk-face${size ? ` tk-key__top${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b1" : a1 === " tk-face--o" ? " tk-face--o1" : ""}` }),
    /* @__PURE__ */ jsx("div", { className: `tk-key__bottom tk-face${size ? ` tk-key__bottom${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b2" : a1 === " tk-face--o" ? " tk-face--o2" : ""}` })
  ] });
}
var KC_MAP = {
  81: 15,
  87: 16,
  69: 17,
  82: 18,
  84: 19,
  89: 20,
  85: 21,
  73: 22,
  79: 23,
  80: 24,
  65: 29,
  83: 30,
  68: 31,
  70: 32,
  71: 33,
  72: 34,
  74: 35,
  75: 36,
  76: 37,
  90: 41,
  88: 42,
  67: 43,
  86: 44,
  66: 45,
  78: 46,
  77: 47,
  32: 56,
  13: 39,
  8: 27
};
function TypingKeyboard({
  className,
  autoTypeText = "Draco. Fast, private, and beautiful web browser. Built with love by one stubborn developer.       ",
  typingSpeed = [40, 120],
  scale = 0.8,
  accentColor = "#3b82f6",
  secondaryAccent = "#a855f7",
  ...props
}) {
  const mainRef = useRef(null);
  const kbRef = useRef(null);
  const screenRef = useRef(null);
  useEffect(() => {
    const main = mainRef.current;
    const parent = main?.parentElement;
    if (!parent) return;
    const resize = () => main.style.setProperty("--tk-scale", Math.min(scale, (parent.clientWidth - 24) / 800, (parent.clientHeight - 24) / 600));
    const observer = new ResizeObserver(resize); observer.observe(parent); resize();
    return () => observer.disconnect();
  }, [scale]);
  useEffect(() => {
    const kb = kbRef.current;
    const screen = screenRef.current;
    if (!kb || !screen) return;
    kb.style.transform = "perspective(10000px) rotateX(60deg) rotateZ(-35deg)";
    const allKeys = kb.querySelectorAll(".tk-key");
    let alive = true;
    let idx = 0;
    let timer;
    const pressKey = (kc) => {
      const domIdx = KC_MAP[kc];
      const el = allKeys[domIdx];
      if (el) {
        el.classList.add("tk-key--down");
        setTimeout(() => el.classList.remove("tk-key--down"), 80);
      }
    };
    const typeNext = () => {
      if (!alive || !screen) return;
      const char = autoTypeText[idx];
      const kc = char === " " ? 32 : char.toUpperCase().charCodeAt(0);
      pressKey(kc);
      screen.innerHTML += char === " " ? " " : char;
      idx++;
      if (idx >= autoTypeText.length) {
        timer = setTimeout(() => {
          if (!alive) return;
          screen.innerHTML = "";
          idx = 0;
          timer = setTimeout(typeNext, 1e3);
        }, 2e3);
      } else {
        const delay = typingSpeed[0] + Math.random() * (typingSpeed[1] - typingSpeed[0]);
        timer = setTimeout(typeNext, delay);
      }
    };
    timer = setTimeout(typeNext, 1500);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [autoTypeText, typingSpeed]);
  return /* @__PURE__ */ jsxs("div", { className: cn("tk-container", className), ...props, children: [
    /* @__PURE__ */ jsx("style", { children: `
        .tk-container * { transform-style: preserve-3d; }
        .tk-container {
          width: 100%; height: 100%;
          display: flex; justify-content: center; align-items: center; overflow: hidden;
          font-family: sans-serif; font-weight: bolder;
          color: rgba(255,255,251,0.7);
          text-transform: uppercase; letter-spacing: 2px;
        }
        .tk-main {
          width: 800px; height: 600px; flex-shrink: 0;
          position: relative; cursor: pointer;
          transform: scale(var(--tk-scale, ${scale}));
          transform-origin: center center;
        }
        .tk-flex { display: flex; justify-content: center; align-items: center; }
        .tk-face { position: absolute; }

        /* Keyboard body */
        .tk-keyboard {
          width: 500px; height: 160px;
          transform: perspective(10000px) rotateX(50deg) rotateZ(-25deg);
        }
        .tk-keyboard__front { width: 500px; height: 25px; transform: rotateX(-90deg) translateZ(80px); background-color: #9C9C9C; }
        .tk-keyboard__back  { width: 500px; height: 25px; transform: rotateX(90deg) translateZ(80px); background-color: #FFFFFB; }
        .tk-keyboard__top   {
          display: flex; flex-direction: column; justify-content: space-around;
          width: 500px; height: 160px;
          transform: rotateY(0deg) translateZ(12.5px);
          background-image: linear-gradient(to bottom, color-mix(in srgb, ${accentColor} 40%, white), color-mix(in srgb, #1a1919 80%, white));
        }
        .tk-keyboard__bottom {
          width: 500px; height: 160px;
          transform: rotateY(180deg) translateZ(12.5px);
          background-color: #EAE7E5;
        }
        .tk-keyboard__right { width: 25px; height: 160px; transform: rotateY(90deg) translateZ(250px); background-color: #FFFFFB; }
        .tk-keyboard__left  { width: 25px; height: 160px; transform: rotateY(90deg) translateZ(-250px); background-color: #EAE7E5; }

        /* Screen */
        .tk-screen {
          width: 303px; height: 240px;
          transform: translateZ(100px) translateY(-200px) translateZ(50px) rotateX(270deg);
          background-color: ${accentColor};
          border-radius: 10px; padding: 16px;
          font-size: 14px; line-height: 1.5;
          word-wrap: break-word; white-space: pre-wrap; overflow: hidden;
          text-transform: none; letter-spacing: 1px; color: #fff;
          align-items: flex-start !important;
          justify-content: flex-start !important;
          box-shadow:
            0 0 5px color-mix(in srgb, ${accentColor} 80%, transparent),
            0 0 10px color-mix(in srgb, ${accentColor} 70%, transparent),
            0 0 15px color-mix(in srgb, ${accentColor} 60%, transparent),
            0 0 20px color-mix(in srgb, ${accentColor} 50%, transparent),
            0 0 40px color-mix(in srgb, ${accentColor} 40%, transparent),
            0 0 60px color-mix(in srgb, ${accentColor} 30%, transparent);
          animation: tk-screen-flicker 1s ease-in alternate infinite;
        }
        @keyframes tk-screen-flicker {
          0%, 90%, 96% { background-color: ${accentColor}; }
          93%, 100%    { background-color: color-mix(in srgb, ${accentColor} 80%, black); }
        }

        /* Keys container */
        .tk-keys {
          display: flex; justify-content: space-between;
          width: 100%;
          transform: translateZ(4px);
          padding: 0 2px;
        }

        /* Individual key \u2014 depth is 8px */
        .tk-key { width: 30px; height: 27px; transition: .05s ease; }
        .tk-key--w2 { width: 60px; }
        .tk-key--w3 { width: 90px; }
        .tk-key--w6 { width: 195px; }

        .tk-key__front { width: 30px; height: 8px; transform: rotateX(-90deg) translateZ(13.5px); background-color: #838383; }
        .tk-key__front--w2 { width: 60px; }
        .tk-key__front--w3 { width: 90px; }
        .tk-key__front--w6 { width: 195px; }

        .tk-key__back { width: 30px; height: 8px; transform: rotateX(90deg) translateZ(13.5px); background-color: #FFFFFB; }
        .tk-key__back--w2 { width: 60px; }
        .tk-key__back--w3 { width: 90px; }
        .tk-key__back--w6 { width: 195px; }

        .tk-key__top {
          width: 30px; height: 27px;
          transform: rotateY(0deg) translateZ(4px);
          background-color: #FFFFFB;
          background-image: linear-gradient(to bottom, color-mix(in srgb, ${accentColor} 30%, white), #FFFFFB);
          box-shadow: inset 0 0 0 0.5px rgba(0,0,0,0.12), 0 -1px 2px rgba(0,0,0,0.08);
        }
        .tk-key__top--w2 { width: 60px; }
        .tk-key__top--w3 { width: 90px; }
        .tk-key__top--w6 { width: 195px; }

        .tk-key__bottom { width: 30px; height: 27px; transform: rotateY(180deg) translateZ(4px); background-color: #838383; }
        .tk-key__bottom--w2 { width: 60px; }
        .tk-key__bottom--w3 { width: 90px; }
        .tk-key__bottom--w6 { width: 195px; }

        .tk-key__right { width: 8px; height: 27px; transform: rotateY(90deg) translateZ(15px); background-color: #838383; }
        .tk-key__right--w2 { transform: rotateY(90deg) translateZ(30px); }
        .tk-key__right--w3 { transform: rotateY(90deg) translateZ(45px); }
        .tk-key__right--w6 { transform: rotateY(90deg) translateZ(97.5px); }

        .tk-key__left {
          width: 8px; height: 27px;
          transform: rotateY(90deg) translateZ(-15px);
          background-image: linear-gradient(to bottom, #c4c4c4, #b8b8b8);
        }
        .tk-key__left--w2 { transform: rotateY(90deg) translateZ(-30px); }
        .tk-key__left--w3 { transform: rotateY(90deg) translateZ(-45px); }
        .tk-key__left--w6 { transform: rotateY(90deg) translateZ(-97.5px); }

        /* Accent colors */
        .tk-face--b1 { background: ${accentColor}; }
        .tk-face--b2 { background-image: linear-gradient(to bottom, color-mix(in srgb, ${accentColor} 80%, black), ${accentColor}); }
        .tk-face--b3 { background-color: color-mix(in srgb, ${accentColor} 60%, black); }

        .tk-face--o1 { background: ${secondaryAccent}; }
        .tk-face--o2 { background-image: linear-gradient(to bottom, color-mix(in srgb, ${secondaryAccent} 80%, black), ${secondaryAccent}); }
        .tk-face--o3 { background-color: color-mix(in srgb, ${secondaryAccent} 60%, black); }

        /* Pressed state */
        .tk-key--down {
          display: flex; justify-content: center; align-items: center;
          transform: translateZ(-5px);
          transition: .05s ease;
        }
        .tk-key--down > .tk-key__top {
          background: color-mix(in srgb, ${secondaryAccent} 80%, white) !important;
        }
      ` }),
    /* @__PURE__ */ jsx("div", { className: "tk-main tk-flex", ref: mainRef, children: /* @__PURE__ */ jsxs("div", { className: "tk-keyboard tk-flex", ref: kbRef, children: [
      /* @__PURE__ */ jsx("div", { className: "tk-screen tk-flex", ref: screenRef }),
      /* @__PURE__ */ jsx("div", { className: "tk-keyboard__front tk-face" }),
      /* @__PURE__ */ jsx("div", { className: "tk-keyboard__back tk-face" }),
      /* @__PURE__ */ jsx("div", { className: "tk-keyboard__right tk-face" }),
      /* @__PURE__ */ jsx("div", { className: "tk-keyboard__left tk-face" }),
      /* @__PURE__ */ jsxs("div", { className: "tk-keyboard__top tk-face", children: [
        /* @__PURE__ */ jsxs("div", { className: "tk-keys", children: [
          /* @__PURE__ */ jsx(Key, { accent: "b" }),
          Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsx(Key, {}, `r1-${i}`)),
          /* @__PURE__ */ jsx(Key, { size: "w2", accent: "b" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "tk-keys", children: [
          /* @__PURE__ */ jsx(Key, { size: "w2", accent: "b" }),
          Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsx(Key, {}, `r2-${i}`)),
          /* @__PURE__ */ jsx(Key, { accent: "b" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "tk-keys", children: [
          /* @__PURE__ */ jsx(Key, { size: "w3", accent: "b" }),
          Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ jsx(Key, {}, `r3-${i}`)),
          /* @__PURE__ */ jsx(Key, { size: "w2", accent: "o" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "tk-keys", children: [
          /* @__PURE__ */ jsx(Key, { size: "w2", accent: "b" }),
          Array.from({ length: 11 }).map((_, i) => /* @__PURE__ */ jsx(Key, {}, `r4-${i}`)),
          /* @__PURE__ */ jsx(Key, { size: "w3", accent: "b" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "tk-keys", children: [
          /* @__PURE__ */ jsx(Key, { accent: "b" }),
          /* @__PURE__ */ jsx(Key, { accent: "o" }),
          Array.from({ length: 2 }).map((_, i) => /* @__PURE__ */ jsx(Key, { accent: "b" }, `r5a-${i}`)),
          /* @__PURE__ */ jsx(Key, { size: "w6" }),
          Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx(Key, { accent: "b" }, `r5b-${i}`))
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "tk-keyboard__bottom tk-face" })
    ] }) })
  ] });
}

// entry.jsx
import React2 from "react";

// registry:components/docs/typing-keyboard-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function TypingKeyboardDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "flex w-full h-full min-h-[240px] items-center justify-center", children: /* @__PURE__ */ jsx2(
    TypingKeyboard,
    {
      autoTypeText: "Draco. Fast, private, and beautiful web browser. Built with love.",
      typingSpeed: [50, 130],
      scale: 0.75
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(TypingKeyboardDemo, {}) }) });
}
export {
  TypingKeyboard,
  Component as default
};
