// Adapted from https://skiper-ui.com/v1/skiper54
// Skiper UI / gxuri. Attribution required for free components. See licenses/skiper.txt for usage terms.
// registry:skiper54.tsx
import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect as useEffect2, useState as useState2 } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/carousel.tsx
import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// registry:components/ui/button.tsx
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";
import { jsx } from "react/jsx-runtime";
var buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

// registry:components/ui/carousel.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var CarouselContext = React.createContext(null);
function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y"
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const onSelect = React.useCallback((api2) => {
    if (!api2) return;
    setCanScrollPrev(api2.canScrollPrev());
    setCanScrollNext(api2.canScrollNext());
  }, []);
  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);
  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);
  const handleKeyDown = React.useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );
  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);
  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);
  return /* @__PURE__ */ jsx2(
    CarouselContext.Provider,
    {
      value: {
        carouselRef,
        api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext
      },
      children: /* @__PURE__ */ jsx2(
        "div",
        {
          onKeyDownCapture: handleKeyDown,
          className: cn("relative", className),
          role: "region",
          "aria-roledescription": "carousel",
          "data-slot": "carousel",
          ...props,
          children
        }
      )
    }
  );
}
function CarouselContent({ className, ...props }) {
  const { carouselRef, orientation } = useCarousel();
  return /* @__PURE__ */ jsx2(
    "div",
    {
      ref: carouselRef,
      className: "overflow-hidden",
      "data-slot": "carousel-content",
      children: /* @__PURE__ */ jsx2(
        "div",
        {
          className: cn(
            "flex",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            className
          ),
          ...props
        }
      )
    }
  );
}
function CarouselItem({ className, ...props }) {
  const { orientation } = useCarousel();
  return /* @__PURE__ */ jsx2(
    "div",
    {
      role: "group",
      "aria-roledescription": "slide",
      "data-slot": "carousel-item",
      className: cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      ),
      ...props
    }
  );
}

// registry:skiper54.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var Skiper54 = () => {
  const images = [
    {
      src: "https://skiper-ui.com/images/x.com/13.jpeg",
      alt: "Illustrations by \xA9AarzooAly",
      title: "Block Reader"
    },
    {
      src: "https://skiper-ui.com/images/x.com/9.jpeg",
      alt: "Illustrations by \xA9AarzooAly",
      title: "Forest Fungi"
    },
    {
      src: "https://skiper-ui.com/images/x.com/20.jpeg",
      alt: "Illustrations by \xA9AarzooAly",
      title: "Golden Dusk"
    },
    {
      src: "https://skiper-ui.com/images/x.com/21.jpeg",
      alt: "Illustrations by \xA9AarzooAly",
      title: "Silent Peaks"
    },
    {
      src: "https://skiper-ui.com/images/x.com/25.jpeg",
      alt: "Illustrations by \xA9AarzooAly",
      title: "Emerald Woods"
    },
    {
      src: "https://skiper-ui.com/images/x.com/32.jpeg",
      alt: "Illustrations by \xA9AarzooAly",
      title: "Falling Mist"
    },
    {
      src: "https://skiper-ui.com/images/x.com/19.jpeg",
      alt: "Illustrations by \xA9AarzooAly",
      title: "Midnight Veil"
    },
    {
      src: "https://skiper-ui.com/images/x.com/3.jpeg",
      alt: "Illustrations by \xA9AarzooAly",
      title: "Azure Ridge"
    },
    {
      src: "https://skiper-ui.com/images/x.com/2.jpeg",
      alt: "Illustrations by \xA9AarzooAly",
      title: "Cloud Summit"
    }
  ];
  return /* @__PURE__ */ jsx3("div", { className: "flex h-full w-screen items-center justify-center overflow-hidden bg-[#f5f4f3]", children: /* @__PURE__ */ jsx3(
    Carousel_006,
    {
      images,
      className: "",
      loop: true,
      showNavigation: true,
      showPagination: true
    }
  ) });
};
var Carousel_006 = ({
  images,
  className,
  autoplay = false,
  loop = true,
  showNavigation = true,
  showPagination = true
}) => {
  const [api, setApi] = useState2();
  const [current, setCurrent] = useState2(0);
  useEffect2(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  return /* @__PURE__ */ jsxs2(
    Carousel,
    {
      setApi,
      className: cn("w-full", className),
      opts: {
        loop,
        slidesToScroll: 1
      },
      plugins: autoplay ? [
        Autoplay({
          delay: 2e3,
          stopOnInteraction: true,
          stopOnMouseEnter: true
        })
      ] : [],
      children: [
        /* @__PURE__ */ jsx3(CarouselContent, { className: "flex h-[500px] w-full", children: images.map((img, index) => /* @__PURE__ */ jsxs2(
          CarouselItem,
          {
            className: "relative flex h-[81.5%] w-full basis-[73%] items-center justify-center sm:basis-[50%] md:basis-[30%] lg:basis-[25%] xl:basis-[21%]",
            children: [
              /* @__PURE__ */ jsx3(
                motion.div,
                {
                  initial: false,
                  animate: {
                    clipPath: current !== index ? "inset(15% 0 15% 0 round 2rem)" : "inset(0 0 0 0 round 2rem)"
                  },
                  className: "h-full w-full overflow-hidden rounded-3xl",
                  children: /* @__PURE__ */ jsx3("div", { className: "relative h-full w-full border", children: /* @__PURE__ */ jsx3(
                    "img",
                    {
                      src: img.src,
                      alt: img.alt,
                      className: "h-full w-full scale-105 object-cover"
                    }
                  ) })
                }
              ),
              /* @__PURE__ */ jsx3(AnimatePresence, { mode: "wait", children: current === index && /* @__PURE__ */ jsx3(
                motion.div,
                {
                  initial: { opacity: 0, filter: "blur(10px)" },
                  animate: { opacity: 1, filter: "blur(0px)" },
                  transition: { duration: 0.5 },
                  className: "absolute bottom-0 left-2 flex h-[14%] w-full translate-y-full items-center justify-center p-2 text-center font-medium tracking-tight text-black/20",
                  children: img.title
                }
              ) })
            ]
          },
          index
        )) }),
        showNavigation && /* @__PURE__ */ jsxs2("div", { className: "absolute -bottom-4 right-0 flex w-full items-center justify-between gap-2 px-4", children: [
          /* @__PURE__ */ jsx3(
            "button",
            {
              "aria-label": "Previous slide",
              onClick: () => api?.scrollPrev(),
              className: "rounded-full bg-black/10 p-2",
              children: /* @__PURE__ */ jsx3(ChevronLeft, { className: "text-white" })
            }
          ),
          /* @__PURE__ */ jsx3(
            "button",
            {
              "aria-label": "Next slide",
              onClick: () => api?.scrollNext(),
              className: "rounded-full bg-black/10 p-2",
              children: /* @__PURE__ */ jsx3(ChevronRight, { className: "text-white" })
            }
          )
        ] }),
        showPagination && /* @__PURE__ */ jsx3("div", { className: "flex w-full items-center justify-center", children: /* @__PURE__ */ jsx3("div", { className: "flex items-center justify-center gap-2", children: Array.from({ length: images.length }).map((_, index) => /* @__PURE__ */ jsx3(
          "button",
          {
            onClick: () => api?.scrollTo(index),
            className: cn(
              "h-2 w-2 cursor-pointer rounded-full transition-all",
              current === index ? "bg-black" : "bg-[#D9D9D9]"
            ),
            "aria-label": `Go to slide ${index + 1}`
          },
          index
        )) }) })
      ]
    }
  );
};

// entry.jsx
import React3 from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(Skiper54, {}) }) });
}
export {
  Skiper54,
  Component as default
};
