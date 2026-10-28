// Adapted from https://ui.aceternity.com/components/background-cubes-grid
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/background-cubes-grid.tsx
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { useAnimationFrame, useReducedMotion } from "motion/react";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/background-cubes-grid.tsx
import { jsx } from "react/jsx-runtime";
var SIM_HZ = 120;
var STEP = 1 / SIM_HZ;
var BRUSH_RADIUS = 1.1;
var PUSH_PER_CELL = 0.16;
var isoVertexShader = `
  attribute vec2 aOffset;
  attribute float aHeight;
  attribute float aGlow;
  uniform float uAmplitude;
  varying vec3 vNormal;
  varying float vHeight;
  varying float vGlow;
  varying float vDepth;

  void main() {
    vec3 p = position;
    p.xz += aOffset;
    // Crests round off softly; troughs have no limit and sink deeper than crests rise.
    // The two curves blend smoothly around zero, so cubes never change speed as they pass rest.
    float x = aHeight;
    vHeight = mix( x * 1.5, tanh( x ), smoothstep( -0.6, 0.6, x ) );
    p.y += vHeight * uAmplitude;
    vNormal = normal;
    vGlow = aGlow;
    vDepth = position.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( p, 1.0 );
  }
`;
var isoFragmentShader = `
  uniform vec3 uTop;
  uniform vec3 uLeft;
  uniform vec3 uRight;
  uniform vec3 uGlowColor;
  uniform float uGlow;
  varying vec3 vNormal;
  varying float vHeight;
  varying float vGlow;
  varying float vDepth;

  void main() {
    bool isTop = vNormal.y > 0.5;
    vec3 color = isTop ? uTop : ( abs( vNormal.x ) > 0.5 ? uLeft : uRight );
    // Tops that sink below the surface pick up a little shade so the trough reads.
    if ( isTop ) color = mix( color, uLeft, clamp( -vHeight, 0.0, 1.0 ) * 0.6 );

    // Glow: tops get a soft tint; sides are lit hardest near the rim, like a box-shadow.
    float glow = clamp( vGlow * uGlow, 0.0, 1.0 );
    float falloff = isTop ? 0.2 : exp( vDepth * 1.6 ) * 0.6;
    color = mix( color, uGlowColor, glow * falloff );

    gl_FragColor = vec4( color, 1.0 );
    #include <colorspace_fragment>
  }
`;
function createIsometricScene(canvas, container, options) {
  const {
    cellSize,
    gap,
    topColor,
    leftColor,
    rightColor,
    amplitude,
    speed,
    damping,
    idleRipples,
    idleDelay,
    glowColor,
    glow
  } = options;
  const c2 = Math.min((speed / SIM_HZ) ** 2, 0.5);
  const flowDrag = -Math.log(Math.min(Math.max(damping, 1e-4), 1));
  const settleDrag = -Math.log(0.02);
  const flowPull = 0.8;
  const settlePull = 3.5;
  const SETTLE_AFTER = 0.15;
  const SETTLE_RAMP = 0.8;
  const FLAT = 4e-3;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setClearColor(topColor);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -100, 100);
  camera.position.set(10, 10, 10);
  camera.lookAt(0, 0, 0);
  const material = new THREE.ShaderMaterial({
    vertexShader: isoVertexShader,
    fragmentShader: isoFragmentShader,
    uniforms: {
      uAmplitude: { value: amplitude },
      uTop: { value: new THREE.Color(topColor) },
      uLeft: { value: new THREE.Color(leftColor) },
      uRight: { value: new THREE.Color(rightColor) },
      uGlowColor: { value: new THREE.Color(glowColor) },
      uGlow: { value: glow }
    }
  });
  let size = 0;
  let height = new Float32Array(0);
  let velocity = new Float32Array(0);
  let lastHeight = new Float32Array(0);
  let glowField = new Float32Array(0);
  let geometry = null;
  let heightAttribute = null;
  let glowAttribute = null;
  let mesh = null;
  const build = (count) => {
    if (mesh) scene.remove(mesh);
    geometry?.dispose();
    size = count;
    height = new Float32Array(size * size);
    velocity = new Float32Array(size * size);
    lastHeight = new Float32Array(size * size);
    glowField = new Float32Array(size * size);
    const box = new THREE.BoxGeometry(1 - gap, 16, 1 - gap).translate(0, -8, 0);
    geometry = new THREE.InstancedBufferGeometry();
    geometry.index = box.index;
    geometry.setAttribute("position", box.getAttribute("position"));
    geometry.setAttribute("normal", box.getAttribute("normal"));
    const offsets = new Float32Array(size * size * 2);
    const half = (size - 1) / 2;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        offsets[(i * size + j) * 2] = i - half;
        offsets[(i * size + j) * 2 + 1] = j - half;
      }
    }
    geometry.setAttribute("aOffset", new THREE.InstancedBufferAttribute(offsets, 2));
    heightAttribute = new THREE.InstancedBufferAttribute(new Float32Array(size * size), 1);
    heightAttribute.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute("aHeight", heightAttribute);
    glowAttribute = new THREE.InstancedBufferAttribute(glowField, 1);
    glowAttribute.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute("aGlow", glowAttribute);
    geometry.instanceCount = size * size;
    mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    scene.add(mesh);
  };
  let awake = true;
  const resize = () => {
    const width = container.clientWidth;
    const viewHeight = container.clientHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, viewHeight, false);
    const scale = cellSize / Math.SQRT2;
    camera.left = -width / 2 / scale;
    camera.right = width / 2 / scale;
    camera.top = viewHeight / 2 / scale;
    camera.bottom = -viewHeight / 2 / scale;
    camera.updateProjectionMatrix();
    const needed = Math.ceil((width + viewHeight * 2) / cellSize * 1.1) + 4;
    if (needed > size) build(needed);
    awake = true;
  };
  const brush = (gx, gz, strength, radius = BRUSH_RADIUS) => {
    const reach = Math.ceil(radius * 3);
    const inv = 1 / (2 * radius * radius);
    const ci = Math.round(gx);
    const cj = Math.round(gz);
    for (let i = Math.max(1, ci - reach); i <= Math.min(size - 2, ci + reach); i++) {
      for (let j = Math.max(1, cj - reach); j <= Math.min(size - 2, cj + reach); j++) {
        const dx = i - gx;
        const dz = j - gz;
        velocity[i * size + j] -= strength * Math.exp(-(dx * dx + dz * dz) * inv);
      }
    }
    awake = true;
  };
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const hit = new THREE.Vector3();
  let target = null;
  let brushAt = null;
  let idleTime = 0;
  let quietTime = 0;
  let idleTimer = 0;
  let autoMode = false;
  let lastEnergy = 0;
  const onPointerMove = (e) => {
    const rect = container.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width * 2 - 1;
    const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    if (Math.abs(nx) > 1 || Math.abs(ny) > 1) {
      target = null;
      brushAt = null;
      return;
    }
    pointer.set(nx, ny);
    raycaster.setFromCamera(pointer, camera);
    if (!raycaster.ray.intersectPlane(ground, hit)) return;
    const half = (size - 1) / 2;
    target = { x: hit.x + half, z: hit.z + half };
    idleTime = 0;
    quietTime = 0;
    autoMode = false;
  };
  const applyPointer = () => {
    if (!target) return;
    if (!brushAt) {
      brushAt = { ...target };
      return;
    }
    const dx = target.x - brushAt.x;
    const dz = target.z - brushAt.z;
    const distance = Math.hypot(dx, dz);
    if (distance < 0.01) return;
    const samples = Math.ceil(distance / 0.35);
    const push = Math.min(distance, 3) * PUSH_PER_CELL / samples;
    for (let s = 1; s <= samples; s++) {
      brush(brushAt.x + dx * s / samples, brushAt.z + dz * s / samples, push);
    }
    brushAt = { ...target };
  };
  const step = () => {
    const ramp = autoMode ? 0 : Math.min(Math.max((idleTime - SETTLE_AFTER) / SETTLE_RAMP, 0), 1);
    const s = ramp * ramp * (3 - 2 * ramp);
    const keep = Math.exp(-(flowDrag + (settleDrag - flowDrag) * s) / SIM_HZ);
    const relax = Math.exp(-(flowPull + (settlePull - flowPull) * s) / SIM_HZ);
    lastHeight.set(height);
    for (let i = 1; i < size - 1; i++) {
      for (let j = 1; j < size - 1; j++) {
        const k = i * size + j;
        const edges = height[k - 1] + height[k + 1] + height[k - size] + height[k + size];
        const corners = height[k - size - 1] + height[k - size + 1] + height[k + size - 1] + height[k + size + 1];
        const laplacian = (4 * edges + corners - 20 * height[k]) / 6;
        velocity[k] = (velocity[k] + c2 * laplacian) * keep;
      }
    }
    for (let k = 0; k < height.length; k++) height[k] = (height[k] + velocity[k]) * relax;
    for (let i = 1; i < size - 1; i++) {
      for (let j = 1; j < size - 1; j++) {
        const k = i * size + j;
        const energy = (Math.abs(height[k]) * 4 + Math.abs(height[k - 1]) + Math.abs(height[k + 1]) + Math.abs(height[k - size]) + Math.abs(height[k + size])) / 8;
        glowField[k] += (energy - glowField[k]) * (energy > glowField[k] ? 0.08 : 0.015);
      }
    }
  };
  let accumulator = 0;
  const update = (delta) => {
    if (!heightAttribute || !glowAttribute) return;
    idleTime += delta;
    quietTime = !autoMode && idleTime > SETTLE_AFTER && lastEnergy < FLAT ? quietTime + delta : 0;
    if (idleRipples && !autoMode && quietTime > idleDelay) autoMode = true;
    if (autoMode) {
      idleTimer += delta;
      if (idleTimer > 1.8) {
        idleTimer = 0;
        const spread = size * 0.15;
        brush(
          size / 2 + (Math.random() - 0.5) * spread * 2,
          size / 2 + (Math.random() - 0.5) * spread * 2,
          0.28,
          1.8
        );
      }
    } else {
      idleTimer = 1.8;
    }
    applyPointer();
    if (!awake) {
      lastEnergy = 0;
      return;
    }
    accumulator = Math.min(accumulator + delta, STEP * 8);
    while (accumulator >= STEP) {
      step();
      accumulator -= STEP;
    }
    const alpha = accumulator / STEP;
    const display = heightAttribute.array;
    let wave = 0;
    let light = 0;
    for (let k = 0; k < height.length; k++) {
      display[k] = lastHeight[k] + (height[k] - lastHeight[k]) * alpha;
      wave = Math.max(wave, Math.abs(height[k]), Math.abs(velocity[k]) * 20);
      light = Math.max(light, glowField[k]);
    }
    heightAttribute.needsUpdate = true;
    glowAttribute.needsUpdate = true;
    renderer.render(scene, camera);
    lastEnergy = wave;
    const energy = Math.max(wave, light);
    if (energy < 1e-4) awake = false;
  };
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  window.addEventListener("pointermove", onPointerMove);
  const dispose = () => {
    observer.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    geometry?.dispose();
    material.dispose();
    renderer.dispose();
  };
  return { update, dispose };
}
function IsometricCubes({
  className,
  cellSize = 150,
  gap = 0.025,
  topColor = "#fafaf9",
  leftColor = "#e7e5e4",
  rightColor = "#d6d3d1",
  amplitude = 0.7,
  speed = 7,
  damping = 0.08,
  idleRipples = true,
  idleDelay = 1.5,
  glowColor = "#a8a29e",
  glow = 0.5
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const updateRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const idle = idleRipples && !reduceMotion;
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const { update, dispose } = createIsometricScene(canvasRef.current, containerRef.current, {
      cellSize,
      gap,
      topColor,
      leftColor,
      rightColor,
      amplitude,
      speed,
      damping,
      idleRipples: idle,
      idleDelay,
      glowColor,
      glow
    });
    updateRef.current = update;
    return () => {
      updateRef.current = null;
      dispose();
    };
  }, [cellSize, gap, topColor, leftColor, rightColor, amplitude, speed, damping, idle, idleDelay, glowColor, glow]);
  useAnimationFrame((_, delta) => {
    updateRef.current?.(Math.min(delta / 1e3, 0.1));
  });
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      "aria-hidden": true,
      className: cn("absolute inset-0 overflow-hidden", className),
      style: { backgroundColor: topColor },
      children: /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className: "block h-full w-full" })
    }
  );
}
var MAX_TRAIL = 128;
var CUBE_WIDTH = 0.72;
var CUBE_HEIGHT = 3;
var CAMERA_RADIUS = 12;
var ALPHA_RANGE = Math.PI * 0.03;
var BETA_RANGE = Math.PI * 0.05;
var PERSPECTIVE_WAVE = {
  speed: 6,
  frequency: 1.2,
  width: 3,
  jitter: 0.2,
  fadeTime: 2,
  trailSpacing: 0.1,
  idleStrength: 0.8
};
var VignetteRGBShiftShader = {
  uniforms: {
    tDiffuse: { value: null },
    shiftAmount: { value: 4e-3 },
    vignetteRadius: { value: 0.35 },
    vignetteSoftness: { value: 0.45 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float shiftAmount;
    uniform float vignetteRadius;
    uniform float vignetteSoftness;
    varying vec2 vUv;

    void main() {
      vec2 center = vec2(0.5);
      float dist = distance(vUv, center);
      vec2 dir = sign(vUv - center);
      float vignetteFactor = smoothstep(vignetteRadius, vignetteRadius + vignetteSoftness, dist);
      vec2 shift = dir * shiftAmount * vignetteFactor;
      float r = texture2D(tDiffuse, vUv + shift).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - shift).b;
      gl_FragColor = vec4(vec3(r, g, b) * (1.0 - vignetteFactor * 0.7), 1.0);
    }
  `
};
var overrideVertexShader = (vertexShader) => vertexShader.replace(
  "#include <common>",
  `#include <common>
      varying float vHeight;
      attribute vec2 aOffset;
      uniform sampler2D uTrailTexture;
      uniform int       uTrailCount;
      uniform float     uWaveSpeed;
      uniform float     uWaveFreq;
      uniform float     uWaveWidth;
      uniform float     uFadeTime;
      uniform float     uAmplitude;
      uniform float     uJitter;
      uniform float     uMaxHeight;

      vec2 hash2( vec2 p ) {
        p = vec2(
          dot( p, vec2( 127.1, 311.7 ) ),
          dot( p, vec2( 269.5, 183.3 ) )
        );
        return fract( sin( p ) * 43758.5453123 ) - 0.5;
      }`
).replace(
  "#include <begin_vertex>",
  `#include <begin_vertex>
      vHeight = 0.0;
      if ( position.y > 0.0 ) {
        vec2 worldXZ = aOffset + hash2( aOffset ) * uJitter;
        float waveHeight  = 0.0;
        float totalWeight = 0.0;

        for ( int i = 0; i < uTrailCount; i++ ) {
          vec4 td = texture2D(
            uTrailTexture,
            vec2( ( float(i) + 0.5 ) / ${MAX_TRAIL}.0, 0.5 )
          );
          float dist    = length( worldXZ - td.rg );
          float relDist = dist - uWaveSpeed * td.b;
          float window  = exp( -( relDist * relDist ) / ( uWaveWidth * uWaveWidth ) );
          float fade    = exp( -td.b / uFadeTime );
          float atten   = 1.0 / ( 1.0 + dist * 0.1 );
          float weight  = fade * window * atten * td.a;

          waveHeight  += weight * cos( uWaveFreq * relDist );
          totalWeight += weight;
        }

        waveHeight /= max( totalWeight, 1.0 );

        float displacement = clamp( waveHeight * uAmplitude, -uMaxHeight, uMaxHeight );
        transformed.y += displacement;
        vHeight = displacement;
      }`
);
function createPerspectiveScene(canvas, container, options) {
  const { gridSize, gap, baseColor, waveColor, backgroundColor, glow, amplitude, tilt, idleRipples } = options;
  let width = container.clientWidth;
  let height = container.clientHeight;
  let pixelRatio = Math.min(window.devicePixelRatio, 2);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(backgroundColor);
  scene.fog = new THREE.Fog(backgroundColor, 9, 26);
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 200);
  const mouse = new THREE.Vector2();
  const lerpedMouse = new THREE.Vector2();
  const updateCamera = (mx, my) => {
    const alpha = tilt + my * ALPHA_RANGE;
    const beta = mx * BETA_RANGE;
    camera.position.set(
      -CAMERA_RADIUS * Math.cos(alpha) * Math.sin(beta),
      CAMERA_RADIUS * Math.cos(alpha) * Math.cos(beta),
      CAMERA_RADIUS * Math.sin(alpha)
    );
    camera.up.set(0, 1, 0);
    camera.lookAt(0, 0, 0);
  };
  updateCamera(0, 0);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.setSize(width, height, false);
  renderer.setPixelRatio(pixelRatio);
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new ShaderPass(VignetteRGBShiftShader));
  composer.addPass(new OutputPass());
  composer.setSize(width, height);
  composer.setPixelRatio(pixelRatio);
  scene.add(new THREE.AmbientLight("#ffffff", 0.35));
  const keyLight = new THREE.DirectionalLight("#ffffff", 3);
  keyLight.position.set(-20, 12, -6);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.radius = 6;
  keyLight.shadow.camera.near = 0.1;
  keyLight.shadow.camera.far = 60;
  keyLight.shadow.camera.left = -22;
  keyLight.shadow.camera.right = 22;
  keyLight.shadow.camera.top = 22;
  keyLight.shadow.camera.bottom = -22;
  keyLight.shadow.bias = 1e-4;
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(waveColor, 1.2);
  rimLight.position.set(12, 4, 10);
  scene.add(rimLight);
  const bounds = gridSize * (CUBE_WIDTH + gap);
  const maxHeight = amplitude;
  const trail = [];
  let lastPoint = null;
  let timeSinceLastMove = 0;
  let randomPointTimer = 0;
  let isPlacingRandomPoints = idleRipples;
  const trailData = new Float32Array(MAX_TRAIL * 4);
  const trailTexture = new THREE.DataTexture(
    trailData,
    MAX_TRAIL,
    1,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  trailTexture.needsUpdate = true;
  const trailUniforms = {
    uTrailTexture: { value: trailTexture },
    uTrailCount: { value: 0 },
    uFadeTime: { value: PERSPECTIVE_WAVE.fadeTime }
  };
  const rayPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(bounds, bounds),
    new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, visible: false })
  );
  rayPlane.rotation.x = -Math.PI / 2;
  rayPlane.updateMatrixWorld(true);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const pushPoint = (point) => {
    if (trail.length >= MAX_TRAIL) trail.shift();
    trail.push(point);
  };
  const waveUniforms = () => ({
    ...trailUniforms,
    uWaveSpeed: { value: PERSPECTIVE_WAVE.speed },
    uWaveFreq: { value: PERSPECTIVE_WAVE.frequency },
    uWaveWidth: { value: PERSPECTIVE_WAVE.width },
    uAmplitude: { value: amplitude },
    uJitter: { value: PERSPECTIVE_WAVE.jitter },
    uMaxHeight: { value: maxHeight }
  });
  const count = gridSize * gridSize;
  const geometry = new RoundedBoxGeometry(CUBE_WIDTH, CUBE_HEIGHT, CUBE_WIDTH, 2, 0.12);
  const offsetAttribute = new THREE.InstancedBufferAttribute(
    new Float32Array(count * 2),
    2
  );
  geometry.setAttribute("aOffset", offsetAttribute);
  const material = new THREE.MeshPhongMaterial({ color: 16777215, shininess: 60 });
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, waveUniforms(), {
      uColorBase: { value: new THREE.Color(baseColor) },
      uColorHigh: { value: new THREE.Color(waveColor) },
      uGlow: { value: glow }
    });
    shader.vertexShader = overrideVertexShader(shader.vertexShader);
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <common>",
      `#include <common>
        varying float vHeight;
        uniform vec3  uColorBase;
        uniform vec3  uColorHigh;
        uniform float uMaxHeight;
        uniform float uGlow;`
    ).replace(
      "#include <color_fragment>",
      `#include <color_fragment>
        float crest  = clamp( vHeight / uMaxHeight, 0.0, 1.0 );
        float trough = clamp( -vHeight / uMaxHeight, 0.0, 1.0 );
        diffuseColor.rgb = mix( uColorBase, uColorHigh, crest ) * ( 1.0 - trough * 0.6 );`
    ).replace(
      "#include <emissivemap_fragment>",
      `#include <emissivemap_fragment>
        totalEmissiveRadiance += uColorHigh * crest * crest * uGlow;`
    );
  };
  const depthMaterial = new THREE.MeshDepthMaterial();
  depthMaterial.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, waveUniforms());
    shader.vertexShader = overrideVertexShader(shader.vertexShader);
  };
  const mesh = new THREE.InstancedMesh(geometry, material, count);
  mesh.customDepthMaterial = depthMaterial;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  const dummy = new THREE.Object3D();
  const spacing = CUBE_WIDTH + gap;
  const gridOffset = (gridSize - 1) * spacing / 2;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const index = i * gridSize + j;
      const x = i * spacing - gridOffset;
      const z = j * spacing - gridOffset;
      dummy.position.set(x, 0, z);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
      offsetAttribute.setXY(index, x, z);
    }
  }
  mesh.instanceMatrix.needsUpdate = true;
  offsetAttribute.needsUpdate = true;
  const onPointerMove = (e) => {
    const rect = container.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width * 2 - 1;
    const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    if (Math.abs(nx) > 1 || Math.abs(ny) > 1) return;
    mouse.set(nx, ny);
    pointer.set(nx, ny);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObject(rayPlane);
    if (hits.length === 0) return;
    const { x, z } = hits[0].point;
    let distDelta = 0;
    if (lastPoint) {
      distDelta = Math.hypot(x - lastPoint.x, z - lastPoint.z);
      if (distDelta < PERSPECTIVE_WAVE.trailSpacing) return;
    }
    pushPoint({ x, z, age: 0, distDelta });
    lastPoint = { x, z };
    timeSinceLastMove = 0;
    isPlacingRandomPoints = false;
    randomPointTimer = 0;
  };
  const resizeObserver = new ResizeObserver(() => {
    width = container.clientWidth;
    height = container.clientHeight;
    pixelRatio = Math.min(window.devicePixelRatio, 2);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(pixelRatio);
    composer.setSize(width, height);
    composer.setPixelRatio(pixelRatio);
  });
  resizeObserver.observe(container);
  window.addEventListener("pointermove", onPointerMove);
  const update = (delta) => {
    lerpedMouse.x += (mouse.x - lerpedMouse.x) * 0.04;
    lerpedMouse.y += (mouse.y - lerpedMouse.y) * 0.04;
    updateCamera(lerpedMouse.x, lerpedMouse.y);
    const expiry = PERSPECTIVE_WAVE.fadeTime * 4;
    for (let i = trail.length - 1; i >= 0; i--) {
      trail[i].age += delta;
      if (trail[i].age > expiry) trail.splice(i, 1);
    }
    timeSinceLastMove += delta;
    if (idleRipples && timeSinceLastMove >= 3 && !isPlacingRandomPoints) {
      isPlacingRandomPoints = true;
      randomPointTimer = 0;
    }
    if (isPlacingRandomPoints) {
      randomPointTimer += delta;
      if (randomPointTimer >= 1.5) {
        pushPoint({
          x: (Math.random() * 0.5 - 0.25) * bounds,
          z: (Math.random() * 0.5 - 0.25) * bounds,
          age: 0,
          distDelta: PERSPECTIVE_WAVE.idleStrength + Math.random() * 0.2
        });
        randomPointTimer = 0;
      }
    }
    const live = Math.min(trail.length, MAX_TRAIL);
    if (live > 0 || trailUniforms.uTrailCount.value > 0) {
      for (let i = 0; i < live; i++) {
        trailData.set(
          [trail[i].x, trail[i].z, trail[i].age, trail[i].distDelta],
          i * 4
        );
      }
      trailTexture.needsUpdate = true;
      trailUniforms.uTrailCount.value = live;
    }
    composer.render();
  };
  const dispose = () => {
    resizeObserver.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    geometry.dispose();
    material.dispose();
    depthMaterial.dispose();
    rayPlane.geometry.dispose();
    rayPlane.material.dispose();
    trailTexture.dispose();
    composer.dispose();
    renderer.dispose();
  };
  return { update, dispose };
}
function PerspectiveCubes({
  className,
  gridSize = 44,
  gap = 0.08,
  baseColor = "#2a2a30",
  waveColor = "#ff6a2b",
  backgroundColor = "#0b0b0d",
  glow = 0.9,
  amplitude = 0.5,
  tilt = 0.7,
  idleRipples = true
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const updateRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const idle = idleRipples && !reduceMotion;
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const { update, dispose } = createPerspectiveScene(canvasRef.current, containerRef.current, {
      gridSize,
      gap,
      baseColor,
      waveColor,
      backgroundColor,
      glow,
      amplitude,
      tilt,
      idleRipples: idle
    });
    updateRef.current = update;
    return () => {
      updateRef.current = null;
      dispose();
    };
  }, [gridSize, gap, baseColor, waveColor, backgroundColor, glow, amplitude, tilt, idle]);
  useAnimationFrame((_, delta) => {
    updateRef.current?.(Math.min(delta / 1e3, 0.1));
  });
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      "aria-hidden": true,
      className: cn("absolute inset-0 overflow-hidden", className),
      style: { backgroundColor },
      children: /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className: "block h-full w-full outline-none" })
    }
  );
}
var BackgroundCubesGrid = (props) => props.variant === "perspective" ? /* @__PURE__ */ jsx(PerspectiveCubes, { ...props }) : /* @__PURE__ */ jsx(IsometricCubes, { ...props });

// entry.jsx
import React from "react";

// registry:components/background-cubes-grid-demo.tsx
import { motion, useReducedMotion as useReducedMotion2 } from "motion/react";
import { Webhook } from "lucide-react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var ICONS = {
  discord: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z",
  telegram: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
  whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
  googlechat: "M1.637 0C.733 0 0 .733 0 1.637v16.5c0 .904.733 1.636 1.637 1.636h3.955v3.323c0 .804.97 1.207 1.539.638l3.963-3.96h11.27c.903 0 1.636-.733 1.636-1.637V5.592L18.408 0Zm3.955 5.592h12.816v8.59H8.455l-2.863 2.863Z",
  mattermost: "M12.081 0C7.048-.034 2.339 3.125.637 8.153c-2.125 6.276 1.24 13.086 7.516 15.21 6.276 2.125 13.086-1.24 15.21-7.516 1.727-5.1-.172-10.552-4.311-13.557l.126 2.547c2.065 2.282 2.88 5.512 1.852 8.549-1.534 4.532-6.594 6.915-11.3 5.321-4.708-1.593-7.28-6.559-5.745-11.092 1.031-3.046 3.655-5.121 6.694-5.67l1.642-1.94A4.87 4.87 0 0 0 12.08 0zm3.528 1.094a.284.284 0 0 0-.123.024l-.004.001a.33.33 0 0 0-.109.071c-.145.142-.657.828-.657.828L13.6 3.4l-1.3 1.585-2.232 2.776s-1.024 1.278-.798 2.851c.226 1.574 1.396 2.34 2.304 2.648.907.307 2.302.408 3.438-.704 1.135-1.112 1.098-2.75 1.098-2.75l-.087-3.56-.07-2.05-.047-1.775s.01-.856-.02-1.057a.33.33 0 0 0-.035-.107l-.006-.012-.007-.011a.277.277 0 0 0-.229-.14z"
};
var platforms = [
  { word: "Discord", bg: "#5865F2", fg: "#fff", glyph: "discord" },
  { word: "Telegram", bg: "#fff", fg: "#26A5E4", glyph: "telegram" },
  { word: "WhatsApp", bg: "#25D366", fg: "#fff", glyph: "whatsapp" },
  { word: "Google Chat", bg: "#fff", fg: "#34A853", glyph: "googlechat" },
  { word: "Mattermost", bg: "#0058CC", fg: "#fff", glyph: "mattermost" },
  { word: "any webhook", bg: "#fcd462", fg: "#241a00", glyph: "webhook" }
];
var EASE_OUT = [0.215, 0.61, 0.355, 1];
var STAGGER = 0.09;
var START = 0.15;
var TONES = {
  light: {
    heading: "text-[#111]",
    body: "text-neutral-500",
    note: "text-neutral-400",
    pill: "bg-white text-[#111] shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.06)]",
    primary: "bg-[#111] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-neutral-800",
    secondary: "text-[#111] hover:bg-black/[0.04]"
  }
};
function Icon({ name, className }) {
  if (name === "webhook") return /* @__PURE__ */ jsx2(Webhook, { className, strokeWidth: 2.25 });
  return /* @__PURE__ */ jsx2("svg", { viewBox: "0 0 24 24", fill: "currentColor", className, "aria-hidden": true, children: /* @__PURE__ */ jsx2("path", { d: ICONS[name] }) });
}
function InlinePill({ platform, delay, tone }) {
  const reduceMotion = useReducedMotion2();
  return /* @__PURE__ */ jsxs(
    motion.span,
    {
      initial: reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(4px)" },
      animate: { opacity: 1, y: 0, filter: "blur(0px)" },
      transition: { duration: 0.6, ease: EASE_OUT, delay },
      className: cn(
        "mx-[0.06em] inline-flex translate-y-[-0.06em] items-center gap-[0.28em] rounded-full py-[0.08em] pr-[0.42em] pl-[0.1em] align-middle leading-none",
        TONES[tone].pill
      ),
      children: [
        /* @__PURE__ */ jsx2(
          "span",
          {
            className: "inline-flex size-[0.92em] items-center justify-center rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]",
            style: { backgroundColor: platform.bg, color: platform.fg },
            children: /* @__PURE__ */ jsx2(Icon, { name: platform.glyph, className: "size-[0.5em]" })
          }
        ),
        platform.word
      ]
    }
  );
}
function HeroContent({ tone }) {
  const reduceMotion = useReducedMotion2();
  const t = TONES[tone];
  const [discord, telegram, whatsapp, googleChat, mattermost, webhook] = platforms;
  const pill = (p, suffix = "") => /* @__PURE__ */ jsxs("span", { className: "whitespace-nowrap", children: [
    /* @__PURE__ */ jsx2(InlinePill, { platform: p, tone, delay: START + platforms.indexOf(p) * STAGGER }),
    suffix
  ] });
  const fadeUp = (delay) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE_OUT, delay }
  });
  return /* @__PURE__ */ jsxs("div", { className: "pointer-events-none mx-auto flex max-w-[1080px] flex-col items-center text-center antialiased", children: [
    /* @__PURE__ */ jsxs(
      "h1",
      {
        className: cn(
          "max-w-[24ch] text-[clamp(32px,4.6vw,58px)] leading-[1.32] font-medium tracking-[-0.03em] text-balance",
          t.heading
        ),
        children: [
          "Page your team on ",
          pill(discord, ","),
          " ",
          pill(telegram, ","),
          " ",
          pill(whatsapp, ","),
          " ",
          pill(googleChat, ","),
          " ",
          pill(mattermost),
          " and ",
          pill(webhook),
          " at once."
        ]
      }
    ),
    /* @__PURE__ */ jsx2(
      motion.p,
      {
        ...fadeUp(0.7),
        className: cn("mt-8 max-w-[600px] text-[clamp(17px,1.5vw,19px)] leading-[1.6] text-pretty", t.body),
        children: "Relay is incident alerting for small engineering teams. Route alerts by severity, run on-call rotations, and keep one clean thread per incident."
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        ...fadeUp(0.8),
        className: "pointer-events-auto mt-9 flex flex-col items-center gap-2 sm:flex-row",
        children: [
          /* @__PURE__ */ jsx2(
            "a",
            {
              href: "#",
              className: cn(
                "inline-flex h-11 items-center rounded-full px-5 text-[15px] font-medium transition-colors",
                t.primary
              ),
              children: "Start for free"
            }
          ),
          /* @__PURE__ */ jsx2(
            "a",
            {
              href: "#",
              className: cn(
                "inline-flex h-11 items-center rounded-full px-5 text-[15px] font-medium transition-colors",
                t.secondary
              ),
              children: "Read the docs"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx2(motion.p, { ...fadeUp(0.9), className: cn("mt-4 text-[13px]", t.note), children: "Free for up to 5 seats \xB7 No credit card required" })
  ] });
}
function BackgroundCubesGridDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "relative isolate flex min-h-[50rem] w-full items-center justify-center overflow-hidden px-5 py-24 sm:px-8", children: [
    /* @__PURE__ */ jsx2(BackgroundCubesGrid, { className: "-z-10" }),
    /* @__PURE__ */ jsx2(HeroContent, { tone: "light" })
  ] });
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(BackgroundCubesGridDemo, {}) }) });
}
export {
  BackgroundCubesGrid,
  Component as default
};
