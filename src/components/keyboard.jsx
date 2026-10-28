// Adapted from https://ui.aceternity.com/components/keyboard
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/keyboard.tsx
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback
} from "react";
import { motion, AnimatePresence } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/keyboard.tsx
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
  IconVolume3,
  IconSearch,
  IconWorld,
  IconCommand,
  IconCaretLeftFilled,
  IconCaretDownFilled
} from "@tabler/icons-react";
import { jsx, jsxs } from "react/jsx-runtime";
var SOUND_DEFINES_DOWN = {
  Escape: [2894, 113],
  F1: [3610, 98],
  F2: [4210, 90],
  F3: [4758, 90],
  F4: [5250, 100],
  F5: [5831, 105],
  F6: [6396, 105],
  F7: [6900, 105],
  F8: [7443, 111],
  F9: [7955, 91],
  F10: [8504, 105],
  F11: [9046, 94],
  F12: [9582, 96],
  Backquote: [12476, 100],
  Digit1: [12946, 96],
  Digit2: [13470, 95],
  Digit3: [13963, 100],
  Digit4: [14481, 102],
  Digit5: [14994, 94],
  Digit6: [15505, 109],
  Digit7: [15990, 97],
  Digit8: [16529, 92],
  Digit9: [17012, 103],
  Digit0: [17550, 87],
  Minus: [18052, 93],
  Equal: [18553, 89],
  Backspace: [19065, 110],
  Tab: [21734, 119],
  KeyQ: [22245, 95],
  KeyW: [22790, 89],
  KeyE: [23317, 83],
  KeyR: [23817, 92],
  KeyT: [24297, 92],
  KeyY: [24811, 93],
  KeyU: [25313, 95],
  KeyI: [25795, 91],
  KeyO: [26309, 84],
  KeyP: [26804, 83],
  BracketLeft: [27330, 85],
  BracketRight: [27883, 99],
  Backslash: [28393, 100],
  CapsLock: [31011, 126],
  KeyA: [31542, 85],
  KeyS: [32031, 88],
  KeyD: [32492, 85],
  KeyF: [32973, 87],
  KeyG: [33453, 94],
  KeyH: [33986, 93],
  KeyJ: [34425, 88],
  KeyK: [34932, 90],
  KeyL: [35410, 95],
  Semicolon: [35914, 95],
  Quote: [36428, 87],
  Enter: [36902, 117],
  ShiftLeft: [38136, 133],
  KeyZ: [38694, 80],
  KeyX: [39148, 76],
  KeyC: [39632, 95],
  KeyV: [40136, 94],
  KeyB: [40621, 107],
  KeyN: [41103, 90],
  KeyM: [41610, 93],
  Comma: [42110, 92],
  Period: [42594, 90],
  Slash: [43105, 95],
  ShiftRight: [43565, 137],
  Fn: [44251, 110],
  ControlLeft: [45327, 83],
  AltLeft: [45750, 82],
  MetaLeft: [46199, 100],
  Space: [51541, 144],
  MetaRight: [47929, 75],
  AltRight: [49329, 82],
  ArrowUp: [44251, 110],
  ArrowLeft: [49837, 88],
  ArrowDown: [50333, 90],
  ArrowRight: [50783, 111]
};
var SOUND_DEFINES_UP = {
  Escape: [2894 + 120, 100],
  F1: [3610 + 100, 90],
  F2: [4210 + 95, 80],
  F3: [4758 + 95, 80],
  F4: [5250 + 105, 90],
  F5: [5831 + 110, 95],
  F6: [6396 + 110, 95],
  F7: [6900 + 110, 95],
  F8: [7443 + 115, 100],
  F9: [7955 + 95, 80],
  F10: [8504 + 110, 95],
  F11: [9046 + 100, 85],
  F12: [9582 + 100, 85],
  Backquote: [12476 + 105, 90],
  Digit1: [12946 + 100, 85],
  Digit2: [13470 + 100, 85],
  Digit3: [13963 + 105, 90],
  Digit4: [14481 + 110, 90],
  Digit5: [14994 + 100, 85],
  Digit6: [15505 + 115, 100],
  Digit7: [15990 + 100, 90],
  Digit8: [16529 + 95, 85],
  Digit9: [17012 + 110, 90],
  Digit0: [17550 + 90, 80],
  Minus: [18052 + 100, 85],
  Equal: [18553 + 90, 85],
  Backspace: [19065 + 115, 100],
  Tab: [21734 + 125, 110],
  KeyQ: [22245 + 100, 85],
  KeyW: [22790 + 90, 85],
  KeyE: [23317 + 85, 80],
  KeyR: [23817 + 95, 85],
  KeyT: [24297 + 95, 85],
  KeyY: [24811 + 100, 85],
  KeyU: [25313 + 100, 85],
  KeyI: [25795 + 95, 85],
  KeyO: [26309 + 85, 80],
  KeyP: [26804 + 85, 80],
  BracketLeft: [27330 + 85, 80],
  BracketRight: [27883 + 105, 90],
  Backslash: [28393 + 105, 90],
  CapsLock: [31011 + 135, 110],
  KeyA: [31542 + 90, 80],
  KeyS: [32031 + 90, 80],
  KeyD: [32492 + 85, 80],
  KeyF: [32973 + 90, 80],
  KeyG: [33453 + 100, 85],
  KeyH: [33986 + 95, 85],
  KeyJ: [34425 + 90, 85],
  KeyK: [34932 + 95, 85],
  KeyL: [35410 + 100, 85],
  Semicolon: [35914 + 100, 85],
  Quote: [36428 + 90, 80],
  Enter: [36902 + 125, 105],
  ShiftLeft: [38136 + 140, 120],
  KeyZ: [38694 + 85, 75],
  KeyX: [39148 + 80, 70],
  KeyC: [39632 + 100, 85],
  KeyV: [40136 + 100, 85],
  KeyB: [40621 + 115, 95],
  KeyN: [41103 + 95, 85],
  KeyM: [41610 + 100, 85],
  Comma: [42110 + 95, 85],
  Period: [42594 + 95, 85],
  Slash: [43105 + 100, 85],
  ShiftRight: [43565 + 145, 125],
  Fn: [44251 + 115, 100],
  ControlLeft: [45327 + 85, 80],
  AltLeft: [45750 + 85, 80],
  MetaLeft: [46199 + 105, 90],
  Space: [51541 + 150, 130],
  MetaRight: [47929 + 75, 70],
  AltRight: [49329 + 85, 80],
  ArrowUp: [44251 + 115, 100],
  ArrowLeft: [49837 + 90, 85],
  ArrowDown: [50333 + 95, 80],
  ArrowRight: [50783 + 115, 100]
};
var KEY_DISPLAY_LABELS = {
  Escape: "esc",
  Backspace: "delete",
  Tab: "tab",
  Enter: "return",
  ShiftLeft: "shift",
  ShiftRight: "shift",
  ControlLeft: "control",
  ControlRight: "control",
  AltLeft: "option",
  AltRight: "option",
  MetaLeft: "command",
  MetaRight: "command",
  Space: "space",
  CapsLock: "caps",
  ArrowUp: "\u2191",
  ArrowDown: "\u2193",
  ArrowLeft: "\u2190",
  ArrowRight: "\u2192",
  Backquote: "`",
  Minus: "-",
  Equal: "=",
  BracketLeft: "[",
  BracketRight: "]",
  Backslash: "\\",
  Semicolon: ";",
  Quote: "'",
  Comma: ",",
  Period: ".",
  Slash: "/"
};
var getKeyDisplayLabel = (keyCode) => {
  if (KEY_DISPLAY_LABELS[keyCode]) return KEY_DISPLAY_LABELS[keyCode];
  if (keyCode.startsWith("Key")) return keyCode.slice(3);
  if (keyCode.startsWith("Digit")) return keyCode.slice(5);
  if (keyCode.startsWith("F") && keyCode.length <= 3) return keyCode;
  return keyCode;
};
var KeyboardContext = createContext(null);
var useKeyboardSound = () => {
  const context = useContext(KeyboardContext);
  if (!context) {
    throw new Error("useKeyboardSound must be used within KeyboardProvider");
  }
  return context;
};
var KeyboardProvider = ({
  children,
  enableSound = false,
  containerRef
}) => {
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);
  const [pressedKeys, setPressedKeys] = useState(/* @__PURE__ */ new Set());
  const [lastPressedKey, setLastPressedKey] = useState(null);
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setSoundLoaded(false);
    if (!enableSound) return;
    const controller = new AbortController();
    let context = null;
    let started = false;
    const removeListeners = () => {
      window.removeEventListener("click", initAudio);
      window.removeEventListener("keydown", initAudio);
    };
    async function initAudio() {
      if (started) return;
      started = true;
      removeListeners();
      try {
        context = new AudioContext();
        audioContextRef.current = context;
        void context.resume().catch(() => {
        });
        const response = await fetch("/sounds/sound.ogg", {
          signal: controller.signal
        });
        if (!response.ok || controller.signal.aborted) return;
        const bytes = await response.arrayBuffer();
        if (controller.signal.aborted) return;
        const buffer = await context.decodeAudioData(bytes);
        if (controller.signal.aborted) return;
        audioBufferRef.current = buffer;
        setSoundLoaded(true);
      } catch {
      }
    }
    window.addEventListener("click", initAudio, { once: true });
    window.addEventListener("keydown", initAudio, { once: true });
    return () => {
      removeListeners();
      controller.abort();
      setSoundLoaded(false);
      audioBufferRef.current = null;
      audioContextRef.current = null;
      if (context) void context.close().catch(() => {
      });
    };
  }, [enableSound]);
  const playSoundDown = useCallback(
    (keyCode) => {
      if (!enableSound || !soundLoaded) return;
      if (!audioContextRef.current || !audioBufferRef.current) return;
      const soundDef = SOUND_DEFINES_DOWN[keyCode];
      if (!soundDef) return;
      const [startMs, durationMs] = soundDef;
      const startTime = startMs / 1e3;
      const duration = durationMs / 1e3;
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBufferRef.current;
      source.connect(audioContextRef.current.destination);
      source.start(0, startTime, duration);
    },
    [enableSound, soundLoaded]
  );
  const playSoundUp = useCallback(
    (keyCode) => {
      if (!enableSound || !soundLoaded) return;
      if (!audioContextRef.current || !audioBufferRef.current) return;
      const soundDef = SOUND_DEFINES_UP[keyCode];
      if (!soundDef) return;
      const [startMs, durationMs] = soundDef;
      const startTime = startMs / 1e3;
      const duration = durationMs / 1e3;
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBufferRef.current;
      source.connect(audioContextRef.current.destination);
      source.start(0, startTime, duration);
    },
    [enableSound, soundLoaded]
  );
  const setPressed = useCallback((keyCode) => {
    setPressedKeys((prev) => new Set(prev).add(keyCode));
    setLastPressedKey(keyCode);
  }, []);
  const setReleased = useCallback((keyCode) => {
    setPressedKeys((prev) => {
      const next = new Set(prev);
      next.delete(keyCode);
      return next;
    });
  }, []);
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [containerRef]);
  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (e) => {
      if (e.repeat) return;
      const keyCode = e.code;
      playSoundDown(keyCode);
      setPressed(keyCode);
    };
    const handleKeyUp = (e) => {
      const keyCode = e.code;
      playSoundUp(keyCode);
      setReleased(keyCode);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isVisible, playSoundDown, playSoundUp, setPressed, setReleased]);
  return /* @__PURE__ */ jsx(
    KeyboardContext.Provider,
    {
      value: {
        playSoundDown,
        playSoundUp,
        pressedKeys,
        setPressed,
        setReleased,
        lastPressedKey
      },
      children
    }
  );
};
var KeystrokePreview = () => {
  const { lastPressedKey, pressedKeys } = useKeyboardSound();
  const [displayKey, setDisplayKey] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);
  useEffect(() => {
    if (lastPressedKey) {
      if (lastPressedKey === "Space" || lastPressedKey === "ShiftLeft" || lastPressedKey === "ShiftRight") {
        setDisplayKey(null);
        return;
      }
      setDisplayKey(getKeyDisplayLabel(lastPressedKey));
      setAnimationKey((prev) => prev + 1);
    }
  }, [lastPressedKey]);
  const isPressed = pressedKeys.size > 0;
  return /* @__PURE__ */ jsx("div", { className: "relative flex h-12 w-full items-center justify-center", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: displayKey && /* @__PURE__ */ jsx(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0, scale: 0.5, y: 5 },
      animate: {
        opacity: 1,
        scale: isPressed ? 0.95 : 1,
        y: 0
      },
      exit: { opacity: 0, scale: 0.8, y: -5 },
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5
      },
      className: "absolute flex items-center justify-center rounded-lg px-4 py-2 font-mono text-2xl font-black text-neutral-700",
      children: /* @__PURE__ */ jsx(
        motion.span,
        {
          initial: { opacity: 0, scale: 1.2, filter: "blur(10px)" },
          animate: { opacity: 0.6, scale: 1, filter: "blur(0px)" },
          transition: { duration: 0.05 },
          className: "text-2xl",
          children: displayKey
        }
      )
    },
    animationKey
  ) }) });
};
var Keyboard = ({
  className,
  enableSound = false,
  showPreview = false
}) => {
  const containerRef = useRef(null);
  return /* @__PURE__ */ jsx(KeyboardProvider, { enableSound, containerRef, children: /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: cn(
        "mx-auto w-fit [zoom:0.8] sm:[zoom:1.25] md:[zoom:1.5] lg:[zoom:1.75] xl:[zoom:2]",
        className
      ),
      children: [
        showPreview && /* @__PURE__ */ jsx(KeystrokePreview, {}),
        /* @__PURE__ */ jsx(Keypad, {})
      ]
    }
  ) });
};
var Keypad = () => {
  return /* @__PURE__ */ jsxs("div", { className: "h-full w-fit rounded-xl bg-neutral-200 p-1 shadow-sm ring-1 shadow-black/5 ring-black/5", children: [
    /* @__PURE__ */ jsxs(Row, { children: [
      /* @__PURE__ */ jsx(
        Key,
        {
          keyCode: "Escape",
          containerClassName: "rounded-tl-xl",
          className: "w-10 rounded-tl-lg",
          childrenClassName: "items-start justify-end pb-[2px] pl-[4px]",
          children: /* @__PURE__ */ jsx("span", { children: "esc" })
        }
      ),
      /* @__PURE__ */ jsxs(Key, { keyCode: "F1", children: [
        /* @__PURE__ */ jsx(IconBrightnessDown, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1", children: "F1" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "F2", children: [
        /* @__PURE__ */ jsx(IconBrightnessUp, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1", children: "F2" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "F3", children: [
        /* @__PURE__ */ jsx(IconTable, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1", children: "F3" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "F4", children: [
        /* @__PURE__ */ jsx(IconSearch, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1", children: "F4" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "F5", children: [
        /* @__PURE__ */ jsx(IconMicrophone, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1", children: "F5" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "F6", children: [
        /* @__PURE__ */ jsx(IconMoon, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1", children: "F6" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "F7", children: [
        /* @__PURE__ */ jsx(IconPlayerTrackPrev, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1", children: "F7" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "F8", children: [
        /* @__PURE__ */ jsx(IconPlayerSkipForward, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1", children: "F8" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "F9", children: [
        /* @__PURE__ */ jsx(IconPlayerTrackNext, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1", children: "F9" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "F10", children: [
        /* @__PURE__ */ jsx(IconVolume3, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1", children: "F10" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "F11", children: [
        /* @__PURE__ */ jsx(IconVolume2, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1", children: "F11" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "F12", children: [
        /* @__PURE__ */ jsx(IconVolume, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { className: "mt-1", children: "F12" })
      ] }),
      /* @__PURE__ */ jsx(Key, { containerClassName: "rounded-tr-xl", className: "rounded-tr-lg", children: /* @__PURE__ */ jsx("div", { className: "h-4 w-4 rounded-full bg-gradient-to-b from-neutral-300 via-neutral-200 to-neutral-300 p-px", children: /* @__PURE__ */ jsx("div", { className: "h-full w-full rounded-full bg-neutral-100" }) }) })
    ] }),
    /* @__PURE__ */ jsxs(Row, { children: [
      /* @__PURE__ */ jsxs(Key, { keyCode: "Backquote", children: [
        /* @__PURE__ */ jsx("span", { children: "~" }),
        /* @__PURE__ */ jsx("span", { children: "`" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "Digit1", children: [
        /* @__PURE__ */ jsx("span", { children: "!" }),
        /* @__PURE__ */ jsx("span", { children: "1" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "Digit2", children: [
        /* @__PURE__ */ jsx("span", { children: "@" }),
        /* @__PURE__ */ jsx("span", { children: "2" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "Digit3", children: [
        /* @__PURE__ */ jsx("span", { children: "#" }),
        /* @__PURE__ */ jsx("span", { children: "3" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "Digit4", children: [
        /* @__PURE__ */ jsx("span", { children: "$" }),
        /* @__PURE__ */ jsx("span", { children: "4" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "Digit5", children: [
        /* @__PURE__ */ jsx("span", { children: "%" }),
        /* @__PURE__ */ jsx("span", { children: "5" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "Digit6", children: [
        /* @__PURE__ */ jsx("span", { children: "^" }),
        /* @__PURE__ */ jsx("span", { children: "6" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "Digit7", children: [
        /* @__PURE__ */ jsx("span", { children: "&" }),
        /* @__PURE__ */ jsx("span", { children: "7" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "Digit8", children: [
        /* @__PURE__ */ jsx("span", { children: "*" }),
        /* @__PURE__ */ jsx("span", { children: "8" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "Digit9", children: [
        /* @__PURE__ */ jsx("span", { children: "(" }),
        /* @__PURE__ */ jsx("span", { children: "9" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "Digit0", children: [
        /* @__PURE__ */ jsx("span", { children: ")" }),
        /* @__PURE__ */ jsx("span", { children: "0" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "Minus", children: [
        /* @__PURE__ */ jsx("span", { children: "\u2014" }),
        /* @__PURE__ */ jsx("span", { children: "_" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "Equal", children: [
        /* @__PURE__ */ jsx("span", { children: "+" }),
        /* @__PURE__ */ jsx("span", { children: "=" })
      ] }),
      /* @__PURE__ */ jsx(
        Key,
        {
          keyCode: "Backspace",
          className: "w-10",
          childrenClassName: "items-end justify-end pr-[4px] pb-[2px]",
          children: /* @__PURE__ */ jsx("span", { children: "delete" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Row, { children: [
      /* @__PURE__ */ jsx(
        Key,
        {
          keyCode: "Tab",
          className: "w-10",
          childrenClassName: "items-start justify-end pb-[2px] pl-[4px]",
          children: /* @__PURE__ */ jsx("span", { children: "tab" })
        }
      ),
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((letter) => /* @__PURE__ */ jsx(Key, { keyCode: `Key${letter}`, children: letter }, letter)),
      /* @__PURE__ */ jsxs(Key, { keyCode: "BracketLeft", children: [
        /* @__PURE__ */ jsx("span", { children: `{` }),
        /* @__PURE__ */ jsx("span", { children: `[` })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "BracketRight", children: [
        /* @__PURE__ */ jsx("span", { children: `}` }),
        /* @__PURE__ */ jsx("span", { children: `]` })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "Backslash", children: [
        /* @__PURE__ */ jsx("span", { children: `|` }),
        /* @__PURE__ */ jsx("span", { children: `\\` })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Row, { children: [
      /* @__PURE__ */ jsx(
        Key,
        {
          keyCode: "CapsLock",
          className: "w-[2.8rem]",
          childrenClassName: "items-start justify-end pb-[2px] pl-[4px]",
          children: /* @__PURE__ */ jsx("span", { children: "caps lock" })
        }
      ),
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((letter) => /* @__PURE__ */ jsx(Key, { keyCode: `Key${letter}`, children: letter }, letter)),
      /* @__PURE__ */ jsxs(Key, { keyCode: "Semicolon", children: [
        /* @__PURE__ */ jsx("span", { children: ":" }),
        /* @__PURE__ */ jsx("span", { children: ";" })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "Quote", children: [
        /* @__PURE__ */ jsx("span", { children: `"` }),
        /* @__PURE__ */ jsx("span", { children: `'` })
      ] }),
      /* @__PURE__ */ jsx(
        Key,
        {
          keyCode: "Enter",
          className: "w-[2.85rem]",
          childrenClassName: "items-end justify-end pr-[4px] pb-[2px]",
          children: /* @__PURE__ */ jsx("span", { children: "return" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Row, { children: [
      /* @__PURE__ */ jsx(
        Key,
        {
          keyCode: "ShiftLeft",
          className: "w-[3.65rem]",
          childrenClassName: "items-start justify-end pb-[2px] pl-[4px]",
          children: /* @__PURE__ */ jsx("span", { children: "shift" })
        }
      ),
      ["Z", "X", "C", "V", "B", "N", "M"].map((letter) => /* @__PURE__ */ jsx(Key, { keyCode: `Key${letter}`, children: letter }, letter)),
      /* @__PURE__ */ jsxs(Key, { keyCode: "Comma", children: [
        /* @__PURE__ */ jsx("span", { children: `<` }),
        /* @__PURE__ */ jsx("span", { children: "," })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "Period", children: [
        /* @__PURE__ */ jsx("span", { children: `>` }),
        /* @__PURE__ */ jsx("span", { children: "." })
      ] }),
      /* @__PURE__ */ jsxs(Key, { keyCode: "Slash", children: [
        /* @__PURE__ */ jsx("span", { children: "?" }),
        /* @__PURE__ */ jsx("span", { children: "/" })
      ] }),
      /* @__PURE__ */ jsx(
        Key,
        {
          keyCode: "ShiftRight",
          className: "w-[3.65rem]",
          childrenClassName: "items-end justify-end pr-[4px] pb-[2px]",
          children: /* @__PURE__ */ jsx("span", { children: "shift" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Row, { children: [
      /* @__PURE__ */ jsxs(
        ModifierKey,
        {
          keyCode: "Fn",
          containerClassName: "rounded-bl-xl",
          className: "rounded-bl-lg",
          children: [
            /* @__PURE__ */ jsx("span", { children: "fn" }),
            /* @__PURE__ */ jsx(IconWorld, { className: "h-[6px] w-[6px]" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(ModifierKey, { keyCode: "ControlLeft", children: [
        /* @__PURE__ */ jsx(IconChevronUp, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { children: "control" })
      ] }),
      /* @__PURE__ */ jsxs(ModifierKey, { keyCode: "AltLeft", children: [
        /* @__PURE__ */ jsx(OptionKey, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { children: "option" })
      ] }),
      /* @__PURE__ */ jsxs(ModifierKey, { keyCode: "MetaLeft", className: "w-8", children: [
        /* @__PURE__ */ jsx(IconCommand, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { children: "command" })
      ] }),
      /* @__PURE__ */ jsx(Key, { keyCode: "Space", className: "w-[8.2rem]" }),
      /* @__PURE__ */ jsxs(ModifierKey, { keyCode: "MetaRight", className: "w-8", children: [
        /* @__PURE__ */ jsx(IconCommand, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { children: "command" })
      ] }),
      /* @__PURE__ */ jsxs(ModifierKey, { keyCode: "AltRight", children: [
        /* @__PURE__ */ jsx(OptionKey, { className: "h-[6px] w-[6px]" }),
        /* @__PURE__ */ jsx("span", { children: "option" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex h-6 w-[4.9rem] items-center justify-end rounded-[4px] p-[0.5px]", children: [
        /* @__PURE__ */ jsx(Key, { keyCode: "ArrowLeft", className: "h-6 w-6", children: /* @__PURE__ */ jsx(IconCaretLeftFilled, { className: "h-[6px] w-[6px]" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx(Key, { keyCode: "ArrowUp", className: "h-3 w-6", children: /* @__PURE__ */ jsx(IconCaretUpFilled, { className: "h-[6px] w-[6px]" }) }),
          /* @__PURE__ */ jsx(Key, { keyCode: "ArrowDown", className: "h-3 w-6", children: /* @__PURE__ */ jsx(IconCaretDownFilled, { className: "h-[6px] w-[6px]" }) })
        ] }),
        /* @__PURE__ */ jsx(
          Key,
          {
            keyCode: "ArrowRight",
            containerClassName: "rounded-br-xl",
            className: "h-6 w-6 rounded-br-lg",
            children: /* @__PURE__ */ jsx(IconCaretRightFilled, { className: "h-[6px] w-[6px]" })
          }
        )
      ] })
    ] })
  ] });
};
var Row = ({ children }) => /* @__PURE__ */ jsx("div", { className: "mb-[2px] flex w-full shrink-0 gap-[2px]", children });
var Key = ({
  className,
  childrenClassName,
  containerClassName,
  children,
  keyCode
}) => {
  const { playSoundDown, playSoundUp, pressedKeys, setPressed, setReleased } = useKeyboardSound();
  const isPressed = keyCode ? pressedKeys.has(keyCode) : false;
  const handleMouseDown = () => {
    if (keyCode) {
      playSoundDown(keyCode);
      setPressed(keyCode);
    }
  };
  const handleMouseUp = () => {
    if (keyCode && isPressed) {
      playSoundUp(keyCode);
      setReleased(keyCode);
    }
  };
  const handleMouseLeave = () => {
    if (keyCode && isPressed) {
      setReleased(keyCode);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: cn("rounded-[4px] p-[0.5px]", containerClassName), children: /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      className: cn(
        "flex h-6 w-6 cursor-pointer items-center justify-center rounded-[3.5px] bg-gray-100 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.5),0px_1px_1px_0px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(255,255,255,1)_inset] transition-transform duration-75 active:scale-[0.98]",
        isPressed && "scale-[0.98] bg-gray-100/80 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.5),0px_1px_1px_0px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(255,255,255,0.5)]",
        className
      ),
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "flex h-full w-full flex-col items-center justify-center text-[5px] text-neutral-700",
            childrenClassName
          ),
          children
        }
      )
    }
  ) });
};
var ModifierKey = ({
  className,
  containerClassName,
  children,
  keyCode
}) => {
  const { playSoundDown, playSoundUp, pressedKeys, setPressed, setReleased } = useKeyboardSound();
  const isPressed = keyCode ? pressedKeys.has(keyCode) : false;
  const handleMouseDown = () => {
    if (keyCode) {
      playSoundDown(keyCode);
      setPressed(keyCode);
    }
  };
  const handleMouseUp = () => {
    if (keyCode && isPressed) {
      playSoundUp(keyCode);
      setReleased(keyCode);
    }
  };
  const handleMouseLeave = () => {
    if (keyCode && isPressed) {
      setReleased(keyCode);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: cn("rounded-[4px] p-[0.5px]", containerClassName), children: /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      className: cn(
        "flex h-6 w-6 cursor-pointer items-center justify-center rounded-[3.5px] bg-gray-100 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.5),0px_1px_1px_0px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(255,255,255,1)_inset] transition-transform duration-75 active:scale-[0.98]",
        isPressed && "scale-[0.98] bg-gray-100/80 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.5),0px_1px_1px_0px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(255,255,255,0.5)]",
        className
      ),
      children: /* @__PURE__ */ jsx("div", { className: "flex h-full w-full flex-col items-start justify-between p-1 text-[5px] text-neutral-700", children })
    }
  ) });
};
var OptionKey = ({ className }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      fill: "none",
      version: "1.1",
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
            points: "10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25"
          }
        )
      ]
    }
  );
};

// entry.jsx
import React2 from "react";

// registry:components/keyboard-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function KeyboardDemo() {
  return /* @__PURE__ */ jsx2("div", { className: "flex min-h-96 w-full items-center justify-center py-10 md:min-h-180", children: /* @__PURE__ */ jsx2(Keyboard, { enableSound: true }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(KeyboardDemo, {}) }) });
}
export {
  Keyboard,
  Keypad,
  Component as default
};
