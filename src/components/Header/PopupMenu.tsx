"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "../Custom/LanguageSwitcher";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface PopupMenuProps {
  navItems: { name: string; href: string }[];
}

export default function PopupMenu({ navItems }: PopupMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(containerRef.current, {
        height: "calc(100vh - 64px)",
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.fromTo(
        ".menu-link",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2, ease: "power2.out" }
      );
    } else {
      gsap.to(containerRef.current, {
        height: 0,
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, { dependencies: [isOpen] });

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-accent relative z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        <span className="sr-only">Toggle menu</span>
      </Button>

      <div
        ref={containerRef}
        className="fixed top-16 left-0 w-full bg-background/98 backdrop-blur-xl border-b z-40 overflow-hidden h-0 md:hidden"
      >
        <div className="container mx-auto px-4 py-8 flex flex-col h-full" ref={linksRef}>
          <div className="flex-1 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="menu-link group flex items-center justify-between p-4 text-2xl font-medium rounded-xl hover:bg-accent/50 transition-colors opacity-0"
              >
                <span>{item.name}</span>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>

          <div className="menu-link p-4 mt-auto border-t border-border/50 flex items-center justify-between opacity-0">
            <span className="font-medium text-muted-foreground">Language</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}
