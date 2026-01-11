import TransitionLink from "@/components/Custom/TransitionLink";
import React from "react";

export default function page() {
  return (
    <div>
      <div className="flex justify-center items-center bg-red-700 h-screen">
        <TransitionLink transitionType="accordion" href={"/about"}>
          About Page
        </TransitionLink>
      </div>

      <div className="h-screen bg-green-500 flex justify-center items-center">
        section 2 home
      </div>
    </div>
  );
}
