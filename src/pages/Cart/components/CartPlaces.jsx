// Importing CSS:
import "./CartPlaces.css"

// Importing Official Libraries:
import { useState, useEffect } from "react"
import Axios from "axios"

// Importing Personal Components and media:
import GoogleMapsIcon from "./../../../components/media/google_maps.png"
import Link from "./../../../context/Link"
import EditionIcon from "./../../../components/media/edition_icon.svg"
import DeleteIcon from "./../../../components/media/delete_icon.svg"

export default function CartPlaces() {

    const [places, setPlaces] = useState("")

    useEffect(() => {
        Axios.post("http://localhost:3001/cart_places").then((response) => setPlaces(response.data))
    }, [])

    return (
        <div id="cart-place-container">
            <div id="cp-header">
                Locais para o Carrinho:
            </div>
            <div id="cp-places-list">
                {places ? (
                    places.map(element => {
                        return (
                            <div id={element.ID} key={element.ID} className="cp-place" value={element.PLACE}>
                                <div className="cp-title">{element.PLACE}</div>
                                <div className="cp-street">{element.STREET}, n° {element.STREET_NUMBER}</div>
                                <div className="cp-icons">

                                    <Link id="google-maps-img-2"
                                        to={element.GOOGLEMAPS_LINK}
                                        target={"_blank"}>
                                        <img title="Abrir no Google Maps" className="google-maps-img" src={GoogleMapsIcon} />
                                    </Link>

                                    <div><img title="Edições Desativadas"
                                        className="cp-icon editLion"
                                        src={EditionIcon}
                                        alt="" />
                                    </div>

                                    <div><img
                                        title="Edições Desativadas"
                                        className="cp-icon delete"
                                        src={DeleteIcon}
                                        alt="" />
                                    </div>
                                </div>
                            </div>
                        )
                    })) : <div>Carregando...</div>
                }
            </div>
        </div>
    )
}