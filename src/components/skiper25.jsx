// Adapted from https://skiper-ui.com/v1/skiper25
// Skiper UI / gxuri. Attribution required for free components. See licenses/skiper.txt for usage terms.
// registry:skiper25.tsx
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var Skiper25 = () => {
  return /* @__PURE__ */ jsxs("div", { className: "flex h-full w-full flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsx("div", { className: "text-foreground absolute top-[20%] grid content-start justify-items-center gap-6 py-20 text-center", children: /* @__PURE__ */ jsx("span", { className: "after:from-background after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:content-['']", children: "Click to play the music" }) }),
    /* @__PURE__ */ jsx(MusicToggleButton, {})
  ] });
};
var MusicToggleButton = () => {
  const bars = 5;
  const getRandomHeights = () => {
    return Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2);
  };
  const [heights, setHeights] = useState(getRandomHeights());
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause, sound }] = useSound("https://skiper-ui.com/audio/audio.m4a", {
    loop: true,
    onplay: () => setIsPlaying(true),
    onend: () => setIsPlaying(false),
    onpause: () => setIsPlaying(false),
    onstop: () => setIsPlaying(false),
    soundEnabled: true
  });
  useEffect(() => {
    if (isPlaying) {
      const waveformIntervalId = setInterval(() => {
        setHeights(getRandomHeights());
      }, 100);
      return () => {
        clearInterval(waveformIntervalId);
      };
    }
    setHeights(Array(bars).fill(0.1));
  }, [isPlaying]);
  const handleClick = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
      return;
    }
    play();
    setIsPlaying(true);
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    motion.div,
    {
      onClick: handleClick,
      initial: { padding: "14px 14px " },
      whileHover: { padding: "18px 22px " },
      whileTap: { padding: "18px 22px " },
      transition: { duration: 1, bounce: 0.6, type: "spring" },
      className: "bg-background cursor-pointer rounded-full p-2",
      children: /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, filter: "blur(4px)" },
          animate: {
            opacity: 1,
            filter: "blur(0px)"
          },
          exit: { opacity: 0, filter: "blur(4px)" },
          transition: { type: "spring", bounce: 0.35 },
          className: "flex h-[18px] w-full items-center gap-1 rounded-full",
          children: heights.map((height, index) => /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "bg-foreground w-[1px] rounded-full",
              initial: { height: 1 },
              animate: {
                height: Math.max(4, height * 14)
              },
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
              }
            },
            index
          ))
        }
      )
    },
    "audio"
  ) });
};

// entry.jsx
import React2 from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx2("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx2("div", { className: "vendor-content", children: /* @__PURE__ */ jsx2(Skiper25, {}) }) });
}
export {
  MusicToggleButton,
  Skiper25,
  Component as default
};
