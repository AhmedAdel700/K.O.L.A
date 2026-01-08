import TransitionLink from "@/components/Custom/TransitionLink";
import React from "react";

export default function page() {
  return (
    <div className="flex justify-center items-center bg-red-700 h-screen">
      <TransitionLink transitionType="doorSwing" href={"/about"}>
        About Page
      </TransitionLink>
    </div>
  );
}
