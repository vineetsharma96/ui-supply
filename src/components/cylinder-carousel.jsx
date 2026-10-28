import React from "react";
import "./components.css";
// Independent recreation. The reference's supplied registry URL returns 404.
const images = [
  "photo-1470770841072-f978cf4d019e",
  "photo-1464822759023-fed622ff2c3b",
  "photo-1441974231531-c6227db76b6e",
  "photo-1500530855697-b586d89ba3ee",
  "photo-1519681393784-d120267933ba",
  "photo-1472396961693-142e6e269027",
  "photo-1469474968028-56623f02e42e",
  "photo-1501785888041-af3ef285b470",
].map(
  (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=80`,
);
export default function CylinderCarousel({ items = images }) {
  return (
    <div
      className="ff-demo ff-cylinder"
      tabIndex={0}
      aria-label="Rotating landscape carousel. Hover or focus to pause."
    >
      <span className="ff-kicker">A DIFFERENT POINT OF VIEW</span>
      <div className="ff-cylinder-scene">
        <div className="ff-cylinder-ring">
          {items.map((src, i) => (
            <figure
              key={i}
              style={{
                transform: `rotateY(${(i * 360) / items.length}deg) translateZ(210px)`,
              }}
            >
              <img src={src} alt={`Landscape ${i + 1}`} loading="lazy" />
              <figcaption>STUDY {String(i + 1).padStart(2, "0")}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <span className="ff-cylinder-caption">
        AROUND AND AROUND · HOVER TO PAUSE
      </span>
    </div>
  );
}
