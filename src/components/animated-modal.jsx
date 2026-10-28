// Adapted from https://ui.aceternity.com/components/animated-modal
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/animated-modal.tsx
import { AnimatePresence, motion } from "motion/react";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var ModalContext = createContext(void 0);
var ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsx(ModalContext.Provider, { value: { open, setOpen }, children });
};
var useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
function Modal({ children }) {
  return /* @__PURE__ */ jsx(ModalProvider, { children });
}
var ModalTrigger = ({
  children,
  className
}) => {
  const { setOpen } = useModal();
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: cn(
        "px-4 py-2 rounded-md text-black dark:text-white text-center relative overflow-hidden",
        className
      ),
      onClick: () => setOpen(true),
      children
    }
  );
};
var ModalBody = ({
  children,
  className
}) => {
  const { open } = useModal();
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);
  const modalRef = useRef(null);
  const { setOpen } = useModal();
  useOutsideClick(modalRef, () => setOpen(false));
  return /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 1,
        backdropFilter: "blur(10px)"
      },
      exit: {
        opacity: 0,
        backdropFilter: "blur(0px)"
      },
      className: "fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full  flex items-center justify-center z-50",
      children: [
        /* @__PURE__ */ jsx(Overlay, {}),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            ref: modalRef,
            className: cn(
              "min-h-[50%] max-h-[90%] md:max-w-[40%] bg-white dark:bg-neutral-950 border border-transparent dark:border-neutral-800 md:rounded-2xl relative z-50 flex flex-col flex-1 overflow-hidden",
              className
            ),
            initial: {
              opacity: 0,
              scale: 0.5,
              rotateX: 40,
              y: 40
            },
            animate: {
              opacity: 1,
              scale: 1,
              rotateX: 0,
              y: 0
            },
            exit: {
              opacity: 0,
              scale: 0.8,
              rotateX: 10
            },
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 15
            },
            children: [
              /* @__PURE__ */ jsx(CloseIcon, {}),
              children
            ]
          }
        )
      ]
    }
  ) });
};
var ModalContent = ({
  children,
  className
}) => {
  return /* @__PURE__ */ jsx("div", { className: cn("flex flex-col flex-1 p-8 md:p-10", className), children });
};
var ModalFooter = ({
  children,
  className
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "flex justify-end p-4 bg-gray-100 dark:bg-neutral-900",
        className
      ),
      children
    }
  );
};
var Overlay = ({ className }) => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 1,
        backdropFilter: "blur(10px)"
      },
      exit: {
        opacity: 0,
        backdropFilter: "blur(0px)"
      },
      className: `fixed inset-0 h-full w-full bg-black bg-opacity-50 z-50 ${className}`
    }
  );
};
var CloseIcon = () => {
  const { setOpen } = useModal();
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => setOpen(false),
      className: "absolute top-4 right-4 group",
      children: /* @__PURE__ */ jsxs(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: "text-black dark:text-white h-4 w-4 group-hover:scale-125 group-hover:rotate-3 transition duration-200",
          children: [
            /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
            /* @__PURE__ */ jsx("path", { d: "M18 6l-12 12" }),
            /* @__PURE__ */ jsx("path", { d: "M6 6l12 12" })
          ]
        }
      )
    }
  );
};
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

// entry.jsx
import React2 from "react";

// registry:components/animated-modal-demo.tsx
import { motion as motion2 } from "motion/react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function AnimatedModalDemo() {
  const images = [
    "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];
  return /* @__PURE__ */ jsx2("div", { className: "py-40  flex items-center justify-center", children: /* @__PURE__ */ jsxs2(Modal, { children: [
    /* @__PURE__ */ jsxs2(ModalTrigger, { className: "bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn", children: [
      /* @__PURE__ */ jsx2("span", { className: "group-hover/modal-btn:translate-x-40 text-center transition duration-500", children: "Book your flight" }),
      /* @__PURE__ */ jsx2("div", { className: "-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20", children: "\u2708\uFE0F" })
    ] }),
    /* @__PURE__ */ jsxs2(ModalBody, { children: [
      /* @__PURE__ */ jsxs2(ModalContent, { children: [
        /* @__PURE__ */ jsxs2("h4", { className: "text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8", children: [
          "Book your trip to",
          " ",
          /* @__PURE__ */ jsx2("span", { className: "px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200", children: "Bali" }),
          " ",
          "now! \u2708\uFE0F"
        ] }),
        /* @__PURE__ */ jsx2("div", { className: "flex justify-center items-center", children: images.map((image, idx) => /* @__PURE__ */ jsx2(
          motion2.div,
          {
            style: {
              rotate: Math.random() * 20 - 10
            },
            whileHover: {
              scale: 1.1,
              rotate: 0,
              zIndex: 100
            },
            whileTap: {
              scale: 1.1,
              rotate: 0,
              zIndex: 100
            },
            className: "rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden",
            children: /* @__PURE__ */ jsx2(
              "img",
              {
                src: image,
                alt: "bali images",
                width: "500",
                height: "500",
                className: "rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover shrink-0"
              }
            )
          },
          "images" + idx
        )) }),
        /* @__PURE__ */ jsxs2("div", { className: "py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto", children: [
          /* @__PURE__ */ jsxs2("div", { className: "flex  items-center justify-center", children: [
            /* @__PURE__ */ jsx2(PlaneIcon, { className: "mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" }),
            /* @__PURE__ */ jsx2("span", { className: "text-neutral-700 dark:text-neutral-300 text-sm", children: "5 connecting flights" })
          ] }),
          /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-center", children: [
            /* @__PURE__ */ jsx2(ElevatorIcon, { className: "mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" }),
            /* @__PURE__ */ jsx2("span", { className: "text-neutral-700 dark:text-neutral-300 text-sm", children: "12 hotels" })
          ] }),
          /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-center", children: [
            /* @__PURE__ */ jsx2(VacationIcon, { className: "mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" }),
            /* @__PURE__ */ jsx2("span", { className: "text-neutral-700 dark:text-neutral-300 text-sm", children: "69 visiting spots" })
          ] }),
          /* @__PURE__ */ jsxs2("div", { className: "flex  items-center justify-center", children: [
            /* @__PURE__ */ jsx2(FoodIcon, { className: "mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" }),
            /* @__PURE__ */ jsx2("span", { className: "text-neutral-700 dark:text-neutral-300 text-sm", children: "Good food everyday" })
          ] }),
          /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-center", children: [
            /* @__PURE__ */ jsx2(MicIcon, { className: "mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" }),
            /* @__PURE__ */ jsx2("span", { className: "text-neutral-700 dark:text-neutral-300 text-sm", children: "Open Mic" })
          ] }),
          /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-center", children: [
            /* @__PURE__ */ jsx2(ParachuteIcon, { className: "mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" }),
            /* @__PURE__ */ jsx2("span", { className: "text-neutral-700 dark:text-neutral-300 text-sm", children: "Paragliding" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs2(ModalFooter, { className: "gap-4", children: [
        /* @__PURE__ */ jsx2("button", { className: "px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28", children: "Cancel" }),
        /* @__PURE__ */ jsx2("button", { className: "bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28", children: "Book Now" })
      ] })
    ] })
  ] }) });
}
var PlaneIcon = ({ className }) => {
  return /* @__PURE__ */ jsxs2(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      children: [
        /* @__PURE__ */ jsx2("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsx2("path", { d: "M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" })
      ]
    }
  );
};
var VacationIcon = ({ className }) => {
  return /* @__PURE__ */ jsxs2(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      children: [
        /* @__PURE__ */ jsx2("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsx2("path", { d: "M17.553 16.75a7.5 7.5 0 0 0 -10.606 0" }),
        /* @__PURE__ */ jsx2("path", { d: "M18 3.804a6 6 0 0 0 -8.196 2.196l10.392 6a6 6 0 0 0 -2.196 -8.196z" }),
        /* @__PURE__ */ jsx2("path", { d: "M16.732 10c1.658 -2.87 2.225 -5.644 1.268 -6.196c-.957 -.552 -3.075 1.326 -4.732 4.196" }),
        /* @__PURE__ */ jsx2("path", { d: "M15 9l-3 5.196" }),
        /* @__PURE__ */ jsx2("path", { d: "M3 19.25a2.4 2.4 0 0 1 1 -.25a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 1 .25" })
      ]
    }
  );
};
var ElevatorIcon = ({ className }) => {
  return /* @__PURE__ */ jsxs2(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      children: [
        /* @__PURE__ */ jsx2("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsx2("path", { d: "M5 4m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" }),
        /* @__PURE__ */ jsx2("path", { d: "M10 10l2 -2l2 2" }),
        /* @__PURE__ */ jsx2("path", { d: "M10 14l2 2l2 -2" })
      ]
    }
  );
};
var FoodIcon = ({ className }) => {
  return /* @__PURE__ */ jsxs2(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      children: [
        /* @__PURE__ */ jsx2("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsx2("path", { d: "M20 20c0 -3.952 -.966 -16 -4.038 -16s-3.962 9.087 -3.962 14.756c0 -5.669 -.896 -14.756 -3.962 -14.756c-3.065 0 -4.038 12.048 -4.038 16" })
      ]
    }
  );
};
var MicIcon = ({ className }) => {
  return /* @__PURE__ */ jsxs2(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      children: [
        /* @__PURE__ */ jsx2("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsx2("path", { d: "M15 12.9a5 5 0 1 0 -3.902 -3.9" }),
        /* @__PURE__ */ jsx2("path", { d: "M15 12.9l-3.902 -3.899l-7.513 8.584a2 2 0 1 0 2.827 2.83l8.588 -7.515z" })
      ]
    }
  );
};
var ParachuteIcon = ({ className }) => {
  return /* @__PURE__ */ jsxs2(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      children: [
        /* @__PURE__ */ jsx2("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsx2("path", { d: "M22 12a10 10 0 1 0 -20 0" }),
        /* @__PURE__ */ jsx2("path", { d: "M22 12c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3c0 -1.66 -1.57 -3 -3.5 -3s-3.5 1.34 -3.5 3c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3" }),
        /* @__PURE__ */ jsx2("path", { d: "M2 12l10 10l-3.5 -10" }),
        /* @__PURE__ */ jsx2("path", { d: "M15.5 12l-3.5 10l10 -10" })
      ]
    }
  );
};

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(AnimatedModalDemo, {}) }) });
}
export {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalProvider,
  ModalTrigger,
  Component as default,
  useModal,
  useOutsideClick
};
