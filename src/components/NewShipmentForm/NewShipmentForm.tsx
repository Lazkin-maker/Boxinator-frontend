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
import { createNewShipmentsGuest, createNewShipmentsUser } from "../../api/shipments";
import NewShipmentUser from "../../models/newShipmentUser";
import NewShipmentGuest from "../../models/newShipmentGuest";

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
        resolver: yupResolver(schema),
        context: { isLoggedIn: keycloak.authenticated } // used to set email to required when user is not logged in
    });

    const onSubmit = (data: FormData) => {

        if (keycloak.authenticated) {
            createUserOrder(data)
        } else {
            createGuestOrder(data)
        }

        setShowConfirmationModal(true);
        closeModal();
    }

    useEffect(() => {
        const init = async () => {
            const countries = await fetchCountries();
            setCountryList(countries as Country[])
            setValue("destination", countries[0].id);
        }

        init();
    }, [])

    // Watch changes to weight and destination fields to calculate price
    const watchedFields = watch(["weight", "destination"]);

    useEffect(() => {
        // Get weight and destination from form, or use default values
        const [weight = 1, destination = 1] = watchedFields;

        // Get current multiplier from country selected
        const multiplier = countryList.filter(country => country.id == destination)[0]?.multiplier || 0; // can not be strict equal!

        // Calculate and set current price
        const price = calculateShipping(weight, multiplier);
        setPrice(price);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchedFields])

    const createUserOrder = (data: FormData) => {
        const shipmentBody = {
            reciverName: data.reciverName,
            destinationID: data.destination,
            weight: data.weight,
            boxColor: currentColor,
            price: price,
        };

        createNewShipmentsUser(shipmentBody as NewShipmentUser);
    }

    const createGuestOrder = (data: FormData) => {
        const shipmentBody = {
            reciverName: data.reciverName,
            destinationID: data.destination,
            weight: data.weight,
            boxColor: currentColor,
            price: price,
            email: data.email // additional field needed for guest shipments
        };

        createNewShipmentsGuest(shipmentBody as NewShipmentGuest);
    }

    return price ? (
        <form id="shipment-form" onSubmit={handleSubmit(onSubmit)} className="max-w-xl mt-0 mx-auto flex flex-col">

            {/* recipient input */}
            <label htmlFor="recipient" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                Receiver name<span className="text-red-600 font-normal">* {errors.reciverName?.message}</span>
            </label>


            <input {...register("reciverName")} placeholder="John Doe" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-violet-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />

            {/* email guest input */}
            {!keycloak.authenticated && (
                <div>
                    <label htmlFor="email" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                        E-mail<span className="text-red-600 font-normal">* {errors.email?.message}</span>
                    </label>
                    <input {...register("email")} placeholder="john.doe@example.com" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-violet-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />
                </div>
            )}

            {/* weight input */}
            <label htmlFor="weight" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                Weight tier<span className="text-red-600 font-normal">* {errors.weight?.message}</span>
            </label>
            <select {...register("weight")} className="mb-5 mt-2 bg-white text-gray-600 focus:outline-none focus:border focus:border-violet-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border">
                <option value={WeightTiers.Basic}>Basic {WeightTiers.Basic}kg</option>
                <option value={WeightTiers.Humble}>Humble {WeightTiers.Humble}kg</option>
                <option value={WeightTiers.Deluxe}>Deluxe {WeightTiers.Deluxe}kg</option>
                <option value={WeightTiers.Premium}>Premium {WeightTiers.Premium}kg</option>
            </select>

            {/* destination input */}
            <label htmlFor="destination" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                Destination Country<span className="text-red-600 font-normal">* {errors.destination?.message}</span>
            </label>
            <select {...register("destination")} className="mb-5 mt-2 bg-white text-gray-600 focus:outline-none focus:border focus:border-violet-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border">
                {/* iterate over the countries in multiplier map and create an option for each one */}
                {countryList.map((country) => (
                    <option key={country.id} value={country.id}>{country.name}</option>
                ))}
            </select>

            {/* color input */}
            <label htmlFor="recipient" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                Box color{/* <span className="text-red-600 font-normal">* {errors.boxColor?.message}</span> */}
            </label>
            <SliderPicker color={currentColor} onChange={(color) => setCurrentColor(color.hex)} className="mt-2" />

        </form >
    ) : null
}

export default NewShipmentForm