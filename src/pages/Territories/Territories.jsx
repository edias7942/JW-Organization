import "./Territories.css"

import React, { useState } from "react"

import Context from "../../context/Context"
import Link from "../../context/Link"
import TerritoriesTable from "./components/TerritoriesTable"

export default function Territories() {
    
    const [context, setContext] = useState('')

    return (
        <Context.Provider value={{ context, setContext }}>

            <div className="container">
                <div className="content">
                    <div id="title">
                        <Link to="/">
                            <div id="previous">Home</div>
                        </Link>
                        <div id="current">Territórios</div>
                    </div>
                    <TerritoriesTable />
                </div>
            </div>

        </Context.Provider>
    )
}