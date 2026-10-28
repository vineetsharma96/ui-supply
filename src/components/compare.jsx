// Adapted from https://ui.aceternity.com/components/compare
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/compare.tsx
import React2, { useState as useState2, useEffect as useEffect2, useRef, useCallback } from "react";

// registry:components/ui/sparkles.tsx
import { useId } from "react";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/sparkles.tsx
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

// registry:components/ui/compare.tsx
import { AnimatePresence, motion as motion2 } from "motion/react";
import { IconDotsVertical } from "@tabler/icons-react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var Compare = ({
  firstImage = "",
  secondImage = "",
  className,
  firstImageClassName,
  secondImageClassname,
  initialSliderPercentage = 50,
  slideMode = "hover",
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5e3
}) => {
  const [sliderXPercent, setSliderXPercent] = useState2(initialSliderPercentage);
  const [isDragging, setIsDragging] = useState2(false);
  const sliderRef = useRef(null);
  const [isMouseOver, setIsMouseOver] = useState2(false);
  const autoplayRef = useRef(null);
  const startAutoplay = useCallback(() => {
    if (!autoplay) return;
    const startTime = Date.now();
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = elapsedTime % (autoplayDuration * 2) / autoplayDuration;
      const percentage = progress <= 1 ? progress * 100 : (2 - progress) * 100;
      setSliderXPercent(percentage);
      autoplayRef.current = setTimeout(animate, 16);
    };
    animate();
  }, [autoplay, autoplayDuration]);
  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);
  useEffect2(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);
  function mouseEnterHandler() {
    setIsMouseOver(true);
    stopAutoplay();
  }
  function mouseLeaveHandler() {
    setIsMouseOver(false);
    if (slideMode === "hover") {
      setSliderXPercent(initialSliderPercentage);
    }
    if (slideMode === "drag") {
      setIsDragging(false);
    }
    startAutoplay();
  }
  const handleStart = useCallback(
    (clientX) => {
      if (slideMode === "drag") {
        setIsDragging(true);
      }
    },
    [slideMode]
  );
  const handleEnd = useCallback(() => {
    if (slideMode === "drag") {
      setIsDragging(false);
    }
  }, [slideMode]);
  const handleMove = useCallback(
    (clientX) => {
      if (!sliderRef.current) return;
      if (slideMode === "hover" || slideMode === "drag" && isDragging) {
        const rect = sliderRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percent = x / rect.width * 100;
        requestAnimationFrame(() => {
          setSliderXPercent(Math.max(0, Math.min(100, percent)));
        });
      }
    },
    [slideMode, isDragging]
  );
  const handleMouseDown = useCallback(
    (e) => handleStart(e.clientX),
    [handleStart]
  );
  const handleMouseUp = useCallback(() => handleEnd(), [handleEnd]);
  const handleMouseMove = useCallback(
    (e) => handleMove(e.clientX),
    [handleMove]
  );
  const handleTouchStart = useCallback(
    (e) => {
      if (!autoplay) {
        handleStart(e.touches[0].clientX);
      }
    },
    [handleStart, autoplay]
  );
  const handleTouchEnd = useCallback(() => {
    if (!autoplay) {
      handleEnd();
    }
  }, [handleEnd, autoplay]);
  const handleTouchMove = useCallback(
    (e) => {
      if (!autoplay) {
        handleMove(e.touches[0].clientX);
      }
    },
    [handleMove, autoplay]
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: sliderRef,
      className: cn("w-[400px] h-[400px] overflow-hidden", className),
      style: {
        position: "relative",
        cursor: slideMode === "drag" ? "grab" : "col-resize"
      },
      onMouseMove: handleMouseMove,
      onMouseLeave: mouseLeaveHandler,
      onMouseEnter: mouseEnterHandler,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onTouchMove: handleTouchMove,
      children: [
        /* @__PURE__ */ jsx2(AnimatePresence, { initial: false, children: /* @__PURE__ */ jsxs(
          motion2.div,
          {
            className: "h-full w-px absolute top-0 m-auto z-30 bg-gradient-to-b from-transparent from-[5%] to-[95%] via-indigo-500 to-transparent",
            style: {
              left: `${sliderXPercent}%`,
              top: "0",
              zIndex: 40
            },
            transition: { duration: 0 },
            children: [
              /* @__PURE__ */ jsx2("div", { className: "w-36 h-full [mask-image:radial-gradient(100px_at_left,white,transparent)] absolute top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-indigo-400 via-transparent to-transparent z-20 opacity-50" }),
              /* @__PURE__ */ jsx2("div", { className: "w-10 h-1/2 [mask-image:radial-gradient(50px_at_left,white,transparent)] absolute top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-cyan-400 via-transparent to-transparent z-10 opacity-100" }),
              /* @__PURE__ */ jsx2("div", { className: "w-10 h-3/4 top-1/2 -translate-y-1/2 absolute -right-10 [mask-image:radial-gradient(100px_at_left,white,transparent)]", children: /* @__PURE__ */ jsx2(
                MemoizedSparklesCore,
                {
                  background: "transparent",
                  minSize: 0.4,
                  maxSize: 1,
                  particleDensity: 1200,
                  className: "w-full h-full",
                  particleColor: "#FFFFFF"
                }
              ) }),
              showHandlebar && /* @__PURE__ */ jsx2("div", { className: "h-5 w-5 rounded-md top-1/2 -translate-y-1/2 bg-white z-30 -right-2.5 absolute   flex items-center justify-center shadow-[0px_-1px_0px_0px_#FFFFFF40]", children: /* @__PURE__ */ jsx2(IconDotsVertical, { className: "h-4 w-4 text-black" }) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx2("div", { className: "overflow-hidden w-full h-full relative z-20 pointer-events-none", children: /* @__PURE__ */ jsx2(AnimatePresence, { initial: false, children: firstImage ? /* @__PURE__ */ jsx2(
          motion2.div,
          {
            className: cn(
              "absolute inset-0 z-20 rounded-2xl shrink-0 w-full h-full select-none overflow-hidden",
              firstImageClassName
            ),
            style: {
              clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`
            },
            transition: { duration: 0 },
            children: /* @__PURE__ */ jsx2(
              "img",
              {
                alt: "first image",
                src: firstImage,
                className: cn(
                  "absolute inset-0  z-20 rounded-2xl shrink-0 w-full h-full select-none",
                  firstImageClassName
                ),
                draggable: false
              }
            )
          }
        ) : null }) }),
        /* @__PURE__ */ jsx2(AnimatePresence, { initial: false, children: secondImage ? /* @__PURE__ */ jsx2(
          motion2.img,
          {
            className: cn(
              "absolute top-0 left-0 z-[19]  rounded-2xl w-full h-full select-none",
              secondImageClassname
            ),
            alt: "second image",
            src: secondImage,
            draggable: false
          }
        ) : null })
      ]
    }
  );
};
var MemoizedSparklesCore = React2.memo(SparklesCore);

// entry.jsx
import React3 from "react";

// registry:components/compare-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function CompareDemo() {
  return /* @__PURE__ */ jsx3("div", { className: "p-4 border rounded-3xl dark:bg-neutral-900 bg-neutral-100  border-neutral-200 dark:border-neutral-800 px-4", children: /* @__PURE__ */ jsx3(
    Compare,
    {
      firstImage: "https://assets.aceternity.com/code-problem.png",
      secondImage: "https://assets.aceternity.com/code-solution.png",
      firstImageClassName: "object-cover object-left-top",
      secondImageClassname: "object-cover object-left-top",
      className: "h-[250px] w-[200px] md:h-[500px] md:w-[500px]",
      slideMode: "hover"
    }
  ) });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(CompareDemo, {}) }) });
}
export {
  Compare,
  Component as default
};
