// Adapted from https://ui.aceternity.com/components/text-flipping-board
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/text-flipping-board.tsx
import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/text-flipping-board.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var FLAP_CHARS = ` ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$()-+&=;:'"%,./?\xB0`;
var BOARD_ROWS = 6;
var BOARD_COLS = 22;
var BASE_COL_DELAY = 30;
var BASE_ROW_DELAY = 20;
var BASE_STEP_MS = 55;
var BASE_FLIP_S = 0.35;
var BASE_TOTAL_S = ((BOARD_COLS - 1) * BASE_COL_DELAY + (BOARD_ROWS - 1) * BASE_ROW_DELAY + 8 * BASE_STEP_MS) / 1e3;
var ACCENT_COLORS = [
  { top: "bg-red-600", bottom: "bg-red-700", text: "text-white" },
  { top: "bg-orange-500", bottom: "bg-orange-600", text: "text-white" },
  { top: "bg-yellow-400", bottom: "bg-yellow-500", text: "text-neutral-900" },
  { top: "bg-green-600", bottom: "bg-green-700", text: "text-white" },
  { top: "bg-blue-600", bottom: "bg-blue-700", text: "text-white" },
  { top: "bg-violet-600", bottom: "bg-violet-700", text: "text-white" },
  { top: "bg-white", bottom: "bg-neutral-100", text: "text-neutral-900" }
];
var CELL_TEXT_STYLE = {
  fontSize: "clamp(6px, 2vw, 22px)",
  lineHeight: 1
};
var FlapCell = React.memo(
  function FlapCell2({
    target,
    delay,
    stepMs,
    flipDuration
  }) {
    const [current, setCurrent] = useState(" ");
    const [prev, setPrev] = useState(" ");
    const [flipId, setFlipId] = useState(0);
    const [accent, setAccent] = useState(null);
    const [prevAccent, setPrevAccent] = useState(null);
    const curRef = useRef(" ");
    const tgtRef = useRef(null);
    const accentRef = useRef(null);
    const startTimer = useRef(null);
    const stepTimer = useRef(null);
    useEffect(() => {
      if (startTimer.current) clearTimeout(startTimer.current);
      if (stepTimer.current) clearTimeout(stepTimer.current);
      startTimer.current = null;
      stepTimer.current = null;
      const normalized = FLAP_CHARS.includes(target.toUpperCase()) ? target.toUpperCase() : " ";
      if (normalized === tgtRef.current) return;
      tgtRef.current = normalized;
      if (normalized === " " && curRef.current === " ") return;
      const scrambleCount = normalized === " " ? 8 + Math.floor(Math.random() * 8) : 25 + Math.floor(Math.random() * 15);
      const runStep = (i) => {
        const isLast = i === scrambleCount;
        const ch = isLast ? normalized : FLAP_CHARS[1 + Math.floor(Math.random() * (FLAP_CHARS.length - 1))];
        const newAccent = isLast ? null : Math.random() < 0.2 ? ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)] : null;
        setPrev(curRef.current);
        setPrevAccent(accentRef.current);
        curRef.current = ch;
        accentRef.current = newAccent;
        setCurrent(ch);
        setAccent(newAccent);
        setFlipId((n) => n + 1);
        if (!isLast) {
          stepTimer.current = setTimeout(() => runStep(i + 1), stepMs);
        }
      };
      startTimer.current = setTimeout(() => runStep(1), delay);
      return () => {
        if (startTimer.current) clearTimeout(startTimer.current);
        if (stepTimer.current) clearTimeout(stepTimer.current);
        startTimer.current = null;
        stepTimer.current = null;
        tgtRef.current = null;
      };
    }, [target, delay, stepMs]);
    const show = current === " " ? "\xA0" : current;
    const showPrev = prev === " " ? "\xA0" : prev;
    const textCx = "absolute inset-x-0 flex select-none items-center justify-center font-mono font-bold tracking-wide";
    const topBg = accent?.top ?? "bg-neutral-200/80 dark:bg-neutral-900";
    const bottomBg = accent?.bottom ?? "bg-neutral-200/80 dark:bg-neutral-900";
    const textColor = accent?.text ?? "text-neutral-800 dark:text-white";
    const flapTopBg = prevAccent?.top ?? "bg-neutral-100 dark:bg-neutral-800";
    const flapTextColor = prevAccent?.text ?? "text-neutral-800 dark:text-white";
    const bottomDelay = flipDuration * 0.5;
    return /* @__PURE__ */ jsxs("div", { className: "flex aspect-3/6 flex-col overflow-hidden rounded-[2px] border border-neutral-300 md:rounded-[3px] md:border-2 dark:border-black", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1 perspective-dramatic transform-3d", children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-40 hidden flex-row items-center justify-center md:flex", children: [
          /* @__PURE__ */ jsx("div", { className: "h-1/2 w-px rounded-tr-sm rounded-br-sm bg-neutral-300 dark:bg-black" }),
          /* @__PURE__ */ jsx("div", { className: "flex h-px flex-1 bg-neutral-300 dark:bg-black" }),
          /* @__PURE__ */ jsx("div", { className: "h-1/2 w-px rounded-tl-sm rounded-bl-sm bg-neutral-300 dark:bg-black" })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "absolute inset-x-0 top-0 h-[calc(50%-0.5px)] overflow-hidden rounded-t-[3px]",
              topBg
            ),
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(textCx, textColor, "top-0 h-[200%]"),
                style: CELL_TEXT_STYLE,
                children: show
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "absolute inset-x-0 bottom-0 h-[calc(50%-0.5px)] overflow-hidden rounded-b-[3px]",
              bottomBg
            ),
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: cn(textCx, textColor, "bottom-0 h-[200%]"),
                  style: CELL_TEXT_STYLE,
                  children: show
                }
              ),
              flipId > 0 && /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: "pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.8),transparent_60%)] dark:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8),transparent_60%)]",
                  initial: { opacity: 0.5 },
                  animate: { opacity: 0 },
                  transition: { duration: flipDuration * 1.3, ease: "easeOut" }
                },
                `s${flipId}`
              )
            ]
          }
        ),
        flipId > 0 && /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: cn(
              "absolute inset-x-0 top-0 z-10 h-[calc(50%-0.5px)] origin-bottom overflow-hidden rounded-t-[3px] backface-hidden transform-3d",
              flapTopBg
            ),
            initial: { rotateX: 0 },
            animate: { rotateX: -100 },
            transition: {
              duration: flipDuration,
              ease: [0.55, 0.055, 0.675, 0.19]
            },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: cn(textCx, flapTextColor, "top-0 h-[200%]"),
                  style: CELL_TEXT_STYLE,
                  children: showPrev
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: "pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,1))] dark:bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]",
                  initial: { opacity: 0 },
                  animate: { opacity: 0.6 },
                  transition: { duration: flipDuration }
                }
              )
            ]
          },
          flipId
        ),
        flipId > 0 && /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: cn(
              "absolute inset-x-0 bottom-0 z-10 h-[calc(50%-0.5px)] origin-top overflow-hidden rounded-b-[3px] backface-hidden transform-3d",
              bottomBg
            ),
            initial: { rotateX: 90 },
            animate: { rotateX: 0 },
            transition: {
              duration: flipDuration * 0.85,
              delay: bottomDelay,
              ease: [0.33, 1.55, 0.64, 1]
            },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: cn(textCx, textColor, "bottom-0 h-[200%]"),
                  style: CELL_TEXT_STYLE,
                  children: show
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: "pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(255,255,255,0),rgba(255,255,255,0.6))] dark:bg-[linear-gradient(to_top,rgba(0,0,0,0),rgba(0,0,0,0.6))]",
                  initial: { opacity: 0.4 },
                  animate: { opacity: 0 },
                  transition: {
                    duration: flipDuration * 0.85,
                    delay: bottomDelay
                  }
                }
              )
            ]
          },
          `b${flipId}`
        ),
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-0 top-1/2 z-20 h-px -translate-y-[0.5px] bg-neutral-400/50 dark:bg-black/50" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-2 w-full bg-[repeating-linear-gradient(to_bottom,currentColor_0,currentColor_1px,transparent_1px,transparent_0.15rem)] mask-t-from-50% text-neutral-400 opacity-20 md:h-4 md:bg-[repeating-linear-gradient(to_bottom,currentColor_0,currentColor_1px,transparent_1px,transparent_0.2rem)] dark:text-black dark:opacity-100" })
    ] });
  },
  (prevProps, nextProps) => prevProps.target === nextProps.target && prevProps.delay === nextProps.delay && prevProps.stepMs === nextProps.stepMs && prevProps.flipDuration === nextProps.flipDuration
);
var COLOR_MAP = {
  "{R}": "#D32F2F",
  "{O}": "#F57C00",
  "{Y}": "#FBC02D",
  "{G}": "#43A047",
  "{B}": "#1E88E5",
  "{V}": "#8E24AA",
  "{W}": "#FAFAFA"
};
var ColorCell = React.memo(function ColorCell2({ color }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "aspect-3/5 rounded-[3px] border-2 border-neutral-300 dark:border-black",
      style: { backgroundColor: color }
    }
  );
});
function parseRow(row) {
  const cells = [];
  let i = 0;
  while (i < row.length) {
    if (row[i] === "{" && i + 2 < row.length && row[i + 2] === "}") {
      const code = row.substring(i, i + 3);
      if (COLOR_MAP[code]) {
        cells.push({ type: "color", hex: COLOR_MAP[code] });
        i += 3;
        continue;
      }
    }
    cells.push({ type: "char", value: row[i] });
    i++;
  }
  return cells;
}
function wrapParagraph(paragraph, maxCols) {
  const lines = [];
  const words = paragraph.split(/[ \t]+/).filter(Boolean);
  let currentLine = "";
  for (const word of words) {
    if (word.length > maxCols) {
      if (currentLine) {
        lines.push(currentLine);
        currentLine = "";
      }
      lines.push(word.slice(0, maxCols));
      continue;
    }
    if (!currentLine) {
      currentLine = word;
    } else if (currentLine.length + 1 + word.length <= maxCols) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}
function wrapText(input, maxCols) {
  return input.split("\n").flatMap(
    (paragraph) => paragraph.trim() === "" ? [""] : wrapParagraph(paragraph, maxCols)
  );
}
function TextFlippingBoard({
  rows,
  text,
  className,
  duration = BASE_TOTAL_S
}) {
  const scale = duration / BASE_TOTAL_S;
  const colDelay = BASE_COL_DELAY * scale;
  const rowDelay = BASE_ROW_DELAY * scale;
  const stepMs = BASE_STEP_MS * scale;
  const flipDur = Math.min(0.6, Math.max(0.15, BASE_FLIP_S * scale));
  const board = useMemo(() => {
    const grid = Array.from(
      { length: BOARD_ROWS },
      () => Array.from({ length: BOARD_COLS }, () => ({
        type: "char",
        value: " "
      }))
    );
    if (text) {
      const lines = wrapText(text, BOARD_COLS).slice(0, BOARD_ROWS);
      const startRow = Math.max(0, Math.floor((BOARD_ROWS - lines.length) / 2));
      lines.forEach((line, i) => {
        const row = startRow + i;
        if (row >= BOARD_ROWS) return;
        const parsed = parseRow(line);
        const startCol = Math.max(
          0,
          Math.floor((BOARD_COLS - parsed.length) / 2)
        );
        parsed.forEach((cell, c) => {
          if (startCol + c < BOARD_COLS) {
            grid[row][startCol + c] = cell;
          }
        });
      });
    } else if (rows) {
      rows.forEach((row, r) => {
        if (r >= BOARD_ROWS) return;
        const parsed = parseRow(row);
        parsed.forEach((cell, c) => {
          if (c < BOARD_COLS) {
            grid[r][c] = cell;
          }
        });
      });
    }
    return grid;
  }, [rows, text]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "relative mx-auto w-full max-w-3xl rounded-xl bg-neutral-100 p-2 shadow-xl md:rounded-2xl md:p-4 dark:bg-neutral-900 dark:shadow-[0_20px_70px_-15px_rgba(0,0,0,0.6)]",
        className
      ),
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "grid gap-px md:gap-[3px]",
          style: { gridTemplateColumns: `repeat(${BOARD_COLS}, 1fr)` },
          children: board.map(
            (row, r) => row.map(
              (cell, c) => cell.type === "color" ? /* @__PURE__ */ jsx(ColorCell, { color: cell.hex }, `${r}-${c}`) : /* @__PURE__ */ jsx(
                FlapCell,
                {
                  target: cell.value,
                  delay: c * colDelay + r * rowDelay,
                  stepMs,
                  flipDuration: flipDur
                },
                `${r}-${c}`
              )
            )
          )
        }
      )
    }
  );
}

// entry.jsx
import React3 from "react";

// registry:components/text-flipping-board-demo.tsx
import { useState as useState2, useEffect as useEffect2, useCallback } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var MESSAGES = [
  "STAY HUNGRY \nSTAY IN BED \n- STEVE JOBS",
  "What did you get done this week?",
  "I burned $20 \nfor this shit.",
  "DONT WORRY \nBE HAPPY FFS.",
  "LADIES AND GENTLEMEN \nWELCOME TO F#!@# C!@$"
];
function TextFlippingBoardDemo() {
  const [msgIdx, setMsgIdx] = useState2(0);
  const next = useCallback(
    () => setMsgIdx((i) => (i + 1) % MESSAGES.length),
    []
  );
  useEffect2(() => {
    const id = setInterval(next, 6e3);
    return () => clearInterval(id);
  }, [next]);
  return /* @__PURE__ */ jsx2("div", { className: "flex w-full flex-col items-center justify-center gap-8 py-20", children: /* @__PURE__ */ jsx2(TextFlippingBoard, { text: MESSAGES[msgIdx] }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(TextFlippingBoardDemo, {}) }) });
}
export {
  TextFlippingBoard,
  Component as default
};
