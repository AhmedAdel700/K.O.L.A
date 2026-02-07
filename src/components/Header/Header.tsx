"use client";
import { useRef, useState } from "react";
import LanguageSwitcher from "../Custom/LanguageSwitcher";
import DrawerMenu from "./DrawerMenu";
import PopupMenu from "./PopupMenu";
import { Link } from "@/i18n/navigation";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useGSAP } from "@gsap/react";
import { useLocale } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

interface HeaderProps {
  type?: "drawer" | "popup";
}

const HEADER_HEIGHT = 64;

export default function Header({ type = "popup" }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("#home");
  const locale = useLocale();

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact-us" },
  ];

  // ─────────────────────────────────────────────
  // 🎨 Enhanced animations with smooth transitions
  // ─────────────────────────────────────────────
  useGSAP(() => {
    if (!headerRef.current) return;

    // ✨ Smoother header background transition with backdrop blur effect
    ScrollTrigger.create({
      start: 1,
      onEnter: () => {
        gsap.to(headerRef.current, {
          background:
            "linear-gradient(180deg, rgba(230, 213, 192, 0.95) 0%, rgba(230, 213, 192, 0.98) 100%)",
          boxShadow: "0 4px 20px rgba(23, 20, 16, 0.12)",
          backdropFilter: "blur(12px)",
          duration: 0.6,
          ease: "power4.inOut",
        });
      },
      onLeaveBack: () => {
        gsap.to(headerRef.current, {
          background: "transparent",
          boxShadow: "none",
          backdropFilter: "blur(0px)",
          duration: 0.5,
          ease: "power2.inOut",
        });
      },
    });

    // Active section tracking - using center-based detection
    navItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (!section) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(item.href),
        onEnterBack: () => setActiveSection(item.href),
      });
    });
  },    {
      scope: headerRef,
    });

  // ─────────────────────────────────────────────
  // 🎯 Enhanced smooth scroll with easing
  // ─────────────────────────────────────────────
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
    <header
      ref={headerRef}
      data-fixed
      className="fixed top-0 left-0 right-0 z-[999] text-[#171410] transition-all duration-300 md:py-2 animate-header-fade-in opacity-0"
      style={{ backdropFilter: "blur(0px)" }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
        {/* Logo with hover effect */}
        <Link
          ref={logoRef}
          href="#home"
          onClick={(e) => handleScroll(e, "#home")}
          className="flex items-center gap-2 font-bold transition-all duration-300 hover:scale-105"
        >
          <Image
            src={logo}
            alt="Logo"
            width={120}
            height={50}
            className="w-[100px] md:w-[140px] cursor-pointer drop-shadow-[0_0_1px_rgba(255,255,255,1)]"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <div ref={navRef} className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className={`relative text-base font-medium transition-all duration-300 hover:scale-105
                    ${
                      isActive
                        ? "text-[#b2913c]"
                        : "text-[#b2913c] hover:text-[#b2913c]"
                    }
                  `}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-[#503c1b] rounded-full transition-all duration-300 ease-out
                      ${isActive ? "w-full opacity-100" : "w-0 opacity-0"}
                    `}
                  />
                  {/* Hover underline */}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-[#5d492c] rounded-full transition-all duration-300 ease-out opacity-0 hover:opacity-50
                      ${isActive ? "w-0" : "w-0 hover:w-full"}
                    `}
                  />
                </Link>
              );
            })}
          </div>
          <div
            ref={langRef}
            className="transition-all duration-300 hover:scale-105"
          >
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile */}
        <div className="md:hidden">
          {type === "drawer" ? (
            <DrawerMenu navItems={navItems} locale={locale} />
          ) : (
            <PopupMenu navItems={navItems} />
          )}
        </div>
      </div>
    </header>
  );
}
