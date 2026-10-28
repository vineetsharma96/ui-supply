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
// Adapted from https://magicui.design/docs/components/typing-animation
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/typing-animation.tsx
import {
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  motion,
  useInView
} from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/typing-animation.tsx
import { jsx, jsxs } from "react/jsx-runtime";
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
function TypingAnimation({
  children,
  words,
  className,
  duration = 100,
  typeSpeed,
  deleteSpeed,
  delay = 0,
  pauseDelay = 1e3,
  loop = false,
  as: Component3 = "span",
  startOnView = true,
  showCursor = true,
  blinkCursor = true,
  cursorStyle = "line",
  ...props
}) {
  const MotionComponent = motionElements[Component3];
  const [displayedText, setDisplayedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [phase, setPhase] = useState("typing");
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, {
    amount: 0.3,
    once: true
  });
  const wordsToAnimate = useMemo(
    () => words ?? (children ? [children] : []),
    [words, children]
  );
  const hasMultipleWords = wordsToAnimate.length > 1;
  const typingSpeed = typeSpeed ?? duration;
  const deletingSpeed = deleteSpeed ?? typingSpeed / 2;
  const shouldStart = startOnView ? isInView : true;
  const animationSourceKey = useMemo(
    () => words ? words.join("\0") : children ?? "",
    [words, children]
  );
  useEffect(() => {
    setDisplayedText("");
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setPhase("typing");
  }, [animationSourceKey]);
  useEffect(() => {
    let timeout = null;
    if (shouldStart && wordsToAnimate.length > 0) {
      const timeoutDelay = delay > 0 && displayedText === "" ? delay : phase === "typing" ? typingSpeed : phase === "deleting" ? deletingSpeed : pauseDelay;
      timeout = setTimeout(() => {
        const currentWord = wordsToAnimate[currentWordIndex] || "";
        const graphemes = Array.from(currentWord);
        switch (phase) {
          case "typing":
            if (currentCharIndex < graphemes.length) {
              setDisplayedText(
                graphemes.slice(0, currentCharIndex + 1).join("")
              );
              setCurrentCharIndex(currentCharIndex + 1);
            } else {
              if (hasMultipleWords || loop) {
                const isLastWord = currentWordIndex === wordsToAnimate.length - 1;
                if (!isLastWord || loop) {
                  setPhase("pause");
                }
              }
            }
            break;
          case "pause":
            setPhase("deleting");
            break;
          case "deleting":
            if (currentCharIndex > 0) {
              setDisplayedText(
                graphemes.slice(0, currentCharIndex - 1).join("")
              );
              setCurrentCharIndex(currentCharIndex - 1);
            } else {
              const nextIndex = (currentWordIndex + 1) % wordsToAnimate.length;
              setCurrentWordIndex(nextIndex);
              setPhase("typing");
            }
            break;
        }
      }, timeoutDelay);
    }
    return () => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, [
    shouldStart,
    phase,
    currentCharIndex,
    currentWordIndex,
    displayedText,
    wordsToAnimate,
    hasMultipleWords,
    loop,
    typingSpeed,
    deletingSpeed,
    pauseDelay,
    delay
  ]);
  const currentWordGraphemes = Array.from(
    wordsToAnimate[currentWordIndex] || ""
  );
  const isComplete = !loop && currentWordIndex === wordsToAnimate.length - 1 && currentCharIndex >= currentWordGraphemes.length && phase !== "deleting";
  const shouldShowCursor = showCursor && !isComplete && (hasMultipleWords || loop || currentCharIndex < currentWordGraphemes.length);
  const getCursorChar = () => {
    switch (cursorStyle) {
      case "block":
        return "\u258C";
      case "underscore":
        return "_";
      case "line":
      default:
        return "|";
    }
  };
  return /* @__PURE__ */ jsxs(
    MotionComponent,
    {
      ref: elementRef,
      className: cn(
        "leading-20 tracking-[-0.02em]",
        Component3 === "span" && "inline-block",
        className
      ),
      ...props,
      children: [
        displayedText,
        shouldShowCursor && /* @__PURE__ */ jsx(
          "span",
          {
            className: cn("inline-block", blinkCursor && "animate-blink-cursor"),
            children: getCursorChar()
          }
        )
      ]
    }
  );
}

// entry.jsx
import React from "react";

// registry:typing-animation.tsx
import {
  useEffect as useEffect2,
  useMemo as useMemo2,
  useRef as useRef2,
  useState as useState2
} from "react";
import {
  motion as motion2,
  useInView as useInView2
} from "motion/react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
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
function TypingAnimation2({
  children,
  words,
  className,
  duration = 100,
  typeSpeed,
  deleteSpeed,
  delay = 0,
  pauseDelay = 1e3,
  loop = false,
  as: Component3 = "span",
  startOnView = true,
  showCursor = true,
  blinkCursor = true,
  cursorStyle = "line",
  ...props
}) {
  const MotionComponent = motionElements2[Component3];
  const [displayedText, setDisplayedText] = useState2("");
  const [currentWordIndex, setCurrentWordIndex] = useState2(0);
  const [currentCharIndex, setCurrentCharIndex] = useState2(0);
  const [phase, setPhase] = useState2("typing");
  const elementRef = useRef2(null);
  const isInView = useInView2(elementRef, {
    amount: 0.3,
    once: true
  });
  const wordsToAnimate = useMemo2(
    () => words ?? (children ? [children] : []),
    [words, children]
  );
  const hasMultipleWords = wordsToAnimate.length > 1;
  const typingSpeed = typeSpeed ?? duration;
  const deletingSpeed = deleteSpeed ?? typingSpeed / 2;
  const shouldStart = startOnView ? isInView : true;
  const animationSourceKey = useMemo2(
    () => words ? words.join("\0") : children ?? "",
    [words, children]
  );
  useEffect2(() => {
    setDisplayedText("");
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setPhase("typing");
  }, [animationSourceKey]);
  useEffect2(() => {
    let timeout = null;
    if (shouldStart && wordsToAnimate.length > 0) {
      const timeoutDelay = delay > 0 && displayedText === "" ? delay : phase === "typing" ? typingSpeed : phase === "deleting" ? deletingSpeed : pauseDelay;
      timeout = setTimeout(() => {
        const currentWord = wordsToAnimate[currentWordIndex] || "";
        const graphemes = Array.from(currentWord);
        switch (phase) {
          case "typing":
            if (currentCharIndex < graphemes.length) {
              setDisplayedText(
                graphemes.slice(0, currentCharIndex + 1).join("")
              );
              setCurrentCharIndex(currentCharIndex + 1);
            } else {
              if (hasMultipleWords || loop) {
                const isLastWord = currentWordIndex === wordsToAnimate.length - 1;
                if (!isLastWord || loop) {
                  setPhase("pause");
                }
              }
            }
            break;
          case "pause":
            setPhase("deleting");
            break;
          case "deleting":
            if (currentCharIndex > 0) {
              setDisplayedText(
                graphemes.slice(0, currentCharIndex - 1).join("")
              );
              setCurrentCharIndex(currentCharIndex - 1);
            } else {
              const nextIndex = (currentWordIndex + 1) % wordsToAnimate.length;
              setCurrentWordIndex(nextIndex);
              setPhase("typing");
            }
            break;
        }
      }, timeoutDelay);
    }
    return () => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, [
    shouldStart,
    phase,
    currentCharIndex,
    currentWordIndex,
    displayedText,
    wordsToAnimate,
    hasMultipleWords,
    loop,
    typingSpeed,
    deletingSpeed,
    pauseDelay,
    delay
  ]);
  const currentWordGraphemes = Array.from(
    wordsToAnimate[currentWordIndex] || ""
  );
  const isComplete = !loop && currentWordIndex === wordsToAnimate.length - 1 && currentCharIndex >= currentWordGraphemes.length && phase !== "deleting";
  const shouldShowCursor = showCursor && !isComplete && (hasMultipleWords || loop || currentCharIndex < currentWordGraphemes.length);
  const getCursorChar = () => {
    switch (cursorStyle) {
      case "block":
        return "\u258C";
      case "underscore":
        return "_";
      case "line":
      default:
        return "|";
    }
  };
  return /* @__PURE__ */ jsxs2(
    MotionComponent,
    {
      ref: elementRef,
      className: cn(
        "leading-20 tracking-[-0.02em]",
        Component3 === "span" && "inline-block",
        className
      ),
      ...props,
      children: [
        displayedText,
        shouldShowCursor && /* @__PURE__ */ jsx2(
          "span",
          {
            className: cn("inline-block", blinkCursor && "animate-blink-cursor"),
            children: getCursorChar()
          }
        )
      ]
    }
  );
}

// registry:components/ui/typing-animation-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3(TypingAnimation2, { children: "Hello World! \u{1F44B}" });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component2() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(Component, {}) }) });
}
export {
  TypingAnimation,
  Component2 as default
};
