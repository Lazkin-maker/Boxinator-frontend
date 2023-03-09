import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Countries from "../../enums/countries";
import WeightTiers from "../../enums/weightTiers";
import { SliderPicker } from 'react-color';
import { useState } from "react";
import { schema, FormData } from "./formSchema";

function NewShipmentForm() {
    const [currentColor, setCurrentColor] = useState("#8bc34a")
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: FormData) => console.log(data);

    const handleColorChange = (color: string) => {
        setCurrentColor(color);
        setValue("boxColor", color);
    }

    return (
        <form id="shipment-form" onSubmit={handleSubmit(onSubmit)} className="max-w-xl mt-0 mb-6 mx-auto flex flex-col">
            
            {/* recipient input */}
            <label htmlFor="recipient" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                Receiver name<span className="text-red-600 font-normal">* {errors.recipient?.message}</span>
            </label>
            <input {...register("recipient")} placeholder="John Doe" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />

            {/* weight input */}
            <label htmlFor="weight" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                Weight tier<span className="text-red-600 font-normal">* {errors.weight?.message}</span>
            </label>
            <select {...register("weight")} className="mb-5 mt-2 bg-white text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border">
                <option value={WeightTiers.Basic}>Basic {WeightTiers.Basic}kg</option>
                <option value={WeightTiers.Humble}>Humble {WeightTiers.Humble}kg</option>
                <option value={WeightTiers.Deluxe}>Deluxe {WeightTiers.Deluxe}kg</option>
                <option value={WeightTiers.Premium}>Premium {WeightTiers.Premium}kg</option>
            </select>

            {/* destination input */}
            <label htmlFor="destination" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                Destination Country<span className="text-red-600 font-normal">* {errors.destination?.message}</span>
            </label>
            <select {...register("destination")} className="mb-5 mt-2 bg-white text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border">
                {/* map over the countries enum and create an option for each one */}
                {(Object.keys(Countries) as (keyof typeof Countries)[]).map((country) => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </select>

            {/* color input */}
            <label htmlFor="recipient" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                Box color<span className="text-red-600 font-normal">* {errors.boxColor?.message}</span>
            </label>
            <SliderPicker color={currentColor} onChange={(color) => handleColorChange(color.hex)} className="mt-2" />

        </form>
    )
}

export default NewShipmentForm