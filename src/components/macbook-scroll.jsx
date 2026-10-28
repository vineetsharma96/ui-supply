// Adapted from https://ui.aceternity.com/components/macbook-scroll
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/macbook-scroll.tsx
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/macbook-scroll.tsx
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3
} from "@tabler/icons-react";
import { IconSearch } from "@tabler/icons-react";
import { IconWorld } from "@tabler/icons-react";
import { IconCommand } from "@tabler/icons-react";
import { IconCaretLeftFilled } from "@tabler/icons-react";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { jsx, jsxs } from "react/jsx-runtime";
var MacbookScroll = ({
  src,
  showGradient,
  title,
  badge
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);
  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1.2, isMobile ? 1 : 1.5]
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0.6, isMobile ? 1 : 1.5]
  );
  const translate = useTransform(scrollYProgress, [0, 1], [0, 1500]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: "flex min-h-[200vh] shrink-0 scale-[0.35] transform flex-col items-center justify-start py-0 [perspective:800px] sm:scale-50 md:scale-100 md:py-80",
      children: [
        /* @__PURE__ */ jsx(
          motion.h2,
          {
            style: {
              translateY: textTransform,
              opacity: textOpacity
            },
            className: "mb-20 text-center text-3xl font-bold text-neutral-800 dark:text-white",
            children: title || /* @__PURE__ */ jsxs("span", { children: [
              "This Macbook is built with Tailwindcss. ",
              /* @__PURE__ */ jsx("br", {}),
              " No kidding."
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          Lid,
          {
            src,
            scaleX,
            scaleY,
            rotate,
            translate
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative -z-10 h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-gray-200 dark:bg-[#272729]", children: [
          /* @__PURE__ */ jsx("div", { className: "relative h-10 w-full", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" }) }),
          /* @__PURE__ */ jsxs("div", { className: "relative flex", children: [
            /* @__PURE__ */ jsx("div", { className: "mx-auto h-full w-[10%] overflow-hidden", children: /* @__PURE__ */ jsx(SpeakerGrid, {}) }),
            /* @__PURE__ */ jsx("div", { className: "mx-auto h-full w-[80%]", children: /* @__PURE__ */ jsx(Keypad, {}) }),
            /* @__PURE__ */ jsx("div", { className: "mx-auto h-full w-[10%] overflow-hidden", children: /* @__PURE__ */ jsx(SpeakerGrid, {}) })
          ] }),
          /* @__PURE__ */ jsx(Trackpad, {}),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" }),
          showGradient && /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 z-50 h-40 w-full bg-gradient-to-t from-white via-white to-transparent dark:from-black dark:via-black" }),
          badge && /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-4", children: badge })
        ] })
      ]
    }
  );
};
var Lid = ({
  scaleX,
  scaleY,
  rotate,
  translate,
  src
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "relative [perspective:800px]", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d"
        },
        className: "relative h-[12rem] w-[32rem] rounded-2xl bg-[#010101] p-2",
        children: /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              boxShadow: "0px 2px 0px 2px #171717 inset"
            },
            className: "absolute inset-0 flex items-center justify-center rounded-lg bg-[#010101]",
            children: /* @__PURE__ */ jsx("span", { className: "text-white", children: /* @__PURE__ */ jsx(AceternityLogo, {}) })
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        style: {
          scaleX,
          scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: "preserve-3d",
          transformOrigin: "top"
        },
        className: "absolute inset-0 h-96 w-[32rem] rounded-2xl bg-[#010101] p-2",
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-lg bg-[#272729]" }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src,
              alt: "aceternity logo",
              className: "absolute inset-0 h-full w-full rounded-lg object-cover object-left-top"
            }
          )
        ]
      }
    )
  ] });
};
var Trackpad = () => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "mx-auto my-1 h-32 w-[40%] rounded-xl",
      style: {
        boxShadow: "0px 0px 1px 1px #00000020 inset"
      }
    }
  );
};
var Keypad = () => {
  return /* @__PURE__ */ jsxs("div", { className: "mx-1 h-full [transform:translateZ(0)] rounded-md bg-[#050505] p-1 [will-change:transform]", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-[2px] flex w-full shrink-0 gap-[2px]", children: [
      /* @__PURE__ */ jsx(
        KBtn,
        {
          className: "w-10 items-end justify-start pb-[2px] pl-[4px]",
          childrenClassName: "items-start",
          children: "esc"
        }
      ),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx(IconBrightnessDown, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1 inline-block", children: "F1" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx(IconBrightnessUp, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1 inline-block", children: "F2" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx(IconTable, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1 inline-block", children: "F3" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx(IconSearch, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1 inline-block", children: "F4" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx(IconMicrophone, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1 inline-block", children: "F5" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx(IconMoon, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1 inline-block", children: "F6" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx(IconPlayerTrackPrev, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1 inline-block", children: "F7" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx(IconPlayerSkipForward, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1 inline-block", children: "F8" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx(IconPlayerTrackNext, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1 inline-block", children: "F8" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx(IconVolume3, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1 inline-block", children: "F10" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx(IconVolume2, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1 inline-block", children: "F11" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx(IconVolume, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1 inline-block", children: "F12" })
      ] }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("div", { className: "h-4 w-4 rounded-full bg-gradient-to-b from-neutral-900 from-20% via-black via-50% to-neutral-900 to-95% p-px", children: /* @__PURE__ */ jsx("div", { className: "h-full w-full rounded-full bg-black" }) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-[2px] flex w-full shrink-0 gap-[2px]", children: [
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: "~" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1 block", children: "`" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: "!" }),
        /* @__PURE__ */ jsx("span", { className: "block", children: "1" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: "@" }),
        /* @__PURE__ */ jsx("span", { className: "block", children: "2" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: "#" }),
        /* @__PURE__ */ jsx("span", { className: "block", children: "3" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: "$" }),
        /* @__PURE__ */ jsx("span", { className: "block", children: "4" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: "%" }),
        /* @__PURE__ */ jsx("span", { className: "block", children: "5" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: "^" }),
        /* @__PURE__ */ jsx("span", { className: "block", children: "6" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: "&" }),
        /* @__PURE__ */ jsx("span", { className: "block", children: "7" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: "*" }),
        /* @__PURE__ */ jsx("span", { className: "block", children: "8" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: "(" }),
        /* @__PURE__ */ jsx("span", { className: "block", children: "9" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: ")" }),
        /* @__PURE__ */ jsx("span", { className: "block", children: "0" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: "\u2014" }),
        /* @__PURE__ */ jsx("span", { className: "block", children: "_" })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: "+" }),
        /* @__PURE__ */ jsx("span", { className: "block", children: " = " })
      ] }),
      /* @__PURE__ */ jsx(
        KBtn,
        {
          className: "w-10 items-end justify-end pr-[4px] pb-[2px]",
          childrenClassName: "items-end",
          children: "delete"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-[2px] flex w-full shrink-0 gap-[2px]", children: [
      /* @__PURE__ */ jsx(
        KBtn,
        {
          className: "w-10 items-end justify-start pb-[2px] pl-[4px]",
          childrenClassName: "items-start",
          children: "tab"
        }
      ),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "Q" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "W" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "E" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "R" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "T" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "Y" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "U" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "I" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "O" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "P" }) }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: `{` }),
        /* @__PURE__ */ jsx("span", { className: "block", children: `[` })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: `}` }),
        /* @__PURE__ */ jsx("span", { className: "block", children: `]` })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: `|` }),
        /* @__PURE__ */ jsx("span", { className: "block", children: `\\` })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-[2px] flex w-full shrink-0 gap-[2px]", children: [
      /* @__PURE__ */ jsx(
        KBtn,
        {
          className: "w-[2.8rem] items-end justify-start pb-[2px] pl-[4px]",
          childrenClassName: "items-start",
          children: "caps lock"
        }
      ),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "A" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "S" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "D" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "F" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "G" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "H" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "J" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "K" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "L" }) }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: `:` }),
        /* @__PURE__ */ jsx("span", { className: "block", children: `;` })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: `"` }),
        /* @__PURE__ */ jsx("span", { className: "block", children: `'` })
      ] }),
      /* @__PURE__ */ jsx(
        KBtn,
        {
          className: "w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]",
          childrenClassName: "items-end",
          children: "return"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-[2px] flex w-full shrink-0 gap-[2px]", children: [
      /* @__PURE__ */ jsx(
        KBtn,
        {
          className: "w-[3.65rem] items-end justify-start pb-[2px] pl-[4px]",
          childrenClassName: "items-start",
          children: "shift"
        }
      ),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "Z" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "X" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "C" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "V" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "B" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "N" }) }),
      /* @__PURE__ */ jsx(KBtn, { children: /* @__PURE__ */ jsx("span", { className: "block", children: "M" }) }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: `<` }),
        /* @__PURE__ */ jsx("span", { className: "block", children: `,` })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: `>` }),
        /* @__PURE__ */ jsx("span", { className: "block", children: `.` })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: `?` }),
        /* @__PURE__ */ jsx("span", { className: "block", children: `/` })
      ] }),
      /* @__PURE__ */ jsx(
        KBtn,
        {
          className: "w-[3.65rem] items-end justify-end pr-[4px] pb-[2px]",
          childrenClassName: "items-end",
          children: "shift"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-[2px] flex w-full shrink-0 gap-[2px]", children: [
      /* @__PURE__ */ jsxs(KBtn, { className: "", childrenClassName: "h-full justify-between py-[4px]", children: [
        /* @__PURE__ */ jsx("div", { className: "flex w-full justify-end pr-1", children: /* @__PURE__ */ jsx("span", { className: "block", children: "fn" }) }),
        /* @__PURE__ */ jsx("div", { className: "flex w-full justify-start pl-1", children: /* @__PURE__ */ jsx(IconWorld, { className: "h-[6px] w-[6px]" }) })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { className: "", childrenClassName: "h-full justify-between py-[4px]", children: [
        /* @__PURE__ */ jsx("div", { className: "flex w-full justify-end pr-1", children: /* @__PURE__ */ jsx(IconChevronUp, { className: "h-[6px] w-[6px]" }) }),
        /* @__PURE__ */ jsx("div", { className: "flex w-full justify-start pl-1", children: /* @__PURE__ */ jsx("span", { className: "block", children: "control" }) })
      ] }),
      /* @__PURE__ */ jsxs(KBtn, { className: "", childrenClassName: "h-full justify-between py-[4px]", children: [
        /* @__PURE__ */ jsx("div", { className: "flex w-full justify-end pr-1", children: /* @__PURE__ */ jsx(OptionKey, { className: "h-[6px] w-[6px]" }) }),
        /* @__PURE__ */ jsx("div", { className: "flex w-full justify-start pl-1", children: /* @__PURE__ */ jsx("span", { className: "block", children: "option" }) })
      ] }),
      /* @__PURE__ */ jsxs(
        KBtn,
        {
          className: "w-8",
          childrenClassName: "h-full justify-between py-[4px]",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex w-full justify-end pr-1", children: /* @__PURE__ */ jsx(IconCommand, { className: "h-[6px] w-[6px]" }) }),
            /* @__PURE__ */ jsx("div", { className: "flex w-full justify-start pl-1", children: /* @__PURE__ */ jsx("span", { className: "block", children: "command" }) })
          ]
        }
      ),
      /* @__PURE__ */ jsx(KBtn, { className: "w-[8.2rem]" }),
      /* @__PURE__ */ jsxs(
        KBtn,
        {
          className: "w-8",
          childrenClassName: "h-full justify-between py-[4px]",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex w-full justify-start pl-1", children: /* @__PURE__ */ jsx(IconCommand, { className: "h-[6px] w-[6px]" }) }),
            /* @__PURE__ */ jsx("div", { className: "flex w-full justify-start pl-1", children: /* @__PURE__ */ jsx("span", { className: "block", children: "command" }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(KBtn, { className: "", childrenClassName: "h-full justify-between py-[4px]", children: [
        /* @__PURE__ */ jsx("div", { className: "flex w-full justify-start pl-1", children: /* @__PURE__ */ jsx(OptionKey, { className: "h-[6px] w-[6px]" }) }),
        /* @__PURE__ */ jsx("div", { className: "flex w-full justify-start pl-1", children: /* @__PURE__ */ jsx("span", { className: "block", children: "option" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-[2px] flex h-6 w-[4.9rem] flex-col items-center justify-end rounded-[4px] p-[0.5px]", children: [
        /* @__PURE__ */ jsx(KBtn, { className: "h-3 w-6", children: /* @__PURE__ */ jsx(IconCaretUpFilled, { className: "h-[6px] w-[6px]" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex", children: [
          /* @__PURE__ */ jsx(KBtn, { className: "h-3 w-6", children: /* @__PURE__ */ jsx(IconCaretLeftFilled, { className: "h-[6px] w-[6px]" }) }),
          /* @__PURE__ */ jsx(KBtn, { className: "h-3 w-6", children: /* @__PURE__ */ jsx(IconCaretDownFilled, { className: "h-[6px] w-[6px]" }) }),
          /* @__PURE__ */ jsx(KBtn, { className: "h-3 w-6", children: /* @__PURE__ */ jsx(IconCaretRightFilled, { className: "h-[6px] w-[6px]" }) })
        ] })
      ] })
    ] })
  ] });
};
var KBtn = ({
  className,
  children,
  childrenClassName,
  backlit = true
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "[transform:translateZ(0)] rounded-[4px] p-[0.5px] [will-change:transform]",
        backlit && "bg-white/[0.2] shadow-xl shadow-white"
      ),
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-[#0A090D]",
            className
          ),
          style: {
            boxShadow: "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset"
          },
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "flex w-full flex-col items-center justify-center text-[5px] text-neutral-200",
                childrenClassName,
                backlit && "text-white"
              ),
              children
            }
          )
        }
      )
    }
  );
};
var SpeakerGrid = () => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "mt-2 flex h-40 gap-[2px] px-[0.5px]",
      style: {
        backgroundImage: "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px"
      }
    }
  );
};
var OptionKey = ({ className }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      fill: "none",
      version: "1.1",
      id: "icon",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      className,
      children: [
        /* @__PURE__ */ jsx(
          "rect",
          {
            stroke: "currentColor",
            strokeWidth: 2,
            x: "18",
            y: "5",
            width: "10",
            height: "2"
          }
        ),
        /* @__PURE__ */ jsx(
          "polygon",
          {
            stroke: "currentColor",
            strokeWidth: 2,
            points: "10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 "
          }
        ),
        /* @__PURE__ */ jsx(
          "rect",
          {
            id: "_Transparent_Rectangle_",
            className: "st0",
            width: "32",
            height: "32",
            stroke: "none"
          }
        )
      ]
    }
  );
};
var AceternityLogo = () => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "66",
      height: "65",
      viewBox: "0 0 66 65",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "h-3 w-3 text-white",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696",
          stroke: "currentColor",
          strokeWidth: "15",
          strokeMiterlimit: "3.86874",
          strokeLinecap: "round"
        }
      )
    }
  );
};

// entry.jsx
import React2 from "react";

// registry:components/macbook-scroll-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function MacbookScrollDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "w-full overflow-hidden bg-white dark:bg-[#0B0B0F]", children: /* @__PURE__ */ jsx2(
    MacbookScroll,
    {
      title: /* @__PURE__ */ jsxs2("span", { children: [
        "This Macbook is built with Tailwindcss. ",
        /* @__PURE__ */ jsx2("br", {}),
        " No kidding."
      ] }),
      badge: /* @__PURE__ */ jsx2("a", { href: "https://peerlist.io/manuarora", children: /* @__PURE__ */ jsx2(Badge, { className: "h-10 w-10 -rotate-12 transform" }) }),
      src: `https://ui.aceternity.com/linear.webp`,
      showGradient: false
    }
  ) });
}
var Badge = ({ className }) => {
  return /* @__PURE__ */ jsxs2(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 56 56",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      children: [
        /* @__PURE__ */ jsx2(
          "path",
          {
            d: "M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z",
            fill: "#00AA45"
          }
        ),
        /* @__PURE__ */ jsx2(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M28 54C42.3594 54 54 42.3594 54 28C54 13.6406 42.3594 2 28 2C13.6406 2 2 13.6406 2 28C2 42.3594 13.6406 54 28 54ZM28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z",
            fill: "#219653"
          }
        ),
        /* @__PURE__ */ jsx2(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M27.0769 12H15V46H24.3846V38.8889H27.0769C34.7305 38.8889 41 32.9048 41 25.4444C41 17.984 34.7305 12 27.0769 12ZM24.3846 29.7778V21.1111H27.0769C29.6194 21.1111 31.6154 23.0864 31.6154 25.4444C31.6154 27.8024 29.6194 29.7778 27.0769 29.7778H24.3846Z",
            fill: "#24292E"
          }
        ),
        /* @__PURE__ */ jsx2(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M18 11H29.0769C36.2141 11 42 16.5716 42 23.4444C42 30.3173 36.2141 35.8889 29.0769 35.8889H25.3846V43H18V11ZM25.3846 28.7778H29.0769C32.1357 28.7778 34.6154 26.39 34.6154 23.4444C34.6154 20.4989 32.1357 18.1111 29.0769 18.1111H25.3846V28.7778Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ jsx2(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M17 10H29.0769C36.7305 10 43 15.984 43 23.4444C43 30.9048 36.7305 36.8889 29.0769 36.8889H26.3846V44H17V10ZM19 12V42H24.3846V34.8889H29.0769C35.6978 34.8889 41 29.7298 41 23.4444C41 17.1591 35.6978 12 29.0769 12H19ZM24.3846 17.1111H29.0769C32.6521 17.1111 35.6154 19.9114 35.6154 23.4444C35.6154 26.9775 32.6521 29.7778 29.0769 29.7778H24.3846V17.1111ZM26.3846 19.1111V27.7778H29.0769C31.6194 27.7778 33.6154 25.8024 33.6154 23.4444C33.6154 21.0864 31.6194 19.1111 29.0769 19.1111H26.3846Z",
            fill: "#24292E"
          }
        )
      ]
    }
  );
};

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(MacbookScrollDemo, {}) }) });
}
export {
  KBtn,
  Keypad,
  Lid,
  MacbookScroll,
  OptionKey,
  SpeakerGrid,
  Trackpad,
  Component as default
};
