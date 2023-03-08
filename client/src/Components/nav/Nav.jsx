import './Nav.css'
import LoginIcon from "../../media/login.svg"

export default function NavSuperior() {
    return <>
        <ul id="nav">
            <ul id="nav-left">JW Organization</ul>
            <ul id="nav-right">
                <li className="nav-right-item">Territórios</li>
                <li className="nav-right-item">Carrinho</li>
                <li className="nav-right-item">Pregação</li>
                <img src={LoginIcon}
                    className="nav-right-item"
                    id='login-icon'
                    alt='' />
            </ul>
        </ul>
    </>
}