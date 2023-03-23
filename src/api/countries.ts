import keycloak from "../keycloak";

export const fetchCountries = async () => {
    const response = await fetch('https://localhost:7085/api/v1/countries', {
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
    const response = await fetch(`https://localhost:7085/api/v1/countries/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + keycloak.token
        }
    });

    const data = await response.json();

    return data;
}