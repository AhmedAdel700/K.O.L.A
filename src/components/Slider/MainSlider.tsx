import SliderType1 from "./SliderType1";
interface MainSliderProps {
  type: "type1" | "type2";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}
export default function MainSlider({ type, data }: MainSliderProps) {
  switch (type) {
    case "type1":
      return <SliderType1 data={data} />;
    case "type2":
      return null;
    default:
      return <SliderType1 data={data} />;
  }
}
