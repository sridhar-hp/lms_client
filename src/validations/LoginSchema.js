import * as yup from 'yup';

const LoginSchema = yup.object({

    Id:yup.string().required("Id is required"),

    password:yup.string().min(6,"password must be at least 6 characters")
    .required("passwor is required"),
});

export default LoginSchema;