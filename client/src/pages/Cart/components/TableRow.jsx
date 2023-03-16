import "./TableRow.css"

import Cell from "./Cell"

function TableRow({ week, selectedMonth }) {
    return (
        <div id="table-row">
            <Cell week={week} positionInWeek={1} selectedMonth={selectedMonth} doubleCell="" />
            <Cell week={week} positionInWeek={2} selectedMonth={selectedMonth} doubleCell="double-cell" />
            <Cell week={week} positionInWeek={3} selectedMonth={selectedMonth} doubleCell="" />
            <Cell week={week} positionInWeek={4} selectedMonth={selectedMonth} doubleCell="double-cell" />
            <Cell week={week} positionInWeek={5} selectedMonth={selectedMonth} doubleCell="" />
            <Cell week={week} positionInWeek={6} selectedMonth={selectedMonth} doubleCell="" />
            <Cell week={week} positionInWeek={7} selectedMonth={selectedMonth} doubleCell="double-cell" />
        </div>
    )
}

export default TableRow;