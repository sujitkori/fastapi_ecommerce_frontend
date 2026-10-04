import * as Slider from "@radix-ui/react-slider";

interface PriceRangeSliderProps {
  value: [number, number];
  min: number;
  max: number;
  onValueChange: (value: [number, number]) => void;
}

const PriceRangeSliderAdmin = ({
  value,
  min,
  max,
  onValueChange,
}: PriceRangeSliderProps) => {
  return (
    <div className="w-full max-w-sm">
      {/* Price values */}
      <div className="mb-3 flex items-center justify-between text-sm font-medium text-gray-700">
        <span>₹{value[0].toLocaleString("en-IN")}</span>
        <span>₹{value[1].toLocaleString("en-IN")}</span>
      </div>

      {/* Slider */}
      <Slider.Root
        className="relative flex h-5 w-full items-center"
        value={value}
        onValueChange={(newValue) => {
          onValueChange(newValue as [number, number]);
        }}
        min={min}
        max={max}
        step={100}
        minStepsBetweenThumbs={1}
      >
        <Slider.Track className="relative h-2 grow rounded-full bg-gray-300">
          <Slider.Range className="absolute h-full rounded-full bg-black" />
        </Slider.Track>

        <Slider.Thumb
          className="block h-5 w-5 rounded-full border-2 border-black bg-white shadow outline-none focus:ring-2 focus:ring-black/20"
          aria-label="Minimum price"
        />

        <Slider.Thumb
          className="block h-5 w-5 rounded-full border-2 border-black bg-white shadow outline-none focus:ring-2 focus:ring-black/20"
          aria-label="Maximum price"
        />
      </Slider.Root>

      {/* Available price range */}
      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>₹{min.toLocaleString("en-IN")}</span>
        <span>₹{max.toLocaleString("en-IN")}</span>
      </div>
    </div>
  );
};

export default PriceRangeSliderAdmin;