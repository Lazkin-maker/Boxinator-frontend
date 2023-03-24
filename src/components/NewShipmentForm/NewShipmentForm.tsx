import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import WeightTiers from "../../enums/weightTiers";
import { SliderPicker } from 'react-color';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { schema, FormData } from "./formSchema";
import calculateShipping from "../../shared/calculateShipping";
import { fetchCountries } from "../../api/countries";
import { Country } from "../../types/Country";
import keycloak from "../../keycloak"





type Props = {
    price: number,
    setPrice: Dispatch<SetStateAction<number>>,
    setShowConfirmationModal: Dispatch<SetStateAction<boolean>>,
    closeModal: () => void
}

function NewShipmentForm({ price, setPrice, setShowConfirmationModal, closeModal }: Props) {
    const [currentColor, setCurrentColor] = useState("#8bc34a") // default color
    const [countryList, setCountryList] = useState<Country[]>([])
    const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const isAuthenticated = keycloak.authenticated;
    useEffect(() => {
        if (isAuthenticated) {
            setIsLoggedIn(true)
        }
    }, [])

    const watchedFields = watch(["weight", "destination"]);

    const onSubmit = (data: FormData) => {
        console.log(data);
        setShowConfirmationModal(true);
        closeModal();
    }

    const handleColorChange = (color: string) => {
        setCurrentColor(color);
        setValue("boxColor", color);
    }

    useEffect(() => {
        const init = async () => {
            const countries = await fetchCountries();
            setCountryList(countries as Country[])
            setValue("destination", countries[0].name);
            console.log(countries)
        }

        init();
    }, [])

    useEffect(() => {
        const [weight = 1, destination = 'Sweden'] = watchedFields;
        const multiplier = countryList.filter(country => country.name === destination)[0]?.multiplier || 0;
        const price = calculateShipping(weight, multiplier);
        setPrice(price);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchedFields])

    return price ? (
        <form id="shipment-form" onSubmit={handleSubmit(onSubmit)} className="max-w-xl mt-0 mx-auto flex flex-col">

            {/* recipient input */}
            <label htmlFor="recipient" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                Receiver name<span className="text-red-600 font-normal">* {errors.reciverName?.message}</span>
            </label>


            <input {...register("reciverName")} placeholder="John Doe" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />

            {/* email guest input */}
            {!isLoggedIn && (
                <div>
                    <label htmlFor="email" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                        E-mail<span className="text-red-600 font-normal">* {errors.email?.message}</span>
                    </label>
                    <input {...register("email")} placeholder="John.Doe@example.com" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />
                </div>
            )}

    {/* weight input */ }
            <label htmlFor="weight" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                Weight tier<span className="text-red-600 font-normal">* {errors.weight?.message}</span>
            </label>
            <select {...register("weight")} className="mb-5 mt-2 bg-white text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border">
                <option value={WeightTiers.Basic}>Basic {WeightTiers.Basic}kg</option>
                <option value={WeightTiers.Humble}>Humble {WeightTiers.Humble}kg</option>
                <option value={WeightTiers.Deluxe}>Deluxe {WeightTiers.Deluxe}kg</option>
                <option value={WeightTiers.Premium}>Premium {WeightTiers.Premium}kg</option>
            </select>

    {/* destination input */ }
            <label htmlFor="destination" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                Destination Country<span className="text-red-600 font-normal">* {errors.destination?.message}</span>
            </label>
            <select {...register("destination")} className="mb-5 mt-2 bg-white text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border">
                {/* iterate over the countries in multiplier map and create an option for each one */}
                {countryList.map((country) => (
                    <option key={country?.id} value={country.name}>{country?.name}</option>
                ))}
            </select>

    {/* color input */ }
            <label htmlFor="recipient" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                Box color<span className="text-red-600 font-normal">* {errors.boxColor?.message}</span>
            </label>
            <SliderPicker color={currentColor} onChange={(color) => handleColorChange(color.hex)} className="mt-2" />

        </form >
    ) : null
}

export default NewShipmentForm