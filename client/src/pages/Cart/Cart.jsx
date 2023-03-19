import "./Cart.css"

import React, { useState } from "react"

import CellEdition from "./components/CellEdition"
import Context from "../../context/Context"
import Link from "../../context/Link"
import CartTable from "./components/CartTable"

export default function Cart() {
    
    const [context, setContext] = useState('')

    return (
        <Context.Provider value={{ context, setContext }}>

            <div className="container">
                <div id="lock-screen" />
                <CellEdition />
                <div className="content">
                    <div id="title">
                        <Link to="/">
                            <div id="previous">Home</div>
                        </Link>
                        <div id="current">Carrinho</div>
                    </div>
                    <CartTable />
                </div>
            </div>

        </Context.Provider>
    )
}