import { useFormik } from "formik";
import * as Yup from "yup";
import { useSignUpMutation } from "../../../apis/authApis/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getIdToken, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const SignUp = () => {
    const [signUp,{isLoading}] = useSignUpMutation()
    const navigate= useNavigate()

    const formik = useFormik({
        initialValues: {
            name:"",
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("name should contain characters only"),
            email: Yup.string().email("invalid email").required("email is required"),
            password: Yup.string().min(6, "password must contain atleast 6 characters").required("password is required")
        }),
        onSubmit: async (values) => {
            try {
                const response = await signUp(values);
        
                console.log("response",response);
                console.log("form submitted");
                formik.resetForm()
                toast.success("User signUp successfully")
                 navigate("/login")

            } catch (error) {
                console.log(error);
                toast.error(error?.data?.message || "signUp failed");

            }
        }
    })

    const handleGoogleAuthentication=async()=>{
          const provider = new GoogleAuthProvider();
         provider.setCustomParameters({
            prompt: "select_account"
         });
         const result = await signInWithPopup(auth,provider);
         const user = result.user;
         console.log("Google user",user);
         const idToken= await user.getIdToken();
         console.log("firebase idToken",idToken)
    }
    return (
        <>
            <div className="main-login">
                <h2>SignUp</h2>
                <div className="main-form">
                    <form onSubmit={formik.handleSubmit}>
                         <div className="form-group">
                            <label>Name:</label>
                            <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.touched.name && formik.errors.name && (<p>{formik.errors.name}</p>)}
                        </div>

                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.touched.email && formik.errors.email && (<p>{formik.errors.email}</p>)}
                        </div>

                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.touched.password && formik.errors.password && (<p>{formik.errors.password}</p>)}
                        </div>

                        <div className="btn">
                            <button type="submit" disabled={isLoading}>
                                {isLoading? "signing-up..": "signUp"}
                            </button>
                        </div>

                          <div className="btn" onClick={handleGoogleAuthentication}>
                            <button type="submit" >
                                Continue with Google
                            </button>
                        </div>


                    </form>
                </div>
            </div>



        </>
    )
}
export default SignUp;