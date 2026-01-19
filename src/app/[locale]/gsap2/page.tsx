"use client";
import MainButton from "@/components/Custom/MainButton";
import TextEffect from "@/components/Custom/TextEffect";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Page() {
  const container = useRef<HTMLDivElement>(null);
  const texts = useRef<HTMLDivElement[]>([]); // array of refs for multiple texts

  useGSAP(
    () => {
      if (!container.current) return;

      // const split = SplitText.create("h2", {
      //   type: "lines,words,chars",
      //   // linesClass: "lines++", // to add classes after spliting them make them haev line 1 , line 2 classes ect ...
      //   // wordsClass: "words", // to add classes after spliting them.
      //   // charsClass: "chars", // to add classes after spliting them.
      //   // mask: "lines", // you choose one of the 3 (lines ect ...).
      //   smartWrap: true, // this is so so so important if you split by chars (must do it).
      //   ignore: "", // use this to ignore anything a class or a div or a tag or anything.
      //   autoSplit: true, // this means whenever i resize the screen the spit happens again.

      //   onSplit: (self) => {
      //     return gsap.from(self.chars, {
      //       autoAlpha: 0,
      //       stagger: {
      //         each: 0.05,
      //         from: "random",
      //       },
      //       scale: 2,
      //       ease: "power2.inOut",
      //       duration: 1,
      //       onComplete: () => {
      //         self.revert();
      //       },
      //     });
      //   },
      // });

      const split = SplitText.create("h2", {
        type: "lines,words,chars",
        // linesClass: "lines++", // to add classes after spliting them make them haev line 1 , line 2 classes ect ...
        // wordsClass: "words", // to add classes after spliting them.
        // charsClass: "chars", // to add classes after spliting them.
        // mask: "lines", // you choose one of the 3 (lines ect ...).
        smartWrap: true, // this is so so so important if you split by chars (must do it).
        ignore: "", // use this to ignore anything a class or a div or a tag or anything.
        autoSplit: true, // this means whenever i resize the screen the spit happens again.
      });

      gsap.from(split.chars, {
        autoAlpha: 0,
        stagger: {
          each: 0.05,
          from: "random",
        },
        scale: 2,
        ease: "power2.inOut",
        duration: 1,
        onComplete: () => {
          split.revert();
        },
      });

      ////////////////////////////////////////////////////////////

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
  // const handleClick = () => {
  //   const smoother = ScrollSmoother.get();
  //   smoother?.scrollTo(1000, true);
  //   // smoother?.paused(true) // i can use this when open a pop up like a modal or somthing to stop the scroll an then make it false after i close it
  // };

  return (
    <main ref={container}>
      <section className="h-screen flex justify-center items-center bg-gray-800">
        <div className="w-1/2 flex gap-5">
          <MainButton size={"lg"} intent="edit" variant={"outline"}>
            Edit
          </MainButton>
          <MainButton size={"lg"} intent="edit" hoverEffect={"shimmer"}>
            Edit
          </MainButton>
          <h2 className="text-5xl text-white">This is A test</h2>
        </div>
      </section>

      {/* Pinned Section */}
      <section className="h-screen flex flex-col justify-center items-center bg-amber-200 gap-8">
        <div ref={addToRefs} className="text-4xl font-bold">
          <h1>Step 1 This Is A Test</h1>
        </div>
        <div ref={addToRefs} className="text-4xl font-bold">
          <h1>Step 2 This Is A Test</h1>
        </div>
        <div ref={addToRefs} className="text-4xl font-bold">
          <h1>Step 3 This Is A Test</h1>
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
    </main>
  );
}
