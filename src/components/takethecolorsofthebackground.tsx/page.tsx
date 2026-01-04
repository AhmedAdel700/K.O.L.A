"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Mock Hero Component
function Hero() {
  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black relative overflow-hidden">
      <div className="hero-content text-center z-10 px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
          Welcome
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
          Scroll down to experience modern animations
        </p>
      </div>
      <div className="hero-bg absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}

// Mock About Section
function AboutSection() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
      <div className="about-container max-w-6xl mx-auto px-6 py-24">
        <div className="about-header mb-16">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            About Us
          </h2>
          <div className="about-line h-1 bg-gradient-to-r from-purple-500 to-blue-500 w-32"></div>
        </div>

        <div className="about-grid grid md:grid-cols-2 gap-12">
          <div className="about-card bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-white mb-4">Innovation</h3>
            <p className="text-gray-300 leading-relaxed">
              We push boundaries and create cutting-edge solutions that
              transform industries and inspire change.
            </p>
          </div>

          <div className="about-card bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
            <div className="text-6xl mb-4">💡</div>
            <h3 className="text-2xl font-bold text-white mb-4">Creativity</h3>
            <p className="text-gray-300 leading-relaxed">
              Our team brings fresh perspectives and innovative thinking to
              every project we undertake.
            </p>
          </div>

          <div className="about-card bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
            <div className="text-6xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold text-white mb-4">Performance</h3>
            <p className="text-gray-300 leading-relaxed">
              Speed and efficiency are at the core of everything we build and
              deliver to our clients.
            </p>
          </div>

          <div className="about-card bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-white mb-4">Precision</h3>
            <p className="text-gray-300 leading-relaxed">
              Attention to detail and meticulous execution ensure exceptional
              results every time.
            </p>
          </div>
        </div>
      </div>

      <div className="about-bg-shapes absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from(".hero-content", {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".hero-bg > div", {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out",
      });

      // About section entrance
      gsap.from(".about-header", {
        scrollTrigger: {
          trigger: ".about-header",
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -100,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".about-line", {
        scrollTrigger: {
          trigger: ".about-line",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        width: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.inOut",
      });

      // Stagger cards with scale and fade
      gsap.from(".about-card", {
        scrollTrigger: {
          trigger: ".about-grid",
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 80,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
      });

      // Parallax background shapes
      gsap.to(".about-bg-shapes > div:nth-child(1)", {
        scrollTrigger: {
          trigger: ".about-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -150,
        x: 100,
        rotation: 45,
      });

      gsap.to(".about-bg-shapes > div:nth-child(2)", {
        scrollTrigger: {
          trigger: ".about-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: 150,
        x: -100,
        rotation: -45,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Hero />
      <AboutSection />
    </div>
  );
}
