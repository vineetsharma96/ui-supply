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
// Adapted from https://magicui.design/docs/components/warp-background
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/warp-background.tsx
import { useCallback, useMemo } from "react";
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/warp-background.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Beam = ({
  width,
  x,
  delay,
  duration
}) => {
  const hue = Math.floor(Math.random() * 360);
  const ar = Math.floor(Math.random() * 10) + 1;
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      style: {
        "--x": `${x}`,
        "--width": `${width}`,
        "--aspect-ratio": `${ar}`,
        "--background": `linear-gradient(hsl(${hue} 80% 60%), transparent)`
      },
      className: `absolute top-0 left-(--x) aspect-[1/var(--aspect-ratio)] w-(--width) [background:var(--background)]`,
      initial: { y: "100cqmax", x: "-50%" },
      animate: { y: "-100%", x: "-50%" },
      transition: {
        duration,
        delay,
        repeat: Infinity,
        ease: "linear"
      }
    }
  );
};
var WarpBackground = ({
  children,
  perspective = 100,
  className,
  beamsPerSide = 3,
  beamSize = 5,
  beamDelayMax = 3,
  beamDelayMin = 0,
  beamDuration = 3,
  gridColor = "var(--border)",
  ...props
}) => {
  const generateBeams = useCallback(() => {
    const beams = [];
    const cellsPerSide = Math.floor(100 / beamSize);
    const step = cellsPerSide / beamsPerSide;
    for (let i = 0; i < beamsPerSide; i++) {
      const x = Math.floor(i * step);
      const delay = Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin;
      beams.push({ x, delay });
    }
    return beams;
  }, [beamsPerSide, beamSize, beamDelayMax, beamDelayMin]);
  const topBeams = useMemo(() => generateBeams(), [generateBeams]);
  const rightBeams = useMemo(() => generateBeams(), [generateBeams]);
  const bottomBeams = useMemo(() => generateBeams(), [generateBeams]);
  const leftBeams = useMemo(() => generateBeams(), [generateBeams]);
  return /* @__PURE__ */ jsxs("div", { className: cn("relative rounded border p-20", className), ...props, children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          "--perspective": `${perspective}px`,
          "--grid-color": gridColor,
          "--beam-size": `${beamSize}%`
        },
        className: "@container-[size] pointer-events-none absolute top-0 left-0 size-full overflow-hidden [clipPath:inset(0)] perspective-(--perspective) transform-3d",
        children: [
          /* @__PURE__ */ jsx("div", { className: "@container absolute z-20 h-[100cqmax] w-[100cqi] origin-[50%_0%] transform-[rotateX(-90deg)] bg-size-[var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] transform-3d", children: topBeams.map((beam, index) => /* @__PURE__ */ jsx(
            Beam,
            {
              width: `${beamSize}%`,
              x: `${beam.x * beamSize}%`,
              delay: beam.delay,
              duration: beamDuration
            },
            `top-${index}`
          )) }),
          /* @__PURE__ */ jsx("div", { className: "@container absolute top-full h-[100cqmax] w-[100cqi] origin-[50%_0%] transform-[rotateX(-90deg)] bg-size-[var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] transform-3d", children: bottomBeams.map((beam, index) => /* @__PURE__ */ jsx(
            Beam,
            {
              width: `${beamSize}%`,
              x: `${beam.x * beamSize}%`,
              delay: beam.delay,
              duration: beamDuration
            },
            `bottom-${index}`
          )) }),
          /* @__PURE__ */ jsx("div", { className: "@container absolute top-0 left-0 h-[100cqmax] w-[100cqh] origin-[0%_0%] transform-[rotate(90deg)_rotateX(-90deg)] bg-size-[var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] transform-3d", children: leftBeams.map((beam, index) => /* @__PURE__ */ jsx(
            Beam,
            {
              width: `${beamSize}%`,
              x: `${beam.x * beamSize}%`,
              delay: beam.delay,
              duration: beamDuration
            },
            `left-${index}`
          )) }),
          /* @__PURE__ */ jsx("div", { className: "@container absolute top-0 right-0 h-[100cqmax] w-[100cqh] origin-[100%_0%] transform-[rotate(-90deg)_rotateX(-90deg)] bg-size-[var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] transform-3d", children: rightBeams.map((beam, index) => /* @__PURE__ */ jsx(
            Beam,
            {
              width: `${beamSize}%`,
              x: `${beam.x * beamSize}%`,
              delay: beam.delay,
              duration: beamDuration
            },
            `right-${index}`
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "relative", children })
  ] });
};

// entry.jsx
import React3 from "react";

// registry:components/ui/card.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}

// registry:warp-background.tsx
import { useCallback as useCallback2, useMemo as useMemo2 } from "react";
import { motion as motion2 } from "motion/react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var Beam2 = ({
  width,
  x,
  delay,
  duration
}) => {
  const hue = Math.floor(Math.random() * 360);
  const ar = Math.floor(Math.random() * 10) + 1;
  return /* @__PURE__ */ jsx3(
    motion2.div,
    {
      style: {
        "--x": `${x}`,
        "--width": `${width}`,
        "--aspect-ratio": `${ar}`,
        "--background": `linear-gradient(hsl(${hue} 80% 60%), transparent)`
      },
      className: `absolute top-0 left-(--x) aspect-[1/var(--aspect-ratio)] w-(--width) [background:var(--background)]`,
      initial: { y: "100cqmax", x: "-50%" },
      animate: { y: "-100%", x: "-50%" },
      transition: {
        duration,
        delay,
        repeat: Infinity,
        ease: "linear"
      }
    }
  );
};
var WarpBackground2 = ({
  children,
  perspective = 100,
  className,
  beamsPerSide = 3,
  beamSize = 5,
  beamDelayMax = 3,
  beamDelayMin = 0,
  beamDuration = 3,
  gridColor = "var(--border)",
  ...props
}) => {
  const generateBeams = useCallback2(() => {
    const beams = [];
    const cellsPerSide = Math.floor(100 / beamSize);
    const step = cellsPerSide / beamsPerSide;
    for (let i = 0; i < beamsPerSide; i++) {
      const x = Math.floor(i * step);
      const delay = Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin;
      beams.push({ x, delay });
    }
    return beams;
  }, [beamsPerSide, beamSize, beamDelayMax, beamDelayMin]);
  const topBeams = useMemo2(() => generateBeams(), [generateBeams]);
  const rightBeams = useMemo2(() => generateBeams(), [generateBeams]);
  const bottomBeams = useMemo2(() => generateBeams(), [generateBeams]);
  const leftBeams = useMemo2(() => generateBeams(), [generateBeams]);
  return /* @__PURE__ */ jsxs2("div", { className: cn("relative rounded border p-20", className), ...props, children: [
    /* @__PURE__ */ jsxs2(
      "div",
      {
        style: {
          "--perspective": `${perspective}px`,
          "--grid-color": gridColor,
          "--beam-size": `${beamSize}%`
        },
        className: "@container-[size] pointer-events-none absolute top-0 left-0 size-full overflow-hidden [clipPath:inset(0)] perspective-(--perspective) transform-3d",
        children: [
          /* @__PURE__ */ jsx3("div", { className: "@container absolute z-20 h-[100cqmax] w-[100cqi] origin-[50%_0%] transform-[rotateX(-90deg)] bg-size-[var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] transform-3d", children: topBeams.map((beam, index) => /* @__PURE__ */ jsx3(
            Beam2,
            {
              width: `${beamSize}%`,
              x: `${beam.x * beamSize}%`,
              delay: beam.delay,
              duration: beamDuration
            },
            `top-${index}`
          )) }),
          /* @__PURE__ */ jsx3("div", { className: "@container absolute top-full h-[100cqmax] w-[100cqi] origin-[50%_0%] transform-[rotateX(-90deg)] bg-size-[var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] transform-3d", children: bottomBeams.map((beam, index) => /* @__PURE__ */ jsx3(
            Beam2,
            {
              width: `${beamSize}%`,
              x: `${beam.x * beamSize}%`,
              delay: beam.delay,
              duration: beamDuration
            },
            `bottom-${index}`
          )) }),
          /* @__PURE__ */ jsx3("div", { className: "@container absolute top-0 left-0 h-[100cqmax] w-[100cqh] origin-[0%_0%] transform-[rotate(90deg)_rotateX(-90deg)] bg-size-[var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] transform-3d", children: leftBeams.map((beam, index) => /* @__PURE__ */ jsx3(
            Beam2,
            {
              width: `${beamSize}%`,
              x: `${beam.x * beamSize}%`,
              delay: beam.delay,
              duration: beamDuration
            },
            `left-${index}`
          )) }),
          /* @__PURE__ */ jsx3("div", { className: "@container absolute top-0 right-0 h-[100cqmax] w-[100cqh] origin-[100%_0%] transform-[rotate(-90deg)_rotateX(-90deg)] bg-size-[var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] transform-3d", children: rightBeams.map((beam, index) => /* @__PURE__ */ jsx3(
            Beam2,
            {
              width: `${beamSize}%`,
              x: `${beam.x * beamSize}%`,
              delay: beam.delay,
              duration: beamDuration
            },
            `right-${index}`
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsx3("div", { className: "relative", children })
  ] });
};

// registry:components/ui/warp-background-demo.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function ExampleComponentDemo() {
  return /* @__PURE__ */ jsx4(WarpBackground2, { children: /* @__PURE__ */ jsx4(Card, { className: "w-80", children: /* @__PURE__ */ jsxs3(CardContent, { className: "flex flex-col gap-2 p-4", children: [
    /* @__PURE__ */ jsx4(CardTitle, { children: "Congratulations on Your Promotion!" }),
    /* @__PURE__ */ jsx4(CardDescription, { children: "Your hard work and dedication have paid off. We're thrilled to see you take this next step in your career. Keep up the fantastic work!" })
  ] }) }) });
}

// entry.jsx
import { jsx as jsx5 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx5("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx5("div", { className: "vendor-content", children: /* @__PURE__ */ jsx5(ExampleComponentDemo, {}) }) });
}
export {
  WarpBackground,
  Component as default
};
