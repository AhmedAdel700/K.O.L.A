import TransitionLink from "@/components/Custom/TransitionLink";;
export default function page() {
  return (
<<<<<<< HEAD
    <div className="flex justify-center items-center bg-red-700 h-screen">
      <TransitionLink transitionType="cornerPush" href={"/about"}>
        About Page
      </TransitionLink>
=======
    <div>
      <div className="flex justify-center items-center bg-red-700 h-screen">
        <TransitionLink transitionType="elastic" href={"/about"}>
          About Page
        </TransitionLink>
      </div>

      <div className="h-screen bg-green-500 flex justify-center items-center">
        section 2 home
      </div>
>>>>>>> 9bfc86f55510c421d49f14c95ccc018377c601c5
    </div>
  );
}
