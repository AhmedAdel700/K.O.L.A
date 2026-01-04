"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type CursorType =
  | "default"
  | "glow"
  | "follow"
  | "magnetic"
  | "ripple"
  | "dot-ring"
  | "trail"
  | "spotlight";

interface CursorProps {
  type?: CursorType;
}

export default function Cursor({ type = "default" }: CursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorFollowRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: type === "magnetic" ? 0.3 : 0.1,
          ease: "power2.out",
        });
      }

      if (
        cursorFollowRef.current &&
        (type === "follow" || type === "dot-ring")
      ) {
        gsap.to(cursorFollowRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      if (type === "ripple") {
        const newRipple = { id: Date.now(), x: mousePos.x, y: mousePos.y };
        setRipples((prev) => [...prev, newRipple]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 1000);
      }
    };

    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [type, mousePos]);

  const getCursorStyles = () => {
    const baseStyles =
      "fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2";

    switch (type) {
      case "glow":
        return {
          cursor: `${baseStyles} w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-md opacity-70 ${
            isClicking ? "scale-150" : "scale-100"
          } transition-transform duration-200`,
        };

      case "follow":
        return {
          cursor: `${baseStyles} w-3 h-3 bg-white rounded-full mix-blend-difference`,
          follower: `${baseStyles} w-10 h-10 border-2 border-white rounded-full mix-blend-difference`,
        };

      case "magnetic":
        return {
          cursor: `${baseStyles} w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full ${
            isClicking ? "scale-75" : "scale-100"
          } transition-all duration-200 shadow-lg shadow-blue-500/50`,
        };

      case "ripple":
        return {
          cursor: `${baseStyles} w-4 h-4 bg-purple-500 rounded-full ${
            isClicking ? "scale-50" : "scale-100"
          } transition-transform duration-100`,
        };

      case "dot-ring":
        return {
          cursor: `${baseStyles} w-2 h-2 bg-white rounded-full`,
          follower: `${baseStyles} w-12 h-12 border-2 border-white/50 rounded-full ${
            isClicking ? "scale-75 border-white" : "scale-100"
          } transition-all duration-200`,
        };

      case "trail":
        return {
          cursor: `${baseStyles} w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full opacity-80 blur-sm`,
        };

      case "spotlight":
        return {
          cursor: `${baseStyles} w-64 h-64 bg-gradient-radial from-white/30 via-white/10 to-transparent rounded-full pointer-events-none mix-blend-screen ${
            isClicking ? "scale-125" : "scale-100"
          } transition-transform duration-300`,
        };

      default:
        return {
          cursor: `${baseStyles} w-4 h-4 bg-white rounded-full mix-blend-difference`,
        };
    }
  };

  const styles = getCursorStyles();

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Main cursor */}
      <div ref={cursorRef} className={styles.cursor} />

      {/* Follower cursor for specific types */}
      {(type === "follow" || type === "dot-ring") && styles.follower && (
        <div ref={cursorFollowRef} className={styles.follower} />
      )}

      {/* Ripple effects */}
      {type === "ripple" &&
        ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
          >
            <div className="w-0 h-0 border-2 border-purple-500 rounded-full animate-[ripple_1s_ease-out]" />
          </div>
        ))}

      <style jsx>{`
        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: 100px;
            height: 100px;
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
