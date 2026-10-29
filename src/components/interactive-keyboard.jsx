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
// Adapted from https://www.vengenceui.com/components/interactive-keyboard
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/interactive-keyboard.tsx
import { useState, useEffect, useRef } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/interactive-keyboard.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var KEY_CODE_MAP = {
  Escape: "esc",
  F1: "f1",
  F2: "f2",
  F3: "f3",
  F4: "f4",
  F5: "f5",
  F6: "f6",
  F7: "f7",
  F8: "f8",
  F9: "f9",
  F10: "f10",
  F11: "f11",
  F12: "f12",
  F13: "f13",
  F14: "f14",
  F15: "f15",
  F16: "f16",
  F17: "f17",
  F18: "f18",
  F19: "f19",
  Backquote: "`",
  Digit1: "1",
  Digit2: "2",
  Digit3: "3",
  Digit4: "4",
  Digit5: "5",
  Digit6: "6",
  Digit7: "7",
  Digit8: "8",
  Digit9: "9",
  Digit0: "0",
  Minus: "-",
  Equal: "=",
  Backspace: "delete",
  Tab: "tab",
  KeyQ: "q",
  KeyW: "w",
  KeyE: "e",
  KeyR: "r",
  KeyT: "t",
  KeyY: "y",
  KeyU: "u",
  KeyI: "i",
  KeyO: "o",
  KeyP: "p",
  BracketLeft: "[",
  BracketRight: "]",
  Backslash: "\\",
  CapsLock: "caps lock",
  KeyA: "a",
  KeyS: "s",
  KeyD: "d",
  KeyF: "f",
  KeyG: "g",
  KeyH: "h",
  KeyJ: "j",
  KeyK: "k",
  KeyL: "l",
  Semicolon: ";",
  Quote: "'",
  Enter: "return",
  ShiftLeft: "shift",
  ShiftRight: "shift",
  KeyZ: "z",
  KeyX: "x",
  KeyC: "c",
  KeyV: "v",
  KeyB: "b",
  KeyN: "n",
  KeyM: "m",
  Comma: ",",
  Period: ".",
  Slash: "/",
  ControlLeft: "control",
  ControlRight: "control",
  AltLeft: "option",
  AltRight: "option",
  MetaLeft: "command",
  MetaRight: "command",
  Space: "space",
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  Home: "home",
  End: "end",
  PageUp: "page up",
  PageDown: "page down",
  Delete: "forward delete",
  NumLock: "clear",
  NumpadEqual: "=",
  NumpadDivide: "/",
  NumpadMultiply: "*",
  NumpadSubtract: "numpad -",
  NumpadAdd: "numpad +",
  NumpadEnter: "numpad enter",
  Numpad1: "numpad 1",
  Numpad2: "numpad 2",
  Numpad3: "numpad 3",
  Numpad4: "numpad 4",
  Numpad5: "numpad 5",
  Numpad6: "numpad 6",
  Numpad7: "numpad 7",
  Numpad8: "numpad 8",
  Numpad9: "numpad 9",
  Numpad0: "numpad 0",
  NumpadDecimal: "numpad ."
};
var PREVENT_DEFAULT_KEYS = /* @__PURE__ */ new Set([
  "space",
  "tab",
  "up",
  "down",
  "left",
  "right",
  "page up",
  "page down",
  "home",
  "end",
  "delete"
]);
function isEditableTarget(target) {
  const el = target;
  return !!el && (el.isContentEditable || el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT");
}
function InteractiveKeyboard({ className, onKeyClick, onKeyPress, onPointerEnter, onPointerLeave, ...props }) {
  const [capsLock, setCapsLock] = useState(false);
  const [pressedKeys, setPressedKeys] = useState(/* @__PURE__ */ new Set());
  const hoverRef = useRef(false);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!hoverRef.current || isEditableTarget(event.target)) return;
      const keyName = KEY_CODE_MAP[event.code];
      if (!keyName) return;
      if (PREVENT_DEFAULT_KEYS.has(keyName)) event.preventDefault();
      if (event.repeat) return;
      if (keyName === "caps lock") {
        setCapsLock(event.getModifierState("CapsLock"));
      } else {
        setPressedKeys((prev) => new Set(prev).add(keyName));
      }
      onKeyPress?.(keyName);
    };
    const handleKeyUp = (event) => {
      const keyName = KEY_CODE_MAP[event.code];
      if (!keyName) return;
      setPressedKeys((prev) => {
        if (keyName === "command") return /* @__PURE__ */ new Set();
        if (!prev.has(keyName)) return prev;
        const next = new Set(prev);
        next.delete(keyName);
        return next;
      });
    };
    const handleBlur = () => setPressedKeys(/* @__PURE__ */ new Set());
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, [onKeyPress]);
  const handleKeyClick = (keyName) => {
    if (keyName === "caps lock") {
      setCapsLock(!capsLock);
    }
    onKeyClick?.(keyName);
  };
  const keyProps = (keyName) => ({
    onClick: () => handleKeyClick(keyName),
    "data-pressed": pressedKeys.has(keyName) || void 0
  });
  const handlePointerEnter = (event) => {
    hoverRef.current = true;
    onPointerEnter?.(event);
  };
  const handlePointerLeave = (event) => {
    hoverRef.current = false;
    setPressedKeys(/* @__PURE__ */ new Set());
    onPointerLeave?.(event);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("interactive-keyboard-wrapper", className),
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
      ...props,
      children: [
        /* @__PURE__ */ jsx("style", { children: `
        .interactive-keyboard-wrapper {
          --kb-key-top: hsl(0,0%,99%);
          --kb-key-bottom: hsl(0,0%,93%);
          --kb-text: hsl(0,0%,40%);
          --kb-key-shadow:
            0 0 0.02em 0.01em hsla(0,0%,0%,0.45),
            0 0.05em 0.06em hsla(0,0%,0%,0.28),
            0 0.03em 0.02em hsla(0,0%,100%,0.95) inset,
            0 -0.04em 0.05em hsla(0,0%,0%,0.12) inset;
          --kb-key-shadow-pressed:
            0 0 0.02em 0.01em hsla(0,0%,0%,0.5),
            0 0.01em 0.02em hsla(0,0%,0%,0.2),
            0 0.02em 0.04em hsla(0,0%,0%,0.18) inset,
            0 -0.02em 0.03em hsla(0,0%,100%,0.4) inset;
          --kb-press-brightness: 0.96;
          --kb-focus-bg: hsl(0,0%,100%);
          --kb-focus-text: hsl(0,0%,54%);

          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
          display: flex;
          width: 100%;
          justify-content: center;
          padding: 1em;
        }

        :is(.dark, [data-theme="dark"]) .interactive-keyboard-wrapper {
          --kb-key-top: #18181b;
          --kb-key-bottom: #0c0b10;
          --kb-text: #b4b4bc;
          --kb-key-shadow:
            0 0 0.02em 0.01em rgba(0,0,0,0.9),
            0 0.05em 0.07em rgba(0,0,0,0.55),
            0 0.03em 0.02em rgba(255,255,255,0.09) inset,
            0 -0.04em 0.06em rgba(0,0,0,0.6) inset;
          --kb-key-shadow-pressed:
            0 0 0.02em 0.01em rgba(0,0,0,0.95),
            0 0.01em 0.02em rgba(0,0,0,0.5),
            0 0.03em 0.05em rgba(0,0,0,0.8) inset,
            0 -0.02em 0.02em rgba(255,255,255,0.05) inset;
          --kb-press-brightness: 1.25;
          --kb-focus-bg: #222224;
          --kb-focus-text: #ffffff;
        }

        .interactive-keyboard-wrapper button {
          background-image: linear-gradient(180deg, var(--kb-key-top), var(--kb-key-bottom));
          border-radius: 0.15em;
          box-shadow: var(--kb-key-shadow);
          color: var(--kb-text);
          display: block;
          font-size: 1em;
          outline: transparent;
          position: relative;
          transition: transform 60ms ease, box-shadow 60ms ease, filter 60ms ease;
          -webkit-appearance: none;
          appearance: none;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
          border: 0;
          margin: 0;
          padding: 0;
          cursor: pointer;
        }

        .interactive-keyboard-wrapper button:active,
        .interactive-keyboard-wrapper button[data-pressed] {
          box-shadow: var(--kb-key-shadow-pressed);
          transform: translateY(0.04em) scale(0.97);
          filter: brightness(var(--kb-press-brightness));
        }
        .interactive-keyboard-wrapper button:focus-visible {
          background-color: var(--kb-focus-bg);
          color: var(--kb-focus-text);
        }
        .interactive-keyboard-wrapper button span {
          display: inline-flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }
        .interactive-keyboard-wrapper button > span {
          margin: auto;
          padding: 0.2em 0.375em;
          position: absolute;
          top: 50%;
          left: 0;
          font-size: 0.5em;
          line-height: 2;
          transform: translateY(-50%) scaleX(0.875);
          width: 100%;
        }
        .interactive-keyboard-wrapper button[aria-pressed="true"] .dot-light {
          color: hsl(88,100%,50%);
          text-shadow: 0 0 2px hsl(88,100%,27%);
        }

        /* Keyboard */
        .ikb-keyboard {
          background-image: linear-gradient(90deg,hsl(0,0%,53%),hsl(0,0%,80%));
          border-radius: 0.5em;
          box-shadow:
            -1em -1em 1.5em hsla(0,0%,0%,0.6),
            0 0 0 1px hsl(0,0%,67%) inset;
          display: grid;
          gap: 0.375em 0.875em;
          grid-template-columns: 21.25em 4.125em 5.65em;
          grid-template-rows: 0.75em 1.125em 1.125em 1.125em 1.125em 1.375em;
          font-size: clamp(6px, calc((100cqw - 96px) / 33.25), 24px);
          margin: auto;
          padding: 0.25em;
          width: 33.25em;
          height: 9em;
        }

        :is(.dark, [data-theme="dark"]) .interactive-keyboard-wrapper .ikb-keyboard {
           background-image: linear-gradient(135deg, #1b1b1e, #070708);
           box-shadow:
             0 2em 4em -1em rgba(0,0,0,0.6),
             0 0 0 1px rgba(255,255,255,0.07) inset,
             0 1px 1px rgba(255,255,255,0.12) inset;
        }

        .ikb-row {
          display: flex;
          gap: 0.35em;
        }
        .ikb-row:nth-of-type(14) {
          margin: auto;
        }
        .ikb-row:nth-of-type(n + 14):nth-of-type(-3n + 17) {
          transform: translateY(0.25em);
        }
        .interactive-keyboard-wrapper button > span.ikb-bump {
          border-radius: 0.1em;
          box-shadow: -0.05em -0.02em 0 0.05em hsla(0,0%,0%,0.3);
          padding: 0;
          top: 85%;
          left: calc(50% - 0.4em);
          width: 0.8em;
          height: 0.15em;
          transform: none;
        }

        /* Button size */
        .ikb-btn-0 { width: 1.19em; height: 0.75em; }
        .ikb-btn-1 { width: 1.125em; height: 0.75em; }
        .ikb-btn-2 { width: 1.125em; height: 1.125em; }
        .ikb-btn-3 { width: 2em; height: 1.125em; }
        .ikb-btn-4 { width: 2.3em; height: 1.125em; }
        .ikb-btn-5 { width: 3.05em; height: 1.125em; }
        .ikb-btn-6 { width: 1.5625em; height: 1.375em; }
        .ikb-btn-7 { width: 1.8375em; height: 1.375em; }
        .ikb-btn-8 { width: 1.125em; height: 1.375em; }
        .ikb-btn-9 { width: 2.6875em; height: 1.375em; }
        .ikb-btn-10 { width: 1.125em; height: 2.875em; }
        .ikb-btn-longest { width: 8.625em; height: 1.375em; }

        /* Alignment */
        .interactive-keyboard-wrapper button > span.ikb-ul,
        .interactive-keyboard-wrapper button > span.ikb-ll,
        .interactive-keyboard-wrapper button > span.ikb-ur,
        .interactive-keyboard-wrapper button > span.ikb-lr { top: 0; transform: scaleX(0.875); }
        .interactive-keyboard-wrapper button > span.ikb-ul,
        .interactive-keyboard-wrapper button > span.ikb-ll { justify-content: flex-start; transform-origin: 0 50%; }
        .interactive-keyboard-wrapper button > span.ikb-ur,
        .interactive-keyboard-wrapper button > span.ikb-lr { justify-content: flex-end; transform-origin: 100% 50%; }
        .interactive-keyboard-wrapper button > span.ikb-ll,
        .interactive-keyboard-wrapper button > span.ikb-lr { top: auto; bottom: 0; }
        .interactive-keyboard-wrapper button > span.ikb-noxscale { transform: translateY(-50%) scaleX(1); }
        .interactive-keyboard-wrapper button > span.ikb-ll.ikb-noxscale,
        .interactive-keyboard-wrapper button > span.ikb-lr.ikb-noxscale { transform: scaleX(1); }

        /* Fonts */
        .interactive-keyboard-wrapper button > span.ikb-xxxs { font-size: 0.2em; line-height: 1.5; }
        .interactive-keyboard-wrapper button > span.ikb-xxs { font-size: 0.25em; line-height: 1.5; }
        .interactive-keyboard-wrapper button > span.ikb-xs { font-size: 0.3em; line-height: 1.125; }
        .interactive-keyboard-wrapper button > span.ikb-sm { font-size: 0.4em; line-height: 1.25; }

        /* Icons */
        .ikb-up, .ikb-right, .ikb-down, .ikb-left { width: 0; height: 0; vertical-align: 0.1em; }
        .ikb-up { border-left: 0.25em solid transparent; border-right: 0.25em solid transparent; border-bottom: 0.5em solid currentColor; }
        .ikb-right { border-left: 0.5em solid currentColor; border-top: 0.25em solid transparent; border-bottom: 0.25em solid transparent; }
        .ikb-down { border-left: 0.25em solid transparent; border-right: 0.25em solid transparent; border-top: 0.5em solid currentColor; }
        .ikb-left { border-right: 0.5em solid currentColor; border-top: 0.25em solid transparent; border-bottom: 0.25em solid transparent; }

        .ikb-pause { border-left: 0.2em solid; border-right: 0.2em solid; vertical-align: 0.1em; width: 0.475em; height: 0.5em; }
        .ikb-emoji { filter: saturate(0); -webkit-filter: saturate(0); }

        .ikb-block { margin-left: 0.1em; height: 0.8em; width: 0.6em; vertical-align: 0.1em; }
        .ikb-cascade { position: relative; height: 1em; width: 1.2em; }
        .ikb-cascade:before, .ikb-cascade:after { content: ""; position: absolute; height: 0.45em; width: 0.8em; }
        .ikb-cascade:before { top: 0; left: 0; }
        .ikb-cascade:after { right: 0; bottom: 0; }

        .ikb-block, .ikb-cascade:before, .ikb-cascade:after { border: 1px solid; }
        .ikb-apps:before, .ikb-apps:after { font-weight: bold; display: block; content: "\\25A1\\25A1\\25A1"; line-height: 0.875; }

        .interactive-keyboard-wrapper button > span.ikb-noxpad { padding: 0.2em 0; }
      ` }),
        /* @__PURE__ */ jsxs("div", { className: "ikb-keyboard", children: [
          /* @__PURE__ */ jsxs("div", { className: "ikb-row", children: [
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-0", ...keyProps("esc"), children: /* @__PURE__ */ jsx("span", { className: "ikb-xs", children: "esc" }) }),
            /* @__PURE__ */ jsxs("button", { type: "button", className: "ikb-btn-0", ...keyProps("f1"), children: [
              /* @__PURE__ */ jsx("span", { className: "ikb-xs ikb-noxscale", children: /* @__PURE__ */ jsx("span", { className: "ikb-emoji", children: "\u{1F505}" }) }),
              /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xxxs", children: "F1" })
            ] }),
            /* @__PURE__ */ jsxs("button", { type: "button", className: "ikb-btn-0", ...keyProps("f2"), children: [
              /* @__PURE__ */ jsx("span", { className: "ikb-xs ikb-noxscale", children: /* @__PURE__ */ jsx("span", { className: "ikb-emoji", children: "\u{1F506}" }) }),
              /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xxxs", children: "F2" })
            ] }),
            /* @__PURE__ */ jsxs("button", { type: "button", className: "ikb-btn-0", ...keyProps("f3"), children: [
              /* @__PURE__ */ jsxs("span", { className: "ikb-xs ikb-noxscale", children: [
                /* @__PURE__ */ jsx("span", { className: "ikb-cascade" }),
                /* @__PURE__ */ jsx("span", { className: "ikb-block" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xxxs", children: "F3" })
            ] }),
            /* @__PURE__ */ jsxs("button", { type: "button", className: "ikb-btn-0", ...keyProps("f4"), children: [
              /* @__PURE__ */ jsx("span", { className: "ikb-xxxs ikb-noxscale", children: /* @__PURE__ */ jsx("span", { className: "ikb-apps" }) }),
              /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xxxs", children: "F4" })
            ] }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-0", ...keyProps("f5"), children: /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xxxs", children: "F5" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-0", ...keyProps("f6"), children: /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xxxs", children: "F6" }) }),
            /* @__PURE__ */ jsxs("button", { type: "button", className: "ikb-btn-0", ...keyProps("f7"), children: [
              /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "ikb-left" }),
                /* @__PURE__ */ jsx("span", { className: "ikb-left" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xxxs", children: "F7" })
            ] }),
            /* @__PURE__ */ jsxs("button", { type: "button", className: "ikb-btn-0", ...keyProps("f8"), children: [
              /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "ikb-right" }),
                /* @__PURE__ */ jsx("span", { className: "ikb-pause" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xxxs", children: "F8" })
            ] }),
            /* @__PURE__ */ jsxs("button", { type: "button", className: "ikb-btn-0", ...keyProps("f9"), children: [
              /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "ikb-right" }),
                /* @__PURE__ */ jsx("span", { className: "ikb-right" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xxxs", children: "F9" })
            ] }),
            /* @__PURE__ */ jsxs("button", { type: "button", className: "ikb-btn-0", ...keyProps("f10"), children: [
              /* @__PURE__ */ jsx("span", { className: "ikb-xs ikb-noxscale", children: /* @__PURE__ */ jsx("span", { className: "ikb-emoji", children: "\u{1F508}" }) }),
              /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xxxs", children: "F10" })
            ] }),
            /* @__PURE__ */ jsxs("button", { type: "button", className: "ikb-btn-0", ...keyProps("f11"), children: [
              /* @__PURE__ */ jsx("span", { className: "ikb-xs ikb-noxscale", children: /* @__PURE__ */ jsx("span", { className: "ikb-emoji", children: "\u{1F509}" }) }),
              /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xxxs", children: "F11" })
            ] }),
            /* @__PURE__ */ jsxs("button", { type: "button", className: "ikb-btn-0", ...keyProps("f12"), children: [
              /* @__PURE__ */ jsx("span", { className: "ikb-xs ikb-noxscale", children: /* @__PURE__ */ jsx("span", { className: "ikb-emoji", children: "\u{1F50A}" }) }),
              /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xxxs", children: "F12" })
            ] }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-0", ...keyProps("eject"), children: /* @__PURE__ */ jsx("span", { className: "ikb-xs ikb-noxscale", children: "\u23CF" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ikb-row", children: [
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-1", ...keyProps("f13"), children: /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xxxs", children: "F13" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-1", ...keyProps("f14"), children: /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xxxs", children: "F14" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-1", ...keyProps("f15"), children: /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xxxs", children: "F15" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ikb-row", children: [
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-1", ...keyProps("f16"), children: /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xxxs", children: "F16" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-1", ...keyProps("f17"), children: /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xxxs", children: "F17" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-1", ...keyProps("f18"), children: /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xxxs", children: "F18" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-1", ...keyProps("f19"), children: /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xxxs", children: "F19" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ikb-row", children: [
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("`"), children: /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
              "~",
              /* @__PURE__ */ jsx("br", {}),
              "`"
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("1"), children: /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
              "!",
              /* @__PURE__ */ jsx("br", {}),
              "1"
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("2"), children: /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
              "@",
              /* @__PURE__ */ jsx("br", {}),
              "2"
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("3"), children: /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
              "#",
              /* @__PURE__ */ jsx("br", {}),
              "3"
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("4"), children: /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
              "$",
              /* @__PURE__ */ jsx("br", {}),
              "4"
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("5"), children: /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
              "%",
              /* @__PURE__ */ jsx("br", {}),
              "5"
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("6"), children: /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
              "^",
              /* @__PURE__ */ jsx("br", {}),
              "6"
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("7"), children: /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
              "&",
              /* @__PURE__ */ jsx("br", {}),
              "7"
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("8"), children: /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
              "*",
              /* @__PURE__ */ jsx("br", {}),
              "8"
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("9"), children: /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
              "(",
              /* @__PURE__ */ jsx("br", {}),
              "9"
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("0"), children: /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
              ")",
              /* @__PURE__ */ jsx("br", {}),
              "0"
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("-"), children: /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
              "_",
              /* @__PURE__ */ jsx("br", {}),
              "-"
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("="), children: /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
              "+",
              /* @__PURE__ */ jsx("br", {}),
              "="
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-3", ...keyProps("delete"), children: /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xs", children: "delete" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ikb-row", children: [
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("fn"), children: /* @__PURE__ */ jsx("span", { className: "ikb-xs", children: "fn" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("home"), children: /* @__PURE__ */ jsx("span", { className: "ikb-xs", children: "home" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("page up"), children: /* @__PURE__ */ jsx("span", { className: "ikb-xs", children: "page up" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ikb-row", children: [
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("clear"), children: /* @__PURE__ */ jsx("span", { className: "ikb-xs", children: "clear" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("="), children: /* @__PURE__ */ jsx("span", { children: "=" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("/"), children: /* @__PURE__ */ jsx("span", { children: "/" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("*"), children: /* @__PURE__ */ jsx("span", { children: "*" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ikb-row", children: [
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-3", ...keyProps("tab"), children: /* @__PURE__ */ jsx("span", { className: "ikb-ll ikb-xs", children: "tab" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("q"), children: /* @__PURE__ */ jsx("span", { children: "Q" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("w"), children: /* @__PURE__ */ jsx("span", { children: "W" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("e"), children: /* @__PURE__ */ jsx("span", { children: "E" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("r"), children: /* @__PURE__ */ jsx("span", { children: "R" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("t"), children: /* @__PURE__ */ jsx("span", { children: "T" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("y"), children: /* @__PURE__ */ jsx("span", { children: "Y" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("u"), children: /* @__PURE__ */ jsx("span", { children: "U" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("i"), children: /* @__PURE__ */ jsx("span", { children: "I" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("o"), children: /* @__PURE__ */ jsx("span", { children: "O" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("p"), children: /* @__PURE__ */ jsx("span", { children: "P" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("["), children: /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
              "{",
              /* @__PURE__ */ jsx("br", {}),
              "["
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("]"), children: /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
              "}",
              /* @__PURE__ */ jsx("br", {}),
              "]"
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("\\"), children: /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
              "|",
              /* @__PURE__ */ jsx("br", {}),
              "\\"
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ikb-row", children: [
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("forward delete"), children: /* @__PURE__ */ jsxs("span", { className: "ikb-xs flex flex-col items-center leading-tight", children: [
              /* @__PURE__ */ jsx("span", { children: "del" }),
              /* @__PURE__ */ jsx("span", { className: "text-[1.5em] leading-none mt-0.5", children: "\u2326" })
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("end"), children: /* @__PURE__ */ jsx("span", { className: "ikb-xs", children: "end" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("page down"), children: /* @__PURE__ */ jsx("span", { className: "ikb-xs", children: "page down" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ikb-row", children: [
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("numpad 7"), children: /* @__PURE__ */ jsx("span", { children: "7" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("numpad 8"), children: /* @__PURE__ */ jsx("span", { children: "8" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("numpad 9"), children: /* @__PURE__ */ jsx("span", { children: "9" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("numpad -"), children: /* @__PURE__ */ jsx("span", { children: "-" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ikb-row", children: [
            /* @__PURE__ */ jsxs("button", { type: "button", className: "ikb-btn-4", "aria-pressed": capsLock, ...keyProps("caps lock"), children: [
              /* @__PURE__ */ jsx("span", { className: "ikb-ul ikb-xs dot-light", "aria-hidden": "true", children: "\u2022" }),
              /* @__PURE__ */ jsx("span", { className: "ikb-ll ikb-xs", children: "caps lock" })
            ] }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("a"), children: /* @__PURE__ */ jsx("span", { children: "A" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("s"), children: /* @__PURE__ */ jsx("span", { children: "S" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("d"), children: /* @__PURE__ */ jsx("span", { children: "D" }) }),
            /* @__PURE__ */ jsxs("button", { type: "button", className: "ikb-btn-2", ...keyProps("f"), children: [
              /* @__PURE__ */ jsx("span", { children: "F" }),
              /* @__PURE__ */ jsx("span", { className: "ikb-bump" })
            ] }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("g"), children: /* @__PURE__ */ jsx("span", { children: "G" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("h"), children: /* @__PURE__ */ jsx("span", { children: "H" }) }),
            /* @__PURE__ */ jsxs("button", { type: "button", className: "ikb-btn-2", ...keyProps("j"), children: [
              /* @__PURE__ */ jsx("span", { children: "J" }),
              /* @__PURE__ */ jsx("span", { className: "ikb-bump" })
            ] }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("k"), children: /* @__PURE__ */ jsx("span", { children: "K" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("l"), children: /* @__PURE__ */ jsx("span", { children: "L" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps(";"), children: /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
              ":",
              /* @__PURE__ */ jsx("br", {}),
              ";"
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("'"), children: /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
              '"',
              /* @__PURE__ */ jsx("br", {}),
              "'"
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-4", ...keyProps("return"), children: /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xs", children: "return" }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "ikb-row" }),
          /* @__PURE__ */ jsxs("div", { className: "ikb-row", children: [
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("numpad 4"), children: /* @__PURE__ */ jsx("span", { children: "4" }) }),
            /* @__PURE__ */ jsxs("button", { type: "button", className: "ikb-btn-2", ...keyProps("numpad 5"), children: [
              /* @__PURE__ */ jsx("span", { children: "5" }),
              /* @__PURE__ */ jsx("span", { className: "ikb-bump" })
            ] }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("numpad 6"), children: /* @__PURE__ */ jsx("span", { children: "6" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("numpad +"), children: /* @__PURE__ */ jsx("span", { children: "+" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ikb-row", children: [
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-5", ...keyProps("shift"), children: /* @__PURE__ */ jsx("span", { className: "ikb-ll ikb-xs", children: "shift" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("z"), children: /* @__PURE__ */ jsx("span", { children: "Z" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("x"), children: /* @__PURE__ */ jsx("span", { children: "X" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("c"), children: /* @__PURE__ */ jsx("span", { children: "C" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("v"), children: /* @__PURE__ */ jsx("span", { children: "V" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("b"), children: /* @__PURE__ */ jsx("span", { children: "B" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("n"), children: /* @__PURE__ */ jsx("span", { children: "N" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("m"), children: /* @__PURE__ */ jsx("span", { children: "M" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps(","), children: /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
              "<",
              /* @__PURE__ */ jsx("br", {}),
              ","
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("."), children: /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
              ">",
              /* @__PURE__ */ jsx("br", {}),
              "."
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("/"), children: /* @__PURE__ */ jsxs("span", { className: "ikb-sm", children: [
              "?",
              /* @__PURE__ */ jsx("br", {}),
              "/"
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-5", ...keyProps("shift"), children: /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xs", children: "shift" }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "ikb-row", children: /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("up"), children: /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx("span", { className: "ikb-up" }) }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "ikb-row", children: [
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("numpad 1"), children: /* @__PURE__ */ jsx("span", { children: "1" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("numpad 2"), children: /* @__PURE__ */ jsx("span", { children: "2" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("numpad 3"), children: /* @__PURE__ */ jsx("span", { children: "3" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-10", ...keyProps("numpad enter"), children: /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xs", children: "enter" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ikb-row", children: [
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-7", ...keyProps("control"), children: /* @__PURE__ */ jsx("span", { className: "ikb-ll ikb-xs", children: "control" }) }),
            /* @__PURE__ */ jsxs("button", { type: "button", className: "ikb-btn-6", ...keyProps("option"), children: [
              /* @__PURE__ */ jsx("span", { className: "ikb-ul ikb-xxs", children: "alt" }),
              /* @__PURE__ */ jsx("span", { className: "ikb-ll ikb-xs", children: "option" })
            ] }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-7", ...keyProps("command"), children: /* @__PURE__ */ jsxs("span", { className: "ikb-ll ikb-xs flex items-center gap-[0.3em]", children: [
              /* @__PURE__ */ jsx("span", { className: "ikb-noxscale text-[1.2em] relative top-[1px]", children: "\u2318" }),
              /* @__PURE__ */ jsx("span", { children: "command" })
            ] }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-longest", ...keyProps("space"), children: /* @__PURE__ */ jsx("span", {}) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-7", ...keyProps("command"), children: /* @__PURE__ */ jsxs("span", { className: "ikb-ll ikb-xs flex items-center gap-[0.3em]", children: [
              /* @__PURE__ */ jsx("span", { className: "ikb-noxscale text-[1.2em] relative top-[1px]", children: "\u2318" }),
              /* @__PURE__ */ jsx("span", { children: "command" })
            ] }) }),
            /* @__PURE__ */ jsxs("button", { type: "button", className: "ikb-btn-6", ...keyProps("option"), children: [
              /* @__PURE__ */ jsx("span", { className: "ikb-ur ikb-xxs", children: "alt" }),
              /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xs", children: "option" })
            ] }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-7", ...keyProps("control"), children: /* @__PURE__ */ jsx("span", { className: "ikb-lr ikb-xs", children: "control" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ikb-row", children: [
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("left"), children: /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx("span", { className: "ikb-left" }) }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("down"), children: /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx("span", { className: "ikb-down" }) }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-2", ...keyProps("right"), children: /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx("span", { className: "ikb-right" }) }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ikb-row", children: [
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-9", ...keyProps("numpad 0"), children: /* @__PURE__ */ jsx("span", { children: "0" }) }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "ikb-btn-8", ...keyProps("numpad ."), children: /* @__PURE__ */ jsx("span", { children: "." }) })
          ] })
        ] })
      ]
    }
  );
}

// entry.jsx
import React3 from "react";

// registry:components/docs/interactive-keyboard-demo.tsx
import { useState as useState2 } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function InteractiveKeyboardDemo() {
  const [lastKeyPressed, setLastKeyPressed] = useState2(null);
  const handleKeyPress = (key) => {
    setLastKeyPressed(key);
  };
  return /* @__PURE__ */ jsx2("div", { className: "w-full min-h-[240px] h-full flex flex-col items-center justify-center p-8 rounded-xl overflow-visible relative", children: /* @__PURE__ */ jsx2("div", { className: "w-full pb-8 -mx-8 px-8 flex justify-center items-start", children: /* @__PURE__ */ jsx2(InteractiveKeyboard, { onKeyClick: handleKeyPress, onKeyPress: handleKeyPress }) }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(InteractiveKeyboardDemo, {}) }) });
}
export {
  InteractiveKeyboard,
  Component as default
};
