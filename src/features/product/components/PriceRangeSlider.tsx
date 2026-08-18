// import * as Slider from "@radix-ui/react-slider";

// interface PriceRangeSliderProps {
//     value:number[];
//     onValueChange: (value:number[]) => void;
//     onValueCommit: (value:number[]) => void;
// }

// const PriceRangeSlider = ({value, onValueChange, onValueCommit}:PriceRangeSliderProps) => {
//   return (
//     <div className="w-72">
//             <div className="flex justify-between mb-2">
//                 <span>₹{value[0]}</span>
//                 <span>₹{value[1]}</span>
//             </div>

//             <Slider.Root
//                 className="relative flex items-center w-full h-5"
//                 value={value}
//                 onValueChange={onValueChange}
//                 onValueCommit={onValueCommit}
//                 min={0}
//                 max={1000000}
//                 step={100}
//             >
//                 <Slider.Track className="bg-gray-300 relative grow rounded-full h-2">
//                     <Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
//                 </Slider.Track>

//                 <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-blue-600 rounded-full shadow" />

//                 <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-blue-600 rounded-full shadow" />
//             </Slider.Root>
//         </div>
//   )
// }

// export default PriceRangeSlider



interface PriceRangeSliderProps {
    value: number;
    min:number;
    max:number
    onValueChange: (value: number) => void;
}

const PriceRangeSlider = ({
    value,
    min,
    max,
    onValueChange,
}: PriceRangeSliderProps) => {
    return (
        <div className="w-72">

            {/* <p className="font-medium">
                Maximum Price
            </p> */}

            <input
                type="range"
                min={min}
                max={max}
                step={100}
                value={value}
                onChange={(e) => onValueChange(Number(e.target.value))}
                className="w-full"
            />

            <p className="text-sm text-gray-600">
                ₹{value}
            </p>

        </div>
    );
};

export default PriceRangeSlider;
