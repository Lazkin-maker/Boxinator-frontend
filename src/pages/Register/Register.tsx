import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import schema from "./registerSchema";

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
                    <p className="inline mr-2">First Name<span className="text-red-600">* {errors.firstName?.message}</span></p>
                </label>
                <input {...register("firstName")} placeholder="First Name" className="text-black p-1 mt-2 mb-3 rounded-sm" />

                {/* lastName input */}
                <label htmlFor="lastName">
                    <p className="inline mr-2">Last Name<span className="text-red-600">* {errors.lastName?.message}</span></p>
                </label>
                <input {...register("lastName")} placeholder="Last Name" className="text-black p-1 mt-2 mb-3 rounded-sm" />

                {/* email input */}
                <label htmlFor="email">
                    <p className="inline mr-2">Email<span className="text-red-600">* {errors.email?.message}</span></p>
                </label>
                <input {...register("email")} placeholder="Email" className="text-black p-1 mt-2 mb-3 rounded-sm" />

                {/* password input */}
                <label htmlFor="password">
                    <p className="inline mr-2">Password<span className="text-red-600">* {errors.password?.message}</span></p>
                </label>
                <input {...register("password")} placeholder="Password" className="text-black p-1 mt-2 mb-3 rounded-sm" />

                {/* confirmPassword input */}
                <label htmlFor="confirmPassword">
                    <p className="inline mr-2">Confirm Password<span className="text-red-600">* {errors.confirmPassword?.message}</span></p>
                </label>
                <input {...register("confirmPassword")} placeholder="Confirm Password" className="text-black p-1 mt-2 mb-3 rounded-sm" />

                {/* dateOfBirth input */}
                <label htmlFor="dateOfBirth">
                    <p className="inline mr-2">Date of Birth</p>
                </label>
                <input {...register("dateOfBirth")} placeholder="Date of Birth" className="text-black p-1 mt-2 mb-3 rounded-sm" />

                {/* country input */}
                <label htmlFor="country">
                    <p className="inline mr-2">Country</p>
                </label>
                <select {...register("country")} className="text-black p-1 mt-2 mb-3 rounded-sm">
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                </select>

                {/* zipCode input */}
                <label htmlFor="zipCode">
                    <p className="inline mr-2">Zip Code</p>
                </label>
                <input {...register("zipCode")} placeholder="Zip Code" className="text-black p-1 mt-2 mb-3 rounded-sm" />

                {/* phoneNumber input */}
                <label htmlFor="phoneNumber">
                    <p className="inline mr-2">Phone Number</p>
                </label>
                <input {...register("phoneNumber")} placeholder="Phone Number" className="text-black p-1 mt-2 mb-8 rounded-sm" />

                <button type="submit" className="bg-violet-500 text-white py-2 rounded">Create account</button>
            </form>
        </div>
    )
}

export default Register