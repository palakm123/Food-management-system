import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("invalid email").required("email is required"),
            password: Yup.string().min(6, "password must contain atleast 6 characters").required("password is required")
        }),
        onSubmit:async(values)=>{
         try {
           
         } catch (error) {
            
         }
        }
    })
    return (
        <>
        


        </>
    )
}
export default Login;