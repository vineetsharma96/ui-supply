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
// Adapted from https://magicui.design/docs/components/text-3d-flip
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/text-3d-flip.tsx
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from "react";
import {
  useAnimate
} from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/text-3d-flip.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var HAS_SEGMENTER = typeof Intl !== "undefined" && "Segmenter" in Intl;
var splitIntoCharacters = (text) => {
  if (HAS_SEGMENTER) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }
  return Array.from(text);
};
var extractTextFromChildren = (children) => {
  if (children == null) return "";
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("");
  }
  if (React.isValidElement(children)) {
    const props = children.props;
    const childText = props.children;
    if (childText != null) {
      return extractTextFromChildren(childText);
    }
  }
  return "";
};
var ROTATION_MAP = {
  top: "rotateX(90deg)",
  right: "rotateY(90deg)",
  bottom: "rotateX(-90deg)",
  left: "rotateY(-90deg)"
};
var DEFAULT_TRANSITION = {
  type: "spring",
  damping: 30,
  stiffness: 300
};
var Text3DFlip = ({
  children,
  as: ElementTag = "p",
  className,
  textClassName,
  flipTextClassName,
  staggerDuration = 0.05,
  staggerFrom = "first",
  transition = DEFAULT_TRANSITION,
  rotateDirection = "right",
  ...props
}) => {
  const isAnimatingRef = useRef(false);
  const isMountedRef = useRef(false);
  const [scope, animate] = useAnimate();
  const rotationTransform = ROTATION_MAP[rotateDirection];
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      isAnimatingRef.current = false;
    };
  }, []);
  const text = useMemo(() => {
    try {
      return extractTextFromChildren(children);
    } catch {
      return "";
    }
  }, [children]);
  const characters = useMemo(() => {
    const words = text.split(" ");
    return words.map((word, i) => ({
      characters: splitIntoCharacters(word),
      needsSpace: i !== words.length - 1
    }));
  }, [text]);
  const charOffsets = useMemo(() => {
    const offsets = [0];
    for (const word of characters) {
      offsets.push(offsets.at(-1) + word.characters.length);
    }
    return offsets;
  }, [characters]);
  const getStaggerDelay = useCallback(
    (index, totalChars) => {
      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last")
        return (totalChars - 1 - index) * staggerDuration;
      if (staggerFrom === "center") {
        const center = Math.floor(totalChars / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * totalChars);
        return Math.abs(randomIndex - index) * staggerDuration;
      }
      return Math.abs(staggerFrom - index) * staggerDuration;
    },
    [staggerFrom, staggerDuration]
  );
  const handleHoverStart = useCallback(async () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    try {
      const totalChars = characters.reduce(
        (sum, word) => sum + word.characters.length,
        0
      );
      const delays = Array.from(
        { length: totalChars },
        (_, i) => getStaggerDelay(i, totalChars)
      );
      await animate(
        ".text-3d-flip-char",
        { transform: rotationTransform },
        {
          ...transition,
          delay: (i) => delays[i]
        }
      );
      if (!isMountedRef.current) return;
      await animate(
        ".text-3d-flip-char",
        { transform: "rotateX(0deg) rotateY(0deg)" },
        { duration: 0 }
      );
    } finally {
      if (isMountedRef.current) {
        isAnimatingRef.current = false;
      }
    }
  }, [characters, transition, getStaggerDelay, rotationTransform, animate]);
  return /* @__PURE__ */ jsxs(
    ElementTag,
    {
      className: cn("relative flex flex-wrap", className),
      onMouseEnter: handleHoverStart,
      ref: scope,
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: text }),
        characters.map((wordObj, wordIndex) => /* @__PURE__ */ jsxs("span", { className: "inline-flex", children: [
          wordObj.characters.map((char, charIndex) => /* @__PURE__ */ jsx(
            CharBox,
            {
              char,
              textClassName,
              flipTextClassName,
              rotateDirection
            },
            charOffsets[wordIndex] + charIndex
          )),
          wordObj.needsSpace && /* @__PURE__ */ jsx("span", { className: "whitespace-pre", children: " " })
        ] }, wordIndex))
      ]
    }
  );
};
var SECOND_FACE_TRANSFORMS = {
  top: "rotateX(-90deg) translateZ(0.5lh)",
  right: "rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(-50%) rotateY(-90deg) translateX(50%)",
  bottom: "rotateX(90deg) translateZ(0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(50%) rotateY(-90deg) translateX(50%)"
};
var FRONT_FACE_TRANSFORMS = {
  top: "translateZ(0.5lh)",
  bottom: "translateZ(0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
  right: "rotateY(-90deg) translateX(50%) rotateY(90deg)"
};
var CONTAINER_TRANSFORMS = {
  top: "translateZ(-0.5lh)",
  bottom: "translateZ(-0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
  right: "rotateY(90deg) translateX(50%) rotateY(-90deg)"
};
var CharBox = memo(
  ({
    char,
    textClassName,
    flipTextClassName,
    rotateDirection
  }) => /* @__PURE__ */ jsxs(
    "span",
    {
      className: "text-3d-flip-char inline transform-3d",
      style: { transform: CONTAINER_TRANSFORMS[rotateDirection] },
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cn("relative h-[1lh] backface-hidden", textClassName),
            style: { transform: FRONT_FACE_TRANSFORMS[rotateDirection] },
            children: char
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "absolute top-0 left-0 h-[1lh] backface-hidden",
              flipTextClassName
            ),
            style: { transform: SECOND_FACE_TRANSFORMS[rotateDirection] },
            children: char
          }
        )
      ]
    }
  )
);
CharBox.displayName = "CharBox";
Text3DFlip.displayName = "Text3DFlip";

// entry.jsx
import React3 from "react";

// registry:text-3d-flip.tsx
import React2, {
  memo as memo2,
  useCallback as useCallback2,
  useEffect as useEffect2,
  useMemo as useMemo2,
  useRef as useRef2
} from "react";
import {
  useAnimate as useAnimate2
} from "motion/react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var HAS_SEGMENTER2 = typeof Intl !== "undefined" && "Segmenter" in Intl;
var splitIntoCharacters2 = (text) => {
  if (HAS_SEGMENTER2) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }
  return Array.from(text);
};
var extractTextFromChildren2 = (children) => {
  if (children == null) return "";
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren2).join("");
  }
  if (React2.isValidElement(children)) {
    const props = children.props;
    const childText = props.children;
    if (childText != null) {
      return extractTextFromChildren2(childText);
    }
  }
  return "";
};
var ROTATION_MAP2 = {
  top: "rotateX(90deg)",
  right: "rotateY(90deg)",
  bottom: "rotateX(-90deg)",
  left: "rotateY(-90deg)"
};
var DEFAULT_TRANSITION2 = {
  type: "spring",
  damping: 30,
  stiffness: 300
};
var Text3DFlip2 = ({
  children,
  as: ElementTag = "p",
  className,
  textClassName,
  flipTextClassName,
  staggerDuration = 0.05,
  staggerFrom = "first",
  transition = DEFAULT_TRANSITION2,
  rotateDirection = "right",
  ...props
}) => {
  const isAnimatingRef = useRef2(false);
  const isMountedRef = useRef2(false);
  const [scope, animate] = useAnimate2();
  const rotationTransform = ROTATION_MAP2[rotateDirection];
  useEffect2(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      isAnimatingRef.current = false;
    };
  }, []);
  const text = useMemo2(() => {
    try {
      return extractTextFromChildren2(children);
    } catch {
      return "";
    }
  }, [children]);
  const characters = useMemo2(() => {
    const words = text.split(" ");
    return words.map((word, i) => ({
      characters: splitIntoCharacters2(word),
      needsSpace: i !== words.length - 1
    }));
  }, [text]);
  const charOffsets = useMemo2(() => {
    const offsets = [0];
    for (const word of characters) {
      offsets.push(offsets.at(-1) + word.characters.length);
    }
    return offsets;
  }, [characters]);
  const getStaggerDelay = useCallback2(
    (index, totalChars) => {
      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last")
        return (totalChars - 1 - index) * staggerDuration;
      if (staggerFrom === "center") {
        const center = Math.floor(totalChars / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * totalChars);
        return Math.abs(randomIndex - index) * staggerDuration;
      }
      return Math.abs(staggerFrom - index) * staggerDuration;
    },
    [staggerFrom, staggerDuration]
  );
  const handleHoverStart = useCallback2(async () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    try {
      const totalChars = characters.reduce(
        (sum, word) => sum + word.characters.length,
        0
      );
      const delays = Array.from(
        { length: totalChars },
        (_, i) => getStaggerDelay(i, totalChars)
      );
      await animate(
        ".text-3d-flip-char",
        { transform: rotationTransform },
        {
          ...transition,
          delay: (i) => delays[i]
        }
      );
      if (!isMountedRef.current) return;
      await animate(
        ".text-3d-flip-char",
        { transform: "rotateX(0deg) rotateY(0deg)" },
        { duration: 0 }
      );
    } finally {
      if (isMountedRef.current) {
        isAnimatingRef.current = false;
      }
    }
  }, [characters, transition, getStaggerDelay, rotationTransform, animate]);
  return /* @__PURE__ */ jsxs2(
    ElementTag,
    {
      className: cn("relative flex flex-wrap", className),
      onMouseEnter: handleHoverStart,
      ref: scope,
      ...props,
      children: [
        /* @__PURE__ */ jsx2("span", { className: "sr-only", children: text }),
        characters.map((wordObj, wordIndex) => /* @__PURE__ */ jsxs2("span", { className: "inline-flex", children: [
          wordObj.characters.map((char, charIndex) => /* @__PURE__ */ jsx2(
            CharBox2,
            {
              char,
              textClassName,
              flipTextClassName,
              rotateDirection
            },
            charOffsets[wordIndex] + charIndex
          )),
          wordObj.needsSpace && /* @__PURE__ */ jsx2("span", { className: "whitespace-pre", children: " " })
        ] }, wordIndex))
      ]
    }
  );
};
var SECOND_FACE_TRANSFORMS2 = {
  top: "rotateX(-90deg) translateZ(0.5lh)",
  right: "rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(-50%) rotateY(-90deg) translateX(50%)",
  bottom: "rotateX(90deg) translateZ(0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(50%) rotateY(-90deg) translateX(50%)"
};
var FRONT_FACE_TRANSFORMS2 = {
  top: "translateZ(0.5lh)",
  bottom: "translateZ(0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
  right: "rotateY(-90deg) translateX(50%) rotateY(90deg)"
};
var CONTAINER_TRANSFORMS2 = {
  top: "translateZ(-0.5lh)",
  bottom: "translateZ(-0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
  right: "rotateY(90deg) translateX(50%) rotateY(-90deg)"
};
var CharBox2 = memo2(
  ({
    char,
    textClassName,
    flipTextClassName,
    rotateDirection
  }) => /* @__PURE__ */ jsxs2(
    "span",
    {
      className: "text-3d-flip-char inline transform-3d",
      style: { transform: CONTAINER_TRANSFORMS2[rotateDirection] },
      children: [
        /* @__PURE__ */ jsx2(
          "span",
          {
            className: cn("relative h-[1lh] backface-hidden", textClassName),
            style: { transform: FRONT_FACE_TRANSFORMS2[rotateDirection] },
            children: char
          }
        ),
        /* @__PURE__ */ jsx2(
          "span",
          {
            className: cn(
              "absolute top-0 left-0 h-[1lh] backface-hidden",
              flipTextClassName
            ),
            style: { transform: SECOND_FACE_TRANSFORMS2[rotateDirection] },
            children: char
          }
        )
      ]
    }
  )
);
CharBox2.displayName = "CharBox";
Text3DFlip2.displayName = "Text3DFlip";
var text_3d_flip_default = Text3DFlip2;

// registry:components/ui/text-3d-flip-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Text3DFlipDemo() {
  return /* @__PURE__ */ jsx3(
    text_3d_flip_default,
    {
      className: "bg-background font-serif text-2xl sm:text-5xl md:text-[56px]",
      textClassName: "bg-background text-foreground",
      flipTextClassName: "bg-background text-foreground",
      rotateDirection: "top",
      staggerDuration: 0.03,
      staggerFrom: "first",
      transition: { type: "spring", damping: 25, stiffness: 160 },
      children: "Stay hungry, stay foolish"
    }
  );
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(Text3DFlipDemo, {}) }) });
}
export {
  Component as default
};
