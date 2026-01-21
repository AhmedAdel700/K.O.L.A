"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "../Custom/LanguageSwitcher";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu, Sparkles } from "lucide-react";

interface DrawerMenuProps {
  navItems: { name: string; href: string }[];
}

export default function DrawerMenu({ navItems }: DrawerMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-accent">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col p-6">
        <SheetHeader className="mb-6 items-start text-left">
          <div className="flex items-center gap-2 font-bold text-2xl mb-2">
            <Sparkles className="h-7 w-7 text-primary" />
            <span>Brand</span>
          </div>
          <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
          <SheetDescription className="text-muted-foreground text-sm">
            Navigate our features below.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 flex flex-col gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-xl font-medium hover:text-primary transition-colors py-2 border-b border-border/50 last:border-0"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Switch Language</span>
            <LanguageSwitcher />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
