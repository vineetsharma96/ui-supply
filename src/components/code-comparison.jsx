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
// Adapted from https://magicui.design/docs/components/code-comparison
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/code-comparison.tsx
import { useEffect as useEffect2, useMemo, useState as useState2 } from "react";
import {
  transformerNotationDiff,
  transformerNotationFocus
} from "@shikijs/transformers";
import { FileIcon } from "lucide-react";

// registry:next-themes
import { useState, useEffect } from "react";
function useTheme() {
  const [theme, set] = useState(document.documentElement.dataset.theme || "dark");
  useEffect(() => {
    const o = new MutationObserver(() => set(document.documentElement.dataset.theme || "dark"));
    o.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => o.disconnect();
  }, []);
  return { theme, resolvedTheme: theme, setTheme: (t) => {
    document.documentElement.dataset.theme = t;
    localStorage.setItem("ui-supply-theme", t);
  } };
}

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/code-comparison.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function CodeComparison({
  beforeCode: beforeCode2,
  afterCode: afterCode2,
  language,
  filename,
  lightTheme,
  darkTheme,
  highlightColor = "#ff3333"
}) {
  const { theme, systemTheme } = useTheme();
  const [highlightedBefore, setHighlightedBefore] = useState2("");
  const [highlightedAfter, setHighlightedAfter] = useState2("");
  const [hasLeftFocus, setHasLeftFocus] = useState2(false);
  const [hasRightFocus, setHasRightFocus] = useState2(false);
  const selectedTheme = useMemo(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    return currentTheme === "dark" ? darkTheme : lightTheme;
  }, [theme, systemTheme, darkTheme, lightTheme]);
  useEffect2(() => {
    if (highlightedBefore || highlightedAfter) {
      setHasLeftFocus(highlightedBefore.includes('class="line focused"'));
      setHasRightFocus(highlightedAfter.includes('class="line focused"'));
    }
  }, [highlightedBefore, highlightedAfter]);
  useEffect2(() => {
    async function highlightCode() {
      try {
        const { codeToHtml } = await import("shiki");
        const { transformerNotationHighlight } = await import("@shikijs/transformers");
        const before = await codeToHtml(beforeCode2, {
          lang: language,
          theme: selectedTheme,
          transformers: [
            transformerNotationHighlight({ matchAlgorithm: "v3" }),
            transformerNotationDiff({ matchAlgorithm: "v3" }),
            transformerNotationFocus({ matchAlgorithm: "v3" })
          ]
        });
        const after = await codeToHtml(afterCode2, {
          lang: language,
          theme: selectedTheme,
          transformers: [
            transformerNotationHighlight({ matchAlgorithm: "v3" }),
            transformerNotationDiff({ matchAlgorithm: "v3" }),
            transformerNotationFocus({ matchAlgorithm: "v3" })
          ]
        });
        setHighlightedBefore(before);
        setHighlightedAfter(after);
      } catch (error) {
        console.error("Error highlighting code:", error);
        setHighlightedBefore(`<pre>${beforeCode2}</pre>`);
        setHighlightedAfter(`<pre>${afterCode2}</pre>`);
      }
    }
    highlightCode();
  }, [beforeCode2, afterCode2, language, selectedTheme]);
  const renderCode = (code, highlighted) => {
    if (highlighted) {
      return /* @__PURE__ */ jsx(
        "div",
        {
          style: { "--highlight-color": highlightColor },
          className: cn(
            "bg-background h-full w-full overflow-auto font-mono text-xs",
            "[&>pre]:h-full [&>pre]:w-screen! [&>pre]:py-2",
            "[&>pre>code]:inline-block! [&>pre>code]:w-full!",
            "[&>pre>code>span]:inline-block! [&>pre>code>span]:w-full [&>pre>code>span]:px-4 [&>pre>code>span]:py-0.5",
            "[&>pre>code>.highlighted]:inline-block [&>pre>code>.highlighted]:w-full [&>pre>code>.highlighted]:bg-(--highlight-color)!",
            "group-hover/left:[&>pre>code>:not(.focused)]:opacity-100! group-hover/left:[&>pre>code>:not(.focused)]:blur-none!",
            "group-hover/right:[&>pre>code>:not(.focused)]:opacity-100! group-hover/right:[&>pre>code>:not(.focused)]:blur-none!",
            "[&>pre>code>.add]:bg-[rgba(16,185,129,.16)] [&>pre>code>.remove]:bg-[rgba(244,63,94,.16)]",
            "group-hover/left:[&>pre>code>:not(.focused)]:transition-all group-hover/left:[&>pre>code>:not(.focused)]:duration-300",
            "group-hover/right:[&>pre>code>:not(.focused)]:transition-all group-hover/right:[&>pre>code>:not(.focused)]:duration-300"
          ),
          dangerouslySetInnerHTML: { __html: highlighted }
        }
      );
    } else {
      return /* @__PURE__ */ jsx("pre", { className: "bg-background text-foreground h-full overflow-auto p-4 font-mono text-xs break-all", children: code });
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "mx-auto w-full max-w-5xl", children: /* @__PURE__ */ jsxs("div", { className: "group border-border relative w-full overflow-hidden rounded-md border", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative grid md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: cn(
            "leftside group/left border-primary/20 md:border-r",
            hasLeftFocus && "[&>div>pre>code>:not(.focused)]:opacity-50! [&>div>pre>code>:not(.focused)]:blur-[0.095rem]!",
            "[&>div>pre>code>:not(.focused)]:transition-all [&>div>pre>code>:not(.focused)]:duration-300"
          ),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "border-primary/20 bg-accent text-foreground flex items-center border-b p-2 text-sm", children: [
              /* @__PURE__ */ jsx(FileIcon, { className: "mr-2 h-4 w-4" }),
              filename,
              /* @__PURE__ */ jsx("span", { className: "ml-auto hidden md:block", children: "before" })
            ] }),
            renderCode(beforeCode2, highlightedBefore)
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: cn(
            "rightside group/right border-primary/20 border-t md:border-t-0",
            hasRightFocus && "[&>div>pre>code>:not(.focused)]:opacity-50! [&>div>pre>code>:not(.focused)]:blur-[0.095rem]!",
            "[&>div>pre>code>:not(.focused)]:transition-all [&>div>pre>code>:not(.focused)]:duration-300"
          ),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "border-primary/20 bg-accent text-foreground flex items-center border-b p-2 text-sm", children: [
              /* @__PURE__ */ jsx(FileIcon, { className: "mr-2 h-4 w-4" }),
              filename,
              /* @__PURE__ */ jsx("span", { className: "ml-auto hidden md:block", children: "after" })
            ] }),
            renderCode(afterCode2, highlightedAfter)
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-primary/20 bg-accent text-foreground absolute top-1/2 left-1/2 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border text-xs md:flex", children: "VS" })
  ] }) });
}

// entry.jsx
import React from "react";

// registry:code-comparison.tsx
import { useEffect as useEffect3, useMemo as useMemo2, useState as useState3 } from "react";
import {
  transformerNotationDiff as transformerNotationDiff2,
  transformerNotationFocus as transformerNotationFocus2
} from "@shikijs/transformers";
import { FileIcon as FileIcon2 } from "lucide-react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function CodeComparison2({
  beforeCode: beforeCode2,
  afterCode: afterCode2,
  language,
  filename,
  lightTheme,
  darkTheme,
  highlightColor = "#ff3333"
}) {
  const { theme, systemTheme } = useTheme();
  const [highlightedBefore, setHighlightedBefore] = useState3("");
  const [highlightedAfter, setHighlightedAfter] = useState3("");
  const [hasLeftFocus, setHasLeftFocus] = useState3(false);
  const [hasRightFocus, setHasRightFocus] = useState3(false);
  const selectedTheme = useMemo2(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    return currentTheme === "dark" ? darkTheme : lightTheme;
  }, [theme, systemTheme, darkTheme, lightTheme]);
  useEffect3(() => {
    if (highlightedBefore || highlightedAfter) {
      setHasLeftFocus(highlightedBefore.includes('class="line focused"'));
      setHasRightFocus(highlightedAfter.includes('class="line focused"'));
    }
  }, [highlightedBefore, highlightedAfter]);
  useEffect3(() => {
    async function highlightCode() {
      try {
        const { codeToHtml } = await import("shiki");
        const { transformerNotationHighlight } = await import("@shikijs/transformers");
        const before = await codeToHtml(beforeCode2, {
          lang: language,
          theme: selectedTheme,
          transformers: [
            transformerNotationHighlight({ matchAlgorithm: "v3" }),
            transformerNotationDiff2({ matchAlgorithm: "v3" }),
            transformerNotationFocus2({ matchAlgorithm: "v3" })
          ]
        });
        const after = await codeToHtml(afterCode2, {
          lang: language,
          theme: selectedTheme,
          transformers: [
            transformerNotationHighlight({ matchAlgorithm: "v3" }),
            transformerNotationDiff2({ matchAlgorithm: "v3" }),
            transformerNotationFocus2({ matchAlgorithm: "v3" })
          ]
        });
        setHighlightedBefore(before);
        setHighlightedAfter(after);
      } catch (error) {
        console.error("Error highlighting code:", error);
        setHighlightedBefore(`<pre>${beforeCode2}</pre>`);
        setHighlightedAfter(`<pre>${afterCode2}</pre>`);
      }
    }
    highlightCode();
  }, [beforeCode2, afterCode2, language, selectedTheme]);
  const renderCode = (code, highlighted) => {
    if (highlighted) {
      return /* @__PURE__ */ jsx2(
        "div",
        {
          style: { "--highlight-color": highlightColor },
          className: cn(
            "bg-background h-full w-full overflow-auto font-mono text-xs",
            "[&>pre]:h-full [&>pre]:w-screen! [&>pre]:py-2",
            "[&>pre>code]:inline-block! [&>pre>code]:w-full!",
            "[&>pre>code>span]:inline-block! [&>pre>code>span]:w-full [&>pre>code>span]:px-4 [&>pre>code>span]:py-0.5",
            "[&>pre>code>.highlighted]:inline-block [&>pre>code>.highlighted]:w-full [&>pre>code>.highlighted]:bg-(--highlight-color)!",
            "group-hover/left:[&>pre>code>:not(.focused)]:opacity-100! group-hover/left:[&>pre>code>:not(.focused)]:blur-none!",
            "group-hover/right:[&>pre>code>:not(.focused)]:opacity-100! group-hover/right:[&>pre>code>:not(.focused)]:blur-none!",
            "[&>pre>code>.add]:bg-[rgba(16,185,129,.16)] [&>pre>code>.remove]:bg-[rgba(244,63,94,.16)]",
            "group-hover/left:[&>pre>code>:not(.focused)]:transition-all group-hover/left:[&>pre>code>:not(.focused)]:duration-300",
            "group-hover/right:[&>pre>code>:not(.focused)]:transition-all group-hover/right:[&>pre>code>:not(.focused)]:duration-300"
          ),
          dangerouslySetInnerHTML: { __html: highlighted }
        }
      );
    } else {
      return /* @__PURE__ */ jsx2("pre", { className: "bg-background text-foreground h-full overflow-auto p-4 font-mono text-xs break-all", children: code });
    }
  };
  return /* @__PURE__ */ jsx2("div", { className: "mx-auto w-full max-w-5xl", children: /* @__PURE__ */ jsxs2("div", { className: "group border-border relative w-full overflow-hidden rounded-md border", children: [
    /* @__PURE__ */ jsxs2("div", { className: "relative grid md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs2(
        "div",
        {
          className: cn(
            "leftside group/left border-primary/20 md:border-r",
            hasLeftFocus && "[&>div>pre>code>:not(.focused)]:opacity-50! [&>div>pre>code>:not(.focused)]:blur-[0.095rem]!",
            "[&>div>pre>code>:not(.focused)]:transition-all [&>div>pre>code>:not(.focused)]:duration-300"
          ),
          children: [
            /* @__PURE__ */ jsxs2("div", { className: "border-primary/20 bg-accent text-foreground flex items-center border-b p-2 text-sm", children: [
              /* @__PURE__ */ jsx2(FileIcon2, { className: "mr-2 h-4 w-4" }),
              filename,
              /* @__PURE__ */ jsx2("span", { className: "ml-auto hidden md:block", children: "before" })
            ] }),
            renderCode(beforeCode2, highlightedBefore)
          ]
        }
      ),
      /* @__PURE__ */ jsxs2(
        "div",
        {
          className: cn(
            "rightside group/right border-primary/20 border-t md:border-t-0",
            hasRightFocus && "[&>div>pre>code>:not(.focused)]:opacity-50! [&>div>pre>code>:not(.focused)]:blur-[0.095rem]!",
            "[&>div>pre>code>:not(.focused)]:transition-all [&>div>pre>code>:not(.focused)]:duration-300"
          ),
          children: [
            /* @__PURE__ */ jsxs2("div", { className: "border-primary/20 bg-accent text-foreground flex items-center border-b p-2 text-sm", children: [
              /* @__PURE__ */ jsx2(FileIcon2, { className: "mr-2 h-4 w-4" }),
              filename,
              /* @__PURE__ */ jsx2("span", { className: "ml-auto hidden md:block", children: "after" })
            ] }),
            renderCode(afterCode2, highlightedAfter)
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx2("div", { className: "border-primary/20 bg-accent text-foreground absolute top-1/2 left-1/2 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border text-xs md:flex", children: "VS" })
  ] }) });
}

// registry:components/ui/code-comparison-demo.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var beforeCode = `import { NextRequest } from 'next/server';

export const middleware = async (req: NextRequest) => {
  let user = undefined;
  let team = undefined;
  const token = req.headers.get('token');

  if(req.nextUrl.pathname.startsWith('/auth')) {
    user = await getUserByToken(token);

    if(!user) {
      return NextResponse.redirect('/login');
    }
  }

  if(req.nextUrl.pathname.startsWith('/team')) {
    user = await getUserByToken(token);

    if(!user) {
      return NextResponse.redirect('/login');
    }

    const slug = req.nextUrl.query.slug;
    team = await getTeamBySlug(slug); // [!code highlight]

    if(!team) { // [!code highlight]
      return NextResponse.redirect('/'); // [!code highlight]
    } // [!code highlight]
  } // [!code highlight]

  return NextResponse.next(); // [!code highlight]
}

export const config = {
  matcher: ['/((?!_next/|_static|_vercel|[\\w-]+\\.\\w+).*)'], // [!code highlight]
};`;
var afterCode = `import { createMiddleware, type MiddlewareFunctionProps } from '@app/(auth)/auth/_middleware';
import { auth } from '@/app/(auth)/auth/_middleware'; // [!code --]
import { auth } from '@/app/(auth)/auth/_middleware'; // [!code ++]
import { team } from '@/app/(team)/team/_middleware';

const middlewares = {
  '/auth{/:path?}': auth,
  '/team{/:slug?}': [ auth, team ],
};

export const middleware = createMiddleware(middlewares); // [!code focus]

export const config = {
  matcher: ['/((?!_next/|_static|_vercel|[\\w-]+\\.\\w+).*)'],
};`;
function CodeComparisonDemo() {
  return /* @__PURE__ */ jsx3(
    CodeComparison2,
    {
      beforeCode,
      afterCode,
      language: "typescript",
      filename: "middleware.ts",
      lightTheme: "github-light",
      darkTheme: "github-dark",
      highlightColor: "rgba(101, 117, 133, 0.16)"
    }
  );
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(CodeComparisonDemo, {}) }) });
}
export {
  CodeComparison,
  Component as default
};
