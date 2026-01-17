"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GSDevTools, ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(GSDevTools, ScrollTrigger);

export default function Page() {
  const container = useRef<HTMLDivElement>(null);
  const container2 = useRef<HTMLDivElement>(null);
  const secName = useRef<HTMLDivElement>(null);

  type MediaConditions = {
    isDesktop: boolean;
    isMobile: boolean;
  };

  useGSAP(
    () => {
      // GSDevTools.create();
      const tl = gsap.timeline();
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width:1024px)",
          isMobile: "(max-width:1023px)", // you can add as many as you want
        },
        (context) => {
          const { isDesktop } = context.conditions as MediaConditions;
          tl.from(".text", {
            y: isDesktop ? 50 : 0,
            autoAlpha: 0,
            duration: 1.5,
            ease: "circ",
            stagger: {
              each: 0.5, // each item will take this time
              //   amount: 1.5, // means divided the 1.5s on the number of items i have
              from: "center",
              // ease: "power1.inOut" // you can add any other properties here as well such as ease , duration etc..
            },
          });
        }
      );

      // mm.add("(min-width:768px)", () => {
      //   tl.from(".text", {
      //     y: 50,
      //     autoAlpha: 0,
      //     duration: 1.5,
      //     ease: "circ",
      //     stagger: {
      //       each: 0.5, // each item will take this time
      //       //   amount: 1.5, // means divided the 1.5s on the number of items i have
      //       from: "center",
      //     },
      //   });
      // });
    },
    { scope: container }
  );

  useGSAP(() => {
    gsap.from(secName.current, {
      y: 120,
      rotate: -30,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container2.current,
        start: "top top",
        markers: true,
      },
    });
  });

  return (
    <>
      <section
        ref={container}
        className="h-screen flex justify-center items-center"
      >
        <div className="text invisible text-white text-5xl text-center ms-4">
          GSAP 1
        </div>
        <div className="text invisible text-white text-5xl text-center ms-4">
          GSAP 2
        </div>
        <div className="text invisible text-white text-5xl text-center ms-4">
          GSAP 3
        </div>
      </section>
      <section
        ref={container2}
        id="box"
        className="h-screen flex justify-center items-center text-black bg-amber-200"
      >
        <div ref={secName}>section 2</div>
      </section>
    </>
  );
}
