"use client";
import MainButton from "@/components/Custom/MainButton";
import TextEffect from "@/components/Custom/TextEffect";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
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
          scrub: true, // link animation to scroll
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
          i * 0.5 // stagger: each text starts 0.5 after the previous
        );
      });
    },
    {
      scope: container,
    }
  );

  // helper to attach refs to array
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !texts.current.includes(el)) {
      texts.current.push(el);
    }
  };
  const handleClick = () => {
    const smoother = ScrollSmoother.get();
    smoother?.scrollTo(1000, true);
    // smoother?.paused(true) // i can use this when open a pop up like a modal or somthing to stop the scroll an then make it false after i close it
  };

  return (
    <>
      <section className="h-screen flex justify-center items-center bg-gray-800">
        <div className="border w-1/2 flex flex-col gap-5">
          <MainButton size={"full"} intent="delete" variant={"translucent"}>
            Edit
          </MainButton>
          <MainButton size={"full"} intent="delete" variant={"translucent"}>
            Edit
          </MainButton>
        </div>
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
        <TextEffect
          animationType="vortexSwirl"
          text={"This Is A Test For The Text"}
          className="text-5xl text-white"
          delay={0}
        />
      </section>
    </>
  );
}
