import "./NavBar.css"

import LoginIcon from "./../media/login.svg"

export default function NavBar() {
    return (
        <div id="container">
            <div id="nav-content">
                <div id="nav-left">JW Organization</div>
                <div id="nav-right">
                    <div className="nav-right-item">• Territórios</div>
                    <div className="nav-right-item">• Carrinho</div>
                    <div className="nav-right-item">• Pregação</div>
                    <img src={LoginIcon}
                        id="login-icon" />
                </div>
            </div>
        </div>
    )
}