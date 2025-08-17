import { LOGO_URL } from "../utils/constants";
import { use, useContext, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext"
import { useSelector } from "react-redux";

const Header = () => {

    const [loginbtn, setLoginBtn] = useState("Login");

    const onlineStatus = useOnlineStatus();

    const { loggedInUser } = useContext(UserContext)

    // Selector (Hook) to read data from store 
    // useSelector give access to store
    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems);
    
    return (
        <div className="flex justify-between bg-pink-100 shadow-lg sm:bg-yellow-50 lg:bg-green-50">
            <div className="logo-container">
                <img className="w-56" src={LOGO_URL} alt="logo" />
            </div>
            <div className="flex items-center">
                <ul className="flex m-4 p-4">
                    <li className="px-4">Online: {onlineStatus ? "✅" : "🛑"}</li>
                    <li className="px-4"><Link to="/">Home</Link></li>
                    <li className="px-4"><Link to="/about">About</Link></li>
                    <li className="px-4"><Link to="/contact" >Contact Us</Link></li>
                    <li className="px-4"><Link to="/grocery" >Grocery</Link></li>
                    <li className="px-4 font-bold text-xl"><Link to="/cart">Cart ({cartItems.length} items)</Link></li>
                    <button className="login-btn" onClick={() => {
                        setLoginBtn(loginbtn === "Login" ? "Logout" : "Login");
                    }}>{loginbtn}</button>
                    <li className="px-4 font-bold">{loggedInUser}</li>
                </ul>
            </div>
        </div>
    )
}

export default Header;