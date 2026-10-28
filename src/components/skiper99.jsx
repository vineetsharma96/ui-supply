// Adapted from https://skiper-ui.com/v1/skiper99
// Skiper UI / gxuri. Attribution required for free components. See licenses/skiper.txt for usage terms.
// entry.jsx
import React2 from "react";

// registry:skiper99.tsx
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:skiper99.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Skiper99 = () => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-muted flex h-full w-full flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsx("div", { className: "grid content-start justify-items-center gap-6 text-center", children: /* @__PURE__ */ jsx("span", { className: "after:from-background after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:content-['']", children: "Try Hover/Click the icons" }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-25 flex w-full max-w-3xl flex-wrap items-center justify-center gap-2 px-5 text-justify", children: [
      /* @__PURE__ */ jsx("div", { className: "size-22 bg-background rounded-3xl", children: /* @__PURE__ */ jsx(ArrowIcon, {}) }),
      /* @__PURE__ */ jsx("div", { className: "size-22 bg-background rounded-3xl", children: /* @__PURE__ */ jsx(MenuIcon, {}) }),
      /* @__PURE__ */ jsx("div", { className: "size-22 bg-background rounded-3xl", children: /* @__PURE__ */ jsx(VolumeIcon, {}) })
    ] })
  ] });
};
var ArrowIcon = ({ className }) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "group flex size-full cursor-pointer items-center justify-center",
        className
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "relative grid cursor-pointer items-center justify-center", children: [
        /* @__PURE__ */ jsx(ChevronRight, { className: "transition-all duration-500 ease-out group-hover:translate-x-0.5" }),
        /* @__PURE__ */ jsx("div", { className: "absolute right-[9px] h-[2px] w-3 origin-right scale-x-0 rounded-[1px] bg-current transition-all duration-300 ease-out group-hover:right-[7px] group-hover:scale-x-100" })
      ] })
    }
  );
};
var MenuIcon = ({ className }) => {
  const [toggle, setToggle] = useState(false);
  return /* @__PURE__ */ jsx(
    "div",
    {
      onClick: () => setToggle((x) => !x),
      className: cn(
        "group flex size-full cursor-pointer items-center justify-center",
        className
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "relative grid size-4 cursor-pointer items-center justify-center", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            animate: { y: toggle ? 0 : "-5px", rotate: toggle ? 45 : 0 },
            className: "absolute h-0.5 w-full rounded-full bg-current"
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            animate: { opacity: toggle ? 0 : 1 },
            transition: { duration: 0.1 },
            className: "absolute h-0.5 w-full rounded-full bg-current"
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            animate: { y: toggle ? 0 : "5px", rotate: toggle ? -45 : 0 },
            className: "absolute h-0.5 w-full rounded-full bg-current"
          }
        )
      ] })
    }
  );
};
var VolumeIcon = ({ className }) => {
  const [isMuted, setIsMuted] = useState(false);
  return /* @__PURE__ */ jsx(
    "div",
    {
      onClick: () => setIsMuted((x) => !x),
      className: cn(
        "group flex size-full cursor-pointer items-center justify-center",
        className
      ),
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: false,
          className: "relative flex size-5 items-center justify-center",
          animate: {
            rotate: isMuted ? [0, -15, 5, -2, 0] : "none"
          },
          children: [
            /* @__PURE__ */ jsxs(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 24 24",
                className: cn("", className),
                children: [
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      fill: "currentColor",
                      stroke: "none",
                      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
                    }
                  ),
                  /* @__PURE__ */ jsxs(motion.g, { children: [
                    /* @__PURE__ */ jsx(
                      "path",
                      {
                        fill: "none",
                        strokeWidth: 2,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        stroke: "currentColor",
                        d: "M16 9a5 5 0 0 1 0 6"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "path",
                      {
                        fill: "none",
                        strokeWidth: 2,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        stroke: "currentColor",
                        d: "M19.364 18.364a9 9 0 0 0 0-12.728"
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "rotate-[-40deg] overflow-hidden", children: /* @__PURE__ */ jsx(
              motion.div,
              {
                animate: { scaleY: isMuted ? 1 : 0 },
                transition: {
                  ease: "easeInOut",
                  duration: isMuted ? 0.125 : 0.05,
                  delay: isMuted ? 0.15 : 0
                },
                style: {
                  transformOrigin: "top"
                },
                className: "h-[18px] w-fit rounded-full",
                children: /* @__PURE__ */ jsx("div", { className: "bg-background flex h-full w-[3.5px] items-center justify-center rounded-full", children: /* @__PURE__ */ jsx("div", { className: "bg-foreground h-full w-[1.5px] rounded-full" }) })
              }
            ) }) })
          ]
        }
      )
    }
  );
};

// entry.jsx
import { jsx as jsx2 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx2("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx2("div", { className: "vendor-content", children: /* @__PURE__ */ jsx2(Skiper99, {}) }) });
}
export {
  Component as MinimalIconDemo
};

// Independent extended grid from the public #42 preview; original #99 remains above.
import { useState as useIconState } from "react";
import { Home as GridHome, Code2 as GridCode, Lock as GridLock, LogOut as GridExit, RotateCw as GridRotate, MoreHorizontal as GridMore, Plus as GridPlus, AlignLeft as GridAlign, Heart as GridHeart, Bell as GridBell, Paperclip as GridClip, Bookmark as GridBookmark, MousePointer2 as GridPointer, Volume2 as GridVolume } from "lucide-react";
const gridIcons=[GridHome,GridCode,GridLock,GridExit,GridRotate,GridMore,GridPlus,GridAlign,GridHeart,GridBell,GridClip,GridBookmark,GridPointer,GridVolume];
export function AnimatedIconGrid(){const [selected,setSelected]=useIconState([]);return <div className="ffx-icon-grid">{gridIcons.map((Icon,i)=><button key={i} aria-label={["Home","Code","Lock","Sign out","Rotate","More","Add","Align","Like","Notifications","Attach","Save","Select","Sound"][i]} aria-pressed={selected.includes(i)} onClick={()=>setSelected(old=>old.includes(i)?old.filter(n=>n!==i):[...old,i])} style={{"--icon-direction":i%2?"-1":"1"}}><Icon size={21}/></button>)}</div>}
export default function IconStudies(){const [mode,setMode]=useIconState("Grid");return <div className="ff-demo ffx"><div className="ffx-center">{mode==="Grid"?<AnimatedIconGrid/>:<Component/>}<div className="ffx-segments">{["Grid","Minimal"].map(x=><button key={x} aria-pressed={mode===x} onClick={()=>setMode(x)}>{x}</button>)}</div></div></div>}
