"use client";

import { useTranslations } from "next-intl";
import TextEffect from "../Custom/TextEffect";

export default function Hero() {
  const t = useTranslations("home");
  return (
    <main className="h-screen bg-amber-600 flex items-center justify-center">
      <TextEffect
        animationType="electricArc"
        lang="en"
        duration={1.5}
        text={t("This Is A Test")}
        className="text-5xl text-center text-white font-semibold"
      />
    </main>
  );
}
