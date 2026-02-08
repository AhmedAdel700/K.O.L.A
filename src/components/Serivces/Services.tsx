"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import serviceImg1 from "@/assets/service1.jpg";
import serviceImg2 from "@/assets/service2.jpg";
import serviceImg3 from "@/assets/service3.jpg";
import serviceImg4 from "@/assets/serivce4.jpg";
import { useLocale, useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export default function KoiaServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("home");
  const locale = useLocale();
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Header Animation
      tl.from(".services-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Header Line Animation
      tl.from(
        ".services-header-line",
        {
          scaleX: 0,
          transformOrigin: "center",
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5",
      );

      // Service Cards Animation
      tl.from(
        ".service-card",
        {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2, // Stagger effect for cards
          ease: "power3.out",
        },
        "-=0.5",
      );

      // Button Animation
      tl.from(
        ".services-btn",
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.2",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      number: "01",
      title: "DESIGN",
      description:
        "Strategic spatial planning and design development that merges form with function.",
      image: serviceImg1,
    },
    {
      number: "02",
      title: "CONTRACTING",
      description:
        "Full-scope construction delivery with transparent timelines and budget control.",
      image: serviceImg2,
    },
    {
      number: "03",
      title: "PROJECT MANAGEMENT",
      description:
        "Coordinated oversight ensuring seamless execution from inception to completion.",
      image: serviceImg3,
    },
    {
      number: "04",
      title: "FIT-OUT & EXECUTION",
      description:
        "Precision interior installation with attention to every finish and detail.",
      image: serviceImg4,
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative min-h-fit bg-[#171410] overflow-hidden pb-6 pt-10 pb-32 px-6 md:px-12 lg:px-20"
    >
      <div className="relative max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="services-header text-center mb-8">
          <div className="inline-block">
            <span className="text-[#c9a750] text-sm font-semibold tracking-[0.3em] uppercase">
              {t("Our Expertise")}
            </span>
            <div className="services-header-line h-0.5 w-full bg-gradient-to-r from-transparent via-[#c9a750] to-transparent mt-2"></div>
          </div>
          <h2 className="text-6xl md:text-8xl font-bold text-[#e6d5c0] leading-tight">
            {t("OUR")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a750] via-[#b2913c] to-[#8c6d3b] animate-gradient">
              {locale === "en" ? "SERVICES" : ""}
            </span>
          </h2>
        </div>

        {/* Services Horizontal Scroll */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.number} className="service-card group relative">
                {/* Card Container */}
                <div className="relative h-[500px] rounded-3xl overflow-hidden border border-[#c9a750]/20 hover:border-[#c9a750]/60 transition-all duration-1000 ease-out">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="w-full h-full object-cover transition-all duration-[1500ms] group-hover:scale-110 group-hover:brightness-75 ease-out"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#171410]/60 via-[#171410]/80 to-[#171410]"></div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    {/* Top: Number */}
                    <div className="relative">
                      <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#c9a750]/30 to-[#8c6d3b]/30 group-hover:from-[#c9a750] group-hover:to-[#8c6d3b] transition-all duration-700 leading-none">
                        {service.number}
                      </div>
                    </div>

                    {/* Bottom: Title & Description */}
                    <div>
                      {/* Divider Line */}
                      <div className="h-px w-full bg-gradient-to-r from-[#c9a750] to-transparent mb-6 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>

                      {/* Title */}
                      <h3 className="text-4xl font-bold text-[#e6d5c0] mb-4 tracking-wider">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[#e6d5c0]/70 text-lg leading-relaxed transform opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                        {service.description}
                      </p>
                    </div>

                    <div></div>
                  </div>

                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#c9a750]/0 via-[#c9a750]/0 to-[#c9a750]/0 group-hover:from-[#c9a750]/10 group-hover:via-[#c9a750]/5 transition-all duration-700 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}
