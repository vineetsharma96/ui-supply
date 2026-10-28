// Adapted from https://ui.aceternity.com/components/container-cover
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/cover.tsx
import { useEffect as useEffect2, useId as useId2, useState as useState2 } from "react";
import { AnimatePresence, motion as motion2 } from "motion/react";
import { useRef } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/sparkles.tsx
import { useId } from "react";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion, useAnimation } from "motion/react";
import { jsx } from "react/jsx-runtime";
var SparklesCore = (props) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity
  } = props;
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  const controls = useAnimation();
  const particlesLoaded = async (container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: {
          duration: 1
        }
      });
    }
  };
  const generatedId = useId();
  return /* @__PURE__ */ jsx(motion.div, { animate: controls, className: cn("opacity-0", className), children: init && /* @__PURE__ */ jsx(
    Particles,
    {
      id: id || generatedId,
      className: cn("h-full w-full"),
      particlesLoaded,
      options: {
        background: {
          color: {
            value: background || "#0d47a1"
          }
        },
        fullScreen: {
          enable: false,
          zIndex: 1
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push"
            },
            onHover: {
              enable: false,
              mode: "repulse"
            },
            resize: true
          },
          modes: {
            push: {
              quantity: 4
            },
            repulse: {
              distance: 200,
              duration: 0.4
            }
          }
        },
        particles: {
          bounce: {
            horizontal: {
              value: 1
            },
            vertical: {
              value: 1
            }
          },
          collisions: {
            absorb: {
              speed: 2
            },
            bounce: {
              horizontal: {
                value: 1
              },
              vertical: {
                value: 1
              }
            },
            enable: false,
            maxSpeed: 50,
            mode: "bounce",
            overlap: {
              enable: true,
              retries: 0
            }
          },
          color: {
            value: particleColor || "#ffffff",
            animation: {
              h: {
                count: 0,
                enable: false,
                speed: 1,
                decay: 0,
                delay: 0,
                sync: true,
                offset: 0
              },
              s: {
                count: 0,
                enable: false,
                speed: 1,
                decay: 0,
                delay: 0,
                sync: true,
                offset: 0
              },
              l: {
                count: 0,
                enable: false,
                speed: 1,
                decay: 0,
                delay: 0,
                sync: true,
                offset: 0
              }
            }
          },
          effect: {
            close: true,
            fill: true,
            options: {},
            type: {}
          },
          groups: {},
          move: {
            angle: {
              offset: 0,
              value: 90
            },
            attract: {
              distance: 200,
              enable: false,
              rotate: {
                x: 3e3,
                y: 3e3
              }
            },
            center: {
              x: 50,
              y: 50,
              mode: "percent",
              radius: 0
            },
            decay: 0,
            distance: {},
            direction: "none",
            drift: 0,
            enable: true,
            gravity: {
              acceleration: 9.81,
              enable: false,
              inverse: false,
              maxSpeed: 50
            },
            path: {
              clamp: true,
              delay: {
                value: 0
              },
              enable: false,
              options: {}
            },
            outModes: {
              default: "out"
            },
            random: false,
            size: false,
            speed: {
              min: 0.1,
              max: 1
            },
            spin: {
              acceleration: 0,
              enable: false
            },
            straight: false,
            trail: {
              enable: false,
              length: 10,
              fill: {}
            },
            vibrate: false,
            warp: false
          },
          number: {
            density: {
              enable: true,
              width: 400,
              height: 400
            },
            limit: {
              mode: "delete",
              value: 0
            },
            value: particleDensity || 120
          },
          opacity: {
            value: {
              min: 0.1,
              max: 1
            },
            animation: {
              count: 0,
              enable: true,
              speed: speed || 4,
              decay: 0,
              delay: 0,
              sync: false,
              mode: "auto",
              startValue: "random",
              destroy: "none"
            }
          },
          reduceDuplicates: false,
          shadow: {
            blur: 0,
            color: {
              value: "#000"
            },
            enable: false,
            offset: {
              x: 0,
              y: 0
            }
          },
          shape: {
            close: true,
            fill: true,
            options: {},
            type: "circle"
          },
          size: {
            value: {
              min: minSize || 1,
              max: maxSize || 3
            },
            animation: {
              count: 0,
              enable: false,
              speed: 5,
              decay: 0,
              delay: 0,
              sync: false,
              mode: "auto",
              startValue: "random",
              destroy: "none"
            }
          },
          stroke: {
            width: 0
          },
          zIndex: {
            value: 0,
            opacityRate: 1,
            sizeRate: 1,
            velocityRate: 1
          },
          destroy: {
            bounds: {},
            mode: "none",
            split: {
              count: 1,
              factor: {
                value: 3
              },
              rate: {
                value: {
                  min: 4,
                  max: 9
                }
              },
              sizeOffset: true
            }
          },
          roll: {
            darken: {
              enable: false,
              value: 0
            },
            enable: false,
            enlighten: {
              enable: false,
              value: 0
            },
            mode: "vertical",
            speed: 25
          },
          tilt: {
            value: 0,
            animation: {
              enable: false,
              speed: 0,
              decay: 0,
              sync: false
            },
            direction: "clockwise",
            enable: false
          },
          twinkle: {
            lines: {
              enable: false,
              frequency: 0.05,
              opacity: 1
            },
            particles: {
              enable: false,
              frequency: 0.05,
              opacity: 1
            }
          },
          wobble: {
            distance: 5,
            enable: false,
            speed: {
              angle: 50,
              move: 10
            }
          },
          life: {
            count: 0,
            delay: {
              value: 0,
              sync: false
            },
            duration: {
              value: 0,
              sync: false
            }
          },
          rotate: {
            value: 0,
            animation: {
              enable: false,
              speed: 0,
              decay: 0,
              sync: false
            },
            direction: "clockwise",
            path: false
          },
          orbit: {
            animation: {
              count: 0,
              enable: false,
              speed: 1,
              decay: 0,
              delay: 0,
              sync: false
            },
            enable: false,
            opacity: 1,
            rotation: {
              value: 45
            },
            width: 1
          },
          links: {
            blink: false,
            color: {
              value: "#fff"
            },
            consent: false,
            distance: 100,
            enable: false,
            frequency: 1,
            opacity: 1,
            shadow: {
              blur: 5,
              color: {
                value: "#000"
              },
              enable: false
            },
            triangles: {
              enable: false,
              frequency: 1
            },
            width: 1,
            warp: false
          },
          repulse: {
            value: 0,
            enabled: false,
            distance: 1,
            duration: 1,
            factor: 1,
            speed: 1
          }
        },
        detectRetina: true
      }
    }
  ) });
};

// registry:components/ui/cover.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var Cover = ({
  children,
  className
}) => {
  const [hovered, setHovered] = useState2(false);
  const ref = useRef(null);
  const [containerWidth, setContainerWidth] = useState2(0);
  const [beamPositions, setBeamPositions] = useState2([]);
  useEffect2(() => {
    if (ref.current) {
      setContainerWidth(ref.current?.clientWidth ?? 0);
      const height = ref.current?.clientHeight ?? 0;
      const numberOfBeams = Math.floor(height / 10);
      const positions = Array.from(
        { length: numberOfBeams },
        (_, i) => (i + 1) * (height / (numberOfBeams + 1))
      );
      setBeamPositions(positions);
    }
  }, [ref.current]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      ref,
      className: "relative hover:bg-neutral-900  group/cover inline-block dark:bg-neutral-900 bg-neutral-100 px-2 py-2  transition duration-200 rounded-sm",
      children: [
        /* @__PURE__ */ jsx2(AnimatePresence, { children: hovered && /* @__PURE__ */ jsx2(
          motion2.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: {
              opacity: {
                duration: 0.2
              }
            },
            className: "h-full w-full overflow-hidden absolute inset-0",
            children: /* @__PURE__ */ jsxs(
              motion2.div,
              {
                animate: {
                  translateX: ["-50%", "0%"]
                },
                transition: {
                  translateX: {
                    duration: 10,
                    ease: "linear",
                    repeat: Infinity
                  }
                },
                className: "w-[200%] h-full flex",
                children: [
                  /* @__PURE__ */ jsx2(
                    SparklesCore,
                    {
                      background: "transparent",
                      minSize: 0.4,
                      maxSize: 1,
                      particleDensity: 500,
                      className: "w-full h-full",
                      particleColor: "#FFFFFF"
                    }
                  ),
                  /* @__PURE__ */ jsx2(
                    SparklesCore,
                    {
                      background: "transparent",
                      minSize: 0.4,
                      maxSize: 1,
                      particleDensity: 500,
                      className: "w-full h-full",
                      particleColor: "#FFFFFF"
                    }
                  )
                ]
              }
            )
          }
        ) }),
        beamPositions.map((position, index) => /* @__PURE__ */ jsx2(
          Beam,
          {
            hovered,
            duration: Math.random() * 2 + 1,
            delay: Math.random() * 2 + 1,
            width: containerWidth,
            style: {
              top: `${position}px`
            }
          },
          index
        )),
        /* @__PURE__ */ jsx2(
          motion2.span,
          {
            animate: {
              scale: hovered ? 0.8 : 1,
              x: hovered ? [0, -30, 30, -30, 30, 0] : 0,
              y: hovered ? [0, 30, -30, 30, -30, 0] : 0
            },
            exit: {
              filter: "none",
              scale: 1,
              x: 0,
              y: 0
            },
            transition: {
              duration: 0.2,
              x: {
                duration: 0.2,
                repeat: Infinity,
                repeatType: "loop"
              },
              y: {
                duration: 0.2,
                repeat: Infinity,
                repeatType: "loop"
              },
              scale: {
                duration: 0.2
              },
              filter: {
                duration: 0.2
              }
            },
            className: cn(
              "dark:text-white inline-block text-neutral-900 relative z-20 group-hover/cover:text-white transition duration-200",
              className
            ),
            children
          },
          String(hovered)
        ),
        /* @__PURE__ */ jsx2(CircleIcon, { className: "absolute -right-[2px] -top-[2px]" }),
        /* @__PURE__ */ jsx2(CircleIcon, { className: "absolute -bottom-[2px] -right-[2px]", delay: 0.4 }),
        /* @__PURE__ */ jsx2(CircleIcon, { className: "absolute -left-[2px] -top-[2px]", delay: 0.8 }),
        /* @__PURE__ */ jsx2(CircleIcon, { className: "absolute -bottom-[2px] -left-[2px]", delay: 1.6 })
      ]
    }
  );
};
var Beam = ({
  className,
  delay,
  duration,
  hovered,
  width = 600,
  ...svgProps
}) => {
  const id = useId2();
  return /* @__PURE__ */ jsxs(
    motion2.svg,
    {
      width: width ?? "600",
      height: "1",
      viewBox: `0 0 ${width ?? "600"} 1`,
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: cn("absolute inset-x-0 w-full", className),
      ...svgProps,
      children: [
        /* @__PURE__ */ jsx2(
          motion2.path,
          {
            d: `M0 0.5H${width ?? "600"}`,
            stroke: `url(#svgGradient-${id})`
          }
        ),
        /* @__PURE__ */ jsx2("defs", { children: /* @__PURE__ */ jsxs(
          motion2.linearGradient,
          {
            id: `svgGradient-${id}`,
            gradientUnits: "userSpaceOnUse",
            initial: {
              x1: "0%",
              x2: hovered ? "-10%" : "-5%",
              y1: 0,
              y2: 0
            },
            animate: {
              x1: "110%",
              x2: hovered ? "100%" : "105%",
              y1: 0,
              y2: 0
            },
            transition: {
              duration: hovered ? 0.5 : duration ?? 2,
              ease: "linear",
              repeat: Infinity,
              delay: hovered ? Math.random() * (1 - 0.2) + 0.2 : 0,
              repeatDelay: hovered ? Math.random() * (2 - 1) + 1 : delay ?? 1
            },
            children: [
              /* @__PURE__ */ jsx2("stop", { stopColor: "#2EB9DF", stopOpacity: "0" }),
              /* @__PURE__ */ jsx2("stop", { stopColor: "#3b82f6" }),
              /* @__PURE__ */ jsx2("stop", { offset: "1", stopColor: "#3b82f6", stopOpacity: "0" })
            ]
          },
          String(hovered)
        ) })
      ]
    }
  );
};
var CircleIcon = ({
  className,
  delay
}) => {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      className: cn(
        `pointer-events-none animate-pulse group-hover/cover:hidden group-hover/cover:opacity-100 group h-2 w-2 rounded-full bg-neutral-600 dark:bg-white opacity-20 group-hover/cover:bg-white`,
        className
      )
    }
  );
};

// entry.jsx
import React3 from "react";

// registry:components/cover-demo.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function CoverDemo() {
  return /* @__PURE__ */ jsx3("div", { children: /* @__PURE__ */ jsxs2("h1", { className: "text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white", children: [
    "Build amazing websites ",
    /* @__PURE__ */ jsx3("br", {}),
    " at ",
    /* @__PURE__ */ jsx3(Cover, { children: "warp speed" })
  ] }) });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(CoverDemo, {}) }) });
}
export {
  Beam,
  CircleIcon,
  Cover,
  Component as default
};
