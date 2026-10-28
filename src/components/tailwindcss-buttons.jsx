// Adapted from https://ui.aceternity.com/components/tailwindcss-buttons
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/tailwindcss-buttons.tsx
import { IconClipboard } from "@tabler/icons-react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/tailwindcss-buttons.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var ButtonsCard = ({
  children,
  className,
  onClick
}) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick,
      className: cn(
        "h-60 w-full bg-white rounded-xl border border-neutral-100 dark:bg-black dark:border-white/[0.2] hover:border-neutral-200 group/btn overflow-hidden relative flex items-center justify-center",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 dark:bg-dot-white/[0.1] bg-dot-black/[0.1]" }),
        /* @__PURE__ */ jsx(IconClipboard, { className: "absolute top-2 right-2 text-neutral-300 group-hover/btn:block hidden h-4 w-4 transition duration-200" }),
        /* @__PURE__ */ jsx("div", { className: "relative z-40", children })
      ]
    }
  );
};

// entry.jsx
import React from "react";

// registry:components/tailwindcss-buttons-demo.tsx
import reactElementToJSXString from "react-element-to-jsx-string";
import { toast, Toaster } from "sonner";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function TailwindcssButtons() {
  const copy = (button) => {
    if (button.code) {
      copyToClipboard(button.code);
      return;
    }
    let buttonString = reactElementToJSXString(button.component);
    if (buttonString) {
      const textToCopy = buttonString;
      copyToClipboard(textToCopy);
    }
  };
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log("Text copied to clipboard:", text);
      toast.success("Copied to clipboard");
    }).catch((err) => {
      console.error("Error copying text to clipboard:", err);
      toast.error("Error copying to clipboard");
    });
  };
  return /* @__PURE__ */ jsxs2("div", { className: "pb-40 px-4 w-full", children: [
    /* @__PURE__ */ jsx2(Toaster, { position: "top-center" }),
    /* @__PURE__ */ jsx2("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full  max-w-7xl mx-auto gap-10", children: buttons.map((button, idx) => /* @__PURE__ */ jsx2(ButtonsCard, { onClick: () => copy(button), children: button.component }, idx)) })
  ] });
}
var buttons = [
  {
    name: "Sketch",
    description: "Sketch button for your website",
    component: /* @__PURE__ */ jsx2("button", { className: "px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200", children: "Sketch" })
  },
  {
    name: "Simple",
    description: "Elegant button for your website",
    component: /* @__PURE__ */ jsx2("button", { className: "px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md", children: "Simple" })
  },
  {
    name: "Invert",
    description: "Simple button that inverts on hover",
    component: /* @__PURE__ */ jsx2("button", { className: "px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500", children: "Invert it" })
  },
  {
    name: "Tailwindcss Connect",
    description: "Button featured on Tailwindcss Connect website",
    showDot: false,
    component: /* @__PURE__ */ jsxs2("button", { className: "bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block", children: [
      /* @__PURE__ */ jsx2("span", { className: "absolute inset-0 overflow-hidden rounded-full", children: /* @__PURE__ */ jsx2("span", { className: "absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" }) }),
      /* @__PURE__ */ jsxs2("div", { className: "relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ", children: [
        /* @__PURE__ */ jsx2("span", { children: `Tailwind Connect` }),
        /* @__PURE__ */ jsx2(
          "svg",
          {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx2(
              "path",
              {
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "1.5",
                d: "M10.75 8.75L14.25 12L10.75 15.25"
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsx2("span", { className: "absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" })
    ] })
  },
  {
    name: "Gradient",
    description: "Simple Gradient button with rounded corners",
    component: /* @__PURE__ */ jsx2("button", { className: "px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200", children: "Gradient" })
  },
  {
    name: "Unapologetic",
    description: "Unapologetic button with perfect corners",
    component: /* @__PURE__ */ jsxs2("button", { className: "px-8 py-2 border border-black bg-transparent text-black  dark:border-white relative group transition duration-200", children: [
      /* @__PURE__ */ jsx2("div", { className: "absolute -bottom-2 -right-2 bg-yellow-300 h-full w-full -z-10 group-hover:bottom-0 group-hover:right-0 transition-all duration-200" }),
      /* @__PURE__ */ jsx2("span", { className: "relative", children: "Unapologetic" })
    ] })
  },
  {
    name: "Lit up borders",
    description: "Gradient button with perfect corners",
    component: /* @__PURE__ */ jsxs2("button", { className: "p-[3px] relative", children: [
      /* @__PURE__ */ jsx2("div", { className: "absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" }),
      /* @__PURE__ */ jsx2("div", { className: "px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent", children: "Lit up borders" })
    ] })
  },
  {
    name: "Border Magic",
    description: "Border Magic button for your website",
    showDot: false,
    component: /* @__PURE__ */ jsxs2("button", { className: "relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50", children: [
      /* @__PURE__ */ jsx2("span", { className: "absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" }),
      /* @__PURE__ */ jsx2("span", { className: "inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl", children: "Border Magic" })
    ] })
  },
  {
    name: "Brutal",
    description: "Brutal button for your website",
    component: /* @__PURE__ */ jsx2("button", { className: "px-8 py-0.5  border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ", children: "Brutal" })
  },
  {
    name: "Favourite",
    description: "Favourite button for your website",
    component: /* @__PURE__ */ jsx2("button", { className: "px-8 py-2  bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg", children: "Favourite" })
  },
  {
    name: "Outline",
    description: "Outline button for your website",
    component: /* @__PURE__ */ jsx2("button", { className: "px-4 py-2 rounded-xl border border-neutral-600 text-black bg-white hover:bg-gray-100 transition duration-200", children: "Outline" })
  },
  {
    name: "Shimmer",
    description: "Shimmer button for your website",
    showDot: false,
    component: /* @__PURE__ */ jsx2("button", { className: "inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50", children: "Shimmer" }),
    code: `
        // Button code
        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Shimmer
        </button>

        // tailwind.config.js code
        {
          "animation": {
            shimmer: "shimmer 2s linear infinite"
          },
          "keyframes": {
            shimmer: {
              from: {
                "backgroundPosition": "0 0"
              },
              to: {
                "backgroundPosition": "-200% 0"
              }
            }
          }
        }
      `
  },
  {
    name: "Next.js Blue",
    description: "Next.js Blue button for your website",
    component: /* @__PURE__ */ jsx2("button", { className: "shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear", children: "Next.js Blue" })
  },
  {
    name: "Next.js White",
    description: "Next.js White button for your website",
    component: /* @__PURE__ */ jsx2("button", { className: "shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-8 py-2 bg-[#fff] text-[#696969] rounded-md font-light transition duration-200 ease-linear", children: "Next White" })
  },
  {
    name: "Spotify",
    description: "Spotify button for your website",
    component: /* @__PURE__ */ jsx2("button", { className: "px-12 py-4 rounded-full bg-[#1ED760] font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[#21e065] transition-colors duration-200", children: "Spotify" })
  },
  {
    name: "Backdrop Blur",
    description: "Outline button for your website",
    showDot: false,
    component: /* @__PURE__ */ jsx2("button", { className: "px-4 py-2 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200", children: "Backdrop blur" })
  },
  {
    name: "Playlist",
    description: "Playlist button for your website",
    component: /* @__PURE__ */ jsx2("button", { className: "shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200", children: "Playlist" })
  },
  {
    name: "Figma",
    description: "Figma button for your website",
    component: /* @__PURE__ */ jsx2("button", { className: "px-6 py-2 bg-black text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400", children: "Figma" })
  },
  {
    name: "Figma Outline",
    description: "Figma Outline button for your website",
    component: /* @__PURE__ */ jsx2("button", { className: "shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400", children: "Figma Outline" })
  },
  {
    name: "Top Gradient",
    description: "Top Gradient button for your website",
    showDot: false,
    component: /* @__PURE__ */ jsxs2("button", { className: "px-8 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600", children: [
      /* @__PURE__ */ jsx2("div", { className: "absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" }),
      /* @__PURE__ */ jsx2("span", { className: "relative z-20", children: "Top gradient" })
    ] })
  }
];

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(TailwindcssButtons, {}) }) });
}
export {
  ButtonsCard,
  Component as default
};
