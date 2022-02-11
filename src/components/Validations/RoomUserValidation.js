import * from "yup";

const userSchema = yup.object().shape({
    name : yup.string().required().min,
    room : yup.string().required(),
})