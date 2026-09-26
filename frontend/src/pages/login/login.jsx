import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../../../apis/authApis/authApi";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../authContext/authContext";
import { toast } from "react-toastify";

const Login = () => {
    const [login, { isLoading, isError }] = useLoginMutation()
    const {setIsLoggedIn}= useContext(AuthContext);
    const navigate= useNavigate()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("invalid email").required("email is required"),
            password: Yup.string().min(6, "password must contain atleast 6 characters").required("password is required")
        }),
        onSubmit: async (values) => {
            try {
                const response = await login(values);
                console.log("response",response);
                 localStorage.setItem("token",response.data.token);
                 setIsLoggedIn(true);
                 toast.success("Login successfully")
                 navigate("/")


            } catch (error) {
                console.log(error)
            }
        }
    })
    return (
        <>
            <div className="main-login">
                <h2>User Login </h2>
                <div className="main-form">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label>User Email:</label>
                            <input type="text" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.touched.email && formik.errors.email && (<p>{formik.errors.email}</p>)}
                        </div>

                        <div className="form-group">
                            <label>User Password:</label>
                            <input type="text" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.touched.password && formik.errors.password && (<p>{formik.errors.password}</p>)}
                        </div>

                        <div className="btn">
                            <button type="submit">
                                Login
                            </button>
                        </div>


                    </form>
                </div>
            </div>



        </>
    )
}
export default Login;