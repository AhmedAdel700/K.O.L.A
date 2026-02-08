"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import logo from "@/assets/logo.png";
import { Link } from "@/i18n/navigation";
import ScrollSmoother from "gsap/ScrollSmoother";
import gsap from "gsap";
import { useTranslations } from "next-intl";

const HEADER_HEIGHT = 64;

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);

  const t = useTranslations("home");

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 },
    );

    if (elementsRef.current) {
      const animatedElements =
        elementsRef.current.querySelectorAll(".animate-on-scroll");
      animatedElements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  const footerLinks = {
    company: [
      { name: t("Home"), href: "#hero" },
      { name: t("About"), href: "#about" },
      { name: t("Services"), href: "#services" },
      { name: t("Projects"), href: "#projects" },
      { name: t("Contact"), href: "#contact-us" },
    ],
    services: [
      { name: t("Design") },
      { name: t("Contracting") },
      { name: t("Project Management") },
      { name: t("Fit-Out & Execution") },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: "#",
    },
    {
      name: "Instagram",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
        </svg>
      ),
      href: "#",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      href: "#",
    },
    {
      name: "Twitter",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: "#",
    },
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 5px rgba(201, 167, 80, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(201, 167, 80, 0.4);
          }
        }

        .animate-on-scroll {
          opacity: 0;
        }

        .animate-on-scroll.animate-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-on-scroll.delay-1 {
          animation-delay: 0.1s;
        }

        .animate-on-scroll.delay-2 {
          animation-delay: 0.2s;
        }

        .animate-on-scroll.delay-3 {
          animation-delay: 0.3s;
        }

        .animate-on-scroll.delay-4 {
          animation-delay: 0.4s;
        }

        .shimmer-line {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(201, 167, 80, 0.3),
            transparent
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      <footer
        ref={footerRef}
        id="footer"
        className="relative border-t border-[#c9a750]/20 overflow-hidden"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #c9a750 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* Main Footer Content */}
        <div
          ref={elementsRef}
          className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-6"
        >
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
            {/* Brand Section */}
            <div className="lg:col-span-4 animate-on-scroll">
              <div className="mb-6">
                <div className="transform transition-all duration-500 hover:scale-105">
                  <Image src={logo} alt="Logo" width={120} height={40} />
                </div>
                <div className="h-1 w-20 bg-gradient-to-r from-[#c9a750] to-transparent mt-2 animate-on-scroll delay-1"></div>
              </div>
              <p className="text-[#e6d5c0]/70 text-base leading-relaxed mb-6 animate-on-scroll delay-2">
                {t(
                  "Delivering high-end interior finishing with controlled execution across commercial, residential, and branded environments",
                )}
              </p>
              {/* Social Links */}
              <div className="flex gap-4 animate-on-scroll delay-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="group w-10 h-10 rounded-lg bg-[#3b3121]/50 border border-[#c9a750]/20 flex items-center justify-center text-[#c9a750] hover:bg-[#c9a750] hover:text-[#171410] hover:border-[#c9a750] transition-all duration-300 hover:scale-110"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    aria-label={social.name}
                  >
                    <div className="transform transition-transform duration-300 group-hover:scale-110">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div className="lg:col-span-4 animate-on-scroll delay-2">
              <h4 className="text-[#e6d5c0] text-lg font-bold mb-6 uppercase tracking-wider relative inline-block">
                {t("Sections")}
                <div className="absolute -bottom-2 left-0 h-0.5 w-12 bg-[#c9a750] shimmer-line"></div>
              </h4>
              <ul className="grid grid-cols-3">
                {footerLinks.company.map((link, index) => (
                  <li
                    key={link.name}
                    className="animate-on-scroll"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      className="group text-[#e6d5c0]/70 hover:text-[#c9a750] transition-all duration-300 flex items-center gap-2 py-1"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-[#c9a750] transition-all duration-300"></span>
                      <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div className="lg:col-span-4 animate-on-scroll delay-3">
              <h4 className="text-[#e6d5c0] text-lg font-bold mb-6 uppercase tracking-wider relative inline-block">
                {t("Services")}
                <div className="absolute -bottom-2 left-0 h-0.5 w-12 bg-[#c9a750] shimmer-line"></div>
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li
                    key={link.name}
                    className="animate-on-scroll"
                    style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  >
                    <div className="text-[#e6d5c0]/70 flex items-center gap-2 py-1">
                      <span className="w-1 h-px bg-[#c9a750]/30"></span>
                      <span>{link.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a750]/30 to-transparent mb-6 animate-on-scroll delay-4 shimmer-line"></div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 animate-on-scroll delay-4">
            <p className="text-[#e6d5c0]/60 text-sm">
              {t("All Rights Reserved")}{" "}
              <span className="text-orange-400 font-medium hover:text-[#c9a750] transition-colors duration-300 cursor-default">
                Be Group
              </span>{" "}
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>

        {/* Decorative Bottom Accent */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#c9a750] to-transparent shimmer-line"></div>
      </footer>
    </>
  );
}
