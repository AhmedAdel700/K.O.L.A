"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import aboutImg from "@/assets/3.jpg";
import { useTranslations } from "next-intl";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const t = useTranslations("home");

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
      onComplete: () => {
        // ✅ RUN COUNTING LOGIC ONLY AFTER ALL ANIMATIONS
        statRefs.current.forEach((el, index) => {
          if (!el) return;

          const endValue = Number(el.dataset.value) || 0;
          let current = 0;

          // reset text hard
          el.innerText = `0${index === 3 ? "" : "+"}`;

          const duration = 2000; // total time in ms
          const stepTime = 20; // update interval
          const steps = duration / stepTime;
          const increment = endValue / steps;

          const counter = setInterval(() => {
            current += increment;

            if (current >= endValue) {
              current = endValue;
              clearInterval(counter);
            }

            el.innerText = Math.floor(current) + (index === 3 ? "" : "+");
          }, stepTime);
        });
      },
    });

    // Header
    tl.from(".about-header", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    tl.from(
      ".about-header-line",
      {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1,
        ease: "power3.out",
      },
      "-=0.5",
    );

    // Content
    tl.from(
      ".about-description",
      {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.5",
    );

    tl.from(
      ".about-content-right",
      {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.8",
    );

    // Value Tags
    tl.from(
      ".about-value-tag",
      {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      "-=0.5",
    );

    // Divider
    tl.from(
      ".about-divider",
      {
        scaleX: 0,
        transformOrigin: "center",
        duration: 1.5,
        ease: "power3.inOut",
      },
      "-=0.5",
    );

    // Stats Container
    tl.from(
      ".about-stats-container",
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.3",
    );
  }, []);

  const stats = [
    { number: 150, label: "Projects Delivered" },
    { number: 345, label: "Collaborations" },
    { number: 500, label: "Business Clients Reached" },
    { number: 50, label: "Projects Per Year" },
  ];

  const values = [t("QUALITY"), t("CLARITY"), t("TIME SAVING")];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden pt-16 px-6 md:px-12 lg:px-20"
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 mb-12 items-stretch">
          {/* Left Column */}
          <div className="about-content-left flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="about-header mb-8">
                <div className="inline-block mb-4">
                  <span className="text-[#c9a750] text-sm font-semibold tracking-[0.3em] uppercase">
                    {t("About Us")}
                  </span>
                  <div className="about-header-line h-0.5 w-full bg-gradient-to-r from-[#c9a750] to-transparent mt-2"></div>
                </div>
                <h2 className="text-5xl md:text-7xl font-bold text-[#e6d5c0] leading-tight">
                  {t("About-section")}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a750] via-[#b2913c] to-[#8c6d3b] animate-gradient">
                    K.O.I.A
                  </span>
                </h2>
              </div>

              <div className="about-description">
                <p className="text-[#e6d5c0] text-lg md:text-xl leading-relaxed mb-8">
                  K.O.I.A Construction delivers{" "}
                  <span className="text-[#c9a750] font-semibold">
                    high-end interior finishing
                  </span>{" "}
                  with controlled execution across commercial, residential, and
                  branded environments.
                </p>
                <p className="text-[#e6d5c0]/80 text-lg leading-relaxed">
                  We manage delivery with discipline and coordination to ensure
                  predictable results, lower risk, and faster handover.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-between sm:justify-start sm:gap-5 items-center">
              {values.map((value) => (
                <div
                  key={value}
                  className="about-value-tag inline-block bg-[#c9a750]/10 text-[#c9a750] px-4 md:px-6 py-2 rounded-full text-sm font-medium mb-2"
                >
                  {value}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="hidden lg:flex about-content-right">
            <div className="relative w-full rotate-180 h-full rounded-2xl overflow-hidden border border-[#c9a750]/20 hover:border-[#c9a750] transition-all duration-500 hover:shadow-2xl hover:shadow-[#c9a750]/20">
              <Image
                src={aboutImg}
                alt="About KOIA"
                fill
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="about-divider relative h-px bg-gradient-to-r from-transparent via-[#c9a750] to-transparent mb-12"></div>

        {/* Stats */}
        <div className="about-stats-container grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="about-stat-item group relative text-center py-8 px-2 md:px-6 bg-gradient-to-br from-[#3b3121]/50 to-[#5d492c]/30 rounded-xl border border-[#c9a750]/10 hover:border-[#c9a750]/50 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-[#c9a750]/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a750]/0 via-[#c9a750]/0 to-[#c9a750]/0 group-hover:from-[#c9a750]/5 group-hover:via-[#c9a750]/10 group-hover:to-[#c9a750]/5 rounded-xl transition-all duration-500"></div>

              <div className="relative z-10">
                <div
                  ref={(el) => {
                    statRefs.current[index] = el;
                  }}
                  data-value={stat.number}
                  className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#c9a750] via-[#b2913c] to-[#8c6d3b] mb-3 group-hover:scale-110 transition-transform duration-300"
                >
                  0{index === 3 ? "" : "+"}
                </div>
                <div className="h-0.5 w-12 bg-[#c9a750] mx-auto mb-3 group-hover:w-full transition-all duration-500"></div>
                <div className="text-[#e6d5c0]/70 text-sm md:text-base font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="about-divider mt-12 relative h-px bg-gradient-to-r from-transparent via-[#c9a750] to-transparent mb-20"></div>
      </div>
    </section>
  );
}
