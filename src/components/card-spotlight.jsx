// Adapted from https://ui.aceternity.com/components/card-spotlight
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/card-spotlight.tsx
import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import { useState } from "react";

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

// registry:components/ui/card-spotlight.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var CardSpotlight = ({
  children,
  radius = 350,
  color = "#262626",
  className,
  ...props
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY
  }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className: cn(
        "group/spotlight p-10 rounded-md relative border border-neutral-800 bg-black dark:border-neutral-800",
        className
      ),
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      ...props,
      children: [
        /* @__PURE__ */ jsx2(
          motion.div,
          {
            className: "pointer-events-none absolute z-0 -inset-px rounded-md opacity-0 transition duration-300 group-hover/spotlight:opacity-100",
            style: {
              backgroundColor: color,
              maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `
            },
            children: isHovering && /* @__PURE__ */ jsx2(
              CanvasRevealEffect,
              {
                animationSpeed: 5,
                containerClassName: "bg-transparent absolute inset-0 pointer-events-none",
                colors: [
                  [59, 130, 246],
                  [139, 92, 246]
                ],
                dotSize: 3
              }
            )
          }
        ),
        children
      ]
    }
  );
};

// entry.jsx
import React3 from "react";

// registry:components/card-spotlight-demo.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function CardSpotlightDemo() {
  return /* @__PURE__ */ jsxs3(CardSpotlight, { className: "h-96 w-96", children: [
    /* @__PURE__ */ jsx3("p", { className: "text-xl font-bold relative z-20 mt-2 text-white", children: "Authentication steps" }),
    /* @__PURE__ */ jsxs3("div", { className: "text-neutral-200 mt-4 relative z-20", children: [
      "Follow these steps to secure your account:",
      /* @__PURE__ */ jsxs3("ul", { className: "list-none  mt-2", children: [
        /* @__PURE__ */ jsx3(Step, { title: "Enter your email address" }),
        /* @__PURE__ */ jsx3(Step, { title: "Create a strong password" }),
        /* @__PURE__ */ jsx3(Step, { title: "Set up two-factor authentication" }),
        /* @__PURE__ */ jsx3(Step, { title: "Verify your identity" })
      ] })
    ] }),
    /* @__PURE__ */ jsx3("p", { className: "text-neutral-300 mt-4 relative z-20 text-sm", children: "Ensuring your account is properly secured helps protect your personal information and data." })
  ] });
}
var Step = ({ title }) => {
  return /* @__PURE__ */ jsxs3("li", { className: "flex gap-2 items-start", children: [
    /* @__PURE__ */ jsx3(CheckIcon, {}),
    /* @__PURE__ */ jsx3("p", { className: "text-white", children: title })
  ] });
};
var CheckIcon = () => {
  return /* @__PURE__ */ jsxs3(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      className: "h-4 w-4 text-blue-500 mt-1 shrink-0",
      children: [
        /* @__PURE__ */ jsx3("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsx3(
          "path",
          {
            d: "M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z",
            fill: "currentColor",
            strokeWidth: "0"
          }
        )
      ]
    }
  );
};

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(CardSpotlightDemo, {}) }) });
}
export {
  CardSpotlight,
  Component as default
};
