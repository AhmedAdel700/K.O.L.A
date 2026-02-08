"use client";

import { type ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import { Observer } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Observer);

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProps) {
  const isAnimating = useRef(false);

  useGSAP(() => {
    // Prevent double init
    if (ScrollSmoother.get()) return;

    const HEADER_HEIGHT = 80;

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
      normalizeScroll: false,
    });

    const sections = gsap.utils.toArray<HTMLElement>(".snap-section");
    if (!sections.length) return;

    let currentIndex = -1;

    const updateCurrentIndex = () => {
      const scrollY = smoother.scrollTop();
      let closest = 0;
      let min = Math.abs(scrollY - sections[0].offsetTop);

      sections.forEach((section, i) => {
        const dist = Math.abs(scrollY - section.offsetTop);
        if (dist < min) {
          min = dist;
          closest = i;
        }
      });

      currentIndex = closest;
    };

    updateCurrentIndex();

    const goToSection = (index: number) => {
      if (index < 0 || index >= sections.length || isAnimating.current) return;

      isAnimating.current = true;
      currentIndex = index;

      gsap.to(smoother, {
        scrollTop: sections[index].offsetTop - HEADER_HEIGHT,
        duration: 1.2,
        ease: "circ.in",
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    };

    const observer = Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: true,
      onUp: () => !isAnimating.current && goToSection(currentIndex + 1),
      onDown: () => !isAnimating.current && goToSection(currentIndex - 1),
    });

    const handleResize = () => updateCurrentIndex();
    window.addEventListener("resize", handleResize);

    return () => {
      observer.kill();
      window.removeEventListener("resize", handleResize);
      smoother.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper" className="bg-[#171410]">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
