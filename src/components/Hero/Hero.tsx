'use client';

import { useState, useEffect } from 'react';
import img1 from '@/assets/service1.jpg';
import img2 from '@/assets/service2.jpg';
import img3 from '@/assets/service3.jpg';
import img4 from '@/assets/serivce4.jpg';
import Image, { StaticImageData } from 'next/image';

interface Project {
  id: number;
  image: string | StaticImageData;
  title: string;
}

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Sample projects - replace with your actual project data
  const projects: Project[] = [
    { id: 1, image: img1, title: 'Luxury Office' },
    { id: 2, image: img2, title: 'Modern Workspace' },
    { id: 3, image: img3, title: 'Executive Suite' },
    { id: 4, image: img4, title: 'Corporate Lobby' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [projects.length]);

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-[var(--color-dark-ui)]"
      id="#hero"
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
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-dark-ui)]/65 via-[var(--color-dark-ui)]/75 to-[var(--color-dark-secondary)]/65 z-10" />
            <Image
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary-bg)]/10 rounded-full blur-3xl animate-pulse-slow z-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--color-accent-bronze)]/10 rounded-full blur-3xl animate-pulse-slower z-20" />

      {/* Content Container */}
      <div className="relative z-30 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl">
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up-delay-1">
              <span className="block text-[var(--color-text-secondary)] leading-tight mb-2">
                Make Your
              </span>
              <span className="block bg-gradient-to-r from-[var(--color-primary-bg)] via-[var(--color-secondary-gold)] to-[var(--color-accent-bronze)] bg-clip-text text-transparent leading-tight">
                Commercial Space
              </span>
              <span className="block text-[var(--color-text-secondary)] leading-tight">
                Stand Out
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)]/80 mb-10 max-w-2xl leading-relaxed animate-fade-in-up-delay-2">
              K.O.I.A delivers high-end interior finishing with controlled
              execution, ensuring predictable results and faster handover.
            </p>

            {/* CTA Button */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up-delay-3">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-[var(--color-primary-bg)] to-[var(--color-secondary-gold)] rounded-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[var(--color-primary-bg)]/50">
                <span className="relative z-10 text-[var(--color-text-primary)] font-semibold text-lg tracking-wide flex items-center gap-2">
                  View Projects
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary-gold)] to-[var(--color-accent-bronze)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex gap-2 mt-16 animate-fade-in-up-delay-4">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className="group relative h-1 w-12 bg-[var(--color-text-secondary)]/20 rounded-full overflow-hidden transition-all duration-300 hover:bg-[var(--color-text-secondary)]/30"
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
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-fade-in-up-delay-1 {
          animation: fade-in-up 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-fade-in-up-delay-2 {
          animation: fade-in-up 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-fade-in-up-delay-3 {
          animation: fade-in-up 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }

        .animate-fade-in-up-delay-4 {
          animation: fade-in-up 0.8s ease-out 0.8s forwards;
          opacity: 0;
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