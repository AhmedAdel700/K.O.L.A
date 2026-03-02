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
    { number: 50, label: t("Projects Delivered") },
    { number: 145, label: t("Collaborations") },
    { number: 300, label: t("Business Clients Reached") },
    { number: 8, label: t("Projects Per Year") },
  ];

  const values = [t("QUALITY"), t("CLARITY"), t("TIME SAVING")];

  const bulletPoints = [
    { label: t("Executive-Level Project Oversight"),   icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
    { label: t("Transparent Financial Tracking"),       icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { label: t("Controlled Timeline Execution"),        icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: t("Risk Anticipation & Mitigation"),       icon: "M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" },
    { label: t("Structured Reporting & Accountability"),icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden pt-28 pb-20 px-6 md:px-12 lg:px-20"
    >
      <div className="relative max-w-7xl mx-auto">

        {/* ── CENTERED HEADER ── */}
        <div className="about-header text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-[#c9a750] text-xs font-bold tracking-[0.5em] uppercase">{t("About Us")}</span>
            <div className="about-header-line h-0.5 w-full bg-gradient-to-r from-transparent via-[#c9a750] to-transparent mt-2"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight">
            <span className="text-[#e6d5c0] block">{t("About-section").split(".")[0]}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c9a750] via-[#e6c97a] to-[#b2913c] animate-gradient mt-3">
              {t("About-section").split(".")[1]}
            </span>
          </h2>
        </div>

        {/* ── MAIN CONTENT GRID ── */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20 items-center">

          {/* LEFT: Capability list + quote + specialisation */}
          <div className="about-description flex flex-col gap-10">
            {/* Bullet list – 2-col grid, last item full-width */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {bulletPoints.map((point, i) => (
                <div key={i} className={`group flex items-center gap-4 p-4 rounded-xl border border-[#c9a750]/10 bg-[#1a1712] hover:border-[#c9a750]/35 transition-all duration-400${ i === bulletPoints.length - 1 ? " md:col-span-2" : ""}`}>
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-[#c9a750]/8 text-[#c9a750] group-hover:bg-[#c9a750] group-hover:text-[#171410] transition-all duration-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d={point.icon} />
                    </svg>
                  </div>
                  <span className="text-[#e6d5c0]/80 text-sm font-semibold leading-snug group-hover:text-[#e6d5c0] transition-colors">{point.label}</span>
                </div>
              ))}
            </div>

            {/* Mindset quote */}
            <div className="relative pl-6 border-l-2 border-[#c9a750]">
              <p className="text-[#c9a750] text-xl md:text-2xl font-bold italic leading-snug">
                &ldquo;{t("Mindset Quote")}&rdquo;
              </p>
            </div>

            {/* Specialisation */}
            <p className="text-[#e6d5c0]/60 text-base md:text-lg leading-relaxed">
              {t("Specialization")}
            </p>

            {/* Value Pills – refined */}
            <div className="flex flex-wrap gap-3 pt-2">
              {values.map((v) => (
                <span key={v} className="about-value-tag group flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#c9a750]/20 bg-[#c9a750]/5 text-[#c9a750] text-[11px] font-black tracking-[0.25em] uppercase hover:bg-[#c9a750] hover:text-[#171410] hover:border-[#c9a750] transition-all duration-400 cursor-default">
                  <span className="w-1 h-1 rounded-full bg-current"></span>
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT: Image – stretched to match left height */}
          <div className="hidden lg:flex about-content-right self-stretch">
            <div className="relative w-full rounded-3xl overflow-hidden border border-[#c9a750]/20 group hover:border-[#c9a750]/50 transition-all duration-700 shadow-2xl min-h-[500px]">
              <Image
                src={aboutImg}
                alt="KOIA Execution"
                fill
                className="object-cover brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171410] via-[#171410]/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-700"></div>
            </div>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="about-divider h-px bg-gradient-to-r from-transparent via-[#c9a750]/40 to-transparent mb-20"></div>

        {/* ── STATS — untouched ── */}
        <div className="about-stats-container grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="about-stat-item group relative text-center py-10 px-4 md:px-8 bg-gradient-to-br from-[#1f1b16] to-[#171410] rounded-3xl border border-[#c9a750]/10 hover:border-[#c9a750]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#c9a750]/5 overflow-hidden"
            >
              <span className="pointer-events-none absolute -bottom-6 -right-4 text-[9rem] font-black text-[#c9a750]/4 leading-none select-none group-hover:text-[#c9a750]/8 transition-colors">{stat.number}</span>

              <div className="relative z-10">
                <div
                  ref={(el) => { statRefs.current[index] = el; }}
                  data-value={stat.number}
                  className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#c9a750] via-[#b2913c] to-[#8c6d3b] mb-4"
                >
                  0+
                </div>
                <div className="h-px w-10 bg-[#c9a750] mx-auto mb-4 group-hover:w-16 transition-all duration-500"></div>
                <div className="text-[#e6d5c0]/60 text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM DIVIDER ── */}
        <div className="about-divider mt-20 h-px bg-gradient-to-r from-transparent via-[#c9a750]/20 to-transparent"></div>
      </div>
    </section>
  );
}

