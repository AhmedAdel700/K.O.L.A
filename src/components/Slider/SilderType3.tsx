"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useLocale } from "next-intl";

interface SliderItem {
  place: string;
  title: string;
  title2: string;
  description: string;
  image: string;
}

interface SliderType3Props {
  data: SliderItem[];
}

export default function SliderType3({ data }: SliderType3Props) {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      });
      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-play logic
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % data.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [data.length]);

  const activeItem = data[activeIdx];

  // Calculate "cover" dimensions for the background image
  const calculateBgDimensions = (dims: { width: number; height: number }) => {
    if (dims.width === 0 || dims.height === 0)
      return { width: 0, height: 0, offsetX: 0, offsetY: 0 };

    const imgRatio = 16 / 9;
    const containerRatio = dims.width / dims.height;

    let renderW, renderH;
    if (containerRatio > imgRatio) {
      renderW = dims.width;
      renderH = renderW / imgRatio;
    } else {
      renderH = dims.height;
      renderW = renderH * imgRatio;
    }

    renderW = Math.ceil(renderW) + 1;
    renderH = Math.ceil(renderH) + 1;

    return {
      width: renderW,
      height: renderH,
      offsetX: (renderW - dims.width) / 2,
      offsetY: (renderH - dims.height) / 2,
    };
  };

  const bgDimensions = useMemo(
    () => calculateBgDimensions(dimensions),
    [dimensions],
  );

  const calculateBentoItemPosition = (
    idx: number,
    dims: { width: number; height: number },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bgDims: any,
  ) => {
    const gridCols = 3;
    const gridRows = 3;
    const gap = 12;

    const cellWidth = (dims.width - (gridCols - 1) * gap) / gridCols;
    const cellHeight = (dims.height - (gridRows - 1) * gap) / gridRows;

    let colPos = 0;
    let rowPos = 0;

    // Desktop bento layout
    if (idx === 0) {
      colPos = 0;
      rowPos = 0;
    } // item-1
    if (idx === 1) {
      colPos = 1;
      rowPos = 0;
    } // item-2
    if (idx === 2) {
      colPos = 2;
      rowPos = 0;
    } // item-3
    if (idx === 3) {
      colPos = 1;
      rowPos = 1;
    } // item-4
    if (idx === 4) {
      colPos = 0;
      rowPos = 2;
    } // item-5
    if (idx === 5) {
      colPos = 2;
      rowPos = 2;
    } // item-6

    const bgX = -(colPos * (cellWidth + gap)) - bgDims.offsetX;
    const bgY = -(rowPos * (cellHeight + gap)) - bgDims.offsetY;

    return { bgX, bgY };
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden font-['Inter'] bg-gradient-to-br from-[#3b3121] via-[#c9a750]/80 to-[#8c6d3b]/90">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        
        .puzzle-tile {
          background-repeat: no-repeat;
          background-size: var(--bg-width) var(--bg-height);
          background-position: var(--bg-x) var(--bg-y);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
          background-image: var(--bg-image);
        }

        .text-slide-up {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 0.5rem;
        }

        .bento-item-1 { grid-column: 1 / 2; grid-row: 1 / 3; }
        .bento-item-2 { grid-column: 2 / 3; grid-row: 1 / 2; }
        .bento-item-3 { grid-column: 3 / 4; grid-row: 1 / 3; }
        .bento-item-4 { grid-column: 2 / 3; grid-row: 2 / 4; }
        .bento-item-5 { grid-column: 1 / 2; grid-row: 3 / 4; }
        .bento-item-6 { grid-column: 3 / 4; grid-row: 3 / 4; }



        .diagonal-container {
          position: absolute;
          top: 0;
          ${isRTL ? "left: 0;" : "right: 0;"}
          width: 73%;
          height: 100%;
          clip-path: ${
            isRTL
              ? "polygon(0% 0%, 34% 0%, 100% 100%, 0% 100%)"
              : "polygon(66% 0%, 100% 0%, 100% 100%, 0 100%)"
          };
        }

        @media (max-width: 1279px) {
          .diagonal-container {
            display: none;
          }

        }
      `}</style>

      <div className="relative z-10 w-full h-screen overflow-hidden">
        {/* Mobile Background (xl and smaller) */}
        <div
          className="xl:hidden absolute inset-0 z-0 bg-cover bg-center transition-[background-image] duration-1000"
          style={{ backgroundImage: `url(${activeItem.image})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content Section */}
        <div
          className={`absolute top-0 ${isRTL ? "right-0" : "left-0"} w-full xl:w-1/2 h-full flex flex-col gap-6 justify-center p-6 md:p-12 lg:p-20 ${isRTL ? "text-center xl:text-right" : "text-center xl:text-left"} xl:relative z-10 pointer-events-none`}
        >
          <div
            key={`${activeIdx}-metadata`}
            className={`text-slide-up flex flex-col gap-2 pointer-events-auto items-center xl:items-start`}
          >
            <span
              className={`text-white/70 ${isRTL ? "xl:text-[#a1a1a1]" : "xl:text-[#a1a1a1]"} font-semibold tracking-widest uppercase text-sm`}
            >
              {activeItem.place}
            </span>
            <h1
              className={`text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-white ${isRTL ? "xl:text-[#1a1a1a]" : "xl:text-[#1a1a1a]"}`}
            >
              {activeItem.title} <br />
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${isRTL ? "from-white/60 to-white xl:from-[#a1a1a1] xl:to-[#1a1a1a]" : "from-white to-white/60 xl:from-[#1a1a1a] xl:to-[#a1a1a1]"}`}
              >
                {activeItem.title2}
              </span>
            </h1>
            <p
              className={`text-base md:text-lg text-white/80 xl:text-neutral-600 max-w-lg mt-4 leading-relaxed`}
            >
              {activeItem.description}
            </p>
          </div>
        </div>

        {/* Desktop: Right Section - Bento Grid in Diagonal Triangle */}
        <div className="diagonal-container hidden xl:flex pointer-events-none p-[0.5rem]">
          <div
            ref={containerRef}
            className="bento-grid w-full h-full pointer-events-auto"
          >
            {[
              { class: "bento-item-1" },
              { class: "bento-item-2" },
              { class: "bento-item-3" },
              { class: "bento-item-4" },
              { class: "bento-item-5" },
              { class: "bento-item-6" },
            ].map((item, idx) => {
              const { bgX, bgY } = calculateBentoItemPosition(
                idx,
                dimensions,
                bgDimensions,
              );

              return (
                <div
                  key={idx}
                  className={`puzzle-tile ${item.class} rounded-xl relative group overflow-hidden`}
                  style={
                    {
                      "--bg-width": `${bgDimensions.width}px`,
                      "--bg-height": `${bgDimensions.height}px`,
                      "--bg-x": `${bgX}px`,
                      "--bg-y": `${bgY}px`,
                      "--bg-image": `url(${activeItem.image})`,
                    } as React.CSSProperties
                  }
                >
                  <div className="absolute inset-0 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute inset-0 pointer-events-none rounded-xl" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
