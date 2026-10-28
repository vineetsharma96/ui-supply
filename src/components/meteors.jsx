/*
MIT License

Copyright (c) Magic UI

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
// Adapted from https://magicui.design/docs/components/meteors
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/meteors.tsx
import { useEffect, useState } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/meteors.tsx
import { Fragment, jsx } from "react/jsx-runtime";
var Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className
}) => {
  const [meteorStyles, setMeteorStyles] = useState(
    []
  );
  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      "--angle": -angle + "deg",
      top: "-5%",
      left: `calc(0% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
      animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
      animationDuration: Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) + "s"
    }));
    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);
  return /* @__PURE__ */ jsx(Fragment, { children: [...meteorStyles].map((style, idx) => (
    // Meteor Head
    /* @__PURE__ */ jsx(
      "span",
      {
        style: { ...style },
        className: cn(
          "animate-meteor pointer-events-none absolute size-0.5 rotate-(--angle) rounded-full bg-zinc-500 shadow-[0_0_0_1px_#ffffff10]",
          className
        ),
        children: /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute top-1/2 -z-10 h-px w-12.5 -translate-y-1/2 bg-linear-to-r from-zinc-500 to-transparent" })
      },
      idx
    )
  )) });
};

// entry.jsx
import React3 from "react";

// registry:meteors.tsx
import { useEffect as useEffect2, useState as useState2 } from "react";
import { Fragment as Fragment2, jsx as jsx2 } from "react/jsx-runtime";
var Meteors2 = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className
}) => {
  const [meteorStyles, setMeteorStyles] = useState2(
    []
  );
  useEffect2(() => {
    const styles = [...new Array(number)].map(() => ({
      "--angle": -angle + "deg",
      top: "-5%",
      left: `calc(0% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
      animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
      animationDuration: Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) + "s"
    }));
    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);
  return /* @__PURE__ */ jsx2(Fragment2, { children: [...meteorStyles].map((style, idx) => (
    // Meteor Head
    /* @__PURE__ */ jsx2(
      "span",
      {
        style: { ...style },
        className: cn(
          "animate-meteor pointer-events-none absolute size-0.5 rotate-(--angle) rounded-full bg-zinc-500 shadow-[0_0_0_1px_#ffffff10]",
          className
        ),
        children: /* @__PURE__ */ jsx2("div", { className: "pointer-events-none absolute top-1/2 -z-10 h-px w-12.5 -translate-y-1/2 bg-linear-to-r from-zinc-500 to-transparent" })
      },
      idx
    )
  )) });
};

// registry:components/ui/meteors-demo.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function MeteorDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border", children: [
    /* @__PURE__ */ jsx3(Meteors2, { number: 30 }),
    /* @__PURE__ */ jsx3("span", { className: "pointer-events-none bg-linear-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10", children: "Meteors" })
  ] });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(MeteorDemo, {}) }) });
}
export {
  Meteors,
  Component as default
};
