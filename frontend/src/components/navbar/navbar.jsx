import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../authContext/authContext";
import { useContext } from "react";

const Navbar= ()=>{
    const navigate= useNavigate()
    const{isLoggedIn,setIsLoggedIn}= useContext(AuthContext);

    const handleSignOut=()=>{
        localStorage.removeItem("token");
        setIsLoggedIn(false)
        navigate("/login")
    }
return(
    <>
    <div className="main-navbar">
        <div className="left">
            <div className="logo">
                {/* <img src="" alt="logo"/> */}
                <h2>Foodie</h2>
            </div>
        </div>

        <div className="center">
            <Link to="/">Home</Link>
            <Link to="/">Restaurants</Link>
            <Link to="/">Track Order</Link>
        </div>

        <div className="left">
            {isLoggedIn ? (
                <>
                <Link to = "/profile">
                Profile
                </Link>

                <button onClick={handleSignOut}>
                    SignOut
                </button>
                </>
            ):(
                <>
                <button onClick={()=>navigate("/signUp")}>SignUp</button>
                <button onClick={()=>navigate("/login")}>Login</button>
                </>
            )}
           
        </div>
    </div>
    </>
)
}
export default Navbar;