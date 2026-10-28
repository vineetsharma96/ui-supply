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
// Adapted from https://magicui.design/docs/components/morphing-text
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/morphing-text.tsx
import { useCallback, useEffect, useRef } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/morphing-text.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var morphTime = 1.5;
var cooldownTime = 0.5;
var useMorphingText = (texts2) => {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(/* @__PURE__ */ new Date());
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const setStyles = useCallback(
    (fraction) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current];
      if (!current1 || !current2) return;
      current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      const invertedFraction = 1 - fraction;
      current1.style.filter = `blur(${Math.min(
        8 / invertedFraction - 8,
        100
      )}px)`;
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;
      current1.textContent = texts2[textIndexRef.current % texts2.length];
      current2.textContent = texts2[(textIndexRef.current + 1) % texts2.length];
    },
    [texts2]
  );
  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;
    let fraction = morphRef.current / morphTime;
    if (fraction > 1) {
      cooldownRef.current = cooldownTime;
      fraction = 1;
    }
    setStyles(fraction);
    if (fraction === 1) {
      textIndexRef.current++;
    }
  }, [setStyles]);
  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const [current1, current2] = [text1Ref.current, text2Ref.current];
    if (current1 && current2) {
      current2.style.filter = "none";
      current2.style.opacity = "100%";
      current1.style.filter = "none";
      current1.style.opacity = "0%";
    }
  }, []);
  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const newTime = /* @__PURE__ */ new Date();
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1e3;
      timeRef.current = newTime;
      cooldownRef.current -= dt;
      if (cooldownRef.current <= 0) doMorph();
      else doCooldown();
    };
    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [doMorph, doCooldown]);
  return { text1Ref, text2Ref };
};
var Texts = ({ texts: texts2 }) => {
  const { text1Ref, text2Ref } = useMorphingText(texts2);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "span",
      {
        className: "absolute inset-x-0 top-0 m-auto inline-block w-full",
        ref: text1Ref
      }
    ),
    /* @__PURE__ */ jsx(
      "span",
      {
        className: "absolute inset-x-0 top-0 m-auto inline-block w-full",
        ref: text2Ref
      }
    )
  ] });
};
var SvgFilters = () => /* @__PURE__ */ jsx(
  "svg",
  {
    id: "filters",
    className: "fixed h-0 w-0",
    preserveAspectRatio: "xMidYMid slice",
    children: /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("filter", { id: "threshold", children: /* @__PURE__ */ jsx(
      "feColorMatrix",
      {
        in: "SourceGraphic",
        type: "matrix",
        values: "1 0 0 0 0\n                  0 1 0 0 0\n                  0 0 1 0 0\n                  0 0 0 255 -140"
      }
    ) }) })
  }
);
var MorphingText = ({
  texts: texts2,
  className
}) => /* @__PURE__ */ jsxs(
  "div",
  {
    className: cn(
      "relative mx-auto h-16 w-full max-w-3xl text-center font-sans text-[40pt] leading-none font-bold filter-[url(#threshold)_blur(0.6px)] md:h-24 lg:text-[6rem]",
      className
    ),
    children: [
      /* @__PURE__ */ jsx(Texts, { texts: texts2 }),
      /* @__PURE__ */ jsx(SvgFilters, {})
    ]
  }
);

// entry.jsx
import React from "react";

// registry:morphing-text.tsx
import { useCallback as useCallback2, useEffect as useEffect2, useRef as useRef2 } from "react";
import { Fragment as Fragment2, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var morphTime2 = 1.5;
var cooldownTime2 = 0.5;
var useMorphingText2 = (texts2) => {
  const textIndexRef = useRef2(0);
  const morphRef = useRef2(0);
  const cooldownRef = useRef2(0);
  const timeRef = useRef2(/* @__PURE__ */ new Date());
  const text1Ref = useRef2(null);
  const text2Ref = useRef2(null);
  const setStyles = useCallback2(
    (fraction) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current];
      if (!current1 || !current2) return;
      current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      const invertedFraction = 1 - fraction;
      current1.style.filter = `blur(${Math.min(
        8 / invertedFraction - 8,
        100
      )}px)`;
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;
      current1.textContent = texts2[textIndexRef.current % texts2.length];
      current2.textContent = texts2[(textIndexRef.current + 1) % texts2.length];
    },
    [texts2]
  );
  const doMorph = useCallback2(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;
    let fraction = morphRef.current / morphTime2;
    if (fraction > 1) {
      cooldownRef.current = cooldownTime2;
      fraction = 1;
    }
    setStyles(fraction);
    if (fraction === 1) {
      textIndexRef.current++;
    }
  }, [setStyles]);
  const doCooldown = useCallback2(() => {
    morphRef.current = 0;
    const [current1, current2] = [text1Ref.current, text2Ref.current];
    if (current1 && current2) {
      current2.style.filter = "none";
      current2.style.opacity = "100%";
      current1.style.filter = "none";
      current1.style.opacity = "0%";
    }
  }, []);
  useEffect2(() => {
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const newTime = /* @__PURE__ */ new Date();
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1e3;
      timeRef.current = newTime;
      cooldownRef.current -= dt;
      if (cooldownRef.current <= 0) doMorph();
      else doCooldown();
    };
    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [doMorph, doCooldown]);
  return { text1Ref, text2Ref };
};
var Texts2 = ({ texts: texts2 }) => {
  const { text1Ref, text2Ref } = useMorphingText2(texts2);
  return /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx2(
      "span",
      {
        className: "absolute inset-x-0 top-0 m-auto inline-block w-full",
        ref: text1Ref
      }
    ),
    /* @__PURE__ */ jsx2(
      "span",
      {
        className: "absolute inset-x-0 top-0 m-auto inline-block w-full",
        ref: text2Ref
      }
    )
  ] });
};
var SvgFilters2 = () => /* @__PURE__ */ jsx2(
  "svg",
  {
    id: "filters",
    className: "fixed h-0 w-0",
    preserveAspectRatio: "xMidYMid slice",
    children: /* @__PURE__ */ jsx2("defs", { children: /* @__PURE__ */ jsx2("filter", { id: "threshold", children: /* @__PURE__ */ jsx2(
      "feColorMatrix",
      {
        in: "SourceGraphic",
        type: "matrix",
        values: "1 0 0 0 0\n                  0 1 0 0 0\n                  0 0 1 0 0\n                  0 0 0 255 -140"
      }
    ) }) })
  }
);
var MorphingText2 = ({
  texts: texts2,
  className
}) => /* @__PURE__ */ jsxs2(
  "div",
  {
    className: cn(
      "relative mx-auto h-16 w-full max-w-3xl text-center font-sans text-[40pt] leading-none font-bold filter-[url(#threshold)_blur(0.6px)] md:h-24 lg:text-[6rem]",
      className
    ),
    children: [
      /* @__PURE__ */ jsx2(Texts2, { texts: texts2 }),
      /* @__PURE__ */ jsx2(SvgFilters2, {})
    ]
  }
);

// registry:components/ui/morphing-text-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var texts = [
  "Hello",
  "Morphing",
  "Text",
  "Animation",
  "React",
  "Component",
  "Smooth",
  "Transition",
  "Engaging"
];
function MorphingTextDemo() {
  return /* @__PURE__ */ jsx3(MorphingText2, { texts });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(MorphingTextDemo, {}) }) });
}
export {
  MorphingText,
  Component as default
};
