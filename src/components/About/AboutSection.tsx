"use client";

import TextEffect from "../Custom/TextEffect";
import { useLocale } from "next-intl";

export default function AboutSection() {
  const locale = useLocale();
  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-amber-400 px-4">
      {/* Title */}
      <TextEffect
        animationType="orbitalSpin"
        lang={locale}
        duration={1.5}
        text="This Is An About Section"
        className="text-5xl text-center text-white font-semibold mb-10"
      />
    </section>
  );
}
