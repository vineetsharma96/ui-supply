/*
MIT License

Copyright (c) 2025-2026 Ashutoshx7

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
// Adapted from https://www.vengenceui.com/components/music-player
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/music-player.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { Minus, Pause, Play, Plus, SkipBack, SkipForward } from "lucide-react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/music-player.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var EQ_BARS = [0, 1, 2, 3];
var EQ_KEYFRAMES = "@keyframes vengeance-eq{0%,100%{transform:scaleY(0.28)}50%{transform:scaleY(1)}}";
function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
function clampIndex(index, length) {
  if (length === 0) return 0;
  return Math.min(Math.max(index, 0), length - 1);
}
function MusicPlayer({
  tracks,
  avatar,
  startIndex = 0,
  autoPlay = false,
  loop = true,
  defaultCollapsed = false,
  showProgress = true,
  accentColor,
  onTrackChange,
  className
}) {
  const audioRef = useRef(null);
  const [index, setIndex] = useState(() => clampIndex(startIndex, tracks.length));
  const [isPlaying, setIsPlaying] = useState(false);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const shouldPlayRef = useRef(autoPlay);
  const onTrackChangeRef = useRef(onTrackChange);
  useEffect(() => {
    onTrackChangeRef.current = onTrackChange;
  }, [onTrackChange]);
  const track = tracks[index];
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    audio.src = track.src;
    audio.load();
    setCurrentTime(0);
    onTrackChangeRef.current?.(track, index);
    if (shouldPlayRef.current) {
      audio.play().catch(() => {
      });
    }
  }, [index, track?.src]);
  const play = useCallback(() => {
    shouldPlayRef.current = true;
    audioRef.current?.play().catch(() => {
    });
  }, []);
  const pause = useCallback(() => {
    shouldPlayRef.current = false;
    audioRef.current?.pause();
  }, []);
  const togglePlay = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);
  const next = useCallback(() => {
    if (tracks.length === 0) return;
    shouldPlayRef.current = true;
    setIndex((i) => (i + 1) % tracks.length);
  }, [tracks.length]);
  const prev = useCallback(() => {
    if (tracks.length === 0) return;
    shouldPlayRef.current = true;
    setIndex((i) => (i - 1 + tracks.length) % tracks.length);
  }, [tracks.length]);
  const handleEnded = useCallback(() => {
    if (!loop && index === tracks.length - 1) {
      shouldPlayRef.current = false;
      setIsPlaying(false);
      return;
    }
    next();
  }, [loop, index, tracks.length, next]);
  const seek = useCallback(
    (event) => {
      const audio = audioRef.current;
      if (!audio || !Number.isFinite(duration) || duration === 0) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const ratio = (event.clientX - rect.left) / rect.width;
      audio.currentTime = Math.min(Math.max(ratio, 0), 1) * duration;
    },
    [duration]
  );
  if (tracks.length === 0 || !track) return null;
  const accent = accentColor ?? "currentColor";
  const artwork = avatar ?? track.artwork;
  const progress = duration > 0 ? currentTime / duration * 100 : 0;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "relative select-none text-white transition-[width] duration-700 ease-out",
        collapsed ? "w-[188px]" : "w-[min(420px,90vw)]",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("style", { children: EQ_KEYFRAMES }),
        /* @__PURE__ */ jsx(
          "audio",
          {
            ref: audioRef,
            preload: "metadata",
            onPlay: () => setIsPlaying(true),
            onPause: () => setIsPlaying(false),
            onTimeUpdate: (e) => setCurrentTime(e.currentTarget.currentTime),
            onLoadedMetadata: (e) => setDuration(e.currentTarget.duration),
            onEnded: handleEnded
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setCollapsed((c) => !c),
            "aria-label": collapsed ? "Expand player" : "Collapse player",
            "aria-expanded": !collapsed,
            className: "absolute -right-3 -top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/15 backdrop-blur-md transition-transform hover:scale-105 active:scale-95",
            children: collapsed ? /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Minus, { className: "h-4 w-4" })
          }
        ),
        artwork ? (
          // eslint-disable-next-line @next/next/no-img-element
          /* @__PURE__ */ jsx(
            "img",
            {
              src: artwork,
              alt: `${track.title} artwork`,
              className: "absolute -top-5 left-0 z-20 h-20 w-20 rounded-xl object-cover shadow-lg shadow-black/30 ring-1 ring-white/20"
            }
          )
        ) : null,
        /* @__PURE__ */ jsxs("div", { className: "relative flex h-[70px] items-center gap-3 overflow-hidden rounded-xl border border-white/15 bg-white/15 pl-24 pr-5 backdrop-blur-md", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-8 shrink-0 items-end gap-[3px]", "aria-hidden": "true", children: EQ_BARS.map((bar) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "block w-[3px] rounded-full",
              style: {
                height: "100%",
                background: accent,
                transformOrigin: "bottom",
                animation: `vengeance-eq ${0.9 + bar * 0.18}s ease-in-out infinite`,
                animationPlayState: isPlaying ? "running" : "paused",
                transform: isPlaying ? void 0 : "scaleY(0.28)"
              }
            },
            bar
          )) }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: cn(
                "flex min-w-0 flex-1 items-center gap-3 transition-opacity duration-300",
                collapsed ? "pointer-events-none opacity-0" : "opacity-100"
              ),
              style: { transitionDelay: collapsed ? "0s" : "0.35s" },
              children: [
                /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsx("div", { className: "truncate text-sm font-semibold uppercase tracking-wide", children: track.title }),
                  /* @__PURE__ */ jsx("div", { className: "truncate text-[0.65rem] uppercase tracking-[0.2em] text-white/50", children: track.artist })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: prev,
                      "aria-label": "Previous track",
                      className: "rounded-full p-1.5 opacity-80 transition hover:bg-white/10 hover:opacity-100",
                      children: /* @__PURE__ */ jsx(SkipBack, { className: "h-4 w-4 fill-current" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: togglePlay,
                      "aria-label": isPlaying ? "Pause" : "Play",
                      className: "rounded-full p-1.5 opacity-90 transition hover:bg-white/10 hover:opacity-100",
                      children: isPlaying ? /* @__PURE__ */ jsx(Pause, { className: "h-5 w-5 fill-current" }) : /* @__PURE__ */ jsx(Play, { className: "h-5 w-5 fill-current" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: next,
                      "aria-label": "Next track",
                      className: "rounded-full p-1.5 opacity-80 transition hover:bg-white/10 hover:opacity-100",
                      children: /* @__PURE__ */ jsx(SkipForward, { className: "h-4 w-4 fill-current" })
                    }
                  )
                ] })
              ]
            }
          ),
          showProgress && !collapsed ? /* @__PURE__ */ jsx(
            "div",
            {
              role: "slider",
              "aria-label": "Seek",
              "aria-valuemin": 0,
              "aria-valuemax": Math.round(duration) || 0,
              "aria-valuenow": Math.round(currentTime),
              "aria-valuetext": `${formatTime(currentTime)} of ${formatTime(duration)}`,
              tabIndex: 0,
              onClick: seek,
              onKeyDown: (e) => {
                const audio = audioRef.current;
                if (!audio || !duration) return;
                if (e.key === "ArrowRight") audio.currentTime = Math.min(duration, currentTime + 5);
                if (e.key === "ArrowLeft") audio.currentTime = Math.max(0, currentTime - 5);
              },
              className: "group absolute inset-x-0 bottom-0 flex h-3 cursor-pointer items-end",
              children: /* @__PURE__ */ jsx("div", { className: "relative h-[3px] w-full bg-white/15", children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute inset-y-0 left-0 transition-[width] duration-100 ease-linear",
                  style: { width: `${progress}%`, background: accent }
                }
              ) })
            }
          ) : null
        ] })
      ]
    }
  );
}

// entry.jsx
import React from "react";

// registry:components/docs/music-player-demo.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var SAMPLE_TRACKS = [
  {
    title: "Play It",
    artist: "Witchitaw",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    artwork: "https://www.vengenceui.com/avatars/aizen.jpg"
  },
  {
    title: "Real Time",
    artist: "Tilden",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    artwork: "https://www.vengenceui.com/avatars/johan.jpg"
  },
  {
    title: "Rec Center",
    artist: "Xavy",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    artwork: "https://www.vengenceui.com/avatars/shinji.jpg"
  }
];
function MusicPlayerDemo() {
  return /* @__PURE__ */ jsxs2("div", { className: "relative flex h-full w-full items-center justify-center overflow-hidden bg-neutral-950", children: [
    /* @__PURE__ */ jsx2(
      "div",
      {
        "aria-hidden": true,
        className: "pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[620px] max-w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl",
        style: { background: "radial-gradient(circle, rgba(255,106,0,0.18), transparent 68%)" }
      }
    ),
    /* @__PURE__ */ jsx2(MusicPlayer, { tracks: SAMPLE_TRACKS, accentColor: "#ff6a00", className: "relative z-10" })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(MusicPlayerDemo, {}) }) });
}
export {
  MusicPlayer,
  Component as default
};
