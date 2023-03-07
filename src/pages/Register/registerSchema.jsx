import * as yup from "yup";

const requiredError = "This field is required";
const emailError = "Please enter a valid email address";
// eslint-disable-next-line no-template-curly-in-string
const minLengthError = "Must be at least ${min} characters";
const passwordRegexError = "Must Contain One Uppercase, One Lowercase and One Number";
const confirmPasswordError = "Passwords must match";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;

const schema = yup.object({
    firstName: yup.string().required(requiredError),
    lastName: yup.string().required(requiredError),
    email: yup.string()
        .required(requiredError)
        .email(emailError),
    password: yup.string()
        .required(requiredError)
        .min(8, minLengthError)
        .matches(passwordRegex, passwordRegexError),
    confirmPassword: yup.string()
        .required(requiredError)
        .oneOf([yup.ref("password")], confirmPasswordError),
    dateOfBirth: yup.date(),
    country: yup.string(),
    zipCode: yup.string(),
    phoneNumber: yup.string(),
}).required();

export default schema;