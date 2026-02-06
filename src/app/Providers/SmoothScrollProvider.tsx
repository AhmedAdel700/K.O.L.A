"use client";

import { type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProps) {
  useGSAP(() => {
    if (ScrollSmoother.get()) return;

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper", // can be removed if using the default wrapper
      content: "#smooth-content", // can be removed if using the default content
      smooth: 1.5,
      effects: true,
      normalizeScroll: false, // Disabled to prevent hijacking native scroll behavior
    });

    return () => smoother.kill();
  }, []);

  return (
    <div id="smooth-wrapper" className="bg-black">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
