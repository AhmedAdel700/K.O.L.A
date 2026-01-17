"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const container = useRef<HTMLDivElement>(null);
  const texts = useRef<HTMLDivElement[]>([]); // array of refs for multiple texts

  useGSAP(
    () => {
      if (!container.current) return;

      // create a timeline for multiple animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=300%", // how long the pin lasts (3 screen heights)
          pin: true,
          scrub: 1, // link animation to scroll
          markers: true,
        //   fastScrollEnd: true, // stop it on fast scrolls
        },
      });

      // animate each text one after the other
      texts.current.forEach((el, i) => {
        tl.from(
          el,
          {
            y: 100,
            opacity: 0,
            scale: 2,
          },
          i * 0.5, // stagger: each text starts 0.5 after the previous
        );
      });
    },
    {
      scope: container,
    },
  );

  // helper to attach refs to array
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !texts.current.includes(el)) {
      texts.current.push(el);
    }
  };

  return (
    <>
      <section className="h-screen flex justify-center items-center bg-gray-800">
        <div className="text text-white text-5xl text-center ms-4">GSAP 1</div>
        <div className="text text-white text-5xl text-center ms-4">GSAP 2</div>
        <div className="text text-white text-5xl text-center ms-4">GSAP 3</div>
      </section>

      {/* Pinned Section */}
      <section
        ref={container}
        className="h-screen flex flex-col justify-center items-center bg-amber-200 gap-8"
      >
        <div ref={addToRefs} className="text-4xl font-bold">
          Step 1
        </div>
        <div ref={addToRefs} className="text-4xl font-bold">
          Step 2
        </div>
        <div ref={addToRefs} className="text-4xl font-bold">
          Step 3
        </div>
      </section>

      <section className="h-screen flex justify-center items-center bg-gray-800">
        <div className="text text-white text-5xl text-center ms-4">GSAP 4</div>
        <div className="text text-white text-5xl text-center ms-4">GSAP 5</div>
        <div className="text text-white text-5xl text-center ms-4">GSAP 6</div>
      </section>
    </>
  );
}
