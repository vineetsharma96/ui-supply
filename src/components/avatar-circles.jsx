/*
MIT License

Copyright (c) Magic UI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
// Adapted from https://magicui.design/docs/components/avatar-circles
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/avatar-circles.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var AvatarCircles = ({
  numPeople,
  className,
  avatarUrls
}) => {
  return /* @__PURE__ */ jsxs("div", { className: cn("z-10 flex -space-x-4 rtl:space-x-reverse", className), children: [
    avatarUrls.map((url, index) => /* @__PURE__ */ jsx(
      "a",
      {
        href: url.profileUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        children: /* @__PURE__ */ jsx(
          "img",
          {
            className: "h-10 w-10 rounded-full border-2 border-white dark:border-gray-800",
            src: url.imageUrl,
            width: 40,
            height: 40,
            alt: `Avatar ${index + 1}`
          },
          index
        )
      },
      index
    )),
    (numPeople ?? 0) > 0 && /* @__PURE__ */ jsxs(
      "a",
      {
        className: "flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black",
        href: "",
        children: [
          "+",
          numPeople
        ]
      }
    )
  ] });
};

// entry.jsx
import React from "react";

// registry:avatar-circles.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var AvatarCircles2 = ({
  numPeople,
  className,
  avatarUrls
}) => {
  return /* @__PURE__ */ jsxs2("div", { className: cn("z-10 flex -space-x-4 rtl:space-x-reverse", className), children: [
    avatarUrls.map((url, index) => /* @__PURE__ */ jsx2(
      "a",
      {
        href: url.profileUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        children: /* @__PURE__ */ jsx2(
          "img",
          {
            className: "h-10 w-10 rounded-full border-2 border-white dark:border-gray-800",
            src: url.imageUrl,
            width: 40,
            height: 40,
            alt: `Avatar ${index + 1}`
          },
          index
        )
      },
      index
    )),
    (numPeople ?? 0) > 0 && /* @__PURE__ */ jsxs2(
      "a",
      {
        className: "flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black",
        href: "",
        children: [
          "+",
          numPeople
        ]
      }
    )
  ] });
};

// registry:components/ui/avatar-circles-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var avatars = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/16860528",
    profileUrl: "https://github.com/dillionverma"
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
    profileUrl: "https://github.com/tomonarifeehan"
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
    profileUrl: "https://github.com/BankkRoll"
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
    profileUrl: "https://github.com/safethecode"
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788",
    profileUrl: "https://github.com/sanjay-mali"
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/89768406",
    profileUrl: "https://github.com/itsarghyadas"
  }
];
function AvatarCirclesDemo() {
  return /* @__PURE__ */ jsx3(AvatarCircles2, { numPeople: 99, avatarUrls: avatars });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(AvatarCirclesDemo, {}) }) });
}
export {
  AvatarCircles,
  Component as default
};
