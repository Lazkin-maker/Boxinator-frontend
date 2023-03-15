import { ChangeEvent, useEffect, useState } from "react";

// dummy data
import data from "../../countryMultiplierDummy.json"
const countries = data.countries

function CountryMultiplier() {
    const [multipliers, setMultipliers] = useState({} as { [key: string]: number });
    const [searchText, setSearchText] = useState('' as string);

    // fetch data from backend
    useEffect(() => {
        setMultipliers(countries);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSaveChanges = () => {
        // save changes to backend
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setMultipliers((prev: any) => ({
            ...prev,
            [name]: value
        }))
    }

    const getFilteredListOfCountries = () => {
        const listOfCountries = Object.keys(countries);
        const searchQuery = new RegExp(searchText, 'i');
        return listOfCountries.filter((country) => searchQuery.test(country));
    }

    return (
        <div className="max-w-3xl">
            <h1 className="text-2xl">Edit Country Multipliers</h1>

            <div className="flex">
                <input 
                    type="text" 
                    placeholder="Search" 
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="mb-5 mt-2 bg-white text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />
            </div>

            <button onClick={handleSaveChanges} className="w-full bg-indigo-600 h-10 mb-5 rounded disabled:bg-gray-600">Save changes</button>

            <div className="flex flex-col">
                {getFilteredListOfCountries().map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <h2 className="text-xl">{country}</h2>
                        <input 
                            min="0"
                            type="number"
                            name={country}
                            value={multipliers[country]}
                            onChange={handleInputChange}
                            className="w-16 mb-5 mt-2 bg-white text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default CountryMultiplier