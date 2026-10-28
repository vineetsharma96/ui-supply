/*
MIT License

Copyright (c) 2025-2026 Ashutoshx7

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
// Adapted from https://www.vengenceui.com/components/mega-menu-navbar
// Copyright (c) 2025-2026 Ashutoshx7. See licenses/vengeance.txt for usage terms.
// registry:components/ui/mega-menu-navbar.tsx
import * as React from "react";
import {
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  ChevronDown,
  Code2,
  FileText,
  GraduationCap,
  Menu,
  MessagesSquare,
  MoveRight,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap
} from "lucide-react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:assets/logo/logo-icon.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function LogoIcon({
  className = "w-24 h-auto",
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 374 313",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      ...props,
      children: [
        /* @__PURE__ */ jsx("path", { d: "M247 181L237.5 236.5L373.5 313L247 181Z", fill: "currentColor" }),
        /* @__PURE__ */ jsx("path", { d: "M187.5 0L154 209L173.5 195L237.5 83L187.5 0Z", fill: "currentColor" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M373.5 313L253.761 110.5L197.5 195L237.5 181L212.5 222L0 313H187.5L237.5 236.5L247 181L373.5 313Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx("path", { d: "M187.5 0L0 313L154 209L187.5 0Z", fill: "currentColor" })
      ]
    }
  );
}

// registry:components/ui/mega-menu-navbar.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var DEFAULT_FEATURES = [
  {
    title: "Components",
    description: "Polished interface elements ready to copy, customize, and ship.",
    href: "/components",
    icon: Sparkles,
    badge: "New"
  },
  {
    title: "Blocks",
    description: "Complete, flexible sections for building pages with less effort.",
    href: "/blocks",
    icon: BarChart3
  },
  {
    title: "Motion",
    description: "Considered interactions that add rhythm without distraction.",
    href: "/components",
    icon: Zap
  },
  {
    title: "Templates",
    description: "A curated starting point for landing pages and portfolios.",
    href: "/templates",
    icon: Users
  },
  {
    title: "Documentation",
    description: "Clear installation notes, usage examples, and component APIs.",
    href: "/docs",
    icon: Code2
  },
  {
    title: "Open source",
    description: "A practical design system built for the wider frontend community.",
    href: "https://github.com/Ashutoshx7/VengeanceUI",
    icon: ShieldCheck
  }
];
var DEFAULT_USE_CASES = [
  {
    title: "Landing pages",
    description: "Build expressive first impressions with a more considered visual system.",
    href: "/blocks",
    icon: Rocket
  },
  {
    title: "Product sites",
    description: "Compose useful product narratives, feature sections, and calls to action.",
    href: "/components",
    icon: Briefcase
  },
  {
    title: "Personal work",
    description: "Give portfolios and creative projects a refined, technical character.",
    href: "/templates",
    icon: Building2
  }
];
var DEFAULT_RESOURCE_GROUPS = [
  {
    title: "Explore",
    links: [
      { title: "Components", href: "/components", icon: Building2 },
      { title: "Blocks", href: "/blocks", icon: Briefcase },
      { title: "Templates", href: "/templates", icon: MessagesSquare }
    ]
  },
  {
    title: "Learn",
    links: [
      { title: "Documentation", href: "/docs", icon: FileText },
      { title: "Changelog", href: "/changelog", icon: Code2 },
      { title: "GitHub", href: "https://github.com/Ashutoshx7/VengeanceUI", icon: GraduationCap }
    ]
  }
];
function NavAction({
  href,
  children,
  variant = "primary",
  className,
  onClick
}) {
  return /* @__PURE__ */ jsx2(
    "a",
    {
      href,
      onClick,
      className: cn(
        "inline-flex h-8 items-center justify-center rounded-lg px-3 text-[13px] font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2",
        variant === "primary" && "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200",
        variant === "ghost" && "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white",
        variant === "outline" && "border border-zinc-200 bg-white text-zinc-900 shadow-sm hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-800",
        className
      ),
      children
    }
  );
}
function Brand({
  brandName,
  brandHref,
  logo,
  onNavigate
}) {
  return /* @__PURE__ */ jsxs2(
    "a",
    {
      href: brandHref,
      onClick: onNavigate,
      className: "relative z-10 flex shrink-0 items-center gap-2 text-[15px] font-semibold tracking-[-0.02em] text-zinc-950 dark:text-zinc-50",
      children: [
        logo ?? /* @__PURE__ */ jsx2(LogoIcon, { className: "size-5 rotate-180 text-zinc-900 dark:text-zinc-100" }),
        /* @__PURE__ */ jsx2("span", { children: brandName })
      ]
    }
  );
}
function MenuTrigger({
  id,
  label,
  isOpen,
  onToggle,
  onOpen
}) {
  return /* @__PURE__ */ jsxs2(
    "button",
    {
      type: "button",
      "aria-expanded": isOpen,
      "aria-controls": id,
      onClick: onToggle,
      onFocus: onOpen,
      className: cn(
        "flex items-center gap-1 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors",
        "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400",
        "dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-zinc-100",
        isOpen && "bg-zinc-100 text-zinc-950 dark:bg-white/[0.08] dark:text-zinc-100"
      ),
      children: [
        label,
        /* @__PURE__ */ jsx2(
          ChevronDown,
          {
            className: cn(
              "size-3.5 opacity-60 transition-transform duration-200",
              isOpen && "rotate-180"
            )
          }
        )
      ]
    }
  );
}
function FeatureGrid({ items }) {
  return /* @__PURE__ */ jsx2("div", { className: "grid grid-cols-2 gap-2", children: items.map((item) => {
    const Icon = item.icon;
    return /* @__PURE__ */ jsxs2(
      "a",
      {
        href: item.href,
        className: cn(
          "group/item flex items-start gap-3 rounded-lg p-3 transition-colors",
          "hover:bg-zinc-100/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300",
          "dark:hover:bg-white/[0.05] dark:focus-visible:ring-zinc-700"
        ),
        children: [
          Icon ? /* @__PURE__ */ jsx2("span", { className: "flex size-9 shrink-0 items-center justify-center rounded-md border border-zinc-200/80 bg-zinc-50 transition-colors group-hover/item:bg-white dark:border-white/[0.08] dark:bg-white/[0.04] dark:group-hover/item:bg-white/[0.08]", children: /* @__PURE__ */ jsx2(Icon, { className: cn("size-4", item.iconClassName ?? "text-zinc-600 dark:text-zinc-300") }) }) : null,
          /* @__PURE__ */ jsxs2("span", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxs2("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx2("span", { className: "text-sm font-medium text-zinc-950 dark:text-zinc-100", children: item.title }),
              item.badge ? /* @__PURE__ */ jsx2("span", { className: "rounded-full border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600 dark:border-white/[0.1] dark:bg-white/[0.06] dark:text-zinc-300", children: item.badge }) : null
            ] }),
            item.description ? /* @__PURE__ */ jsx2("span", { className: "mt-1 block text-xs leading-relaxed text-zinc-500 dark:text-zinc-400", children: item.description }) : null
          ] })
        ]
      },
      item.title
    );
  }) });
}
function DesktopDropdown({
  id,
  open,
  className,
  children
}) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      id,
      "aria-hidden": !open,
      className: cn(
        "absolute left-0 top-full z-50 pt-2 transition-all duration-150",
        open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0 pointer-events-none",
        className
      ),
      children
    }
  );
}
function MobileAccordion({
  title,
  value,
  openSection,
  onToggle,
  children
}) {
  const isOpen = openSection === value;
  const contentId = `mobile-${value}-content`;
  return /* @__PURE__ */ jsxs2("div", { className: "border-b border-zinc-200 dark:border-zinc-800", children: [
    /* @__PURE__ */ jsxs2(
      "button",
      {
        type: "button",
        "aria-expanded": isOpen,
        "aria-controls": contentId,
        onClick: () => onToggle(value),
        className: "flex w-full items-center justify-between py-4 text-sm font-medium text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-100",
        children: [
          title,
          /* @__PURE__ */ jsx2(
            ChevronDown,
            {
              className: cn(
                "size-4 text-zinc-500 transition-transform duration-200",
                isOpen && "rotate-180"
              )
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx2(
      "div",
      {
        id: contentId,
        className: cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          isOpen ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0"
        ),
        children: /* @__PURE__ */ jsx2("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx2("div", { className: "ml-2 flex flex-col gap-1 border-l-2 border-zinc-100 pl-3 dark:border-zinc-800", children }) })
      }
    )
  ] });
}
function MobileMenuItem({ item, onNavigate }) {
  const Icon = item.icon;
  return /* @__PURE__ */ jsxs2(
    "a",
    {
      href: item.href,
      onClick: onNavigate,
      className: "flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white",
      children: [
        Icon ? /* @__PURE__ */ jsx2(Icon, { className: cn("size-4", item.iconClassName) }) : null,
        /* @__PURE__ */ jsx2("span", { children: item.title })
      ]
    }
  );
}
function MegaMenuNavbar({
  brandName = "VengeanceUI",
  brandHref = "/",
  logo,
  features = DEFAULT_FEATURES,
  useCases = DEFAULT_USE_CASES,
  resourceGroups = DEFAULT_RESOURCE_GROUPS,
  pricingHref = "/templates",
  loginHref = "/docs",
  ctaHref = "/components",
  ctaLabel = "Browse components",
  className,
  ...props
}) {
  const [openMenu, setOpenMenu] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileSection, setMobileSection] = React.useState(null);
  const navRef = React.useRef(null);
  const closeButtonRef = React.useRef(null);
  React.useEffect(() => {
    const onPointerDown = (event) => {
      if (!navRef.current?.contains(event.target)) {
        setOpenMenu(null);
      }
    };
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);
  React.useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);
  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSection(null);
  };
  const toggleDesktopMenu = (menu) => {
    setOpenMenu((current) => current === menu ? null : menu);
  };
  const toggleMobileSection = (section) => {
    setMobileSection((current) => current === section ? null : section);
  };
  return /* @__PURE__ */ jsxs2(
    "header",
    {
      ...props,
      ref: navRef,
      className: cn(
        "sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/85 backdrop-blur-xl",
        "dark:border-white/[0.08] dark:bg-zinc-950/85",
        className
      ),
      onMouseLeave: (event) => {
        setOpenMenu(null);
        props.onMouseLeave?.(event);
      },
      children: [
        /* @__PURE__ */ jsx2("div", { className: "mx-auto max-w-6xl px-4 md:px-6", children: /* @__PURE__ */ jsxs2("div", { className: "flex h-14 items-center justify-between", children: [
          /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-6", children: [
            /* @__PURE__ */ jsx2(Brand, { brandName, brandHref, logo }),
            /* @__PURE__ */ jsx2("nav", { "aria-label": "Primary navigation", className: "hidden items-center lg:flex", children: /* @__PURE__ */ jsxs2("ul", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxs2("li", { className: "relative", onMouseEnter: () => setOpenMenu("features"), children: [
                /* @__PURE__ */ jsx2(
                  MenuTrigger,
                  {
                    id: "features-mega-menu",
                    label: "Features",
                    isOpen: openMenu === "features",
                    onToggle: () => toggleDesktopMenu("features"),
                    onOpen: () => setOpenMenu("features")
                  }
                ),
                /* @__PURE__ */ jsx2(DesktopDropdown, { id: "features-mega-menu", open: openMenu === "features", className: "w-[640px]", children: /* @__PURE__ */ jsxs2("div", { className: "rounded-xl border border-zinc-200/80 bg-white p-3 shadow-[0_18px_45px_-28px_rgba(0,0,0,0.55)] dark:border-white/[0.1] dark:bg-zinc-950", children: [
                  /* @__PURE__ */ jsx2(FeatureGrid, { items: features }),
                  /* @__PURE__ */ jsxs2("div", { className: "mt-3 flex items-center justify-between border-t border-zinc-100 px-2 pt-3 dark:border-white/[0.08]", children: [
                    /* @__PURE__ */ jsx2("span", { className: "text-sm text-zinc-500 dark:text-zinc-400", children: "Building something distinct?" }),
                    /* @__PURE__ */ jsxs2(
                      "a",
                      {
                        href: "/components",
                        className: "inline-flex items-center gap-1 text-sm font-medium text-zinc-950 hover:underline dark:text-zinc-100",
                        children: [
                          "Explore the library",
                          /* @__PURE__ */ jsx2(MoveRight, { className: "size-4" })
                        ]
                      }
                    )
                  ] })
                ] }) })
              ] }),
              /* @__PURE__ */ jsxs2("li", { className: "relative", onMouseEnter: () => setOpenMenu("use-cases"), children: [
                /* @__PURE__ */ jsx2(
                  MenuTrigger,
                  {
                    id: "use-cases-mega-menu",
                    label: "Use Cases",
                    isOpen: openMenu === "use-cases",
                    onToggle: () => toggleDesktopMenu("use-cases"),
                    onOpen: () => setOpenMenu("use-cases")
                  }
                ),
                /* @__PURE__ */ jsx2(DesktopDropdown, { id: "use-cases-mega-menu", open: openMenu === "use-cases", className: "w-[390px]", children: /* @__PURE__ */ jsxs2("div", { className: "rounded-xl border border-zinc-200/80 bg-white p-2 shadow-[0_18px_45px_-28px_rgba(0,0,0,0.55)] dark:border-white/[0.1] dark:bg-zinc-950", children: [
                  /* @__PURE__ */ jsx2("div", { className: "flex flex-col gap-1", children: useCases.map((item) => {
                    const Icon = item.icon;
                    return /* @__PURE__ */ jsxs2(
                      "a",
                      {
                        href: item.href,
                        className: "flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-zinc-100/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 dark:hover:bg-white/[0.05] dark:focus-visible:ring-zinc-700",
                        children: [
                          Icon ? /* @__PURE__ */ jsx2("span", { className: "flex size-9 shrink-0 items-center justify-center rounded-md border border-zinc-200/80 bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.04]", children: /* @__PURE__ */ jsx2(Icon, { className: "size-4 text-zinc-600 dark:text-zinc-300" }) }) : null,
                          /* @__PURE__ */ jsxs2("span", { children: [
                            /* @__PURE__ */ jsx2("span", { className: "block text-sm font-medium text-zinc-950 dark:text-zinc-100", children: item.title }),
                            item.description ? /* @__PURE__ */ jsx2("span", { className: "mt-0.5 block text-xs leading-relaxed text-zinc-500 dark:text-zinc-400", children: item.description }) : null
                          ] })
                        ]
                      },
                      item.title
                    );
                  }) }),
                  /* @__PURE__ */ jsxs2("div", { className: "mt-2 rounded-lg border border-zinc-100 bg-zinc-50/80 p-4 dark:border-white/[0.08] dark:bg-white/[0.03]", children: [
                    /* @__PURE__ */ jsx2("p", { className: "text-sm font-medium text-zinc-950 dark:text-zinc-100", children: "Made to be remixed" }),
                    /* @__PURE__ */ jsx2("p", { className: "mt-1 text-xs text-zinc-500 dark:text-zinc-400", children: "Start with a detail, then make it entirely yours." }),
                    /* @__PURE__ */ jsx2("a", { href: "/components", className: "mt-3 inline-flex text-xs font-medium text-zinc-900 hover:underline dark:text-zinc-100", children: "Browse components \u2192" })
                  ] })
                ] }) })
              ] }),
              /* @__PURE__ */ jsx2("li", { children: /* @__PURE__ */ jsx2(
                "a",
                {
                  href: pricingHref,
                  className: "inline-flex rounded-lg px-3 py-1.5 text-[13px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100/80 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-zinc-100",
                  children: "Templates"
                }
              ) }),
              /* @__PURE__ */ jsxs2("li", { className: "relative", onMouseEnter: () => setOpenMenu("resources"), children: [
                /* @__PURE__ */ jsx2(
                  MenuTrigger,
                  {
                    id: "resources-mega-menu",
                    label: "Resources",
                    isOpen: openMenu === "resources",
                    onToggle: () => toggleDesktopMenu("resources"),
                    onOpen: () => setOpenMenu("resources")
                  }
                ),
                /* @__PURE__ */ jsx2(
                  DesktopDropdown,
                  {
                    id: "resources-mega-menu",
                    open: openMenu === "resources",
                    className: "left-1/2 w-[620px] -translate-x-1/2",
                    children: /* @__PURE__ */ jsxs2("div", { className: "grid grid-cols-3 gap-5 rounded-xl border border-zinc-200/80 bg-white p-4 shadow-[0_18px_45px_-28px_rgba(0,0,0,0.55)] dark:border-white/[0.1] dark:bg-zinc-950", children: [
                      /* @__PURE__ */ jsxs2("div", { className: "flex flex-col justify-between rounded-lg border border-zinc-100 bg-zinc-50/80 p-4 dark:border-white/[0.08] dark:bg-white/[0.03]", children: [
                        /* @__PURE__ */ jsxs2("div", { children: [
                          /* @__PURE__ */ jsx2("span", { className: "flex size-9 items-center justify-center rounded-md bg-zinc-200/70 text-zinc-700 dark:bg-white/[0.08] dark:text-zinc-200", children: /* @__PURE__ */ jsx2(BookOpen, { className: "size-4" }) }),
                          /* @__PURE__ */ jsx2("h4", { className: "mt-4 text-sm font-semibold text-zinc-950 dark:text-zinc-100", children: "Designed with restraint" }),
                          /* @__PURE__ */ jsx2("p", { className: "mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400", children: "A small set of expressive details, kept deliberately quiet." })
                        ] }),
                        /* @__PURE__ */ jsxs2("a", { href: "/about", className: "mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-900 hover:underline dark:text-zinc-100", children: [
                          "About VengeanceUI",
                          /* @__PURE__ */ jsx2(MoveRight, { className: "size-3.5" })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx2("div", { className: "col-span-2 grid grid-cols-2 gap-5", children: resourceGroups.map((group) => /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-1", children: [
                        /* @__PURE__ */ jsx2("h4", { className: "mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500", children: group.title }),
                        group.links.map((item) => {
                          const Icon = item.icon;
                          return /* @__PURE__ */ jsxs2(
                            "a",
                            {
                              href: item.href,
                              className: "flex items-center gap-2 rounded-md p-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100/80 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-zinc-100",
                              children: [
                                Icon ? /* @__PURE__ */ jsx2(Icon, { className: "size-4 text-zinc-400" }) : null,
                                item.title
                              ]
                            },
                            item.title
                          );
                        })
                      ] }, group.title)) })
                    ] })
                  }
                )
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxs2("div", { className: "hidden items-center gap-2 lg:flex", children: [
              /* @__PURE__ */ jsx2(NavAction, { href: loginHref, variant: "ghost", children: "Log in" }),
              /* @__PURE__ */ jsx2(NavAction, { href: ctaHref, children: ctaLabel })
            ] }),
            /* @__PURE__ */ jsx2(
              "button",
              {
                type: "button",
                "aria-label": "Open navigation menu",
                "aria-expanded": mobileOpen,
                onClick: () => setMobileOpen(true),
                className: "flex size-10 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-400 dark:hover:bg-zinc-800 lg:hidden",
                children: /* @__PURE__ */ jsx2(Menu, { className: "size-6" })
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx2(
          "div",
          {
            "aria-hidden": !mobileOpen,
            onClick: closeMobile,
            className: cn(
              "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
              mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
            )
          }
        ),
        /* @__PURE__ */ jsxs2(
          "aside",
          {
            role: "dialog",
            "aria-modal": "true",
            "aria-hidden": !mobileOpen,
            inert: !mobileOpen ? true : void 0,
            "aria-label": "Mobile navigation",
            className: cn(
              "fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white p-6 shadow-2xl transition-transform duration-300 ease-out dark:bg-zinc-950 lg:hidden",
              mobileOpen ? "translate-x-0" : "translate-x-full"
            ),
            children: [
              /* @__PURE__ */ jsxs2("div", { className: "mb-8 flex items-center justify-between", children: [
                /* @__PURE__ */ jsx2(Brand, { brandName, brandHref, logo, onNavigate: closeMobile }),
                /* @__PURE__ */ jsx2(
                  "button",
                  {
                    ref: closeButtonRef,
                    type: "button",
                    onClick: closeMobile,
                    "aria-label": "Close navigation menu",
                    className: "flex size-10 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-400 dark:hover:bg-zinc-800",
                    children: /* @__PURE__ */ jsx2(X, { className: "size-5" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs2("nav", { "aria-label": "Mobile navigation", className: "-mx-6 flex-1 overflow-y-auto px-6", children: [
                /* @__PURE__ */ jsx2(
                  MobileAccordion,
                  {
                    title: "Features",
                    value: "features",
                    openSection: mobileSection,
                    onToggle: toggleMobileSection,
                    children: features.map((item) => /* @__PURE__ */ jsx2(MobileMenuItem, { item, onNavigate: closeMobile }, item.title))
                  }
                ),
                /* @__PURE__ */ jsx2(
                  MobileAccordion,
                  {
                    title: "Use Cases",
                    value: "use-cases",
                    openSection: mobileSection,
                    onToggle: toggleMobileSection,
                    children: useCases.map((item) => /* @__PURE__ */ jsx2(MobileMenuItem, { item, onNavigate: closeMobile }, item.title))
                  }
                ),
                /* @__PURE__ */ jsx2(
                  "a",
                  {
                    href: pricingHref,
                    onClick: closeMobile,
                    className: "block border-b border-zinc-200 py-4 text-sm font-medium text-zinc-950 dark:border-zinc-800 dark:text-zinc-100",
                    children: "Templates"
                  }
                ),
                /* @__PURE__ */ jsx2(
                  MobileAccordion,
                  {
                    title: "Resources",
                    value: "resources",
                    openSection: mobileSection,
                    onToggle: toggleMobileSection,
                    children: resourceGroups.flatMap(
                      (group) => group.links.map((item) => /* @__PURE__ */ jsx2(MobileMenuItem, { item, onNavigate: closeMobile }, `${group.title}-${item.title}`))
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs2("div", { className: "mt-auto grid grid-cols-2 gap-3 pt-6", children: [
                /* @__PURE__ */ jsx2(NavAction, { href: loginHref, variant: "outline", className: "w-full", onClick: closeMobile, children: "Log in" }),
                /* @__PURE__ */ jsx2(NavAction, { href: ctaHref, className: "w-full", onClick: closeMobile, children: ctaLabel })
              ] })
            ]
          }
        )
      ]
    }
  );
}

// entry.jsx
import React2 from "react";

// registry:components/docs/mega-menu-navbar-demo.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function MegaMenuNavbarDemo() {
  return /* @__PURE__ */ jsxs3("div", { className: "relative h-full min-h-[520px] w-full overflow-hidden rounded-lg bg-zinc-50 dark:bg-[#09090b]", children: [
    /* @__PURE__ */ jsx3(MegaMenuNavbar, { className: "absolute inset-x-0 top-0" }),
    /* @__PURE__ */ jsx3("div", { className: "mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 pt-20 text-center", children: /* @__PURE__ */ jsx3("p", { className: "text-sm text-zinc-500 dark:text-zinc-400", children: "A quieter navigation system for exploring the VengeanceUI library." }) })
  ] });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(MegaMenuNavbarDemo, {}) }) });
}
export {
  MegaMenuNavbar,
  Component as default
};
