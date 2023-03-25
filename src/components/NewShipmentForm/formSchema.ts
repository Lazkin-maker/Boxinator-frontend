import * as yup from "yup";
export const schema = yup.object({
    reciverName: yup.string().required("This field is required"),
    weight: yup.number().required("This field is required"),
    destination: yup.number().required("This field is required"),
    email: yup.string().email().when("$isLoggedIn", ([isLoggedIn], schema) => (
        isLoggedIn ? schema : schema.required()
    ))
})

export type FormData = yup.InferType<typeof schema>;