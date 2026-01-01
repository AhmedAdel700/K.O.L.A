import TextEffect from "../Custom/TextEffect";

export default function AboutSection() {
  return (
    <section className="flex justify-center items-center h-screen bg-amber-400 text-white text-5xl">
      <TextEffect
        animationType="hologram"
        lang="en"
        duration={1.5}
        text={"This Is An About Section"}
        className="text-5xl text-center text-white font-semibold"
      />
    </section>
  );
}
