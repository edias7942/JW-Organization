import React from "react"
import { Link } from "react-router-dom"

import "./Card.css"

export default function Card({ info }) {

    let { id, toRef, img, title, description } = info

    return (
        <Link to={`/${toRef}`}
            style={{ textDecoration: "none", color: "inherit", cursor: "default" }}>

            <div className="card" >

                <div className="card-img-div">
                    <img className="card-img" src={img} />
                </div>

                <div className="card-text">
                    <div className="card-title">{title}</div>
                    <div className="card-description">
                        {description.map(e => <div key={e}>• {e}</div>)}
                    </div>
                </div>

            </div>

        </Link>

    )
}