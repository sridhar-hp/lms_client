import * as Yup from 'yup';

const RegisterSchema = Yup.object({

    name: Yup.string().required("name is required"),        
    Id: Yup.string().required("Id is required"),    
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "min 6 characters").required("password is required"),
    role: Yup.string().notRequired("role is required"),
});
export default RegisterSchema;  