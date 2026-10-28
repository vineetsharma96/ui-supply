import React, { useEffect, useRef, useState, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  Sun,
  Moon,
  Copy,
  Check,
  RotateCcw,
  Code2,
  Eye,
  Grid2X2,
  Type,
  MousePointer2,
  Layers,
  PanelTop,
  Waves,
  Sparkles,
  FolderTree,
  X,
  Menu,
  ChevronRight,
  Download,
  Monitor,
  Smartphone,
} from "lucide-react";
import { catalog, categories } from "./catalog";
import "./styles.css";
import "./components/components.css";

const modules = import.meta.glob("./components/*.jsx");
const sources = import.meta.glob("./components/*.jsx", {
  query: "?raw",
  import: "default",
  eager: true,
});
const styles = import.meta.glob("./components/*.css", {
  query: "?raw",
  import: "default",
  eager: true,
});
const demos = Object.fromEntries(
  catalog.map((c) => [c.id, lazy(modules[`./components/${c.id}.jsx`])]),
);
const MotionContext = React.createContext(false);
const icons = [
  Grid2X2,
  Type,
  MousePointer2,
  Layers,
  PanelTop,
  Waves,
  Sparkles,
  FolderTree,
];
function Demo({ id, replay = 0 }) {
  const Component = demos[id];
  const paused = React.useContext(MotionContext);
  return (
    <Suspense fallback={<span className="loading">Loading preview…</span>}>
      <Component key={id + replay} paused={paused} />
    </Suspense>
  );
}
function CopyButton({ text, label = "Copy code" }) {
  const [status, setStatus] = useState("");
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Copied");
    } catch {
      setStatus("Copy unavailable");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 2200);
  }
  return (
    <button className="small-button" onClick={copy}>
      {status === "Copied" ? <Check size={14} /> : <Copy size={14} />}
      <span aria-live="polite">{status || label}</span>
    </button>
  );
}
function Card({ item, onOpen }) {
  const el = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    observer.observe(el.current);
    return () => observer.disconnect();
  }, []);
  return (
    <article className="component-card">
      <div className={"card-stage stage-" + item.id} ref={el}>
        {visible && <Demo id={item.id} />}
        <button
          className="expand-card"
          aria-label={"Open " + item.name}
          onClick={() => onOpen(item.id)}
        >
          <ArrowUpRight size={17} />
        </button>
      </div>
      <button className="card-caption" onClick={() => onOpen(item.id)}>
        <div>
          <h3>
            {item.name}
            <ArrowUpRight size={14} />
          </h3>
          <p>{item.description}</p>
        </div>
        <span className="source-mark">
          {item.source === "Vengeance UI"
            ? "V"
            : item.source === "Magic UI"
              ? "M"
              : item.source === "Skiper UI"
                ? "S"
                : "C"}
        </span>
      </button>
    </article>
  );
}
function App() {
  const [selected, setSelected] = useState(() =>
    decodeURIComponent(location.hash.slice(1)),
  );
  const [category, setCategory] = useState("All components");
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState(
    () => localStorage.getItem("ff-theme") || "light",
  );
  const [menu, setMenu] = useState(false);
  const [tab, setTab] = useState("preview");
  const [codeTab, setCodeTab] = useState("jsx");
  const [replay, setReplay] = useState(0);
  const [narrow, setNarrow] = useState(false);
  const [paused, setPaused] = useState(false);
  const search = useRef();
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("ff-theme", theme);
  }, [theme]);
  useEffect(() => {
    function hash() {
      setSelected(decodeURIComponent(location.hash.slice(1)));
      setTab("preview");
      setCodeTab("jsx");
      setReplay(0);
      setNarrow(false);
      window.scrollTo(0, 0);
    }
    function keys(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        search.current?.focus();
      }
      if (e.key === "Escape") setMenu(false);
    }
    addEventListener("hashchange", hash);
    addEventListener("keydown", keys);
    return () => {
      removeEventListener("hashchange", hash);
      removeEventListener("keydown", keys);
    };
  }, []);
  const current = catalog.find((c) => c.id === selected);
  const filtered = catalog.filter(
    (c) =>
      (category === "All components" || c.category === category) &&
      [c.name, c.category, c.source, c.description]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  function open(id = "") {
    location.hash = id;
    setMenu(false);
  }
  function filter(cat) {
    setCategory(cat);
    setQuery("");
    open("");
  }
  const jsx = current ? sources[`./components/${current.id}.jsx`] : "";
  const css = styles["./components/components.css"];
  function download() {
    const blob = new Blob(
      [
        `/* ${current.name}.jsx */\n${jsx}\n\n/* components.css: include once in your app */\n${css}`,
      ],
      { type: "text/plain" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = current.id + "-source.txt";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <MotionContext.Provider value={paused}>
      <div className={paused ? "app motion-paused" : "app"}>
        <a
          href="#main"
          className="skip-link"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("main").focus();
          }}
        >
          Skip to content
        </a>
        <header className="topbar">
          <button
            className="brand"
            onClick={() => {
              setCategory("All components");
              setQuery("");
              open("");
            }}
            aria-label="UI Supply home"
          >
            <span className="brand-symbol">
              u<span>i</span>
            </span>
            <span>
              UI Supply
            </span>
          </button>
          <div className="top-nav">
            <button
              className="top-active"
              onClick={() => filter("All components")}
            >
              Components <span>26</span>
            </button>
            <button onClick={() => open("getting-started")}>
              Get started <ArrowUpRight size={13} />
            </button>
          </div>
          <div className="top-actions">
            <span className="local-label">
              <i /> YOUR COMPONENT COLLECTION
            </span>
            <button
              className="icon-button"
              aria-label={
                "Switch to " + (theme === "light" ? "dark" : "light") + " theme"
              }
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              className="icon-button mobile-menu"
              aria-label="Toggle component navigation"
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>
        {menu && (
          <button
            className="sidebar-scrim"
            aria-label="Close navigation"
            onClick={() => setMenu(false)}
          />
        )}
        <aside className={menu ? "sidebar is-open" : "sidebar"}>
          <div className="sidebar-top">
            <span className="eyebrow">THE LIBRARY</span>
            <span className="version">v.01</span>
          </div>
          <label className="search-box">
            <Search size={15} />
            <input
              ref={search}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCategory("All components");
                open("");
              }}
              placeholder="Find a component…"
              aria-label="Search components"
            />
            <kbd>⌘ K</kbd>
          </label>
          <nav aria-label="Component categories">
            {categories.map((cat, i) => {
              const Icon = icons[i];
              return (
                <button
                  key={cat}
                  className={
                    !current &&
                    category === cat &&
                    selected !== "getting-started"
                      ? "category active"
                      : "category"
                  }
                  onClick={() => filter(cat)}
                >
                  <Icon size={16} />
                  <span>{cat}</span>
                  <small>
                    {cat === "All components"
                      ? catalog.length
                      : catalog.filter((c) => c.category === cat).length}
                  </small>
                </button>
              );
            })}
          </nav>
          <div className="sidebar-divider" />
          <div className="sidebar-title">
            COMPONENT INDEX <span>↓</span>
          </div>
          <nav className="component-index" aria-label="All components">
            {catalog.map((c) => (
              <button
                key={c.id}
                className={selected === c.id ? "selected" : ""}
                onClick={() => open(c.id)}
              >
                <span>{String(c.index).padStart(2, "0")}</span>
                {c.name}
                {c.id === selected && <span className="selected-dot" />}
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <div className="tiny-stack">⧉</div>
            <p>
              A good detail
              <br />
              <strong>makes all the difference.</strong>
            </p>
          </div>
        </aside>
        <main id="main" tabIndex={-1} className="main">
          <div className="breadcrumb">
            <button onClick={() => filter("All components")}>Library</button>
            <ChevronRight size={12} />
            <span>
              {current
                ? current.category
                : selected === "getting-started"
                  ? "Documentation"
                  : category}
            </span>
            {current && (
              <>
                <ChevronRight size={12} />
                <span>{current.name}</span>
              </>
            )}
            <span className="breadcrumb-right">DESIGNED TO BE USED.</span>
          </div>
          {selected === "getting-started" ? (
            <section className="docs">
              <span className="eyebrow orange">A FEW SIMPLE STEPS</span>
              <h1>Make it yours.</h1>
              <p className="lead">
                Live components. Readable code. Room for your own ideas.
              </p>
              <div className="doc-step">
                <span>01</span>
                <div>
                  <h2>Choose a component</h2>
                  <p>
                    Browse all 26 selections or search by name, category, or
                    reference library. Open a component for its full preview.
                  </p>
                </div>
              </div>
              <div className="doc-step">
                <span>02</span>
                <div>
                  <h2>Copy the implementation</h2>
                  <p>
                    In the Code tab, copy the JSX into your React project. Copy
                    the CSS tab into <code>components.css</code> beside it. Each
                    file includes a working default example and accepts props
                    where useful.
                  </p>
                  <p>
                    The CSS file is shared across the collection; add it only
                    once. The components require React and plain CSS, with no
                    animation package.
                  </p>
                </div>
              </div>
              <div className="doc-step">
                <span>03</span>
                <div>
                  <h2>Use it, then make it your own</h2>
                  <pre>
                    {
                      'import StatsCounter from "./stats-counter";\n\n<StatsCounter value={2400} suffix="+" />'
                    }
                  </pre>
                  <p>
                    Keep the reference credits when reusing adapted work. The
                    local previews use authored implementations inspired by the
                    selected libraries; they are not official packages.
                  </p>
                </div>
              </div>
              <div className="reference-links">
                {[
                  "Vengeance UI",
                  "Magic UI",
                  "Skiper UI",
                  "Chánh Đại",
                  "Kokonut UI",
                ].map((s, i) => (
                  <a
                    key={s}
                    href={
                      [
                        "https://www.vengenceui.com",
                        "https://magicui.design",
                        "https://skiper-ui.com",
                        "https://chanhdai.com/components/apple-hello-effect",
                        "https://kokonutui.com",
                      ][i]
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {s}
                    <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </section>
          ) : current ? (
            <section className="detail">
              <div className="detail-eyebrow">
                <span className="eyebrow orange">
                  {String(current.index).padStart(2, "0")} /{" "}
                  {current.category.toUpperCase()}
                </span>
                <a
                  className="reference-link"
                  href={current.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Inspired by {current.source}
                  <ArrowUpRight size={14} />
                </a>
              </div>
              <h1>
                {current.name}
                <span className="title-dot">.</span>
              </h1>
              <p className="lead">{current.description}</p>
              <div className="preview-toolbar">
                <div
                  className="tabs"
                  role="tablist"
                  aria-label="Component view"
                >
                  <button
                    role="tab"
                    aria-selected={tab === "preview"}
                    onClick={() => setTab("preview")}
                    className={tab === "preview" ? "active" : ""}
                  >
                    <Eye size={15} />
                    Preview
                  </button>
                  <button
                    role="tab"
                    aria-selected={tab === "code"}
                    onClick={() => setTab("code")}
                    className={tab === "code" ? "active" : ""}
                  >
                    <Code2 size={15} />
                    Code
                  </button>
                </div>
                <div className="preview-tools">
                  {tab === "preview" ? (
                    <>
                      <button
                        className="icon-button"
                        title="Desktop preview"
                        aria-label="Desktop preview"
                        aria-pressed={!narrow}
                        onClick={() => setNarrow(false)}
                      >
                        <Monitor size={16} />
                      </button>
                      <button
                        className="icon-button"
                        title="Mobile preview"
                        aria-label="Mobile preview"
                        aria-pressed={narrow}
                        onClick={() => setNarrow(true)}
                      >
                        <Smartphone size={16} />
                      </button>
                      <button
                        className="small-button"
                        onClick={() => setReplay(replay + 1)}
                      >
                        <RotateCcw size={14} />
                        Replay
                      </button>
                    </>
                  ) : (
                    <button className="small-button" onClick={download}>
                      <Download size={14} />
                      Download source
                    </button>
                  )}
                </div>
              </div>
              {tab === "preview" ? (
                <div className={"detail-stage stage-" + current.id}>
                  <div
                    className={
                      narrow ? "demo-viewport narrow" : "demo-viewport"
                    }
                  >
                    <Demo id={current.id} replay={replay} />
                  </div>
                  <span className="stage-cross top-left">+</span>
                  <span className="stage-cross bottom-right">+</span>
                  <span className="stage-caption">INTERACTIVE PREVIEW</span>
                </div>
              ) : (
                <div className="source-panel">
                  <div className="source-toolbar">
                    <div className="tabs">
                      <button
                        className={codeTab === "jsx" ? "active" : ""}
                        onClick={() => setCodeTab("jsx")}
                      >
                        {current.id}.jsx
                      </button>
                      <button
                        className={codeTab === "css" ? "active" : ""}
                        onClick={() => setCodeTab("css")}
                      >
                        components.css
                      </button>
                    </div>
                    <CopyButton text={codeTab === "jsx" ? jsx : css} />
                  </div>
                  <pre tabIndex={0}>
                    <code>{codeTab === "jsx" ? jsx : css}</code>
                  </pre>
                </div>
              )}
              <div className="detail-note">
                <span className="note-icon">↳</span>
                <p>{current.hint}</p>
                <button
                  className="pause-button"
                  onClick={() => setPaused(!paused)}
                >
                  {paused ? "Resume motion" : "Pause motion"}
                </button>
              </div>
              <div className="implementation">
                <div>
                  <span className="eyebrow">IMPLEMENTATION</span>
                  <h2>Ready for your next idea.</h2>
                  <p>
                    Copy the JSX and shared CSS into your React app.
                    <br />
                    Customize the content and styling to fit your project.
                  </p>
                  <button
                    className="text-link"
                    onClick={() => open("getting-started")}
                  >
                    View setup guide <ArrowRight size={15} />
                  </button>
                </div>
                <div className="implementation-code">
                  <div>
                    <span>React · CSS</span>
                    <CopyButton text={jsx} />
                  </div>
                  <pre>{`import Component from './${current.id}';\n\nexport default function Example() {\n  return <Component />;\n}`}</pre>
                </div>
              </div>
              <div className="page-pagination">
                <button
                  onClick={() => open(catalog[(current.index + 24) % 26].id)}
                >
                  ← {catalog[(current.index + 24) % 26].name}
                </button>
                <button onClick={() => open(catalog[current.index % 26].id)}>
                  {catalog[current.index % 26].name} →
                </button>
              </div>
            </section>
          ) : (
            <section>
              <div className="hero">
                <div className="hero-copy">
                  <span className="eyebrow orange">
                    <span className="eyebrow-line" /> SMALL DETAILS. BETTER
                    INTERFACES.
                  </span>
                  <h1>
                    Good interfaces
                    <br />
                    start with <em>good parts.</em>
                  </h1>
                  <p>
                    A considered collection of interactive components.
                    <br />
                    Explore the details. Take the code. Make it yours.
                  </p>
                  <div className="hero-bottom">
                    <span>
                      <i className="green-dot" />
                      26 components, ready to explore
                    </span>
                    <button onClick={() => open("getting-started")}>
                      Get started <ArrowUpRight size={15} />
                    </button>
                  </div>
                </div>
                <div className="hero-art" aria-hidden="true">
                  <div className="art-grid" />
                  <div className="art-label">THE ANATOMY OF A GOOD DETAIL</div>
                  <div className="art-square square-one" />
                  <div className="art-square square-two" />
                  <div className="art-square square-three" />
                  <span className="art-cross a1">+</span>
                  <span className="art-cross a2">+</span>
                  <div className="art-coordinate">
                    FIG. 001 / FORM MEETS FUNCTION
                  </div>
                </div>
              </div>
              <div className="collection-toolbar">
                <div>
                  <h2>
                    {query
                      ? "Search results"
                      : category === "All components"
                        ? "The collection"
                        : category}
                  </h2>
                  <span>
                    {String(filtered.length).padStart(2, "0")} COMPONENTS
                  </span>
                </div>
                <div className="collection-controls">
                  <button
                    className="pause-button"
                    onClick={() => setPaused(!paused)}
                  >
                    {paused ? "Resume motion" : "Pause motion"}
                  </button>
                  <span className="live-label">
                    <i />
                    LIVE PREVIEWS
                  </span>
                </div>
              </div>
              <div className="filter-row">
                {[
                  "All components",
                  "Text & typography",
                  "Interactive",
                  "Cards & layouts",
                  "Special effects",
                ].map((cat, i) => (
                  <button
                    key={cat}
                    className={category === cat ? "selected" : ""}
                    onClick={() => {
                      setCategory(cat);
                      setQuery("");
                    }}
                  >
                    {i === 0
                      ? "All"
                      : cat === "Text & typography"
                        ? "Text"
                        : cat === "Cards & layouts"
                          ? "Layouts"
                          : cat === "Special effects"
                            ? "Effects"
                            : cat}
                  </button>
                ))}
                <span className="filter-end">
                  BUILT TO INTERACT <MousePointer2 size={12} />
                </span>
              </div>
              <div className="component-grid">
                {filtered.map((c) => (
                  <Card key={c.id} item={c} onOpen={open} />
                ))}
              </div>
              {!filtered.length && (
                <div className="empty-state">
                  <Search size={26} />
                  <h2>No components found</h2>
                  <p>Try a name like “beam”, “text”, or “carousel”.</p>
                  <button
                    className="small-button"
                    onClick={() => {
                      setCategory("All components");
                      setQuery("");
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </section>
          )}
          <footer className="footer">
            <span>
              UI SUPPLY{" "}
              <span className="muted">/ A PERSONAL UI COLLECTION</span>
            </span>
            <span>
              26 thoughtful details. Endless possibilities.{" "}
              <span className="orange">↗</span>
            </span>
          </footer>
        </main>
      </div>
    </MotionContext.Provider>
  );
}
createRoot(document.getElementById("root")).render(<App />);
