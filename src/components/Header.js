import { LOGO_URL } from "../utils/constants";
import { use, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {

    const [loginbtn, setLoginBtn] = useState("Login");

    const onlineStatus = useOnlineStatus();

    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={LOGO_URL} alt="logo" />
            </div>
            <div className="nav-items">
                <ul>
                    <li>Online: {onlineStatus ? "✅": "🛑"}</li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact" >Contact Us</Link></li>
                    <li><Link to="/grocery" >Grocery</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <button className="login-btn" onClick={() => {
                        setLoginBtn(loginbtn === "Login" ? "Logout" : "Login");
                    }}>{loginbtn}</button>
                </ul>
            </div>
        </div>
    )
}

export default Header;