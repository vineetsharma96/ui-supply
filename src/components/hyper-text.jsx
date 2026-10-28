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
// Adapted from https://magicui.design/docs/components/hyper-text
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/hyper-text.tsx
import {
  useEffect,
  useRef,
  useState
} from "react";
import {
  AnimatePresence,
  motion
} from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/hyper-text.tsx
import { jsx } from "react/jsx-runtime";
var motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span
};
var DEFAULT_CHARACTER_SET = Object.freeze(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
);
var getRandomInt = (max) => Math.floor(Math.random() * max);
function HyperText({
  children,
  className,
  duration = 800,
  delay = 0,
  as: Component2 = "div",
  startOnView = false,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
  ...props
}) {
  const MotionComponent = motionElements[Component2];
  const [displayText, setDisplayText] = useState(
    () => children.split("")
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const iterationCount = useRef(0);
  const elementRef = useRef(null);
  const handleAnimationTrigger = () => {
    if (animateOnHover && !isAnimating) {
      iterationCount.current = 0;
      setIsAnimating(true);
    }
  };
  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setIsAnimating(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsAnimating(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-30% 0px -30% 0px" }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [delay, startOnView]);
  useEffect(() => {
    let animationFrameId = null;
    if (isAnimating) {
      const maxIterations = children.length;
      const startTime = performance.now();
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        iterationCount.current = progress * maxIterations;
        setDisplayText(
          (currentText) => currentText.map(
            (letter, index) => letter === " " ? letter : index <= iterationCount.current ? children[index] : characterSet[getRandomInt(characterSet.length)]
          )
        );
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };
      animationFrameId = requestAnimationFrame(animate);
    }
    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [children, duration, isAnimating, characterSet]);
  return /* @__PURE__ */ jsx(
    MotionComponent,
    {
      ref: elementRef,
      className: cn("overflow-hidden py-2 text-4xl font-bold", className),
      onMouseEnter: handleAnimationTrigger,
      ...props,
      children: /* @__PURE__ */ jsx(AnimatePresence, { children: displayText.map((letter, index) => /* @__PURE__ */ jsx(
        motion.span,
        {
          className: cn("font-mono", letter === " " ? "w-3" : ""),
          children: letter.toUpperCase()
        },
        index
      )) })
    }
  );
}

// entry.jsx
import React from "react";

// registry:hyper-text.tsx
import {
  useEffect as useEffect2,
  useRef as useRef2,
  useState as useState2
} from "react";
import {
  AnimatePresence as AnimatePresence2,
  motion as motion2
} from "motion/react";
import { jsx as jsx2 } from "react/jsx-runtime";
var motionElements2 = {
  article: motion2.article,
  div: motion2.div,
  h1: motion2.h1,
  h2: motion2.h2,
  h3: motion2.h3,
  h4: motion2.h4,
  h5: motion2.h5,
  h6: motion2.h6,
  li: motion2.li,
  p: motion2.p,
  section: motion2.section,
  span: motion2.span
};
var DEFAULT_CHARACTER_SET2 = Object.freeze(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
);
var getRandomInt2 = (max) => Math.floor(Math.random() * max);
function HyperText2({
  children,
  className,
  duration = 800,
  delay = 0,
  as: Component2 = "div",
  startOnView = false,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET2,
  ...props
}) {
  const MotionComponent = motionElements2[Component2];
  const [displayText, setDisplayText] = useState2(
    () => children.split("")
  );
  const [isAnimating, setIsAnimating] = useState2(false);
  const iterationCount = useRef2(0);
  const elementRef = useRef2(null);
  const handleAnimationTrigger = () => {
    if (animateOnHover && !isAnimating) {
      iterationCount.current = 0;
      setIsAnimating(true);
    }
  };
  useEffect2(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setIsAnimating(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsAnimating(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-30% 0px -30% 0px" }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [delay, startOnView]);
  useEffect2(() => {
    let animationFrameId = null;
    if (isAnimating) {
      const maxIterations = children.length;
      const startTime = performance.now();
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        iterationCount.current = progress * maxIterations;
        setDisplayText(
          (currentText) => currentText.map(
            (letter, index) => letter === " " ? letter : index <= iterationCount.current ? children[index] : characterSet[getRandomInt2(characterSet.length)]
          )
        );
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };
      animationFrameId = requestAnimationFrame(animate);
    }
    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [children, duration, isAnimating, characterSet]);
  return /* @__PURE__ */ jsx2(
    MotionComponent,
    {
      ref: elementRef,
      className: cn("overflow-hidden py-2 text-4xl font-bold", className),
      onMouseEnter: handleAnimationTrigger,
      ...props,
      children: /* @__PURE__ */ jsx2(AnimatePresence2, { children: displayText.map((letter, index) => /* @__PURE__ */ jsx2(
        motion2.span,
        {
          className: cn("font-mono", letter === " " ? "w-3" : ""),
          children: letter.toUpperCase()
        },
        index
      )) })
    }
  );
}

// registry:components/ui/hyper-text-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function HyperTextDemo() {
  return /* @__PURE__ */ jsx3(HyperText2, { children: "Hover Me!" });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(HyperTextDemo, {}) }) });
}
export {
  HyperText,
  Component as default
};
