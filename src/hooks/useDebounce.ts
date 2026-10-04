import { useEffect, useState } from "react"


const useDebounce = (value:string, delay:number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay);

        return () => {
            clearTimeout(timer);
        }
    }, [value, delay])

    return debouncedValue;
}

export default useDebounce;



// Many beginners think this:

// State changes
//         │
//         ▼
// useEffect runs
//         │
//         ▼
// cleanup runs
// That's not the order



//The real order is:

// State changes
//         │
//         ▼
// Component re-renders
//         │
//         ▼
// Cleanup of previous effect
//         │
//         ▼
// New effect