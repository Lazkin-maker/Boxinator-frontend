import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import schema from "./registerSchema";
import Countries from "../../enums/countries.enum";

type FormData = yup.InferType<typeof schema>;

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data: FormData) => console.log(data);

    return (
        <div className="bg-slate-900 text-white py-24 px-3">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl my-0 mx-auto flex flex-col">
                <h1 className="heading-font text-4xl sm:text-5xl text-center mb-10">Create new account</h1>

                {/* firstName input */}
                <label htmlFor="firstName">
                    First Name<span className="text-red-600">* {errors.firstName?.message}</span>
                </label>
                <input {...register("firstName")} placeholder="First Name" className="text-black p-1 mt-2 mb-3 rounded-sm" />

                {/* lastName input */}
                <label htmlFor="lastName">
                    Last Name<span className="text-red-600">* {errors.lastName?.message}</span>
                </label>
                <input {...register("lastName")} placeholder="Last Name" className="text-black p-1 mt-2 mb-3 rounded-sm" />

                {/* email input */}
                <label htmlFor="email">
                    Email<span className="text-red-600">* {errors.email?.message}</span>
                </label>
                <input {...register("email")} placeholder="Email" className="text-black p-1 mt-2 mb-3 rounded-sm" />

                {/* password input */}
                <label htmlFor="password">
                    Password<span className="text-red-600">* {errors.password?.message}</span>
                </label>
                <input {...register("password")} placeholder="Password" className="text-black p-1 mt-2 mb-3 rounded-sm" />

                {/* confirmPassword input */}
                <label htmlFor="confirmPassword">
                    Confirm Password<span className="text-red-600">* {errors.confirmPassword?.message}</span>
                </label>
                <input {...register("confirmPassword")} placeholder="Confirm Password" className="text-black p-1 mt-2 mb-3 rounded-sm" />

                {/* dateOfBirth input */}
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input {...register("dateOfBirth")} placeholder="Date of Birth" className="text-black p-1 mt-2 mb-3 rounded-sm" />

                {/* country input */}
                <label htmlFor="country">Country</label>
                <select {...register("country")} className="text-black p-1 mt-2 mb-3 rounded-sm">
                    {/* map over the countries enum and create an option for each one */}
                    {(Object.keys(Countries) as (keyof typeof Countries)[]).map((country) => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>

                {/* zipCode input */}
                <label htmlFor="zipCode">Zip Code</label>
                <input {...register("zipCode")} placeholder="Zip Code" className="text-black p-1 mt-2 mb-3 rounded-sm" />

                {/* phoneNumber input */}
                <label htmlFor="phoneNumber">Phone Number</label>
                <input {...register("phoneNumber")} placeholder="Phone Number" className="text-black p-1 mt-2 mb-8 rounded-sm" />

                <button type="submit" className="bg-violet-500 text-white py-2 rounded">Create account</button>
            </form>
        </div>
    )
}

export default Register