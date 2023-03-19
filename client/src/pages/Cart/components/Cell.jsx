import "./Cell.css"

import Axios from "axios"
import { useState, useEffect, useContext } from "react";

import Context from "../../../context/Context"
import { months, weeks } from "../../../components/consts/YearStructure";
import { exitEdition } from "./CellEdition";

function Cell({ positionInWeek, week, selectedMonth, doubleCell }) {

    const { context, setContext } = useContext(Context)

    const [designation1, setDesignation1] = useState([])
    const [designation2, setDesignation2] = useState([])

    const [id1, setId1] = useState("")
    const [place1, setPlace1] = useState("")
    const [initialTime1, setInitialTime1] = useState("")
    const [finalTime1, setFinalTime1] = useState("")
    const [designated11, setDesignated11] = useState("")
    const [designated21, setDesignated21] = useState("")

    const [id2, setId2] = useState("")
    const [place2, setPlace2] = useState("")
    const [initialTime2, setInitialTime2] = useState("")
    const [finalTime2, setFinalTime2] = useState("")
    const [designated12, setDesignated12] = useState("")
    const [designated22, setDesignated22] = useState("")

    // Searching Data on API:

    useEffect(() => {
        Axios.post("http://localhost:3001/designation", {
            week,
            positionInWeek,
            doubleCell
        }).then((response) => {

            let data = response.data[0]

            // Formatting Request Data:

            setId1(data.ID)
            setPlace1(data.PLACE)

            let time = data.TIME
            if (time) {
                setInitialTime1(`${time.slice(0, 2)}h${time.slice(2, 4)}`)
                setFinalTime1(`${time.slice(4, 6)}h${time.slice(6)}`)
            } else {
                setInitialTime1("")
                setFinalTime1("")
            }

            setDesignated11(data.DESIGNATED_1)
            setDesignated21(data.DESIGNATED_2)


            data = response.data[1]

            if (!data) return

            // Formatting Request Data:

            setId2(data.ID)
            setPlace2(data.PLACE)

            time = data.TIME
            if (time) {
                setInitialTime2(`${time.slice(0, 2)}h${time.slice(2, 4)}`)
                setFinalTime2(`${time.slice(4, 6)}h${time.slice(6)}`)
            } else {
                setInitialTime2("")
                setFinalTime2("")
            }

            setDesignated12(data.DESIGNATED_1)
            setDesignated22(data.DESIGNATED_2)

        })
    }, [selectedMonth])

    // Declaring Variables:

    let monthString = months[selectedMonth]
    let cellMonth = weeks[week][positionInWeek].slice(-3)
    let cellDay = weeks[week][positionInWeek].slice(0, 2)

    // Adding classes to elements:

    let classes = ""
    classes += cellDay == "01" ? "first-day-month " : ""
    classes += positionInWeek === 1 ? "first-cell " : ""
    classes += monthString.includes(cellMonth) ? "current-month " : "another-month"

    function openCellEdition(
        id,
        idHtml,
        place,
        setPlace,
        initialTime,
        setInitialTime,
        finalTime,
        setFinalTime,
        designated1,
        setDesignated1,
        designated2,
        setDesignated2,
        classes
    ) {

        if (classes.includes("another-month")) return

        setContext({
            id,
            idHtml,
            place,
            setPlace,
            initialTime,
            setInitialTime,
            finalTime,
            setFinalTime,
            designated1,
            setDesignated1,
            designated2,
            setDesignated2,
            cellMonth,
            cellDay,
            positionInWeek
        })

        document.getElementById("selected-cell").innerHTML = idHtml
        document.getElementById(idHtml).classList.toggle("selected")

        document.getElementById("lock-screen").style.display = "flex"
        document.body.style.overflow = "hidden"
        document.getElementById("ce-place").focus()
        document.getElementById("cell-edition-modal").style.display = "flex"

        {
            let marginLeft
            switch (positionInWeek) {
                case 1:
                    marginLeft = 8;
                    break
                case 2:
                    marginLeft = 16;
                    break
                case 3:
                    marginLeft = 32;
                    break
                case 4:
                    marginLeft = 40;
                    break
                case 5:
                    marginLeft = 21;
                    break
                case 6:
                    marginLeft = 29;
                    break
                case 7:
                    marginLeft = 37;
                    break
            }

            marginLeft += idHtml == idHtml2 ? 8 : 0
            document.getElementById("cell-edition-modal").style.marginLeft = (12 + marginLeft) + "vw"

        }

    }

    let idHtml1 = `cell_${week}_${positionInWeek}_1`
    let idHtml2 = `cell_${week}_${positionInWeek}_2`
    let idHtmlHeader = `cell_${week}_${positionInWeek}_header`

    return (
        <div id="cell" className={classes}>

            <div id={idHtmlHeader} className={classes + " cell-header"}>
                {`${cellDay}/${cellMonth}`}
            </div>

            <div className={doubleCell + " cells-content"}>

                <div id={idHtml1} className={classes + " cell-content"}
                    onClick={() => openCellEdition(id1, idHtml1, place1, setPlace1, initialTime1, setInitialTime1, finalTime1, setFinalTime1, designated11, setDesignated11, designated21, setDesignated21, classes)}>
                    {place1 || initialTime1 || finalTime1 || designated11 || designated21 ? (
                        <div>
                            <p id={idHtml1 + "_cell_place"}
                                className="cell-place cell-item">{place1}</p>
                            <p id={idHtml1 + "_cell_time"}
                                className="cell-time cell-item">{initialTime1}•{finalTime1}</p>
                            <p id={idHtml1 + "_cell_designated_1"}
                                className="cell-designated-1 cell-item">{designated11}</p>
                            <p id={idHtml1 + "_cell_designated_2"}
                                className="cell-designated-2 cell-item">{designated21}</p>
                        </div>
                    ) : (
                        <div id={idHtml1 + "_add_button"}
                            className={classes + "add-button"}>
                            Adicionar <br /> Designação <br /> +
                        </div>
                    )}
                </div>

                {doubleCell &&
                    <div id={idHtml2} className={classes + "cell-1-2 cell-content"}
                        onClick={() => openCellEdition(id2, idHtml2, place2, setPlace2, initialTime2, setInitialTime2, finalTime2, setFinalTime2, designated12, setDesignated12, designated22, setDesignated22, classes)}>
                        {place2 || initialTime2 || finalTime2 || designated12 || designated22 ? (
                            <div>
                                <p id={idHtml2 + "_cell_place"}
                                    className="cell-place cell-item">{place2}</p>
                                <p id={idHtml2 + "_cell_time"}
                                    className="cell-time cell-item">{initialTime2}•{finalTime2}</p>
                                <p id={idHtml2 + "_cell_designated_1"}
                                    className="cell-designated-1 cell-item">{designated12}</p>
                                <p id={idHtml2 + "_cell_designated_2"}
                                    className="cell-designated-2 cell-item">{designated22}</p>
                            </div>
                        ) : (
                            <div id={idHtml1 + "_add_button"}
                                className={classes + "add-button"}>
                                Adicionar <br /> Designação <br /> +
                            </div>
                        )}
                    </div>
                }
            </div>

        </div>
    )

}

export default Cell;