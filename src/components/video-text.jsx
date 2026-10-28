import React, { useId, useState, useEffect, useRef } from "react";
import "./components.css";
export default function VideoText({
  text = "OCEAN",
  src = "https://cdn.magicui.design/ocean-small.webm",
  paused = false,
}) {
  const id = useId().replaceAll(":", "");
  const [failed, setFailed] = useState(false);
  const video = useRef();
  useEffect(() => {
    if (paused) video.current?.pause();
    else video.current?.play().catch(() => {});
  }, [paused]);
  return (
    <div className="ff-demo ff-video">
      <span className="ff-kicker">TYPE WITH A LITTLE DEPTH</span>
      <div className="ff-video-window">
        <svg width="0" height="0">
          <defs>
            <clipPath id={id} clipPathUnits="objectBoundingBox">
              <text
                x=".5"
                y=".88"
                textAnchor="middle"
                fontFamily="Arial,sans-serif"
                fontSize=".95"
                fontWeight="900"
                textLength=".92"
                lengthAdjust="spacingAndGlyphs"
              >
                {text}
              </text>
            </clipPath>
          </defs>
        </svg>
        <div className="ff-video-mask" style={{ clipPath: `url(#${id})` }}>
          {!failed && (
            <video
              ref={video}
              autoPlay
              loop
              muted
              playsInline
              src={src}
              onError={() => setFailed(true)}
            />
          )}
        </div>
      </div>
      <span className="ff-subtext">
        {failed
          ? "Video unavailable · ocean color fallback"
          : "An ocean of possibilities."}
      </span>
    </div>
  );
}
