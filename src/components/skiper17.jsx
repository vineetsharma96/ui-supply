// Adapted from https://skiper-ui.com/v1/skiper17
// Skiper UI / gxuri. Attribution required for free components. See licenses/skiper.txt for usage terms.
// registry:skiper17.tsx
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";
import { useRef } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:skiper17.tsx
import { jsx } from "react/jsx-runtime";
var StickyCard002 = ({
  cards,
  className,
  containerClassName,
  imageClassName
}) => {
  const container = useRef(null);
  const imageRefs = useRef([]);
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const imageElements = imageRefs.current;
      const totalCards = imageElements.length;
      if (!imageElements[0]) return;
      gsap.set(imageElements[0], { y: "0%", scale: 1, rotation: 0 });
      for (let i = 1; i < totalCards; i++) {
        if (!imageElements[i]) continue;
        gsap.set(imageElements[i], { y: "100%", scale: 1, rotation: 0 });
      }
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-cards",
          start: "top top",
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true
        }
      });
      for (let i = 0; i < totalCards - 1; i++) {
        const currentImage = imageElements[i];
        const nextImage = imageElements[i + 1];
        const position = i;
        if (!currentImage || !nextImage) continue;
        scrollTimeline.to(
          currentImage,
          {
            scale: 0.7,
            rotation: 5,
            duration: 1,
            ease: "none"
          },
          position
        );
        scrollTimeline.to(
          nextImage,
          {
            y: "0%",
            duration: 1,
            ease: "none"
          },
          position
        );
      }
      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      if (container.current) {
        resizeObserver.observe(container.current);
      }
      return () => {
        resizeObserver.disconnect();
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );
  return /* @__PURE__ */ jsx("div", { className: cn("relative h-full w-full", className), ref: container, children: /* @__PURE__ */ jsx("div", { className: "sticky-cards relative flex h-full w-full items-center justify-center overflow-hidden p-3 lg:p-8", children: /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "relative h-[90%] w-full max-w-sm overflow-hidden rounded-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl",
        containerClassName
      ),
      children: cards.map((card, i) => /* @__PURE__ */ jsx(
        "img",
        {
          src: card.image,
          alt: card.alt || "",
          className: cn(
            "rounded-4xl absolute h-full w-full object-cover",
            imageClassName
          ),
          ref: (el) => {
            imageRefs.current[i] = el;
          }
        },
        card.id
      ))
    }
  ) }) });
};
var Skiper17 = () => {
  const defaultCards = [
    {
      id: 1,
      image: "https://skiper-ui.com/images/lummi/img14.png"
    },
    {
      id: 2,
      image: "https://skiper-ui.com/images/lummi/img15.png"
    },
    {
      id: 3,
      image: "https://skiper-ui.com/images/lummi/img29.png"
    },
    {
      id: 4,
      image: "https://skiper-ui.com/images/lummi/img21.png"
    },
    {
      id: 5,
      image: "https://skiper-ui.com/images/lummi/img27.png"
    }
  ];
  return /* @__PURE__ */ jsx(ReactLenis, { root: true, children: /* @__PURE__ */ jsx("div", { className: "h-full w-full", children: /* @__PURE__ */ jsx(StickyCard002, { cards: defaultCards }) }) });
};

// entry.jsx
import React from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx2("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx2("div", { className: "vendor-content", children: /* @__PURE__ */ jsx2(Skiper17, {}) }) });
}
export {
  Skiper17,
  StickyCard002,
  Component as default
};
