"use client";

// import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "../Custom/LanguageSwitcher";
import { Sparkles } from "lucide-react";
import DrawerMenu from "./DrawerMenu";
import PopupMenu from "./PopupMenu";
import TransitionLink from "../Custom/TransitionLink";

interface HeaderProps {
    type?: "drawer" | "popup";
}

export default function Header({ type = "popup" }: HeaderProps) {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-transparent text-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between relative z-50">
        {/* Logo */}
        <TransitionLink href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity text-black">
          <Sparkles className="h-6 w-6 text-primary" />
          <span>Brand</span>
        </TransitionLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
                <TransitionLink
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-black"
                >
                {item.name}
                </TransitionLink>
            ))}
          </div>
          <div className="h-4 w-px bg-border" />
          <LanguageSwitcher />
        </nav>

        {/* Mobile Nav Trigger */}
        <div className="md:hidden">
          {type === "drawer" ? (
            <DrawerMenu navItems={navItems} />
          ) : (
             <PopupMenu navItems={navItems} />
          )}
        </div>
      </div>
    </header>
  );
}
