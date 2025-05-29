import React, { useRef, useEffect, useState } from "react";
import "./MediaShowcaseSection.css";

const MEDIA_IMAGES = [
  "/media1.png",
  "/media2.png",
  "/media3.png",
  "/media4.png",
  "/media5.png",
  "/media6.png"
];

export default function MediaShowcaseSection() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [rowWidth, setRowWidth] = useState(0);

  useEffect(() => {
    if (rowRef.current) {
      setRowWidth(rowRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (rowRef.current) setRowWidth(rowRef.current.offsetWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  return (
    <section className="media-showcase-section">
      <h2 className="media-showcase-title">babylon_pr</h2>
      <div
        className="media-showcase-carousel-outer"
        style={{ overflow: "hidden", width: "100vw" }}
      >
        <div
          className="media-showcase-carousel-inner"
          style={{
            width: rowWidth ? rowWidth * 2 : undefined,
            animationDuration: rowWidth ? `${rowWidth / 90}s` : undefined // ~90px/sec
          }}
        >
          <div className="media-showcase-row" ref={rowRef}>
            {MEDIA_IMAGES.map((src, idx) => (
              <div className="media-showcase-image-box" key={"a"+idx}>
                <img src={src} alt="Showcase" className="media-showcase-img" draggable="false" />
              </div>
            ))}
          </div>
          <div className="media-showcase-row">
            {MEDIA_IMAGES.map((src, idx) => (
              <div className="media-showcase-image-box" key={"b"+idx}>
                <img src={src} alt="Showcase" className="media-showcase-img" draggable="false" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

