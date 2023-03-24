import * as yup from "yup";

export const schema = yup.object({
    reciverName: yup.string().required("This field is required"),
    weight: yup.number().required("This field is required"),
    destination: yup.string().required("This field is required"),
    // destination: yup.object().shape({
    //     id: yup.number(),
    //     name: yup.string(),
    //     multiplier: yup.number(),
        
    // }).required("This field is required"),
    boxColor: yup.string().required("Please select a color"),
})

export type FormData = yup.InferType<typeof schema>;