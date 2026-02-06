"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSwitch = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleSwitch}
      disabled={isPending}
      className="cursor-pointer bg-[#c9a750] hover:bg-[#c9a75094]"
      title={locale === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      <Languages className="h-5 w-5" />
      <span className="sr-only">Switch Language</span>
    </Button>
  );
}
