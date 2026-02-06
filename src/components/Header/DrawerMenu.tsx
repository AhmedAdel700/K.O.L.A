"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "../Custom/LanguageSwitcher";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { ScrollSmoother } from "gsap/all";

interface DrawerMenuProps {
  navItems: { name: string; href: string }[];
  locale: string;
}

export default function DrawerMenu({ navItems, locale }: DrawerMenuProps) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      navItems.forEach((item) => {
        const el = document.querySelector(item.href);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          setActiveSection(item.href);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const HEADER_OFFSET = 64; // offset in px

  const handleClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    const smoother = ScrollSmoother.get();
    const section = document.querySelector(target);
    if (!smoother || !section) return;

    // Calculate target position minus header offset
    const top =
      section.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

    // Scroll to that position smoothly
    smoother.scrollTo(top, true);

    // Close drawer
    setOpen(false);
  };

  const drawerSide = locale === "ar" ? "left" : "right";
  const menuAlignment =
    locale === "en" ? "items-start text-left" : "items-end text-right";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <SheetTrigger asChild>
        <Menu className="h-8 w-8 text-[var(--color-dark-ui)] cursor-pointer" />
      </SheetTrigger>

      {/* Drawer Content */}
      <SheetContent
        side={drawerSide}
        className={`w-[300px] sm:w-[400px] flex flex-col p-6 bg-gradient-to-b from-[var(--color-primary-bg)] to-[var(--color-accent-bronze)] text-[var(--color-text-primary)] z-[9999]`}
      >
        <SheetTitle>
          <span className="sr-only">Navigation Menu</span>
        </SheetTitle>

        {/* Header with Logo */}
        <SheetHeader className={`mb-6 flex flex-col ${menuAlignment}`}>
          <Link
            href="#hero"
            onClick={(e) => handleClick(e, "#hero")}
            className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity"
          >
            <Image src={logo} alt="Logo" width={200} height={60} />
          </Link>
        </SheetHeader>

        {/* Navigation Links - scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className={`flex flex-col gap-4 ${menuAlignment} pr-2`}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`
                  text-xl font-medium py-3 px-4 w-full text-center rounded-md
                  border border-[var(--color-dark-secondary)]/50
                  transition-all duration-200
                  hover:bg-[var(--color-dark-secondary)]/20
                  hover:text-[var(--color-secondary-gold)]
                  active:bg-[var(--color-dark-secondary)]/40
                  active:scale-95
                  ${activeSection === item.href ? "bg-[var(--color-dark-secondary)]/40 text-[var(--color-secondary-gold)]" : ""}
                `}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Language Switcher */}
        <div className="mt-auto pt-6 border-t border-[var(--color-dark-secondary)]/50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text-secondary)]">
              Switch Language
            </span>
            <LanguageSwitcher />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
