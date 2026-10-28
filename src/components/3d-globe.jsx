// Adapted from https://ui.aceternity.com/components/3d-globe
// Copyright (c) 2023 Manu Arora. See licenses/aceternity.txt for usage terms.
// registry:components/ui/3d-globe.tsx
import React, { useRef, useMemo, useState, useCallback, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";

// registry:utils
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...args) {
  return twMerge(clsx(args));
}

// registry:components/ui/3d-globe.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var DEFAULT_EARTH_TEXTURE = "https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg";
var DEFAULT_BUMP_TEXTURE = "https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png";
function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}
function Marker({
  marker,
  radius,
  defaultSize,
  onClick,
  onHover
}) {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const groupRef = useRef(null);
  const imageGroupRef = useRef(null);
  const { camera } = useThree();
  const surfacePosition = useMemo(() => {
    return latLngToVector3(marker.lat, marker.lng, radius * 1.001);
  }, [marker.lat, marker.lng, radius]);
  const topPosition = useMemo(() => {
    return latLngToVector3(marker.lat, marker.lng, radius * 1.18);
  }, [marker.lat, marker.lng, radius]);
  const lineHeight = topPosition.distanceTo(surfacePosition);
  useFrame(() => {
    if (!imageGroupRef.current) return;
    const worldPos = new THREE.Vector3();
    imageGroupRef.current.getWorldPosition(worldPos);
    const markerDirection = worldPos.clone().normalize();
    const cameraDirection = camera.position.clone().normalize();
    const dot = markerDirection.dot(cameraDirection);
    setIsVisible(dot > 0.1);
  });
  const handlePointerEnter = useCallback(() => {
    setHovered(true);
    onHover?.(marker);
  }, [marker, onHover]);
  const handlePointerLeave = useCallback(() => {
    setHovered(false);
    onHover?.(null);
  }, [onHover]);
  const handleClick = useCallback(() => {
    onClick?.(marker);
  }, [marker, onClick]);
  const { lineCenter, lineQuaternion } = useMemo(() => {
    const center = surfacePosition.clone().lerp(topPosition, 0.5);
    const direction = topPosition.clone().sub(surfacePosition).normalize();
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    return { lineCenter: center, lineQuaternion: quaternion };
  }, [surfacePosition, topPosition]);
  return /* @__PURE__ */ jsxs("group", { ref: groupRef, visible: isVisible, children: [
    /* @__PURE__ */ jsxs("mesh", { position: lineCenter, quaternion: lineQuaternion, children: [
      /* @__PURE__ */ jsx("cylinderGeometry", { args: [3e-3, 3e-3, lineHeight, 8] }),
      /* @__PURE__ */ jsx(
        "meshBasicMaterial",
        {
          color: hovered ? "#ffffff" : "#94a3b8",
          transparent: true,
          opacity: hovered ? 0.9 : 0.6
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("mesh", { position: surfacePosition, quaternion: lineQuaternion, children: [
      /* @__PURE__ */ jsx("coneGeometry", { args: [0.015, 0.04, 8] }),
      /* @__PURE__ */ jsx("meshBasicMaterial", { color: hovered ? "#f97316" : "#ef4444" })
    ] }),
    /* @__PURE__ */ jsx("group", { ref: imageGroupRef, position: topPosition, children: /* @__PURE__ */ jsx(
      Html,
      {
        transform: true,
        center: true,
        sprite: true,
        distanceFactor: 10,
        style: {
          pointerEvents: isVisible ? "auto" : "none",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.15s ease-out"
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "cursor-pointer overflow-hidden rounded-full bg-neutral-900 shadow-lg transition-transform duration-200",
              hovered && "scale-125 shadow-xl ring-1 ring-white/50"
            ),
            style: {
              width: "8px",
              height: "8px"
            },
            onMouseEnter: handlePointerEnter,
            onMouseLeave: handlePointerLeave,
            onClick: handleClick,
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: marker.src,
                alt: marker.label || "Marker",
                className: "h-full w-full object-cover",
                draggable: false
              }
            )
          }
        )
      }
    ) })
  ] });
}
function RotatingGlobe({
  config,
  markers,
  onMarkerClick,
  onMarkerHover
}) {
  const groupRef = useRef(null);
  const [earthTexture, bumpTexture] = useTexture([
    config.textureUrl,
    config.bumpMapUrl
  ]);
  useMemo(() => {
    if (earthTexture) {
      earthTexture.colorSpace = THREE.SRGBColorSpace;
      earthTexture.anisotropy = 16;
    }
    if (bumpTexture) {
      bumpTexture.anisotropy = 8;
    }
  }, [earthTexture, bumpTexture]);
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(config.radius, 64, 64);
  }, [config.radius]);
  const wireframeGeometry = useMemo(() => {
    return new THREE.SphereGeometry(config.radius * 1.002, 32, 16);
  }, [config.radius]);
  return /* @__PURE__ */ jsxs("group", { ref: groupRef, children: [
    /* @__PURE__ */ jsx("mesh", { geometry, children: /* @__PURE__ */ jsx(
      "meshStandardMaterial",
      {
        map: earthTexture,
        bumpMap: bumpTexture,
        bumpScale: config.bumpScale * 0.05,
        roughness: 0.7,
        metalness: 0
      }
    ) }),
    config.showWireframe && /* @__PURE__ */ jsx("mesh", { geometry: wireframeGeometry, children: /* @__PURE__ */ jsx(
      "meshBasicMaterial",
      {
        color: config.wireframeColor,
        wireframe: true,
        transparent: true,
        opacity: 0.08
      }
    ) }),
    markers.map((marker, index) => /* @__PURE__ */ jsx(
      Marker,
      {
        marker,
        radius: config.radius,
        defaultSize: config.markerSize,
        onClick: onMarkerClick,
        onHover: onMarkerHover
      },
      `marker-${index}-${marker.lat}-${marker.lng}`
    ))
  ] });
}
function Atmosphere({ radius, color, intensity, blur }) {
  const fresnelPower = Math.max(0.5, 5 - blur);
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        atmosphereColor: { value: new THREE.Color(color) },
        intensity: { value: intensity },
        fresnelPower: { value: fresnelPower }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 atmosphereColor;
        uniform float intensity;
        uniform float fresnelPower;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, normalize(-vPosition))), fresnelPower);
          gl_FragColor = vec4(atmosphereColor, fresnel * intensity);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false
    });
  }, [color, intensity, fresnelPower]);
  return /* @__PURE__ */ jsxs("mesh", { scale: [1.12, 1.12, 1.12], children: [
    /* @__PURE__ */ jsx("sphereGeometry", { args: [radius, 64, 32] }),
    /* @__PURE__ */ jsx("primitive", { object: atmosphereMaterial, attach: "material" })
  ] });
}
function Scene({ markers, config, onMarkerClick, onMarkerHover }) {
  const { camera } = useThree();
  React.useEffect(() => {
    camera.position.set(0, 0, config.radius * 3.5);
    camera.lookAt(0, 0, 0);
  }, [camera, config.radius]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("ambientLight", { intensity: config.ambientIntensity }),
    /* @__PURE__ */ jsx(
      "directionalLight",
      {
        position: [config.radius * 5, config.radius * 2, config.radius * 5],
        intensity: config.pointLightIntensity,
        color: "#ffffff"
      }
    ),
    /* @__PURE__ */ jsx(
      "directionalLight",
      {
        position: [-config.radius * 3, config.radius, -config.radius * 2],
        intensity: config.pointLightIntensity * 0.3,
        color: "#88ccff"
      }
    ),
    /* @__PURE__ */ jsx(
      RotatingGlobe,
      {
        config,
        markers,
        onMarkerClick,
        onMarkerHover
      }
    ),
    config.showAtmosphere && /* @__PURE__ */ jsx(
      Atmosphere,
      {
        radius: config.radius,
        color: config.atmosphereColor,
        intensity: config.atmosphereIntensity,
        blur: config.atmosphereBlur
      }
    ),
    /* @__PURE__ */ jsx(
      OrbitControls,
      {
        makeDefault: true,
        enablePan: config.enablePan,
        enableZoom: config.enableZoom,
        minDistance: config.minDistance,
        maxDistance: config.maxDistance,
        rotateSpeed: 0.4,
        autoRotate: config.autoRotateSpeed > 0,
        autoRotateSpeed: config.autoRotateSpeed,
        enableDamping: true,
        dampingFactor: 0.1
      }
    )
  ] });
}
function LoadingFallback() {
  return /* @__PURE__ */ jsx(Html, { center: true, children: /* @__PURE__ */ jsx("div", { className: "flex shrink-0 flex-col items-center gap-3", children: /* @__PURE__ */ jsx("span", { className: "inline-block shrink-0 text-sm text-neutral-400", children: "Loading globe..." }) }) });
}
var defaultConfig = {
  radius: 2,
  globeColor: "#1a1a2e",
  textureUrl: DEFAULT_EARTH_TEXTURE,
  bumpMapUrl: DEFAULT_BUMP_TEXTURE,
  showAtmosphere: false,
  atmosphereColor: "#4da6ff",
  atmosphereIntensity: 0.5,
  atmosphereBlur: 2,
  bumpScale: 1,
  autoRotateSpeed: 0.3,
  enableZoom: false,
  enablePan: false,
  minDistance: 5,
  maxDistance: 15,
  initialRotation: { x: 0, y: 0 },
  markerSize: 0.06,
  showWireframe: false,
  wireframeColor: "#4a9eff",
  ambientIntensity: 0.6,
  pointLightIntensity: 1.5,
  backgroundColor: null
};
function Globe3D({
  markers = [],
  config = {},
  className,
  onMarkerClick,
  onMarkerHover
}) {
  const mergedConfig = useMemo(
    () => ({ ...defaultConfig, ...config }),
    [config]
  );
  return /* @__PURE__ */ jsx("div", { className: cn("relative h-[500px] w-full", className), children: /* @__PURE__ */ jsx(
    Canvas,
    {
      gl: {
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      },
      dpr: [1, 2],
      camera: {
        fov: 45,
        near: 0.1,
        far: 1e3,
        position: [0, 0, mergedConfig.radius * 3.5]
      },
      style: {
        background: mergedConfig.backgroundColor || "transparent"
      },
      children: /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(
        Scene,
        {
          markers,
          config: mergedConfig,
          onMarkerClick,
          onMarkerHover
        }
      ) })
    }
  ) });
}

// entry.jsx
import React2 from "react";

// registry:components/3d-globe-demo.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var sampleMarkers = [
  {
    lat: 40.7128,
    lng: -74.006,
    src: "https://assets.aceternity.com/avatars/1.webp",
    label: "New York"
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    src: "https://assets.aceternity.com/avatars/2.webp",
    label: "London"
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    src: "https://assets.aceternity.com/avatars/3.webp",
    label: "Tokyo"
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    src: "https://assets.aceternity.com/avatars/4.webp",
    label: "Sydney"
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    src: "https://assets.aceternity.com/avatars/5.webp",
    label: "Paris"
  },
  {
    lat: 28.6139,
    lng: 77.209,
    src: "https://assets.aceternity.com/avatars/6.webp",
    label: "New Delhi"
  },
  {
    lat: 55.7558,
    lng: 37.6173,
    src: "https://assets.aceternity.com/avatars/7.webp",
    label: "Moscow"
  },
  {
    lat: -22.9068,
    lng: -43.1729,
    src: "https://assets.aceternity.com/avatars/8.webp",
    label: "Rio de Janeiro"
  },
  {
    lat: 31.2304,
    lng: 121.4737,
    src: "https://assets.aceternity.com/avatars/9.webp",
    label: "Shanghai"
  },
  {
    lat: 25.2048,
    lng: 55.2708,
    src: "https://assets.aceternity.com/avatars/10.webp",
    label: "Dubai"
  },
  {
    lat: -34.6037,
    lng: -58.3816,
    src: "https://assets.aceternity.com/avatars/11.webp",
    label: "Buenos Aires"
  },
  {
    lat: 1.3521,
    lng: 103.8198,
    src: "https://assets.aceternity.com/avatars/12.webp",
    label: "Singapore"
  },
  {
    lat: 37.5665,
    lng: 126.978,
    src: "https://assets.aceternity.com/avatars/13.webp",
    label: "Seoul"
  }
];
function Globe3DDemo() {
  return /* @__PURE__ */ jsx2(
    Globe3D,
    {
      markers: sampleMarkers,
      config: {
        atmosphereColor: "#4da6ff",
        atmosphereIntensity: 20,
        bumpScale: 5,
        autoRotateSpeed: 0.3
      },
      onMarkerClick: (marker) => {
        console.log("Clicked marker:", marker.label);
      },
      onMarkerHover: (marker) => {
        if (marker) {
          console.log("Hovering:", marker.label);
        }
      }
    }
  );
}

// entry.jsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx3("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx3("div", { className: "vendor-content", children: /* @__PURE__ */ jsx3(Globe3DDemo, {}) }) });
}
export {
  Globe3D,
  Component as default
};
