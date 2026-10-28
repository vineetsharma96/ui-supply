// Adapted from https://ui.aceternity.com/components/canvas-reveal-effect
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/canvas-reveal-effect.tsx
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { jsx, jsxs } from "react/jsx-runtime";
var CanvasRevealEffect = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize,
  showGradient = true
}) => {
  return /* @__PURE__ */ jsxs("div", { className: cn("h-full relative bg-white w-full", containerClassName), children: [
    /* @__PURE__ */ jsx("div", { className: "h-full w-full", children: /* @__PURE__ */ jsx(
      DotMatrix,
      {
        colors: colors ?? [[0, 255, 255]],
        dotSize: dotSize ?? 3,
        opacities: opacities ?? [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
        shader: `
              float animation_speed_factor = ${animationSpeed.toFixed(1)};
              float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01 + (random(st2) * 0.15);
              opacity *= step(intro_offset, u_time * animation_speed_factor);
              opacity *= clamp((1.0 - step(intro_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
            `,
        center: ["x", "y"]
      }
    ) }),
    showGradient && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]" })
  ] });
};
var DotMatrix = ({
  colors = [[0, 0, 0]],
  opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
  totalSize = 4,
  dotSize = 2,
  shader = "",
  center = ["x", "y"]
}) => {
  const uniforms = React.useMemo(() => {
    let colorsArray = [
      colors[0],
      colors[0],
      colors[0],
      colors[0],
      colors[0],
      colors[0]
    ];
    if (colors.length === 2) {
      colorsArray = [
        colors[0],
        colors[0],
        colors[0],
        colors[1],
        colors[1],
        colors[1]
      ];
    } else if (colors.length === 3) {
      colorsArray = [
        colors[0],
        colors[0],
        colors[1],
        colors[1],
        colors[2],
        colors[2]
      ];
    }
    return {
      u_colors: {
        value: colorsArray.map((color) => [
          color[0] / 255,
          color[1] / 255,
          color[2] / 255
        ]),
        type: "uniform3fv"
      },
      u_opacities: {
        value: opacities,
        type: "uniform1fv"
      },
      u_total_size: {
        value: totalSize,
        type: "uniform1f"
      },
      u_dot_size: {
        value: dotSize,
        type: "uniform1f"
      }
    };
  }, [colors, opacities, totalSize, dotSize]);
  return /* @__PURE__ */ jsx(
    Shader,
    {
      source: `
        precision mediump float;
        in vec2 fragCoord;

        uniform float u_time;
        uniform float u_opacities[10];
        uniform vec3 u_colors[6];
        uniform float u_total_size;
        uniform float u_dot_size;
        uniform vec2 u_resolution;
        out vec4 fragColor;
        float PHI = 1.61803398874989484820459;
        float random(vec2 xy) {
            return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
        }
        float map(float value, float min1, float max1, float min2, float max2) {
            return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }
        void main() {
            vec2 st = fragCoord.xy;
            ${center.includes("x") ? "st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));" : ""}
            ${center.includes("y") ? "st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));" : ""}
      float opacity = step(0.0, st.x);
      opacity *= step(0.0, st.y);

      vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));

      float frequency = 5.0;
      float show_offset = random(st2);
      float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency) + 1.0);
      opacity *= u_opacities[int(rand * 10.0)];
      opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
      opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

      vec3 color = u_colors[int(show_offset * 6.0)];

      ${shader}

      fragColor = vec4(color, opacity);
      fragColor.rgb *= fragColor.a;
        }`,
      uniforms,
      maxFps: 60
    }
  );
};
var ShaderMaterial2 = ({
  source,
  uniforms,
  maxFps = 60
}) => {
  const { size } = useThree();
  const ref = useRef();
  let lastFrameTime = 0;
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const timestamp = clock.getElapsedTime();
    if (timestamp - lastFrameTime < 1 / maxFps) {
      return;
    }
    lastFrameTime = timestamp;
    const material2 = ref.current.material;
    const timeLocation = material2.uniforms.u_time;
    timeLocation.value = timestamp;
  });
  const getUniforms = () => {
    const preparedUniforms = {};
    for (const uniformName in uniforms) {
      const uniform = uniforms[uniformName];
      switch (uniform.type) {
        case "uniform1f":
          preparedUniforms[uniformName] = { value: uniform.value, type: "1f" };
          break;
        case "uniform3f":
          preparedUniforms[uniformName] = {
            value: new THREE.Vector3().fromArray(uniform.value),
            type: "3f"
          };
          break;
        case "uniform1fv":
          preparedUniforms[uniformName] = { value: uniform.value, type: "1fv" };
          break;
        case "uniform3fv":
          preparedUniforms[uniformName] = {
            value: uniform.value.map(
              (v) => new THREE.Vector3().fromArray(v)
            ),
            type: "3fv"
          };
          break;
        case "uniform2f":
          preparedUniforms[uniformName] = {
            value: new THREE.Vector2().fromArray(uniform.value),
            type: "2f"
          };
          break;
        default:
          console.error(`Invalid uniform type for '${uniformName}'.`);
          break;
      }
    }
    preparedUniforms["u_time"] = { value: 0, type: "1f" };
    preparedUniforms["u_resolution"] = {
      value: new THREE.Vector2(size.width * 2, size.height * 2)
    };
    return preparedUniforms;
  };
  const material = useMemo(() => {
    const materialObject = new THREE.ShaderMaterial({
      vertexShader: `
      precision mediump float;
      in vec2 coordinates;
      uniform vec2 u_resolution;
      out vec2 fragCoord;
      void main(){
        float x = position.x;
        float y = position.y;
        gl_Position = vec4(x, y, 0.0, 1.0);
        fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
        fragCoord.y = u_resolution.y - fragCoord.y;
      }
      `,
      fragmentShader: source,
      uniforms: getUniforms(),
      glslVersion: THREE.GLSL3,
      blending: THREE.CustomBlending,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneFactor
    });
    return materialObject;
  }, [size.width, size.height, source]);
  return /* @__PURE__ */ jsxs("mesh", { ref, children: [
    /* @__PURE__ */ jsx("planeGeometry", { args: [2, 2] }),
    /* @__PURE__ */ jsx("primitive", { object: material, attach: "material" })
  ] });
};
var Shader = ({ source, uniforms, maxFps = 60 }) => {
  return /* @__PURE__ */ jsx(Canvas, { className: "absolute inset-0  h-full w-full", children: /* @__PURE__ */ jsx(ShaderMaterial2, { source, uniforms, maxFps }) });
};

// entry.jsx
import React3 from "react";

// registry:components/canvas-reveal-effect-demo.tsx
import React2 from "react";
import { AnimatePresence, motion } from "motion/react";
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function CanvasRevealEffectDemo() {
  return /* @__PURE__ */ jsx2(Fragment, { children: /* @__PURE__ */ jsxs2("div", { className: "py-20 flex flex-col lg:flex-row items-center justify-center bg-white dark:bg-black w-full gap-4 mx-auto px-8", children: [
    /* @__PURE__ */ jsx2(Card, { title: "Sheetal is Nisha", icon: /* @__PURE__ */ jsx2(AceternityIcon, {}), children: /* @__PURE__ */ jsx2(
      CanvasRevealEffect,
      {
        animationSpeed: 5.1,
        containerClassName: "bg-emerald-900"
      }
    ) }),
    /* @__PURE__ */ jsxs2(Card, { title: "Nisha is Munni", icon: /* @__PURE__ */ jsx2(AceternityIcon, {}), children: [
      /* @__PURE__ */ jsx2(
        CanvasRevealEffect,
        {
          animationSpeed: 3,
          containerClassName: "bg-black",
          colors: [
            [236, 72, 153],
            [232, 121, 249]
          ],
          dotSize: 2
        }
      ),
      /* @__PURE__ */ jsx2("div", { className: "absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" })
    ] }),
    /* @__PURE__ */ jsx2(Card, { title: "Munni is Aditi", icon: /* @__PURE__ */ jsx2(AceternityIcon, {}), children: /* @__PURE__ */ jsx2(
      CanvasRevealEffect,
      {
        animationSpeed: 3,
        containerClassName: "bg-sky-600",
        colors: [[125, 211, 252]]
      }
    ) })
  ] }) });
}
var Card = ({
  title,
  icon,
  children
}) => {
  const [hovered, setHovered] = React2.useState(false);
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      className: "border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative h-[30rem] relative",
      children: [
        /* @__PURE__ */ jsx2(Icon, { className: "absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" }),
        /* @__PURE__ */ jsx2(Icon, { className: "absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" }),
        /* @__PURE__ */ jsx2(Icon, { className: "absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" }),
        /* @__PURE__ */ jsx2(Icon, { className: "absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" }),
        /* @__PURE__ */ jsx2(AnimatePresence, { children: hovered && /* @__PURE__ */ jsx2(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            className: "h-full w-full absolute inset-0",
            children
          }
        ) }),
        /* @__PURE__ */ jsxs2("div", { className: "relative z-20", children: [
          /* @__PURE__ */ jsx2("div", { className: "text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center", children: icon }),
          /* @__PURE__ */ jsx2("h2", { className: "dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200", children: title })
        ] })
      ]
    }
  );
};
var AceternityIcon = () => {
  return /* @__PURE__ */ jsx2(
    "svg",
    {
      width: "66",
      height: "65",
      viewBox: "0 0 66 65",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "h-10 w-10 text-black dark:text-white group-hover/canvas-card:text-white ",
      children: /* @__PURE__ */ jsx2(
        "path",
        {
          d: "M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696",
          stroke: "currentColor",
          strokeWidth: "15",
          strokeMiterlimit: "3.86874",
          strokeLinecap: "round",
          style: { mixBlendMode: "darken" }
        }
      )
    }
  );
};
var Icon = ({ className, ...rest }) => {
  return /* @__PURE__ */ jsx2(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "currentColor",
      className,
      ...rest,
      children: /* @__PURE__ */ jsx2("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6v12m6-6H6" })
    }
  );
};

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(CanvasRevealEffectDemo, {}) }) });
}
export {
  CanvasRevealEffect,
  Component as default
};
