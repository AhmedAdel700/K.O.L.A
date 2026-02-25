"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import RiskManagement from "./RiskManagement";
import QualityControl from "./QualityControl";
import ExecutionStandard from "./ExecutionStandard";
import StepByStepExecution from "./StepByStepExecution";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Divider = () => (
  <div
    className="h-px w-full"
    style={{ background: "linear-gradient(to right, transparent, rgba(201,167,80,0.2), transparent)" }}
  />
);

export default function ExecutionProcess() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Risk
      gsap.from(".risk-label", { y: 24, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".risk-label", start: "top 87%", toggleActions: "play none none reverse" } });
      gsap.from(".risk-title", { y: 50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".risk-title", start: "top 87%", toggleActions: "play none none reverse" } });
      gsap.from(".risk-card", { y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: ".risk-grid", start: "top 80%", toggleActions: "play none none reverse" } });

      // Quality
      gsap.from(".qc-label", { y: 24, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".qc-label", start: "top 87%", toggleActions: "play none none reverse" } });
      gsap.from(".qc-title", { y: 50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".qc-title", start: "top 87%", toggleActions: "play none none reverse" } });
      gsap.from(".qc-row", { x: -40, opacity: 0, duration: 0.75, stagger: 0.14, ease: "power3.out", scrollTrigger: { trigger: ".qc-list", start: "top 80%", toggleActions: "play none none reverse" } });
      gsap.from(".qc-line", { scaleY: 0, transformOrigin: "top center", duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: ".qc-list", start: "top 78%", toggleActions: "play none none reverse" } });

      // Standards — once only, never reverse to invisible
      gsap.from(".std-label", { y: 24, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".std-label", start: "top 87%", toggleActions: "play none none none" } });
      gsap.from(".std-title", { y: 50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".std-title", start: "top 87%", toggleActions: "play none none none" } });
      
      // Vertical timeline draw effect
      gsap.from(".std-timeline", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.5,
        ease: "none",
        scrollTrigger: {
          trigger: ".std-list",
          start: "top 80%",
          end: "bottom 80%",
          scrub: 1,
        }
      });

      // Individual Standard Items
      const stdItems = gsap.utils.toArray(".std-item");
      stdItems.forEach((item: any) => {
        gsap.from(item, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        });
      });

      gsap.from(".std-statement", { y: 30, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".std-statement", start: "top 85%", toggleActions: "play none none none" } });

      // Execution steps
      gsap.from(".ep-label", { y: 24, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".ep-label", start: "top 85%", toggleActions: "play none none reverse" } });
      gsap.from(".ep-title", { y: 60, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: ".ep-title", start: "top 85%", toggleActions: "play none none reverse" } });
      gsap.from(".ep-divider", { scaleX: 0, transformOrigin: "left center", duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".ep-divider", start: "top 88%", toggleActions: "play none none reverse" } });
      gsap.from(".exec-card", { y: 80, opacity: 0, duration: 0.85, stagger: 0.18, ease: "power3.out", scrollTrigger: { trigger: ".exec-steps", start: "top 78%", toggleActions: "play none none reverse" } });
      gsap.from(".exec-connector", { scaleX: 0, transformOrigin: "left center", duration: 0.7, stagger: 0.18, delay: 0.3, ease: "power2.out", scrollTrigger: { trigger: ".exec-steps", start: "top 75%", toggleActions: "play none none reverse" } });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="execution-process"
      ref={sectionRef}
      className="relative overflow-hidden px-6 md:px-12 lg:px-20"
    >
      {/* Grain overlay */}
      {/* <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      /> */}

      <div className="relative max-w-[1550px] mx-auto">
        <RiskManagement />
        <Divider />
        <QualityControl />
        <Divider />
        <ExecutionStandard />
        <Divider />
        <StepByStepExecution />
      </div>
    </section>
  );
}