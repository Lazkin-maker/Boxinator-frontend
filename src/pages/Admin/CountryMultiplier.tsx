import { ChangeEvent, useEffect, useState } from "react";
import { fetchCountries, updateCountryMultiplier } from "../../api/countries";
import { Country } from "../../types/Country";

function CountryMultiplier() {
    const [currentCountry, setCurrentCountry] = useState<Country>()
    const [countryList, setCountryList] = useState<Country[]>([])

    // fetch data from backend
    useEffect(() => {
        const init = async () => {
            const countries = await fetchCountries();
            setCountryList(countries as Country[])
            setCurrentCountry(countries[0])
        }

        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSaveChanges = async () => {
        // save changes to backend
        if (!currentCountry) return;

        const response = await updateCountryMultiplier(currentCountry)

        if (response.ok) {

            const updatedCountryList = countryList.map(country => {
                if (country.id == currentCountry?.id) {
                    return currentCountry;
                } else {
                    return country;
                }
            })

            setCountryList(updatedCountryList);
        }
    }

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedCountry = countryList.filter(country => country.name === e.target.value)[0];
        setCurrentCountry(selectedCountry);
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentCountry(() => ({
            ...currentCountry,
            multiplier: Number(e.target.value)
        } as Country))
    }

    return (
        <div className="max-w-3xl">
            <h1 className="text-2xl">Edit Country Multipliers</h1>

            <select onChange={handleSelectChange} className="mb-5 mt-2 bg-white text-gray-600 focus:outline-none focus:border focus:border-violet-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border">
                {/* iterate over the countries in multiplier map and create an option for each one */}
                {countryList.map((country) => (
                    <option key={country?.id} value={country.name}>{country?.name}</option>
                ))}
            </select>

            <input
                min="0"
                type="number"
                value={currentCountry?.multiplier}
                onChange={handleInputChange}
                className="w-full mb-5 mt-2 bg-white text-gray-600 focus:outline-none focus:border focus:border-violet-700 font-normal h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />

            <button onClick={handleSaveChanges} className="w-full bg-violet-600 h-10 mb-5 rounded disabled:bg-gray-600">Save changes</button>

        </div>
    )
}

export default CountryMultiplier