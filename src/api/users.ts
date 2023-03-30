import keycloak from "../keycloak";

export const createNewUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/newuser`, {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + keycloak.token,
        "Content-Type": "application/json"
      }
    })

    return response;
}

export const updateUserInformation = async (
    { dateOfBirth, countryOfResidence, zipCode, contactNumber }:
    { dateOfBirth: string, countryOfResidence: string, zipCode: string, contactNumber: string }
    ) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
      method: 'PUT', // or 'POST' if you're creating a new user
      headers: {
        'Authorization': 'Bearer ' + keycloak.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dateOfBirth: dateOfBirth,
        country: countryOfResidence,
        zipCode: zipCode,
        contactNumber: contactNumber,
      })
    });

    return response.ok;
};

export const fetchUserSub = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/userssub`, {
    method: "GET",
    headers: {
        'Authorization': 'Bearer ' + keycloak.token,
        'Content-Type': 'application/json'
    }

    });
    const data = await response.json();

    return data;
}