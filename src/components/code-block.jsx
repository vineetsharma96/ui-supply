// Adapted from https://ui.aceternity.com/components/code-block
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/code-block.tsx
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { jsx, jsxs } from "react/jsx-runtime";
var CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = []
}) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const tabsExist = tabs.length > 0;
  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code;
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    }
  };
  const activeCode = tabsExist ? tabs[activeTab].code : code;
  const activeLanguage = tabsExist ? tabs[activeTab].language || language : language;
  const activeHighlightLines = tabsExist ? tabs[activeTab].highlightLines || [] : highlightLines;
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full rounded-lg bg-slate-900 p-4 font-mono text-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      tabsExist && /* @__PURE__ */ jsx("div", { className: "flex  overflow-x-auto", children: tabs.map((tab, index) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setActiveTab(index),
          className: `px-3 !py-2 text-xs transition-colors font-sans ${activeTab === index ? "text-white" : "text-zinc-400 hover:text-zinc-200"}`,
          children: tab.name
        },
        index
      )) }),
      !tabsExist && filename && /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs text-zinc-400", children: filename }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: copyToClipboard,
            className: "flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-sans",
            children: copied ? /* @__PURE__ */ jsx(IconCheck, { size: 14 }) : /* @__PURE__ */ jsx(IconCopy, { size: 14 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      SyntaxHighlighter,
      {
        language: activeLanguage,
        style: atomDark,
        customStyle: {
          margin: 0,
          padding: 0,
          background: "transparent",
          fontSize: "0.875rem"
          // text-sm equivalent
        },
        wrapLines: true,
        showLineNumbers: true,
        lineProps: (lineNumber) => ({
          style: {
            backgroundColor: activeHighlightLines.includes(lineNumber) ? "rgba(255,255,255,0.1)" : "transparent",
            display: "block",
            width: "100%"
          }
        }),
        PreTag: "div",
        children: String(activeCode)
      }
    )
  ] });
};

// entry.jsx
import React2 from "react";

// registry:components/code-block-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function CodeBlockDemo() {
  const code = `const DummyComponent = () => {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Fights Counter</h2>
      <p className="mb-2">Fight Club Fights Count: {count}</p>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Increment
      </button>
    </div>
  );
};
`;
  return /* @__PURE__ */ jsx2("div", { className: "max-w-3xl mx-auto w-full", children: /* @__PURE__ */ jsx2(
    CodeBlock,
    {
      language: "jsx",
      filename: "DummyComponent.jsx",
      highlightLines: [9, 13, 14, 18],
      code
    }
  ) });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(CodeBlockDemo, {}) }) });
}
export {
  CodeBlock,
  Component as default
};
