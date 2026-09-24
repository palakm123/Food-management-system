import { Link } from "react-router-dom";

const Navbar= ()=>{
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
            <div className="btn">
                 <button>Login</button>
            </div>

            <div className="btn">
                <button>SignUp</button>
            </div>
        
           
        </div>
    </div>
    </>
)
}
export default Navbar;