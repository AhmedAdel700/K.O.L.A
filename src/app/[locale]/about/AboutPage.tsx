"use client";

import TextEffect from "@/components/Custom/TextEffect";
import TransitionLink from "@/components/Custom/TransitionLink";

export default function AboutPage() {
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center gap-12 px-6 bg-green-900 text-white">
        <TransitionLink
          transitionType="doorSwing"
          href="/"
          className="mt-10 inline-block px-6 py-3 rounded-full border border-white text-white hover:bg-white hover:text-black transition-colors"
        >
          Go back home
        </TransitionLink>

        <TextEffect
          text="We craft immersive digital experiences with motion and meaning."
          lang="en"
          animationType="wordWave"
          duration={1}
          className="text-lg max-w-xl text-center text-gray-400"
        />
        <TextEffect
          text="We craft immersive digital experiences with motion and meaning."
          lang="en"
          animationType="wordWave"
          duration={1}
          className="text-lg max-w-xl text-center text-gray-400"
        />
      </section>

      <div className="h-screen bg-yellow-500 flex justify-center items-center">
        section 2 about
      </div>
    </>
  );
}
