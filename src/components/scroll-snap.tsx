"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Observer } from "gsap/all";

gsap.registerPlugin(Observer, ScrollSmoother);

export default function ScrollSnapManager() {
  const isAnimating = useRef(false);

  useEffect(() => {
    const smoother = ScrollSmoother.get();
    if (!smoother) return;

    const sections = gsap.utils.toArray<HTMLElement>(".snap-section");
    if (sections.length === 0) return;

    let currentIndex = -1;

    // Function to calculate current index based on scroll position
    const updateCurrentIndex = () => {
      const scrollY = smoother.scrollTop();
      let closestIndex = 0;
      let minDistance = Math.abs(scrollY - sections[0].offsetTop);

      sections.forEach((section, index) => {
        const distance = Math.abs(scrollY - section.offsetTop);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });
      currentIndex = closestIndex;
    };

    updateCurrentIndex();

    const goToSection = (index: number) => {
      if (index < 0 || index >= sections.length || isAnimating.current) return;

      isAnimating.current = true;
      currentIndex = index;

      const targetY = sections[index].offsetTop;

      gsap.to(smoother, {
        scrollTop: targetY,
        duration: 1.2,
        ease: "power2.inOut",
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    };

    const obs = Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => !isAnimating.current && goToSection(currentIndex - 1),
      onUp: () => !isAnimating.current && goToSection(currentIndex + 1),
      tolerance: 10,
      preventDefault: true,
    });

    // Handle window resize
    const handleResize = () => {
        updateCurrentIndex();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      obs.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null;
}
