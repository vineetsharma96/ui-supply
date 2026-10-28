// Adapted from https://ui.aceternity.com/components/apple-cards-carousel
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/apple-cards-carousel.tsx
import React2, {
  useEffect as useEffect2,
  useRef,
  useState,
  createContext,
  useContext
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX
} from "@tabler/icons-react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/apple-cards-carousel.tsx
import { AnimatePresence, motion } from "motion/react";

// registry:hooks/use-outside-click.tsx
import { useEffect } from "react";
var useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};

// registry:components/ui/apple-cards-carousel.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var CarouselContext = createContext({
  onCardClose: () => {
  },
  currentIndex: 0
});
var Carousel = ({ items, initialScroll = 0 }) => {
  const carouselRef = React2.useRef(null);
  const [canScrollLeft, setCanScrollLeft] = React2.useState(false);
  const [canScrollRight, setCanScrollRight] = React2.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect2(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);
  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft: scrollLeft2, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft2 > 0);
      setCanScrollRight(scrollLeft2 < scrollWidth - clientWidth);
    }
  };
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
  const handleCardClose = (index) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384;
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
      });
      setCurrentIndex(index);
    }
  };
  const isMobile = () => {
    return window && window.innerWidth < 768;
  };
  return /* @__PURE__ */ jsx(
    CarouselContext.Provider,
    {
      value: { onCardClose: handleCardClose, currentIndex },
      children: /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20",
            ref: carouselRef,
            onScroll: checkScrollability,
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: cn(
                    "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: cn(
                    "flex flex-row justify-start gap-4 pl-4",
                    "mx-auto max-w-7xl"
                    // remove max-w-4xl if you want the carousel to span the full width of its container
                  ),
                  children: items.map((item, index) => /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      initial: {
                        opacity: 0,
                        y: 20
                      },
                      animate: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.5,
                          delay: 0.2 * index,
                          ease: "easeOut"
                        }
                      },
                      className: "rounded-3xl last:pr-[5%] md:last:pr-[33%]",
                      children: item
                    },
                    "card" + index
                  ))
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "mr-10 flex justify-end gap-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50",
              onClick: scrollLeft,
              disabled: !canScrollLeft,
              children: /* @__PURE__ */ jsx(IconArrowNarrowLeft, { className: "h-6 w-6 text-gray-500" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50",
              onClick: scrollRight,
              disabled: !canScrollRight,
              children: /* @__PURE__ */ jsx(IconArrowNarrowRight, { className: "h-6 w-6 text-gray-500" })
            }
          )
        ] })
      ] })
    }
  );
};
var Card = ({
  card,
  index,
  layout = false
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);
  useEffect2(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        handleClose();
      }
    }
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);
  useOutsideClick(containerRef, () => handleClose());
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 h-screen overflow-auto", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          className: "fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          ref: containerRef,
          layoutId: layout ? `card-${card.title}` : void 0,
          className: "relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white p-4 font-sans md:p-10 dark:bg-neutral-900",
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white",
                onClick: handleClose,
                children: /* @__PURE__ */ jsx(IconX, { className: "h-6 w-6 text-neutral-100 dark:text-neutral-900" })
              }
            ),
            /* @__PURE__ */ jsx(
              motion.p,
              {
                layoutId: layout ? `category-${card.title}` : void 0,
                className: "text-base font-medium text-black dark:text-white",
                children: card.category
              }
            ),
            /* @__PURE__ */ jsx(
              motion.p,
              {
                layoutId: layout ? `title-${card.title}` : void 0,
                className: "mt-4 text-2xl font-semibold text-neutral-700 md:text-5xl dark:text-white",
                children: card.title
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "py-10", children: card.content })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs(
      motion.button,
      {
        layoutId: layout ? `card-${card.title}` : void 0,
        onClick: handleOpen,
        className: "relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[40rem] md:w-96 dark:bg-neutral-900",
        children: [
          /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-40 p-8", children: [
            /* @__PURE__ */ jsx(
              motion.p,
              {
                layoutId: layout ? `category-${card.category}` : void 0,
                className: "text-left font-sans text-sm font-medium text-white md:text-base",
                children: card.category
              }
            ),
            /* @__PURE__ */ jsx(
              motion.p,
              {
                layoutId: layout ? `title-${card.title}` : void 0,
                className: "mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl",
                children: card.title
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            BlurImage,
            {
              src: card.src,
              alt: card.title,
              fill: true,
              className: "absolute inset-0 z-10 object-cover"
            }
          )
        ]
      }
    )
  ] });
};
var BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}) => {
  const [isLoading, setLoading] = useState(true);
  return /* @__PURE__ */ jsx(
    "img",
    {
      className: cn(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      ),
      onLoad: () => setLoading(false),
      src,
      width,
      height,
      loading: "lazy",
      decoding: "async",
      blurDataURL: typeof src === "string" ? src : void 0,
      alt: alt ? alt : "Background of a beautiful view",
      ...rest
    }
  );
};

// entry.jsx
import React3 from "react";

// registry:components/apple-cards-carousel-demo.tsx
import { Fragment as Fragment2, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => /* @__PURE__ */ jsx2(Card, { card, index }, card.src));
  return /* @__PURE__ */ jsxs2("div", { className: "w-full h-full py-20", children: [
    /* @__PURE__ */ jsx2("h2", { className: "max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans", children: "Get to know your iSad." }),
    /* @__PURE__ */ jsx2(Carousel, { items: cards })
  ] });
}
var DummyContent = () => {
  return /* @__PURE__ */ jsx2(Fragment2, { children: [...new Array(3).fill(1)].map((_, index) => {
    return /* @__PURE__ */ jsxs2(
      "div",
      {
        className: "bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4",
        children: [
          /* @__PURE__ */ jsxs2("p", { className: "text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto", children: [
            /* @__PURE__ */ jsx2("span", { className: "font-bold text-neutral-700 dark:text-neutral-200", children: "The first rule of Apple club is that you boast about Apple club." }),
            " ",
            "Keep a journal, quickly jot down a grocery list, and take amazing class notes. Want to convert those notes to text? No problem. Langotiya jeetu ka mara hua yaar is ready to capture every thought."
          ] }),
          /* @__PURE__ */ jsx2(
            "img",
            {
              src: "https://assets.aceternity.com/macbook.png",
              alt: "Macbook mockup from Aceternity UI",
              height: "500",
              width: "500",
              className: "md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            }
          )
        ]
      },
      "dummy-content" + index
    );
  }) });
};
var data = [
  {
    category: "Artificial Intelligence",
    title: "You can do more with AI.",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: /* @__PURE__ */ jsx2(DummyContent, {})
  },
  {
    category: "Productivity",
    title: "Enhance your productivity.",
    src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: /* @__PURE__ */ jsx2(DummyContent, {})
  },
  {
    category: "Product",
    title: "Launching the new Apple Vision Pro.",
    src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: /* @__PURE__ */ jsx2(DummyContent, {})
  },
  {
    category: "Product",
    title: "Maps for your iPhone 15 Pro Max.",
    src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: /* @__PURE__ */ jsx2(DummyContent, {})
  },
  {
    category: "iOS",
    title: "Photography just got better.",
    src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: /* @__PURE__ */ jsx2(DummyContent, {})
  },
  {
    category: "Hiring",
    title: "Hiring for a Staff Software Engineer",
    src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: /* @__PURE__ */ jsx2(DummyContent, {})
  }
];

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(AppleCardsCarouselDemo, {}) }) });
}
export {
  BlurImage,
  Card,
  Carousel,
  CarouselContext,
  Component as default
};
