import { useState } from "react";
import {createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import axios from "axios";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const signup = async (e) => {
        e.preventDefault();
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await updateProfile(result.user, {
                displayName: name
            });
            const token = await result.user.getIdToken();
            const response = await axios.post(
                "http://localhost:5000/api/auth/signup",
                {
                    name,
                    email
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            dispatch(setUser(response.data.user));
            alert("Signup successful!");
        }
        catch (error) {
            console.log(error);
            alert(error.message);
        }
    }
    return (
        <>
            <div className="signup">
                <h1>Create Your Account</h1>
                <p>Join us for a better food experience</p>
                <form onSubmit={signup}>
                    <input type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Sign Up</button>
                </form>
                <p>Or continue with</p>
                <button>Google</button>
                <button>Facebook</button>
                <p>
                    Already have an account? <span>Login</span>
                </p>
            </div>
        </>
    )
}
export default Signup;