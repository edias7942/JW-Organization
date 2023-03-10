import "./Card.css"

import React from "react"
import Link from "../../../../context/Link"

export default function Card({ info }) {

    function cardHover(action) {
        const card = document.getElementById(`card-${id}`)
        const cardImgDiv = card.children[0]
        const cardImg = card.children[0].children[0]
        const cardTitle = card.children[1].children[0]

        if (action === "on") {
            card.classList.add("hover")
            cardImgDiv.classList.add("hover")
            cardImg.classList.add("hover")
            cardTitle.classList.add("hover")
        }

        if (action === "out") {
            card.classList.remove("hover")
            cardImgDiv.classList.remove("hover")
            cardImg.classList.remove("hover")
            cardTitle.classList.remove("hover")
        }
    }

    let { id, toRef, img, title, description } = info

    return (

        <Link to={`/${toRef}`} >

            <div id={`card-${id}`}
                className="card"
                onMouseOver={(e) => cardHover("on")}
                onMouseOut={(e) => cardHover("out")}>

                <div className="card-img-div">
                    <img className="card-img" src={img} alt="img" />
                </div>

                <div className="card-text">
                    <div className="card-title">{title}</div>
                    <div className="card-description">
                        {description.map(e => <div key={e}>• {e}</div>)}
                    </div>
                </div>

            </div>

            {console.log(`Card ${id} Carregado!`)}

        </Link>

    )
}