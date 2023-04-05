import "./CartTable.css"

import React, { useEffect, useState } from "react"

import { months, weeksMonths } from "../../../components/consts/YearStructure"
import TableRow from "./TableRow"

function CartTable() {

    const [selectedMonth, setSelectedMonth] = useState(0)
    const week = weeksMonths[selectedMonth].initialWeek

    useEffect(() => {

    }, [])

    return (
        <div id="cart-table">
            <div id="cart-table-header">
                <div id="months-title">
                    <div id="last-month" onClick={() => setSelectedMonth(selectedMonth - 1)}>{months[selectedMonth - 1]}</div>
                    <div id="current-month">{months[selectedMonth]}</div>
                    <div id="next-month" onClick={() => setSelectedMonth(selectedMonth + 1)}>{months[selectedMonth + 1]}</div>
                </div>
            </div>
            <div id="days-week">
                <div id="sunday" className="day-week">Domingo</div>
                <div id="monday" className="day-week">Segunda</div>
                <div id="tuesday" className="day-week">Terça</div>
                <div id="wednesday" className="day-week">Quarta</div>
                <div id="thursday" className="day-week">Quinta</div>
                <div id="friday" className="day-week">Sexta</div>
                <div id="saturday" className="day-week">Sábado</div>
            </div>
            <TableRow week={week} selectedMonth={selectedMonth} />
            <TableRow week={week + 1} selectedMonth={selectedMonth} />
            <TableRow week={week + 2} selectedMonth={selectedMonth} />
            <TableRow week={week + 3} selectedMonth={selectedMonth} />
            <TableRow week={week + 4} selectedMonth={selectedMonth} />
            {weeksMonths[selectedMonth].lastWeek - week === 5 && <TableRow week={week + 5} selectedMonth={selectedMonth} />}
        </div>
    )
}

export default CartTable