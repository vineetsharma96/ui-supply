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
// Adapted from https://magicui.design/docs/components/smooth-cursor
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/smooth-cursor.tsx
import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "motion/react";
import { jsx, jsxs } from "react/jsx-runtime";
var DESKTOP_POINTER_QUERY = "(any-hover: hover) and (any-pointer: fine)";
function isTrackablePointer(pointerType) {
  return pointerType !== "touch";
}
var DefaultCursorSVG = () => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: 50,
      height: 54,
      viewBox: "0 0 50 54",
      fill: "none",
      style: { scale: 0.5 },
      children: [
        /* @__PURE__ */ jsxs("g", { filter: "url(#filter0_d_91_7928)", children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z",
              fill: "black"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z",
              stroke: "white",
              strokeWidth: 2.25825
            }
          )
        ] }),
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs(
          "filter",
          {
            id: "filter0_d_91_7928",
            x: 0.602397,
            y: 0.952444,
            width: 49.0584,
            height: 52.428,
            filterUnits: "userSpaceOnUse",
            colorInterpolationFilters: "sRGB",
            children: [
              /* @__PURE__ */ jsx("feFlood", { floodOpacity: 0, result: "BackgroundImageFix" }),
              /* @__PURE__ */ jsx(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ jsx("feOffset", { dy: 2.25825 }),
              /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: 2.25825 }),
              /* @__PURE__ */ jsx("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ jsx(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                }
              ),
              /* @__PURE__ */ jsx(
                "feBlend",
                {
                  mode: "normal",
                  in2: "BackgroundImageFix",
                  result: "effect1_dropShadow_91_7928"
                }
              ),
              /* @__PURE__ */ jsx(
                "feBlend",
                {
                  mode: "normal",
                  in: "SourceGraphic",
                  in2: "effect1_dropShadow_91_7928",
                  result: "shape"
                }
              )
            ]
          }
        ) })
      ]
    }
  );
};
function SmoothCursor({
  cursor = /* @__PURE__ */ jsx(DefaultCursorSVG, {}),
  springConfig = {
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 1e-3
  }
}) {
  const lastMousePos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(Date.now());
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const rotation = useSpring(0, {
    ...springConfig,
    damping: 60,
    stiffness: 300
  });
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 500,
    damping: 35
  });
  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_POINTER_QUERY);
    const updateEnabled = () => {
      const nextIsEnabled = mediaQuery.matches;
      setIsEnabled(nextIsEnabled);
      if (!nextIsEnabled) {
        setIsVisible(false);
      }
    };
    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);
    return () => {
      mediaQuery.removeEventListener("change", updateEnabled);
    };
  }, []);
  useEffect(() => {
    if (!isEnabled) {
      return;
    }
    let timeout = null;
    const updateVelocity = (currentPos) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime.current;
      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime
        };
      }
      lastUpdateTime.current = currentTime;
      lastMousePos.current = currentPos;
    };
    const smoothPointerMove = (e) => {
      if (!isTrackablePointer(e.pointerType)) {
        return;
      }
      setIsVisible(true);
      const currentPos = { x: e.clientX, y: e.clientY };
      updateVelocity(currentPos);
      const speed = Math.sqrt(
        Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2)
      );
      cursorX.set(currentPos.x);
      cursorY.set(currentPos.y);
      if (speed > 0.1) {
        const currentAngle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90;
        let angleDiff = currentAngle - previousAngle.current;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;
        accumulatedRotation.current += angleDiff;
        rotation.set(accumulatedRotation.current);
        previousAngle.current = currentAngle;
        scale.set(0.95);
        if (timeout !== null) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
          scale.set(1);
        }, 150);
      }
    };
    let rafId = 0;
    const throttledPointerMove = (e) => {
      if (!isTrackablePointer(e.pointerType)) {
        return;
      }
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        smoothPointerMove(e);
        rafId = 0;
      });
    };
    document.body.style.cursor = "none";
    window.addEventListener("pointermove", throttledPointerMove, {
      passive: true
    });
    return () => {
      window.removeEventListener("pointermove", throttledPointerMove);
      document.body.style.cursor = "auto";
      if (rafId) cancelAnimationFrame(rafId);
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, [cursorX, cursorY, rotation, scale, isEnabled]);
  if (!isEnabled) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      style: {
        position: "fixed",
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        rotate: rotation,
        scale,
        zIndex: 100,
        pointerEvents: "none",
        willChange: "transform",
        opacity: isVisible ? 1 : 0
      },
      initial: false,
      animate: { opacity: isVisible ? 1 : 0 },
      transition: {
        duration: 0.15
      },
      children: cursor
    }
  );
}

// entry.jsx
import React from "react";

// registry:smooth-cursor.tsx
import { useEffect as useEffect2, useRef as useRef2, useState as useState2 } from "react";
import { motion as motion2, useSpring as useSpring2 } from "motion/react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var DESKTOP_POINTER_QUERY2 = "(any-hover: hover) and (any-pointer: fine)";
function isTrackablePointer2(pointerType) {
  return pointerType !== "touch";
}
var DefaultCursorSVG2 = () => {
  return /* @__PURE__ */ jsxs2(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: 50,
      height: 54,
      viewBox: "0 0 50 54",
      fill: "none",
      style: { scale: 0.5 },
      children: [
        /* @__PURE__ */ jsxs2("g", { filter: "url(#filter0_d_91_7928)", children: [
          /* @__PURE__ */ jsx2(
            "path",
            {
              d: "M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z",
              fill: "black"
            }
          ),
          /* @__PURE__ */ jsx2(
            "path",
            {
              d: "M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z",
              stroke: "white",
              strokeWidth: 2.25825
            }
          )
        ] }),
        /* @__PURE__ */ jsx2("defs", { children: /* @__PURE__ */ jsxs2(
          "filter",
          {
            id: "filter0_d_91_7928",
            x: 0.602397,
            y: 0.952444,
            width: 49.0584,
            height: 52.428,
            filterUnits: "userSpaceOnUse",
            colorInterpolationFilters: "sRGB",
            children: [
              /* @__PURE__ */ jsx2("feFlood", { floodOpacity: 0, result: "BackgroundImageFix" }),
              /* @__PURE__ */ jsx2(
                "feColorMatrix",
                {
                  in: "SourceAlpha",
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                  result: "hardAlpha"
                }
              ),
              /* @__PURE__ */ jsx2("feOffset", { dy: 2.25825 }),
              /* @__PURE__ */ jsx2("feGaussianBlur", { stdDeviation: 2.25825 }),
              /* @__PURE__ */ jsx2("feComposite", { in2: "hardAlpha", operator: "out" }),
              /* @__PURE__ */ jsx2(
                "feColorMatrix",
                {
                  type: "matrix",
                  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                }
              ),
              /* @__PURE__ */ jsx2(
                "feBlend",
                {
                  mode: "normal",
                  in2: "BackgroundImageFix",
                  result: "effect1_dropShadow_91_7928"
                }
              ),
              /* @__PURE__ */ jsx2(
                "feBlend",
                {
                  mode: "normal",
                  in: "SourceGraphic",
                  in2: "effect1_dropShadow_91_7928",
                  result: "shape"
                }
              )
            ]
          }
        ) })
      ]
    }
  );
};
function SmoothCursor2({
  cursor = /* @__PURE__ */ jsx2(DefaultCursorSVG2, {}),
  springConfig = {
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 1e-3
  }
}) {
  const lastMousePos = useRef2({ x: 0, y: 0 });
  const velocity = useRef2({ x: 0, y: 0 });
  const lastUpdateTime = useRef2(Date.now());
  const previousAngle = useRef2(0);
  const accumulatedRotation = useRef2(0);
  const [isEnabled, setIsEnabled] = useState2(false);
  const [isVisible, setIsVisible] = useState2(false);
  const cursorX = useSpring2(0, springConfig);
  const cursorY = useSpring2(0, springConfig);
  const rotation = useSpring2(0, {
    ...springConfig,
    damping: 60,
    stiffness: 300
  });
  const scale = useSpring2(1, {
    ...springConfig,
    stiffness: 500,
    damping: 35
  });
  useEffect2(() => {
    const mediaQuery = window.matchMedia(DESKTOP_POINTER_QUERY2);
    const updateEnabled = () => {
      const nextIsEnabled = mediaQuery.matches;
      setIsEnabled(nextIsEnabled);
      if (!nextIsEnabled) {
        setIsVisible(false);
      }
    };
    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);
    return () => {
      mediaQuery.removeEventListener("change", updateEnabled);
    };
  }, []);
  useEffect2(() => {
    if (!isEnabled) {
      return;
    }
    let timeout = null;
    const updateVelocity = (currentPos) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime.current;
      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime
        };
      }
      lastUpdateTime.current = currentTime;
      lastMousePos.current = currentPos;
    };
    const smoothPointerMove = (e) => {
      if (!isTrackablePointer2(e.pointerType)) {
        return;
      }
      setIsVisible(true);
      const currentPos = { x: e.clientX, y: e.clientY };
      updateVelocity(currentPos);
      const speed = Math.sqrt(
        Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2)
      );
      cursorX.set(currentPos.x);
      cursorY.set(currentPos.y);
      if (speed > 0.1) {
        const currentAngle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90;
        let angleDiff = currentAngle - previousAngle.current;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;
        accumulatedRotation.current += angleDiff;
        rotation.set(accumulatedRotation.current);
        previousAngle.current = currentAngle;
        scale.set(0.95);
        if (timeout !== null) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
          scale.set(1);
        }, 150);
      }
    };
    let rafId = 0;
    const throttledPointerMove = (e) => {
      if (!isTrackablePointer2(e.pointerType)) {
        return;
      }
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        smoothPointerMove(e);
        rafId = 0;
      });
    };
    document.body.style.cursor = "none";
    window.addEventListener("pointermove", throttledPointerMove, {
      passive: true
    });
    return () => {
      window.removeEventListener("pointermove", throttledPointerMove);
      document.body.style.cursor = "auto";
      if (rafId) cancelAnimationFrame(rafId);
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, [cursorX, cursorY, rotation, scale, isEnabled]);
  if (!isEnabled) {
    return null;
  }
  return /* @__PURE__ */ jsx2(
    motion2.div,
    {
      style: {
        position: "fixed",
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        rotate: rotation,
        scale,
        zIndex: 100,
        pointerEvents: "none",
        willChange: "transform",
        opacity: isVisible ? 1 : 0
      },
      initial: false,
      animate: { opacity: isVisible ? 1 : 0 },
      transition: {
        duration: 0.15
      },
      children: cursor
    }
  );
}

// registry:components/ui/smooth-cursor-demo.tsx
import { Fragment, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function SmoothCursorDemo() {
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsx3("span", { className: "hidden md:block", children: "Move your mouse around" }),
    /* @__PURE__ */ jsx3("span", { className: "block md:hidden", children: "SmoothCursor is disabled on touch devices" }),
    /* @__PURE__ */ jsx3(SmoothCursor2, {})
  ] });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(SmoothCursorDemo, {}) }) });
}
export {
  SmoothCursor,
  Component as default
};
