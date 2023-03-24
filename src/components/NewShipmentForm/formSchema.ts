import * as yup from "yup";

export const schema = yup.object({
    reciverName: yup.string().required("This field is required"),
    weight: yup.number().required("This field is required"),
    destination: yup.number().required("This field is required"),
    // boxColor: yup.string().required("Please select a color"),
    // email: yup.string().required("This field is required for guests"),
})

export type FormData = yup.InferType<typeof schema>;