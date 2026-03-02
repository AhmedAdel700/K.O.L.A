"use client";

import { useState, useEffect } from "react";
import img1 from "@/assets/service1.jpg";
import img2 from "@/assets/service2.jpg";
import img3 from "@/assets/service3.jpg";
import img4 from "@/assets/serivce4.jpg";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useTranslations } from "next-intl";

interface Project {
  id: number;
  image: string | StaticImageData;
  title: string;
}

const HEADER_HEIGHT = 64;

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = useTranslations("home");

  // Sample projects - replace with your actual project data
  const projects: Project[] = [
    { id: 1, image: img1, title: "Luxury Office" },
    { id: 2, image: img2, title: "Modern Workspace" },
    { id: 3, image: img3, title: "Executive Suite" },
    { id: 4, image: img4, title: "Corporate Lobby" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [projects.length]);

  const handleScroll = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    const smoother = ScrollSmoother.get();
    const section = document.querySelector(target);
    if (!smoother || !section) return;

    const top =
      section.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
    const scrollProxy = { y: smoother.scrollTop() };

    gsap.to(scrollProxy, {
      y: top,
      duration: 1.5,
      ease: "power3.inOut",
      onUpdate: () => {
        smoother.scrollTo(scrollProxy.y, false);
      },
    });
  };

  return (
    <section
      className="relative flex flex-col py-20 min-h-[100svh] xl:h-screen w-full overflow-hidden"
      id="home"
    >
      {/* Animated Background Slider */}
      <div className="absolute inset-0">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-dark-ui)]/75 via-[var(--color-dark-ui)]/85 to-[var(--color-dark-secondary)]/75 z-10" />
            <Image
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-30 flex-1 flex items-center w-full">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl">
            {/* Main Heading */}
            <h1 className="text-[clamp(2.4rem,6vw,6rem)] font-bold mb-6 animate-fade-in-up-delay-1 opacity-0">
              <span className="block text-[var(--color-text-secondary)] leading-tight mb-2">
                {t("Make Your")}
              </span>
              <span className="block bg-gradient-to-r from-[var(--color-primary-bg)] via-[var(--color-secondary-gold)] to-[var(--color-accent-bronze)] bg-clip-text text-transparent leading-tight">
                {t("Commercial Space")}
              </span>
              <span className="block text-[var(--color-text-secondary)] leading-tight">
                {t("Stand Out")}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)]/80 mb-5 xl:mb-10 max-w-2xl leading-relaxed animate-fade-in-up-delay-2 opacity-0">
              {t("Subheadline")}
            </p>


            {/* CTA Button */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up-delay-3 opacity-0">
              <button
                suppressHydrationWarning
                onClick={(e) => handleScroll(e, "#projects")}
                className="group cursor-pointer relative px-10 py-4 bg-gradient-to-r from-[var(--color-primary-bg)] to-[var(--color-secondary-gold)] rounded-md overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 text-[var(--color-dark-secondary)] font-semibold text-xl tracking-wide flex items-center gap-2">
                  {t("View Projects")}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary-gold)] to-[var(--color-accent-bronze)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex gap-2 mt-8 xl:mt-12 animate-fade-in-up-delay-4 opacity-0">
              {projects.map((_, index) => (
                <button
                  key={index}
                  suppressHydrationWarning
                  onClick={() => setCurrentSlide(index)}
                  className="group relative cursor-pointer h-1 w-12 bg-[var(--color-text-secondary)]/20 rounded-full overflow-hidden transition-all duration-300 hover:bg-[var(--color-text-secondary)]/30"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-[var(--color-primary-bg)] to-[var(--color-secondary-gold)] transition-all duration-300 ${
                      index === currentSlide ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap");

        section {
          font-family: "Inter", sans-serif;
        }

        h1 {
          font-family: "Playfair Display", serif;
          font-weight: 900;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes pulse-slower {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-up {
          opacity: 0;
          animation: fade-in-up 0.8s ease-out forwards;
          animation-fill-mode: both;
        }

        .animate-fade-in-up-delay-1 {
          opacity: 0;
          animation: fade-in-up 0.8s ease-out 0.2s forwards;
          animation-fill-mode: both;
        }

        .animate-fade-in-up-delay-2 {
          opacity: 0;
          animation: fade-in-up 0.8s ease-out 0.4s forwards;
          animation-fill-mode: both;
        }

        .animate-fade-in-up-delay-3 {
          opacity: 0;
          animation: fade-in-up 0.8s ease-out 0.6s forwards;
          animation-fill-mode: both;
        }

        .animate-fade-in-up-delay-4 {
          opacity: 0;
          animation: fade-in-up 0.8s ease-out 0.8s forwards;
          animation-fill-mode: both;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 5s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
