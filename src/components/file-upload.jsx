// Adapted from https://ui.aceternity.com/components/file-upload
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/file-upload.tsx
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { jsx, jsxs } from "react/jsx-runtime";
var mainVariant = {
  initial: {
    x: 0,
    y: 0
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9
  }
};
var secondaryVariant = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  }
};
var FileUpload = ({
  onChange
}) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const handleFileChange = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onChange && onChange(newFiles);
  };
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    }
  });
  return /* @__PURE__ */ jsx("div", { className: "w-full", ...getRootProps(), children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      onClick: handleClick,
      whileHover: "animate",
      className: "group/file relative block w-full cursor-pointer overflow-hidden rounded-lg p-10",
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: fileInputRef,
            id: "file-upload-handle",
            type: "file",
            onChange: (e) => handleFileChange(Array.from(e.target.files || [])),
            className: "hidden"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]", children: /* @__PURE__ */ jsx(GridPattern, {}) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
          /* @__PURE__ */ jsx("p", { className: "relative z-20 font-sans text-base font-bold text-neutral-700 dark:text-neutral-300", children: "Upload file" }),
          /* @__PURE__ */ jsx("p", { className: "relative z-20 mt-2 font-sans text-base font-normal text-neutral-400 dark:text-neutral-400", children: "Drag or drop your files here or click to upload" }),
          /* @__PURE__ */ jsxs("div", { className: "relative mx-auto mt-10 w-full max-w-xl", children: [
            files.length > 0 && files.map((file, idx) => /* @__PURE__ */ jsxs(
              motion.div,
              {
                layoutId: idx === 0 ? "file-upload" : "file-upload-" + idx,
                className: cn(
                  "relative z-40 mx-auto mt-4 flex w-full flex-col items-start justify-start overflow-hidden rounded-md bg-white p-4 md:h-24 dark:bg-neutral-900",
                  "shadow-sm"
                ),
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center justify-between gap-4", children: [
                    /* @__PURE__ */ jsx(
                      motion.p,
                      {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        layout: true,
                        className: "max-w-xs truncate text-base text-neutral-700 dark:text-neutral-300",
                        children: file.name
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      motion.p,
                      {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        layout: true,
                        className: "shadow-input w-fit shrink-0 rounded-lg px-2 py-1 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white",
                        children: [
                          (file.size / (1024 * 1024)).toFixed(2),
                          " MB"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-2 flex w-full flex-col items-start justify-between text-sm text-neutral-600 md:flex-row md:items-center dark:text-neutral-400", children: [
                    /* @__PURE__ */ jsx(
                      motion.p,
                      {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        layout: true,
                        className: "rounded-md bg-gray-100 px-1 py-0.5 dark:bg-neutral-800",
                        children: file.type
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      motion.p,
                      {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        layout: true,
                        children: [
                          "modified",
                          " ",
                          new Date(file.lastModified).toLocaleDateString()
                        ]
                      }
                    )
                  ] })
                ]
              },
              "file" + idx
            )),
            !files.length && /* @__PURE__ */ jsx(
              motion.div,
              {
                layoutId: "file-upload",
                variants: mainVariant,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                },
                className: cn(
                  "relative z-40 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md bg-white group-hover/file:shadow-2xl dark:bg-neutral-900",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                ),
                children: isDragActive ? /* @__PURE__ */ jsxs(
                  motion.p,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    className: "flex flex-col items-center text-neutral-600",
                    children: [
                      "Drop it",
                      /* @__PURE__ */ jsx(IconUpload, { className: "h-4 w-4 text-neutral-600 dark:text-neutral-400" })
                    ]
                  }
                ) : /* @__PURE__ */ jsx(IconUpload, { className: "h-4 w-4 text-neutral-600 dark:text-neutral-300" })
              }
            ),
            !files.length && /* @__PURE__ */ jsx(
              motion.div,
              {
                variants: secondaryVariant,
                className: "absolute inset-0 z-30 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md border border-dashed border-sky-400 bg-transparent opacity-0"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
};
function GridPattern() {
  const columns = 41;
  const rows = 11;
  return /* @__PURE__ */ jsx("div", { className: "flex shrink-0 scale-105 flex-wrap items-center justify-center gap-x-px gap-y-px bg-gray-100 dark:bg-neutral-900", children: Array.from({ length: rows }).map(
    (_, row) => Array.from({ length: columns }).map((_2, col) => {
      const index = row * columns + col;
      return /* @__PURE__ */ jsx(
        "div",
        {
          className: `flex h-10 w-10 shrink-0 rounded-[2px] ${index % 2 === 0 ? "bg-gray-50 dark:bg-neutral-950" : "bg-gray-50 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:bg-neutral-950 dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"}`
        },
        `${col}-${row}`
      );
    })
  ) });
}

// entry.jsx
import React3 from "react";

// registry:components/file-upload-demo.tsx
import { useState as useState2 } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function FileUploadDemo() {
  const [files, setFiles] = useState2([]);
  const handleFileUpload = (files2) => {
    setFiles(files2);
    console.log(files2);
  };
  return /* @__PURE__ */ jsx2("div", { className: "w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg", children: /* @__PURE__ */ jsx2(FileUpload, { onChange: handleFileUpload }) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(FileUploadDemo, {}) }) });
}
export {
  FileUpload,
  GridPattern,
  Component as default
};
