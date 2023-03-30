import keycloak from "../keycloak";
import { Country } from "../types/Country";

export const fetchCountries = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/countries`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + keycloak.token
        }
    });

    const data = await response.json();

    return data;
}

export const fetchCountryById = async (id: number) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/countries/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + keycloak.token
        }
    });

    const data = await response.json();

    return data;
}

export const updateCountryMultiplier = async (updatedCountry: Country) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/countries/${updatedCountry.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + keycloak.token
        },
        body: JSON.stringify(updatedCountry)
    })
    
    return response;
}