// Adapted from https://ui.aceternity.com/components/animated-testimonials
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/animated-testimonials.tsx
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var AnimatedTestimonials = ({
  testimonials,
  autoplay = false
}) => {
  const [active, setActive] = useState(0);
  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };
  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  const isActive = (index) => {
    return index === active;
  };
  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5e3);
      return () => clearInterval(interval);
    }
  }, [autoplay]);
  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };
  return /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: "relative grid grid-cols-1 gap-20 md:grid-cols-2", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "relative h-80 w-full", children: /* @__PURE__ */ jsx(AnimatePresence, { children: testimonials.map((testimonial, index) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: {
          opacity: 0,
          scale: 0.9,
          z: -100,
          rotate: randomRotateY()
        },
        animate: {
          opacity: isActive(index) ? 1 : 0.7,
          scale: isActive(index) ? 1 : 0.95,
          z: isActive(index) ? 0 : -100,
          rotate: isActive(index) ? 0 : randomRotateY(),
          zIndex: isActive(index) ? 40 : testimonials.length + 2 - index,
          y: isActive(index) ? [0, -80, 0] : 0
        },
        exit: {
          opacity: 0,
          scale: 0.9,
          z: 100,
          rotate: randomRotateY()
        },
        transition: {
          duration: 0.4,
          ease: "easeInOut"
        },
        className: "absolute inset-0 origin-bottom",
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: testimonial.src,
            alt: testimonial.name,
            width: 500,
            height: 500,
            draggable: false,
            className: "h-full w-full rounded-3xl object-cover object-center"
          }
        )
      },
      testimonial.src
    )) }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between py-4", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: {
            y: 20,
            opacity: 0
          },
          animate: {
            y: 0,
            opacity: 1
          },
          exit: {
            y: -20,
            opacity: 0
          },
          transition: {
            duration: 0.2,
            ease: "easeInOut"
          },
          children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-black dark:text-white", children: testimonials[active].name }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-neutral-500", children: testimonials[active].designation }),
            /* @__PURE__ */ jsx(motion.p, { className: "mt-8 text-lg text-gray-500 dark:text-neutral-300", children: testimonials[active].quote.split(" ").map((word, index) => /* @__PURE__ */ jsxs(
              motion.span,
              {
                initial: {
                  filter: "blur(10px)",
                  opacity: 0,
                  y: 5
                },
                animate: {
                  filter: "blur(0px)",
                  opacity: 1,
                  y: 0
                },
                transition: {
                  duration: 0.2,
                  ease: "easeInOut",
                  delay: 0.02 * index
                },
                className: "inline-block",
                children: [
                  word,
                  "\xA0"
                ]
              },
              index
            )) })
          ]
        },
        active
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-12 md:pt-0", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handlePrev,
            className: "group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800",
            children: /* @__PURE__ */ jsx(IconArrowLeft, { className: "h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleNext,
            className: "group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800",
            children: /* @__PURE__ */ jsx(IconArrowRight, { className: "h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" })
          }
        )
      ] })
    ] })
  ] }) });
};

// entry.jsx
import React from "react";

// registry:components/animated-testimonials-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote: "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      quote: "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      quote: "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      quote: "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      quote: "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];
  return /* @__PURE__ */ jsx2(AnimatedTestimonials, { testimonials });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(AnimatedTestimonialsDemo, {}) }) });
}
export {
  AnimatedTestimonials,
  Component as default
};
