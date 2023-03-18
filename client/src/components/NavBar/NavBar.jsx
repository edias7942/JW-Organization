import "./NavBar.css"

import { useEffect, useState } from "react"
import Axios from "axios"

import Link from "../../context/Link"

import LoginIcon from "./../media/login.svg"

export default function NavBar() {

    const [weather, setWeather] = useState("")
    
    useEffect(() => {
        Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${"Ferraz de Vasconcelos"}&appid=${"618271d7df70561faaffaf6bffdf8df1"}&lang=pt_br`).then(
            (response) => {
                let tempWeather = response.data.main.feels_like - 273.15
                tempWeather = Math.floor(tempWeather)
                setWeather(tempWeather)
            }
        )
        
    }, [])
    
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
                    <div className="nav-right-item">{weather}</div>
                </div>
            </div>
        </div>
    )
}