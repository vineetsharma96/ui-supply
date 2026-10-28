// Adapted from https://skiper-ui.com/v1/skiper39
// Skiper UI / gxuri. Attribution required for free components. See licenses/skiper.txt for usage terms.
// registry:skiper39.tsx
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var CrowdCanvas = ({ src, rows = 15, cols = 7 }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const config = {
      src,
      rows,
      cols
    };
    const randomRange = (min, max) => min + Math.random() * (max - min);
    const randomIndex = (array) => randomRange(0, array.length) | 0;
    const removeFromArray = (array, i) => array.splice(i, 1)[0];
    const removeItemFromArray = (array, item) => removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = (array) => removeFromArray(array, randomIndex(array));
    const getRandomFromArray = (array) => array[randomIndex(array) | 0];
    const resetPeep = ({ stage: stage2, peep }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const offsetY = 100 - 250 * gsap.parseEase("power2.in")(Math.random());
      const startY = stage2.height - peep.height + offsetY;
      let startX;
      let endX;
      if (direction === 1) {
        startX = -peep.width;
        endX = stage2.width;
        peep.scaleX = 1;
      } else {
        startX = stage2.width + peep.width;
        endX = 0;
        peep.scaleX = -1;
      }
      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;
      return {
        startX,
        startY,
        endX
      };
    };
    const normalWalk = ({ peep, props }) => {
      const { startX, startY, endX } = props;
      const xDuration = 10;
      const yDuration = 0.25;
      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.5, 1.5));
      tl.to(
        peep,
        {
          duration: xDuration,
          x: endX,
          ease: "none"
        },
        0
      );
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: xDuration / yDuration,
          yoyo: true,
          y: startY - 10
        },
        0
      );
      return tl;
    };
    const walks = [normalWalk];
    const createPeep = ({
      image,
      rect
    }) => {
      const peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        drawArgs: [],
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        setRect: (rect2) => {
          peep.rect = rect2;
          peep.width = rect2[2];
          peep.height = rect2[3];
          peep.drawArgs = [peep.image, ...rect2, 0, 0, peep.width, peep.height];
        },
        render: (ctx2) => {
          ctx2.save();
          ctx2.translate(peep.x, peep.y);
          ctx2.scale(peep.scaleX, 1);
          ctx2.drawImage(
            peep.image,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            0,
            0,
            peep.width,
            peep.height
          );
          ctx2.restore();
        }
      };
      peep.setRect(rect);
      return peep;
    };
    const img = document.createElement("img");
    const stage = {
      width: 0,
      height: 0
    };
    const allPeeps = [];
    const availablePeeps = [];
    const crowd = [];
    const createPeeps = () => {
      const { rows: rows2, cols: cols2 } = config;
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows2 * cols2;
      const rectWidth = width / rows2;
      const rectHeight = height / cols2;
      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: img,
            rect: [
              i % rows2 * rectWidth,
              (i / rows2 | 0) * rectHeight,
              rectWidth,
              rectHeight
            ]
          })
        );
      }
    };
    const initCrowd = () => {
      while (availablePeeps.length) {
        addPeepToCrowd().walk.progress(Math.random());
      }
    };
    const addPeepToCrowd = () => {
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({
          peep,
          stage
        })
      }).eventCallback("onComplete", () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });
      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      return peep;
    };
    const removePeepFromCrowd = (peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };
    const render = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);
      crowd.forEach((peep) => {
        peep.render(ctx);
      });
      ctx.restore();
    };
    const resize = () => {
      if (!canvas) return;
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * devicePixelRatio;
      canvas.height = stage.height * devicePixelRatio;
      crowd.forEach((peep) => {
        peep.walk.kill();
      });
      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);
      initCrowd();
    };
    const init = () => {
      createPeeps();
      resize();
      gsap.ticker.add(render);
    };
    img.onload = init;
    img.src = config.src;
    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });
    };
  }, []);
  return /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className: "absolute bottom-0 h-[90vh] w-full" });
};
var Skiper39 = () => {
  return /* @__PURE__ */ jsxs("div", { className: "relative h-full w-full bg-white text-black", children: [
    /* @__PURE__ */ jsx("div", { className: "top-22 absolute left-1/2 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black", children: /* @__PURE__ */ jsx("span", { className: "relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']", children: "Croud Canvas" }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 h-full w-screen", children: /* @__PURE__ */ jsx(CrowdCanvas, { src: "https://skiper-ui.com/images/peeps/all-peeps.png", rows: 15, cols: 7 }) })
  ] });
};

// entry.jsx
import React2 from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function Component() {
  return /* @__PURE__ */ jsx2("div", { className: "ff-demo upstream-preview", children: /* @__PURE__ */ jsx2("div", { className: "vendor-content", children: /* @__PURE__ */ jsx2(Skiper39, {}) }) });
}
export {
  CrowdCanvas,
  Skiper39,
  Component as default
};
