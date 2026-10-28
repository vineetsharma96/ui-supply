// Adapted from https://ui.aceternity.com/components/encrypted-text
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/encrypted-text.tsx
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/encrypted-text.tsx
import { jsx } from "react/jsx-runtime";
var DEFAULT_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?";
function generateRandomCharacter(charset) {
  const index = Math.floor(Math.random() * charset.length);
  return charset.charAt(index);
}
function generateGibberishPreservingSpaces(original, charset) {
  if (!original) return "";
  let result = "";
  for (let i = 0; i < original.length; i += 1) {
    const ch = original[i];
    result += ch === " " ? " " : generateRandomCharacter(charset);
  }
  return result;
}
var EncryptedText = ({
  text,
  className,
  revealDelayMs = 50,
  charset = DEFAULT_CHARSET,
  flipDelayMs = 50,
  encryptedClassName,
  revealedClassName
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [revealCount, setRevealCount] = useState(0);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(0);
  const lastFlipTimeRef = useRef(0);
  const scrambleCharsRef = useRef(
    text ? generateGibberishPreservingSpaces(text, charset).split("") : []
  );
  useEffect(() => {
    if (!isInView) return;
    const initial = text ? generateGibberishPreservingSpaces(text, charset) : "";
    scrambleCharsRef.current = initial.split("");
    startTimeRef.current = performance.now();
    lastFlipTimeRef.current = startTimeRef.current;
    setRevealCount(0);
    let isCancelled = false;
    const update = (now) => {
      if (isCancelled) return;
      const elapsedMs = now - startTimeRef.current;
      const totalLength = text.length;
      const currentRevealCount = Math.min(
        totalLength,
        Math.floor(elapsedMs / Math.max(1, revealDelayMs))
      );
      setRevealCount(currentRevealCount);
      if (currentRevealCount >= totalLength) {
        return;
      }
      const timeSinceLastFlip = now - lastFlipTimeRef.current;
      if (timeSinceLastFlip >= Math.max(0, flipDelayMs)) {
        for (let index = 0; index < totalLength; index += 1) {
          if (index >= currentRevealCount) {
            if (text[index] !== " ") {
              scrambleCharsRef.current[index] = generateRandomCharacter(charset);
            } else {
              scrambleCharsRef.current[index] = " ";
            }
          }
        }
        lastFlipTimeRef.current = now;
      }
      animationFrameRef.current = requestAnimationFrame(update);
    };
    animationFrameRef.current = requestAnimationFrame(update);
    return () => {
      isCancelled = true;
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isInView, text, revealDelayMs, charset, flipDelayMs]);
  if (!text) return null;
  return /* @__PURE__ */ jsx(
    motion.span,
    {
      ref,
      className: cn(className),
      "aria-label": text,
      role: "text",
      children: text.split("").map((char, index) => {
        const isRevealed = index < revealCount;
        const displayChar = isRevealed ? char : char === " " ? " " : scrambleCharsRef.current[index] ?? generateRandomCharacter(charset);
        return /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(isRevealed ? revealedClassName : encryptedClassName),
            children: displayChar
          },
          index
        );
      })
    }
  );
};

// entry.jsx
import React2 from "react";

// registry:components/encrypted-text-demo.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function EncryptedTextDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "mx-auto flex max-w-lg items-center justify-center", children: /* @__PURE__ */ jsxs("p", { className: "text-left", children: [
    "You are not your job, you're not how much money you have in the bank. You are not the car you drive. You're not the contents of your wallet. You are not your fucking khakis.",
    " ",
    /* @__PURE__ */ jsx2(EncryptedText, { text: "All singing, all dancing crap of the world." })
  ] }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(EncryptedTextDemo, {}) }) });
}
export {
  EncryptedText,
  Component as default
};
