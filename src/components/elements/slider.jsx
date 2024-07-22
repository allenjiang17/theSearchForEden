import { useContext } from "react";


export default function Slider(props) {
    // Takes in min, max, value, onChange

    // appearance-none w-full
    return <input type="range" 
        min={props.min} 
        max={props.max} 
        defaultValue={props.value} 
        onChange={(val) => props.onChange(val.target.valueAsNumber)}
        />
}
