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
// Adapted from https://magicui.design/docs/components/retro-grid
// Copyright (c) Magic UI. See licenses/magic.txt for usage terms.
// registry:components/ui/retro-grid.tsx
import { useEffect, useRef, useState } from "react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/retro-grid.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var ANIMATION_DURATION_SECONDS = 15;
var GRID_HEIGHT_RATIO = 3;
var GRID_LINE_ALIGNMENT_OFFSET_PX = 0.5;
var GRID_LINE_ANTIALIAS_MULTIPLIER = 0.9;
var GRID_LINE_WIDTH_PX = 0.92;
var GRID_START_OFFSET_RATIO = -0.5;
var GRID_WIDTH_RATIO = 6;
var GRID_X_OFFSET_RATIO = -2;
var MAX_ANGLE = 89;
var MAX_DEVICE_PIXEL_RATIO = 2;
var MIN_ANGLE = 1;
var PERSPECTIVE_PX = 200;
var FALLBACK_ANIMATION_NAME = "retro-grid-fallback-scroll";
var FALLBACK_STYLES = `
@keyframes ${FALLBACK_ANIMATION_NAME} {
  from {
    transform: translateY(-50%);
  }

  to {
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  [data-retro-grid-scroll="true"] {
    animation: none !important;
    transform: translateY(-50%) !important;
  }
}
`;
var VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;
var FRAGMENT_SHADER_SOURCE = `
#extension GL_OES_standard_derivatives : enable
precision highp float;

uniform vec2 u_container_size;
uniform vec2 u_viewport_size;
uniform vec4 u_line_color;
uniform float u_angle;
uniform float u_cell_size;
uniform float u_device_pixel_ratio;
uniform float u_time;

const float animationDurationSeconds = ${ANIMATION_DURATION_SECONDS.toFixed(1)};
const float gridHeightRatio = ${GRID_HEIGHT_RATIO.toFixed(1)};
const float gridStartOffsetRatio = ${GRID_START_OFFSET_RATIO.toFixed(1)};
const float gridWidthRatio = ${GRID_WIDTH_RATIO.toFixed(1)};
const float gridXOffsetRatio = ${GRID_X_OFFSET_RATIO.toFixed(1)};
const float gridLineAlignmentOffsetPx = ${GRID_LINE_ALIGNMENT_OFFSET_PX.toFixed(1)};
const float gridLineAntialiasMultiplier = ${GRID_LINE_ANTIALIAS_MULTIPLIER.toFixed(1)};
const float horizontalLodLevelOneEndPx = 5.6;
const float horizontalLodLevelOneStartPx = 2.8;
const float horizontalLodLevelTwoEndPx = 3.0;
const float horizontalLodLevelTwoStartPx = 1.4;
const float horizontalCompressionEndPx = 2.8;
const float horizontalCompressionStartPx = 1.2;
const float lineWidthPx = ${GRID_LINE_WIDTH_PX.toFixed(2)};
const float perspectivePx = ${PERSPECTIVE_PX.toFixed(1)};
const float gridTravelRatio = 0.5;
const float verticalCompressionEndPx = 2.6;
const float verticalCompressionStartPx = 1.0;
const float verticalEdgeCompressionEnd = 0.95;
const float verticalEdgeCompressionStart = 0.45;
const float verticalLodLevelEnd = 0.64;
const float verticalLodLevelStart = 0.22;
const float verticalTopCompressionEndCells = 6.0;
const float verticalTopCompressionStartCells = 2.0;

float renderGridLine(
  float wrappedCoord,
  float antiAliasWidth,
  float softnessBoost
) {
  return 1.0 - smoothstep(
    lineWidthPx,
    lineWidthPx + (antiAliasWidth * (1.5 + softnessBoost)),
    wrappedCoord
  );
}

void main() {
  float angle = radians(clamp(u_angle, 1.0, 89.0));
  float sinAngle = sin(angle);
  float cosAngle = cos(angle);
  vec2 screen = vec2(
    (gl_FragCoord.x / u_device_pixel_ratio) - (u_container_size.x * 0.5),
    (u_container_size.y * 0.5) - (gl_FragCoord.y / u_device_pixel_ratio)
  );

  vec3 rayOrigin = vec3(0.0, 0.0, perspectivePx);
  vec3 rayDirection = normalize(vec3(screen, -perspectivePx));
  vec3 planeXAxis = vec3(1.0, 0.0, 0.0);
  vec3 planeYAxis = vec3(0.0, cosAngle, sinAngle);
  vec3 planeNormal = normalize(cross(planeXAxis, planeYAxis));
  float denominator = dot(rayDirection, planeNormal);

  if (abs(denominator) < 0.0001) {
    discard;
  }

  float distanceToPlane = dot(-rayOrigin, planeNormal) / denominator;

  if (distanceToPlane <= 0.0) {
    discard;
  }

  vec3 hitPoint = rayOrigin + (rayDirection * distanceToPlane);
  float localX = hitPoint.x;
  float localY = dot(hitPoint, planeYAxis);
  float gridWidth = u_viewport_size.x * gridWidthRatio;
  float gridHeight = u_viewport_size.y * gridHeightRatio;
  float gridScrollSpeed = (gridHeight * gridTravelRatio) / animationDurationSeconds;
  float patternOffsetY = u_time * gridScrollSpeed;
  float gridLeft = (-0.5 * u_container_size.x) + (gridXOffsetRatio * u_container_size.x);
  float gridTop = (-0.5 * u_container_size.y) + (gridStartOffsetRatio * gridHeight);
  vec2 planePosition = vec2(localX - gridLeft, localY - gridTop);

  if (
    planePosition.x < 0.0 ||
    planePosition.y < 0.0 ||
    planePosition.x > gridWidth ||
    planePosition.y > gridHeight
  ) {
    discard;
  }

  vec2 patternPosition = vec2(planePosition.x, planePosition.y - patternOffsetY);
  vec2 wrapped = mod(
    patternPosition + vec2(gridLineAlignmentOffsetPx),
    u_cell_size
  );
  vec2 patternDerivative = max(fwidth(patternPosition), vec2(0.0001));
  vec2 antiAliasWidth = patternDerivative * gridLineAntialiasMultiplier;
  float horizontalCellSpanPx = u_cell_size / patternDerivative.y;
  float horizontalCompression = 1.0 - smoothstep(
    horizontalCompressionStartPx,
    horizontalCompressionEndPx,
    horizontalCellSpanPx
  );
  float verticalCellSpanPx = u_cell_size / patternDerivative.x;
  float sideDistance = abs((planePosition.x / gridWidth) * 2.0 - 1.0);
  float verticalEdgeCompression = smoothstep(
    verticalEdgeCompressionStart,
    verticalEdgeCompressionEnd,
    sideDistance
  );
  float verticalTopCompression = 1.0 - smoothstep(
    u_cell_size * verticalTopCompressionStartCells,
    u_cell_size * verticalTopCompressionEndCells,
    planePosition.y
  );
  float verticalCompression =
    (1.0 - smoothstep(
      verticalCompressionStartPx,
      verticalCompressionEndPx,
      verticalCellSpanPx
    )) * verticalEdgeCompression * verticalTopCompression;
  float horizontalSoftnessBoost = 1.0 + (horizontalCompression * 3.0);
  float verticalSoftnessBoost = 1.0 + (verticalCompression * 3.5);
  float verticalLod = smoothstep(
    verticalLodLevelStart,
    verticalLodLevelEnd,
    verticalCompression
  );
  float verticalLineFine = renderGridLine(
    wrapped.x,
    antiAliasWidth.x,
    verticalSoftnessBoost
  );
  float verticalWrappedLod = mod(
    patternPosition.x + gridLineAlignmentOffsetPx,
    u_cell_size * 2.0
  );
  float verticalLineCoarse = renderGridLine(
    verticalWrappedLod,
    antiAliasWidth.x,
    verticalSoftnessBoost + verticalLod
  );
  float verticalLine = max(
    verticalLineFine * (1.0 - verticalLod),
    verticalLineCoarse * verticalLod
  );
  float horizontalLodLevelOne = 1.0 - smoothstep(
    horizontalLodLevelOneStartPx,
    horizontalLodLevelOneEndPx,
    horizontalCellSpanPx
  );
  float horizontalLodLevelTwo = 1.0 - smoothstep(
    horizontalLodLevelTwoStartPx,
    horizontalLodLevelTwoEndPx,
    horizontalCellSpanPx
  );
  float horizontalLineFine = renderGridLine(
    wrapped.y,
    antiAliasWidth.y,
    horizontalSoftnessBoost
  );
  float horizontalWrappedLodOne = mod(
    patternPosition.y + gridLineAlignmentOffsetPx,
    u_cell_size * 2.0
  );
  float horizontalWrappedLodTwo = mod(
    patternPosition.y + gridLineAlignmentOffsetPx,
    u_cell_size * 4.0
  );
  float horizontalLineCoarse = renderGridLine(
    horizontalWrappedLodOne,
    antiAliasWidth.y,
    horizontalSoftnessBoost + horizontalLodLevelOne
  );
  float horizontalLineExtraCoarse = renderGridLine(
    horizontalWrappedLodTwo,
    antiAliasWidth.y,
    horizontalSoftnessBoost + horizontalLodLevelOne + horizontalLodLevelTwo
  );
  float horizontalLineReduced = max(
    horizontalLineFine * (1.0 - horizontalLodLevelOne),
    horizontalLineCoarse * horizontalLodLevelOne
  );
  float horizontalLine = max(
    horizontalLineReduced * (1.0 - horizontalLodLevelTwo),
    horizontalLineExtraCoarse * horizontalLodLevelTwo
  );
  float line = max(verticalLine, horizontalLine);

  if (line <= 0.001) {
    discard;
  }

  float alpha = u_line_color.a * line;
  gl_FragColor = vec4(u_line_color.rgb * alpha, alpha);
}
`;
var colorResolveContext;
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) {
    return null;
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  }
  gl.deleteShader(shader);
  return null;
}
function createProgram(gl) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    FRAGMENT_SHADER_SOURCE
  );
  if (!vertexShader || !fragmentShader) {
    return null;
  }
  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return program;
  }
  gl.deleteProgram(program);
  return null;
}
function getProgramInfo(gl, program) {
  const attributeLocation = gl.getAttribLocation(program, "a_position");
  const angle = gl.getUniformLocation(program, "u_angle");
  const cellSize = gl.getUniformLocation(program, "u_cell_size");
  const containerSize = gl.getUniformLocation(program, "u_container_size");
  const devicePixelRatio = gl.getUniformLocation(
    program,
    "u_device_pixel_ratio"
  );
  const lineColor = gl.getUniformLocation(program, "u_line_color");
  const time = gl.getUniformLocation(program, "u_time");
  const viewportSize = gl.getUniformLocation(program, "u_viewport_size");
  if (attributeLocation < 0 || !angle || !cellSize || !containerSize || !devicePixelRatio || !lineColor || !time || !viewportSize) {
    return null;
  }
  return {
    attributeLocation,
    program,
    uniforms: {
      angle,
      cellSize,
      containerSize,
      devicePixelRatio,
      lineColor,
      time,
      viewportSize
    }
  };
}
function isDarkMode(colorScheme) {
  const root = document.documentElement;
  if (root.classList.contains("dark")) {
    return true;
  }
  if (root.classList.contains("light")) {
    return false;
  }
  return colorScheme.matches;
}
function getColorResolveContext() {
  if (colorResolveContext !== void 0) {
    return colorResolveContext;
  }
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  colorResolveContext = canvas.getContext("2d", {
    willReadFrequently: true
  });
  return colorResolveContext;
}
function resolveLineColor(color, element) {
  const resolver = document.createElement("span");
  resolver.style.color = color;
  resolver.style.opacity = "0";
  resolver.style.pointerEvents = "none";
  resolver.style.position = "absolute";
  element.appendChild(resolver);
  const resolvedColor = getComputedStyle(resolver).color;
  resolver.remove();
  const context = getColorResolveContext();
  if (!context) {
    return new Float32Array([0.5, 0.5, 0.5, 1]);
  }
  context.clearRect(0, 0, 1, 1);
  context.fillStyle = resolvedColor;
  context.fillRect(0, 0, 1, 1);
  const pixel = context.getImageData(0, 0, 1, 1).data;
  return new Float32Array([
    pixel[0] / 255,
    pixel[1] / 255,
    pixel[2] / 255,
    pixel[3] / 255
  ]);
}
function createFallbackGridStyle(cellSize, lineColor) {
  return {
    animation: `${FALLBACK_ANIMATION_NAME} ${ANIMATION_DURATION_SECONDS}s linear infinite`,
    backgroundImage: `linear-gradient(to right, ${lineColor} 1px, transparent 0), linear-gradient(to bottom, ${lineColor} 1px, transparent 0)`,
    backgroundRepeat: "repeat",
    backgroundSize: `${cellSize}px ${cellSize}px`,
    transform: "translateY(-50%)"
  };
}
function RetroGrid({
  className,
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "gray",
  darkLineColor = "gray",
  style,
  ...props
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isWebGlReady, setIsWebGlReady] = useState(false);
  const angleRef = useRef(angle);
  const cellSizeRef = useRef(cellSize);
  const darkLineColorRef = useRef(darkLineColor);
  const lightLineColorRef = useRef(lightLineColor);
  const syncSceneRef = useRef(null);
  useEffect(() => {
    angleRef.current = angle;
    cellSizeRef.current = cellSize;
    darkLineColorRef.current = darkLineColor;
    lightLineColorRef.current = lightLineColor;
    syncSceneRef.current?.();
  }, [angle, cellSize, darkLineColor, lightLineColor]);
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) {
      return;
    }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    let animationFrameId = null;
    let currentWidth = 0;
    let currentHeight = 0;
    let currentDevicePixelRatio = 1;
    let gl = null;
    let isVisible = true;
    let isContextLost = false;
    let lineColor = resolveLineColor(lightLineColorRef.current, container);
    let positionBuffer = null;
    let programInfo = null;
    const getContext = () => {
      const nextGl = canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        premultipliedAlpha: true
      });
      if (!nextGl || !nextGl.getExtension("OES_standard_derivatives")) {
        return null;
      }
      return nextGl;
    };
    const releasePipeline = (shouldDeleteResources) => {
      if (shouldDeleteResources && gl) {
        if (positionBuffer) {
          gl.deleteBuffer(positionBuffer);
        }
        if (programInfo) {
          gl.deleteProgram(programInfo.program);
        }
      }
      positionBuffer = null;
      programInfo = null;
      if (shouldDeleteResources) {
        gl = null;
      }
    };
    const initializePipeline = () => {
      const nextGl = getContext();
      if (!nextGl) {
        releasePipeline(false);
        return false;
      }
      gl = nextGl;
      releasePipeline(true);
      gl = nextGl;
      const program = createProgram(nextGl);
      if (!program) {
        return false;
      }
      const nextProgramInfo = getProgramInfo(nextGl, program);
      if (!nextProgramInfo) {
        nextGl.deleteProgram(program);
        return false;
      }
      const nextPositionBuffer = nextGl.createBuffer();
      if (!nextPositionBuffer) {
        nextGl.deleteProgram(program);
        return false;
      }
      nextGl.bindBuffer(nextGl.ARRAY_BUFFER, nextPositionBuffer);
      nextGl.bufferData(
        nextGl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        nextGl.STATIC_DRAW
      );
      positionBuffer = nextPositionBuffer;
      programInfo = nextProgramInfo;
      return true;
    };
    const updateLineColor = () => {
      const activeColor = isDarkMode(colorScheme) ? darkLineColorRef.current : lightLineColorRef.current;
      lineColor = resolveLineColor(activeColor, container);
    };
    const resizeCanvas = () => {
      currentWidth = Math.floor(container.clientWidth);
      currentHeight = Math.floor(container.clientHeight);
      if (currentWidth === 0 || currentHeight === 0 || !gl) {
        return;
      }
      currentDevicePixelRatio = Math.min(
        window.devicePixelRatio || 1,
        MAX_DEVICE_PIXEL_RATIO
      );
      canvas.width = Math.floor(currentWidth * currentDevicePixelRatio);
      canvas.height = Math.floor(currentHeight * currentDevicePixelRatio);
      canvas.style.width = `${currentWidth}px`;
      canvas.style.height = `${currentHeight}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const draw = (timestamp) => {
      if (currentWidth === 0 || currentHeight === 0 || !gl || !positionBuffer || !programInfo || isContextLost) {
        return;
      }
      gl.useProgram(programInfo.program);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(programInfo.attributeLocation);
      gl.vertexAttribPointer(
        programInfo.attributeLocation,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(
        programInfo.uniforms.angle,
        clamp(angleRef.current, MIN_ANGLE, MAX_ANGLE)
      );
      gl.uniform1f(
        programInfo.uniforms.cellSize,
        Math.max(cellSizeRef.current, 1)
      );
      gl.uniform2f(
        programInfo.uniforms.containerSize,
        currentWidth,
        currentHeight
      );
      gl.uniform1f(
        programInfo.uniforms.devicePixelRatio,
        currentDevicePixelRatio
      );
      gl.uniform4fv(programInfo.uniforms.lineColor, lineColor);
      gl.uniform1f(
        programInfo.uniforms.time,
        reducedMotion.matches ? 0 : timestamp / 1e3
      );
      gl.uniform2f(
        programInfo.uniforms.viewportSize,
        window.innerWidth,
        window.innerHeight
      );
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const stopAnimation = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };
    const frame = (timestamp) => {
      draw(timestamp);
      if (!reducedMotion.matches && isVisible) {
        animationFrameId = requestAnimationFrame(frame);
        return;
      }
      animationFrameId = null;
    };
    const syncScene = () => {
      if (isContextLost) {
        stopAnimation();
        setIsWebGlReady(false);
        return;
      }
      if (!gl || !positionBuffer || !programInfo) {
        if (!initializePipeline()) {
          stopAnimation();
          setIsWebGlReady(false);
          return;
        }
      }
      resizeCanvas();
      if (currentWidth === 0 || currentHeight === 0) {
        stopAnimation();
        return;
      }
      updateLineColor();
      draw(performance.now());
      setIsWebGlReady(true);
      if (reducedMotion.matches || !isVisible) {
        stopAnimation();
        return;
      }
      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(frame);
      }
    };
    syncSceneRef.current = syncScene;
    const resizeObserver = new ResizeObserver(() => {
      syncScene();
    });
    resizeObserver.observe(container);
    const handleWindowResize = () => {
      syncScene();
    };
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? false;
      if (isVisible) {
        syncScene();
        return;
      }
      stopAnimation();
    });
    intersectionObserver.observe(container);
    const themeObserver = new MutationObserver(() => {
      syncScene();
    });
    themeObserver.observe(document.documentElement, {
      attributeFilter: ["class"],
      attributes: true
    });
    const handleMotionChange = () => {
      syncScene();
    };
    const handleColorSchemeChange = () => {
      syncScene();
    };
    const handleContextLost = (event) => {
      event.preventDefault();
      isContextLost = true;
      stopAnimation();
      releasePipeline(false);
      setIsWebGlReady(false);
    };
    const handleContextRestored = () => {
      isContextLost = false;
      syncScene();
    };
    reducedMotion.addEventListener("change", handleMotionChange);
    colorScheme.addEventListener("change", handleColorSchemeChange);
    window.addEventListener("resize", handleWindowResize);
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);
    syncScene();
    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      reducedMotion.removeEventListener("change", handleMotionChange);
      colorScheme.removeEventListener("change", handleColorSchemeChange);
      window.removeEventListener("resize", handleWindowResize);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      syncSceneRef.current = null;
      releasePipeline(!isContextLost);
    };
  }, []);
  const gridStyles = {
    ...style,
    opacity
  };
  const normalizedAngle = clamp(angle, MIN_ANGLE, MAX_ANGLE);
  const normalizedCellSize = Math.max(cellSize, 1);
  const fallbackProjectionStyles = {
    perspective: `${PERSPECTIVE_PX}px`
  };
  const fallbackRotationStyles = {
    transform: `rotateX(${normalizedAngle}deg)`
  };
  const lightFallbackGridStyles = createFallbackGridStyle(
    normalizedCellSize,
    lightLineColor
  );
  const darkFallbackGridStyles = createFallbackGridStyle(
    normalizedCellSize,
    darkLineColor
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: cn(
        "pointer-events-none absolute size-full overflow-hidden",
        className
      ),
      style: gridStyles,
      ...props,
      children: [
        /* @__PURE__ */ jsx("style", { children: FALLBACK_STYLES }),
        !isWebGlReady ? /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: fallbackProjectionStyles, children: /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", style: fallbackRotationStyles, children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              "data-retro-grid-scroll": "true",
              className: "absolute inset-[0%_0px] ml-[-200%] h-[300vh] w-[600vw] origin-[100%_0_0] dark:hidden",
              style: lightFallbackGridStyles
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              "data-retro-grid-scroll": "true",
              className: "absolute inset-[0%_0px] ml-[-200%] hidden h-[300vh] w-[600vw] origin-[100%_0_0] dark:block",
              style: darkFallbackGridStyles
            }
          )
        ] }) }) : null,
        /* @__PURE__ */ jsx(
          "canvas",
          {
            ref: canvasRef,
            className: cn(
              "absolute inset-0 size-full",
              isWebGlReady ? "opacity-100" : "opacity-0"
            )
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-linear-to-t from-white to-transparent to-90% dark:from-black" })
      ]
    }
  );
}

// entry.jsx
import React from "react";

// registry:retro-grid.tsx
import { useEffect as useEffect2, useRef as useRef2, useState as useState2 } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ANIMATION_DURATION_SECONDS2 = 15;
var GRID_HEIGHT_RATIO2 = 3;
var GRID_LINE_ALIGNMENT_OFFSET_PX2 = 0.5;
var GRID_LINE_ANTIALIAS_MULTIPLIER2 = 0.9;
var GRID_LINE_WIDTH_PX2 = 0.92;
var GRID_START_OFFSET_RATIO2 = -0.5;
var GRID_WIDTH_RATIO2 = 6;
var GRID_X_OFFSET_RATIO2 = -2;
var MAX_ANGLE2 = 89;
var MAX_DEVICE_PIXEL_RATIO2 = 2;
var MIN_ANGLE2 = 1;
var PERSPECTIVE_PX2 = 200;
var FALLBACK_ANIMATION_NAME2 = "retro-grid-fallback-scroll";
var FALLBACK_STYLES2 = `
@keyframes ${FALLBACK_ANIMATION_NAME2} {
  from {
    transform: translateY(-50%);
  }

  to {
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  [data-retro-grid-scroll="true"] {
    animation: none !important;
    transform: translateY(-50%) !important;
  }
}
`;
var VERTEX_SHADER_SOURCE2 = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;
var FRAGMENT_SHADER_SOURCE2 = `
#extension GL_OES_standard_derivatives : enable
precision highp float;

uniform vec2 u_container_size;
uniform vec2 u_viewport_size;
uniform vec4 u_line_color;
uniform float u_angle;
uniform float u_cell_size;
uniform float u_device_pixel_ratio;
uniform float u_time;

const float animationDurationSeconds = ${ANIMATION_DURATION_SECONDS2.toFixed(1)};
const float gridHeightRatio = ${GRID_HEIGHT_RATIO2.toFixed(1)};
const float gridStartOffsetRatio = ${GRID_START_OFFSET_RATIO2.toFixed(1)};
const float gridWidthRatio = ${GRID_WIDTH_RATIO2.toFixed(1)};
const float gridXOffsetRatio = ${GRID_X_OFFSET_RATIO2.toFixed(1)};
const float gridLineAlignmentOffsetPx = ${GRID_LINE_ALIGNMENT_OFFSET_PX2.toFixed(1)};
const float gridLineAntialiasMultiplier = ${GRID_LINE_ANTIALIAS_MULTIPLIER2.toFixed(1)};
const float horizontalLodLevelOneEndPx = 5.6;
const float horizontalLodLevelOneStartPx = 2.8;
const float horizontalLodLevelTwoEndPx = 3.0;
const float horizontalLodLevelTwoStartPx = 1.4;
const float horizontalCompressionEndPx = 2.8;
const float horizontalCompressionStartPx = 1.2;
const float lineWidthPx = ${GRID_LINE_WIDTH_PX2.toFixed(2)};
const float perspectivePx = ${PERSPECTIVE_PX2.toFixed(1)};
const float gridTravelRatio = 0.5;
const float verticalCompressionEndPx = 2.6;
const float verticalCompressionStartPx = 1.0;
const float verticalEdgeCompressionEnd = 0.95;
const float verticalEdgeCompressionStart = 0.45;
const float verticalLodLevelEnd = 0.64;
const float verticalLodLevelStart = 0.22;
const float verticalTopCompressionEndCells = 6.0;
const float verticalTopCompressionStartCells = 2.0;

float renderGridLine(
  float wrappedCoord,
  float antiAliasWidth,
  float softnessBoost
) {
  return 1.0 - smoothstep(
    lineWidthPx,
    lineWidthPx + (antiAliasWidth * (1.5 + softnessBoost)),
    wrappedCoord
  );
}

void main() {
  float angle = radians(clamp(u_angle, 1.0, 89.0));
  float sinAngle = sin(angle);
  float cosAngle = cos(angle);
  vec2 screen = vec2(
    (gl_FragCoord.x / u_device_pixel_ratio) - (u_container_size.x * 0.5),
    (u_container_size.y * 0.5) - (gl_FragCoord.y / u_device_pixel_ratio)
  );

  vec3 rayOrigin = vec3(0.0, 0.0, perspectivePx);
  vec3 rayDirection = normalize(vec3(screen, -perspectivePx));
  vec3 planeXAxis = vec3(1.0, 0.0, 0.0);
  vec3 planeYAxis = vec3(0.0, cosAngle, sinAngle);
  vec3 planeNormal = normalize(cross(planeXAxis, planeYAxis));
  float denominator = dot(rayDirection, planeNormal);

  if (abs(denominator) < 0.0001) {
    discard;
  }

  float distanceToPlane = dot(-rayOrigin, planeNormal) / denominator;

  if (distanceToPlane <= 0.0) {
    discard;
  }

  vec3 hitPoint = rayOrigin + (rayDirection * distanceToPlane);
  float localX = hitPoint.x;
  float localY = dot(hitPoint, planeYAxis);
  float gridWidth = u_viewport_size.x * gridWidthRatio;
  float gridHeight = u_viewport_size.y * gridHeightRatio;
  float gridScrollSpeed = (gridHeight * gridTravelRatio) / animationDurationSeconds;
  float patternOffsetY = u_time * gridScrollSpeed;
  float gridLeft = (-0.5 * u_container_size.x) + (gridXOffsetRatio * u_container_size.x);
  float gridTop = (-0.5 * u_container_size.y) + (gridStartOffsetRatio * gridHeight);
  vec2 planePosition = vec2(localX - gridLeft, localY - gridTop);

  if (
    planePosition.x < 0.0 ||
    planePosition.y < 0.0 ||
    planePosition.x > gridWidth ||
    planePosition.y > gridHeight
  ) {
    discard;
  }

  vec2 patternPosition = vec2(planePosition.x, planePosition.y - patternOffsetY);
  vec2 wrapped = mod(
    patternPosition + vec2(gridLineAlignmentOffsetPx),
    u_cell_size
  );
  vec2 patternDerivative = max(fwidth(patternPosition), vec2(0.0001));
  vec2 antiAliasWidth = patternDerivative * gridLineAntialiasMultiplier;
  float horizontalCellSpanPx = u_cell_size / patternDerivative.y;
  float horizontalCompression = 1.0 - smoothstep(
    horizontalCompressionStartPx,
    horizontalCompressionEndPx,
    horizontalCellSpanPx
  );
  float verticalCellSpanPx = u_cell_size / patternDerivative.x;
  float sideDistance = abs((planePosition.x / gridWidth) * 2.0 - 1.0);
  float verticalEdgeCompression = smoothstep(
    verticalEdgeCompressionStart,
    verticalEdgeCompressionEnd,
    sideDistance
  );
  float verticalTopCompression = 1.0 - smoothstep(
    u_cell_size * verticalTopCompressionStartCells,
    u_cell_size * verticalTopCompressionEndCells,
    planePosition.y
  );
  float verticalCompression =
    (1.0 - smoothstep(
      verticalCompressionStartPx,
      verticalCompressionEndPx,
      verticalCellSpanPx
    )) * verticalEdgeCompression * verticalTopCompression;
  float horizontalSoftnessBoost = 1.0 + (horizontalCompression * 3.0);
  float verticalSoftnessBoost = 1.0 + (verticalCompression * 3.5);
  float verticalLod = smoothstep(
    verticalLodLevelStart,
    verticalLodLevelEnd,
    verticalCompression
  );
  float verticalLineFine = renderGridLine(
    wrapped.x,
    antiAliasWidth.x,
    verticalSoftnessBoost
  );
  float verticalWrappedLod = mod(
    patternPosition.x + gridLineAlignmentOffsetPx,
    u_cell_size * 2.0
  );
  float verticalLineCoarse = renderGridLine(
    verticalWrappedLod,
    antiAliasWidth.x,
    verticalSoftnessBoost + verticalLod
  );
  float verticalLine = max(
    verticalLineFine * (1.0 - verticalLod),
    verticalLineCoarse * verticalLod
  );
  float horizontalLodLevelOne = 1.0 - smoothstep(
    horizontalLodLevelOneStartPx,
    horizontalLodLevelOneEndPx,
    horizontalCellSpanPx
  );
  float horizontalLodLevelTwo = 1.0 - smoothstep(
    horizontalLodLevelTwoStartPx,
    horizontalLodLevelTwoEndPx,
    horizontalCellSpanPx
  );
  float horizontalLineFine = renderGridLine(
    wrapped.y,
    antiAliasWidth.y,
    horizontalSoftnessBoost
  );
  float horizontalWrappedLodOne = mod(
    patternPosition.y + gridLineAlignmentOffsetPx,
    u_cell_size * 2.0
  );
  float horizontalWrappedLodTwo = mod(
    patternPosition.y + gridLineAlignmentOffsetPx,
    u_cell_size * 4.0
  );
  float horizontalLineCoarse = renderGridLine(
    horizontalWrappedLodOne,
    antiAliasWidth.y,
    horizontalSoftnessBoost + horizontalLodLevelOne
  );
  float horizontalLineExtraCoarse = renderGridLine(
    horizontalWrappedLodTwo,
    antiAliasWidth.y,
    horizontalSoftnessBoost + horizontalLodLevelOne + horizontalLodLevelTwo
  );
  float horizontalLineReduced = max(
    horizontalLineFine * (1.0 - horizontalLodLevelOne),
    horizontalLineCoarse * horizontalLodLevelOne
  );
  float horizontalLine = max(
    horizontalLineReduced * (1.0 - horizontalLodLevelTwo),
    horizontalLineExtraCoarse * horizontalLodLevelTwo
  );
  float line = max(verticalLine, horizontalLine);

  if (line <= 0.001) {
    discard;
  }

  float alpha = u_line_color.a * line;
  gl_FragColor = vec4(u_line_color.rgb * alpha, alpha);
}
`;
var colorResolveContext2;
function clamp2(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
function createShader2(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) {
    return null;
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  }
  gl.deleteShader(shader);
  return null;
}
function createProgram2(gl) {
  const vertexShader = createShader2(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE2);
  const fragmentShader = createShader2(
    gl,
    gl.FRAGMENT_SHADER,
    FRAGMENT_SHADER_SOURCE2
  );
  if (!vertexShader || !fragmentShader) {
    return null;
  }
  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return program;
  }
  gl.deleteProgram(program);
  return null;
}
function getProgramInfo2(gl, program) {
  const attributeLocation = gl.getAttribLocation(program, "a_position");
  const angle = gl.getUniformLocation(program, "u_angle");
  const cellSize = gl.getUniformLocation(program, "u_cell_size");
  const containerSize = gl.getUniformLocation(program, "u_container_size");
  const devicePixelRatio = gl.getUniformLocation(
    program,
    "u_device_pixel_ratio"
  );
  const lineColor = gl.getUniformLocation(program, "u_line_color");
  const time = gl.getUniformLocation(program, "u_time");
  const viewportSize = gl.getUniformLocation(program, "u_viewport_size");
  if (attributeLocation < 0 || !angle || !cellSize || !containerSize || !devicePixelRatio || !lineColor || !time || !viewportSize) {
    return null;
  }
  return {
    attributeLocation,
    program,
    uniforms: {
      angle,
      cellSize,
      containerSize,
      devicePixelRatio,
      lineColor,
      time,
      viewportSize
    }
  };
}
function isDarkMode2(colorScheme) {
  const root = document.documentElement;
  if (root.classList.contains("dark")) {
    return true;
  }
  if (root.classList.contains("light")) {
    return false;
  }
  return colorScheme.matches;
}
function getColorResolveContext2() {
  if (colorResolveContext2 !== void 0) {
    return colorResolveContext2;
  }
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  colorResolveContext2 = canvas.getContext("2d", {
    willReadFrequently: true
  });
  return colorResolveContext2;
}
function resolveLineColor2(color, element) {
  const resolver = document.createElement("span");
  resolver.style.color = color;
  resolver.style.opacity = "0";
  resolver.style.pointerEvents = "none";
  resolver.style.position = "absolute";
  element.appendChild(resolver);
  const resolvedColor = getComputedStyle(resolver).color;
  resolver.remove();
  const context = getColorResolveContext2();
  if (!context) {
    return new Float32Array([0.5, 0.5, 0.5, 1]);
  }
  context.clearRect(0, 0, 1, 1);
  context.fillStyle = resolvedColor;
  context.fillRect(0, 0, 1, 1);
  const pixel = context.getImageData(0, 0, 1, 1).data;
  return new Float32Array([
    pixel[0] / 255,
    pixel[1] / 255,
    pixel[2] / 255,
    pixel[3] / 255
  ]);
}
function createFallbackGridStyle2(cellSize, lineColor) {
  return {
    animation: `${FALLBACK_ANIMATION_NAME2} ${ANIMATION_DURATION_SECONDS2}s linear infinite`,
    backgroundImage: `linear-gradient(to right, ${lineColor} 1px, transparent 0), linear-gradient(to bottom, ${lineColor} 1px, transparent 0)`,
    backgroundRepeat: "repeat",
    backgroundSize: `${cellSize}px ${cellSize}px`,
    transform: "translateY(-50%)"
  };
}
function RetroGrid2({
  className,
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "gray",
  darkLineColor = "gray",
  style,
  ...props
}) {
  const canvasRef = useRef2(null);
  const containerRef = useRef2(null);
  const [isWebGlReady, setIsWebGlReady] = useState2(false);
  const angleRef = useRef2(angle);
  const cellSizeRef = useRef2(cellSize);
  const darkLineColorRef = useRef2(darkLineColor);
  const lightLineColorRef = useRef2(lightLineColor);
  const syncSceneRef = useRef2(null);
  useEffect2(() => {
    angleRef.current = angle;
    cellSizeRef.current = cellSize;
    darkLineColorRef.current = darkLineColor;
    lightLineColorRef.current = lightLineColor;
    syncSceneRef.current?.();
  }, [angle, cellSize, darkLineColor, lightLineColor]);
  useEffect2(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) {
      return;
    }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    let animationFrameId = null;
    let currentWidth = 0;
    let currentHeight = 0;
    let currentDevicePixelRatio = 1;
    let gl = null;
    let isVisible = true;
    let isContextLost = false;
    let lineColor = resolveLineColor2(lightLineColorRef.current, container);
    let positionBuffer = null;
    let programInfo = null;
    const getContext = () => {
      const nextGl = canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        premultipliedAlpha: true
      });
      if (!nextGl || !nextGl.getExtension("OES_standard_derivatives")) {
        return null;
      }
      return nextGl;
    };
    const releasePipeline = (shouldDeleteResources) => {
      if (shouldDeleteResources && gl) {
        if (positionBuffer) {
          gl.deleteBuffer(positionBuffer);
        }
        if (programInfo) {
          gl.deleteProgram(programInfo.program);
        }
      }
      positionBuffer = null;
      programInfo = null;
      if (shouldDeleteResources) {
        gl = null;
      }
    };
    const initializePipeline = () => {
      const nextGl = getContext();
      if (!nextGl) {
        releasePipeline(false);
        return false;
      }
      gl = nextGl;
      releasePipeline(true);
      gl = nextGl;
      const program = createProgram2(nextGl);
      if (!program) {
        return false;
      }
      const nextProgramInfo = getProgramInfo2(nextGl, program);
      if (!nextProgramInfo) {
        nextGl.deleteProgram(program);
        return false;
      }
      const nextPositionBuffer = nextGl.createBuffer();
      if (!nextPositionBuffer) {
        nextGl.deleteProgram(program);
        return false;
      }
      nextGl.bindBuffer(nextGl.ARRAY_BUFFER, nextPositionBuffer);
      nextGl.bufferData(
        nextGl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        nextGl.STATIC_DRAW
      );
      positionBuffer = nextPositionBuffer;
      programInfo = nextProgramInfo;
      return true;
    };
    const updateLineColor = () => {
      const activeColor = isDarkMode2(colorScheme) ? darkLineColorRef.current : lightLineColorRef.current;
      lineColor = resolveLineColor2(activeColor, container);
    };
    const resizeCanvas = () => {
      currentWidth = Math.floor(container.clientWidth);
      currentHeight = Math.floor(container.clientHeight);
      if (currentWidth === 0 || currentHeight === 0 || !gl) {
        return;
      }
      currentDevicePixelRatio = Math.min(
        window.devicePixelRatio || 1,
        MAX_DEVICE_PIXEL_RATIO2
      );
      canvas.width = Math.floor(currentWidth * currentDevicePixelRatio);
      canvas.height = Math.floor(currentHeight * currentDevicePixelRatio);
      canvas.style.width = `${currentWidth}px`;
      canvas.style.height = `${currentHeight}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const draw = (timestamp) => {
      if (currentWidth === 0 || currentHeight === 0 || !gl || !positionBuffer || !programInfo || isContextLost) {
        return;
      }
      gl.useProgram(programInfo.program);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(programInfo.attributeLocation);
      gl.vertexAttribPointer(
        programInfo.attributeLocation,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(
        programInfo.uniforms.angle,
        clamp2(angleRef.current, MIN_ANGLE2, MAX_ANGLE2)
      );
      gl.uniform1f(
        programInfo.uniforms.cellSize,
        Math.max(cellSizeRef.current, 1)
      );
      gl.uniform2f(
        programInfo.uniforms.containerSize,
        currentWidth,
        currentHeight
      );
      gl.uniform1f(
        programInfo.uniforms.devicePixelRatio,
        currentDevicePixelRatio
      );
      gl.uniform4fv(programInfo.uniforms.lineColor, lineColor);
      gl.uniform1f(
        programInfo.uniforms.time,
        reducedMotion.matches ? 0 : timestamp / 1e3
      );
      gl.uniform2f(
        programInfo.uniforms.viewportSize,
        window.innerWidth,
        window.innerHeight
      );
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const stopAnimation = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };
    const frame = (timestamp) => {
      draw(timestamp);
      if (!reducedMotion.matches && isVisible) {
        animationFrameId = requestAnimationFrame(frame);
        return;
      }
      animationFrameId = null;
    };
    const syncScene = () => {
      if (isContextLost) {
        stopAnimation();
        setIsWebGlReady(false);
        return;
      }
      if (!gl || !positionBuffer || !programInfo) {
        if (!initializePipeline()) {
          stopAnimation();
          setIsWebGlReady(false);
          return;
        }
      }
      resizeCanvas();
      if (currentWidth === 0 || currentHeight === 0) {
        stopAnimation();
        return;
      }
      updateLineColor();
      draw(performance.now());
      setIsWebGlReady(true);
      if (reducedMotion.matches || !isVisible) {
        stopAnimation();
        return;
      }
      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(frame);
      }
    };
    syncSceneRef.current = syncScene;
    const resizeObserver = new ResizeObserver(() => {
      syncScene();
    });
    resizeObserver.observe(container);
    const handleWindowResize = () => {
      syncScene();
    };
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? false;
      if (isVisible) {
        syncScene();
        return;
      }
      stopAnimation();
    });
    intersectionObserver.observe(container);
    const themeObserver = new MutationObserver(() => {
      syncScene();
    });
    themeObserver.observe(document.documentElement, {
      attributeFilter: ["class"],
      attributes: true
    });
    const handleMotionChange = () => {
      syncScene();
    };
    const handleColorSchemeChange = () => {
      syncScene();
    };
    const handleContextLost = (event) => {
      event.preventDefault();
      isContextLost = true;
      stopAnimation();
      releasePipeline(false);
      setIsWebGlReady(false);
    };
    const handleContextRestored = () => {
      isContextLost = false;
      syncScene();
    };
    reducedMotion.addEventListener("change", handleMotionChange);
    colorScheme.addEventListener("change", handleColorSchemeChange);
    window.addEventListener("resize", handleWindowResize);
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);
    syncScene();
    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      reducedMotion.removeEventListener("change", handleMotionChange);
      colorScheme.removeEventListener("change", handleColorSchemeChange);
      window.removeEventListener("resize", handleWindowResize);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      syncSceneRef.current = null;
      releasePipeline(!isContextLost);
    };
  }, []);
  const gridStyles = {
    ...style,
    opacity
  };
  const normalizedAngle = clamp2(angle, MIN_ANGLE2, MAX_ANGLE2);
  const normalizedCellSize = Math.max(cellSize, 1);
  const fallbackProjectionStyles = {
    perspective: `${PERSPECTIVE_PX2}px`
  };
  const fallbackRotationStyles = {
    transform: `rotateX(${normalizedAngle}deg)`
  };
  const lightFallbackGridStyles = createFallbackGridStyle2(
    normalizedCellSize,
    lightLineColor
  );
  const darkFallbackGridStyles = createFallbackGridStyle2(
    normalizedCellSize,
    darkLineColor
  );
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      ref: containerRef,
      className: cn(
        "pointer-events-none absolute size-full overflow-hidden",
        className
      ),
      style: gridStyles,
      ...props,
      children: [
        /* @__PURE__ */ jsx2("style", { children: FALLBACK_STYLES2 }),
        !isWebGlReady ? /* @__PURE__ */ jsx2("div", { className: "absolute inset-0", style: fallbackProjectionStyles, children: /* @__PURE__ */ jsxs2("div", { className: "absolute inset-0", style: fallbackRotationStyles, children: [
          /* @__PURE__ */ jsx2(
            "div",
            {
              "data-retro-grid-scroll": "true",
              className: "absolute inset-[0%_0px] ml-[-200%] h-[300vh] w-[600vw] origin-[100%_0_0] dark:hidden",
              style: lightFallbackGridStyles
            }
          ),
          /* @__PURE__ */ jsx2(
            "div",
            {
              "data-retro-grid-scroll": "true",
              className: "absolute inset-[0%_0px] ml-[-200%] hidden h-[300vh] w-[600vw] origin-[100%_0_0] dark:block",
              style: darkFallbackGridStyles
            }
          )
        ] }) }) : null,
        /* @__PURE__ */ jsx2(
          "canvas",
          {
            ref: canvasRef,
            className: cn(
              "absolute inset-0 size-full",
              isWebGlReady ? "opacity-100" : "opacity-0"
            )
          }
        ),
        /* @__PURE__ */ jsx2("div", { className: "absolute inset-0 bg-linear-to-t from-white to-transparent to-90% dark:from-black" })
      ]
    }
  );
}

// registry:components/ui/retro-grid-demo.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function RetroGridDemo() {
  return /* @__PURE__ */ jsxs3("div", { className: "bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border", children: [
    /* @__PURE__ */ jsx3("span", { className: "pointer-events-none z-10 bg-linear-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl leading-none font-bold tracking-tighter whitespace-pre-wrap text-transparent", children: "Retro Grid" }),
    /* @__PURE__ */ jsx3(RetroGrid2, {})
  ] });
}

// entry.jsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx4("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx4("div", { className: "vendor-content", children: /* @__PURE__ */ jsx4(RetroGridDemo, {}) }) });
}
export {
  RetroGrid,
  Component as default
};
