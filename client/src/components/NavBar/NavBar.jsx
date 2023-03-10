import "./NavBar.css"

import Link from "../../context/Link"

import LoginIcon from "./../media/login.svg"

export default function NavBar() {
    return (
        <div id="container">
            <div id="nav-content">
                <div id="nav-left">JW Organization</div>
                <div id="nav-right">

                    <Link to="/territories">
                        <div className="nav-right-item">• Territórios</div>
                    </Link>

                    <Link to="/cart">
                        <div className="nav-right-item">• Carrinho</div>
                    </Link>

                    <Link to="/field_meeting">
                        <div className="nav-right-item">• Pregação</div>
                    </Link>

                    <img src={LoginIcon} id="login-icon" alt="" />
                </div>
            </div>
        </div>
    )
}