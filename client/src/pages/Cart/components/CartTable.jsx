import "./CartTable.css"

import React, { useState } from "react"

import { months, weeksMonths } from "./../../../components/consts/YearStructure"

function CartTable() {

    const [selectedMonth, setSelectedMonth] = useState(0)
    const week = weeksMonths[selectedMonth].initialWeek

    return (
        <div id="cart-table">
            <div id="cart-table-header">
                <div id="last-month" onClick={() => setSelectedMonth(selectedMonth - 1)}>{months[selectedMonth - 1]}</div>
                <div id="current-month">{months[selectedMonth]}</div>
                <div id="next-month" onClick={() => setSelectedMonth(selectedMonth + 1)}>{months[selectedMonth + 1]}</div>
            </div>
        </div>
    )
}

export default CartTable