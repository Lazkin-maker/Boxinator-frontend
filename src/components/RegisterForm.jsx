import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Keycloak from "keycloak-js";


const RegistrationForm = () => {
    const { register, handleSubmit, formState, watch } = useForm({
        mode: "onBlur",
    });
    const [keycloak, setKeycloak] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const initKeycloak = async () => {
            const keycloak = new Keycloak("/keycloak.json");
            await keycloak.init({
                onLoad: "check-sso",
                silentCheckSsoRedirectUri:
                    window.location.origin + "/",

            });
            setKeycloak(keycloak);
        };
        initKeycloak();
    }, []);

    const onSubmit = async (data) => {
        try {
            debugger;
            const result = await keycloak.register({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                attributes: {
                    country: data.country,
                    zipCode: data.zipCode,
                },
            });
            setSuccessMessage("Registration successful!");
            setErrorMessage(null);
        } catch (error) {
            console.log(error);
            setErrorMessage("Registration failed. Please try again.");
            setSuccessMessage(null);
        }
    };

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {successMessage && <div>{successMessage}</div>}
            {errorMessage && <div>{errorMessage}</div>}
            <div>
                <label>First Name</label>
                <input
                    type="text"
                    {...register("firstName", { required: true })}
                />
            </div>
            <div>
                <label>Last Name</label>
                <input
                    type="text"
                    {...register("lastName", { required: true })}
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    {...register("email", { required: true })}
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    {...register("password", {
                        required: true,
                        minLength: 8,
                        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i
                    })}
                />
            </div>
            <div>
                <label>Confirm Password</label>
                <input
                    type="password"
                    {...register("confirmPassword", {
                        required: true,
                        validate: (value) => value === password,
                    })}
                />
            </div>
            <div>
                <label>Country</label>
                <input type="text" {...register("country")} />
            </div>
            <div>
                <label>Zip Code</label>
                <input type="text" {...register("zipCode")} />
            </div>
            <button type="submit" >
                Submit
            </button>
        </form>
    );
};

export default RegistrationForm;
