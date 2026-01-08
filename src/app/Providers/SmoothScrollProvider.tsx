"use client";

import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProps) {

  // Create ScrollSmoother ONCE
  useEffect(() => {
    if (ScrollSmoother.get()) return;

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper", // Can Be Removed But This Helps For Clarity
      content: "#smooth-content", // Can Be Removed But This Helps For Clarity
      smooth: 1.5, // 1.2 Is Good Too Most Used
      effects: true,
    });

    return () => {
      smoother?.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper" className="bg-black"> {/* The Background Of The Whole App So Make It Gradient or something (when navigating throw pages) */}
      <div id="smooth-content">{children}</div>
    </div>
  );
}
