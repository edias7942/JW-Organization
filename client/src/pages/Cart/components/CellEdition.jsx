// Importing CSS:
import "./CellEdition.css"

// Importing Oficial Libraries:
import { useContext, useEffect, useState } from "react";
import Axios from "axios"

// Importing Context:
import Context from "../../../context/Context";

// Importing Consts:
import { handleTime, handleName, cleanStates } from "../../../components/consts/FormattingData";
import { allowedCharactersText } from "../../../components/consts/Dict";
import { toOriginalValues, verifyChanges } from "../../../components/Functions";
import DeleteIcon from "./../../../components/media/delete_icon.svg"

function CellEdition() {

    // Using Context:

    const { context, setContext } = useContext(Context)


    // Importing Global States and Global Data:

    let {
        cellMonth,
        cellDay,
        designated1,
        designated2,
        finalTime,
        id,
        idHtml,
        initialTime,
        setDesignated1,
        setDesignated2,
        setFinalTime,
        setInitialTime,
        setPlace,
        place,
        positionInWeek,
    } = context

    // Handling with Date Data:

    let dayWeek
    switch (positionInWeek) {
        case 1:
            dayWeek = "Domingo"
            break;
        case 2:
            dayWeek = "Segunda-feira"
            break;
        case 3:
            dayWeek = "Terça-feira"
            break;
        case 4:
            dayWeek = "Quarta-feira"
            break;
        case 5:
            dayWeek = "Quinta-feira"
            break;
        case 6:
            dayWeek = "Sexta-feira"
            break;
        case 7:
            dayWeek = "Sábado"
            break;
        default:
            break
    }
    switch (cellMonth) {
        case "Jan":
            cellMonth = "Janeiro"
            break
        case "Fev":
            cellMonth = "Fevereiro"
            break
        case "Mar":
            cellMonth = "Março"
            break
        case "Abr":
            cellMonth = "Abril"
            break
        case "Mai":
            cellMonth = "Maio"
            break
        case "Jun":
            cellMonth = "Junho"
            break
        case "Jul":
            cellMonth = "Julho"
            break
        case "Ago":
            cellMonth = "Agosto"
            break
        case "Set":
            cellMonth = "Setembro"
            break
        case "Out":
            cellMonth = "Outubro"
            break
        case "Nov":
            cellMonth = "Novembro"
            break
        case "Dez":
            cellMonth = "Dezembro"
            break
        default:
            break;
    }


    // Setting Edition States:

    const [placeEdition, setPlaceEdition] = useState("")

    const [initialTimeEdition, setInitialTimeEdition] = useState("")
    const [finalTimeEdition, setFinalTimeEdition] = useState("")

    const [designated1Edition, setDesignated1Edition] = useState("")
    const [designated2Edition, setDesignated2Edition] = useState("")

    const [originalValues, setOriginalValues] = useState({})

    useEffect(() => {
        setPlaceEdition(place)
        setInitialTimeEdition(initialTime)
        setFinalTimeEdition(finalTime)
        setDesignated1Edition(designated1)
        setDesignated2Edition(designated2)
        setOriginalValues({ place, initialTime, finalTime, designated1, designated2 })
    }, [idHtml])

    const [places, setPlaces] = useState([])

    // Searching Cart Places:

    useEffect(() => {
        Axios.post("http://localhost:3001/cart_places").then((response) => setPlaces(response.data))
    }, [])


    // 

    verifyChanges([placeEdition, initialTimeEdition, finalTimeEdition, designated1Edition, designated2Edition], originalValues)

    function handleSave(id = 0, place, initialTime, finalTime, designated1, designated2) {

        Axios.post("http://localhost:3001/designate", {
            id, place, initialTime, finalTime, designated1, designated2
        })

    }

    function exitEdition(definitely = true, saveEdition = false) {

        if (!definitely && verifyChanges([placeEdition, initialTimeEdition, finalTimeEdition, designated1Edition, designated2Edition], originalValues)) {
            document.getElementById("confirm-exit").style.display = "flex"
            return
        }

        if (definitely) document.getElementById("confirm-exit").style.display = "none"

        if (saveEdition) {
            setOriginalValues({
                place: placeEdition,
                initialTime: initialTimeEdition,
                finalTime: finalTimeEdition,
                designated1: designated1Edition,
                designated2: designated2Edition
            })
        } else {
            toOriginalValues([setPlaceEdition, setInitialTimeEdition, setFinalTimeEdition, setDesignated1Edition, setDesignated2Edition], originalValues)
            toOriginalValues([setPlace, setInitialTime, setFinalTime, setDesignated1, setDesignated2], originalValues)
        }

        let idHtml = document.getElementById("selected-cell").innerHTML
        document.getElementById(idHtml).classList.remove("selected")
        document.getElementById("selected-cell").innerHTML = ""
        document.getElementById("body").style.overflowY = "inherit"
        document.getElementById("cell-edition-modal").classList.add("exiting")
        document.getElementById("lock-screen").classList.add("exiting")
        setTimeout(() => {
            document.getElementById("cell-edition-modal").style.display = "none"
            document.getElementById("lock-screen").style.display = "none"
            document.getElementById("cell-edition-modal").classList.remove("exiting")
            document.getElementById("lock-screen").classList.remove("exiting")
        }, 200);
    }

    return (
        <div id="cell-edition-modal">

            <div id="ce-header">
                <div id="ce-date">{cellDay} de {cellMonth}</div>
                <button id="ce-close-button"
                    onClick={() => exitEdition(false)}>X</button>
            </div>
            <div id="ce-informations">
                <div id="ce-day-week">{dayWeek}</div>
                <div id="ce-wheater">
                    <div id="ce-wheater-celsius">23°</div>
                    <img src="" alt="" id="ce-wheater-icon" />
                </div>
            </div>

            <form action="" id="ce-form">
                <label id="ce-place-label" className="ce-item-label"
                    htmlFor="ce-place">
                    Local: <select type="text"
                        title="Local"
                        id="ce-place"
                        className="ce-item"
                        value={placeEdition}
                        onChange={(e) => {
                            setPlace(e.target.value)
                            setPlaceEdition(e.target.value)
                        }} >
                        {
                            places.map(element => {
                                return (
                                    <option key={element.ID}
                                        className="cd-place-option"
                                        value={element.PLACE}>
                                        {element.PLACE}
                                    </option>
                                )
                            })
                        }
                        <option value=""></option>

                    </select>
                </label>
                <label id="ce-initial-time-label" className="ce-item-label"
                    htmlFor="times">
                    Horários:

                    <div id="times">
                        <input type="text"
                            title="Horário Inicial"
                            id="ce-initial-time"
                            className="ce-item ce-time"
                            spellCheck="false"
                            value={initialTimeEdition}
                            onChange={(e) => handleTime.formattingData(e, initialTime, initialTimeEdition, setInitialTime, setInitialTimeEdition)}
                            onBlur={(e) => {
                                let value = handleTime.finalFormatting(e, initialTime, initialTimeEdition, setInitialTime, setInitialTimeEdition)
                                value = handleTime.addingInNext(value, setFinalTime, setFinalTimeEdition)
                            }}
                            placeholder="00h00" />
                        às
                        <input type="text"
                            title="Horário Final"
                            id="ce-final-time"
                            className="ce-item ce-time"
                            spellCheck="false"
                            value={finalTimeEdition}
                            onChange={(e) => handleTime.formattingData(e, finalTime, finalTimeEdition, setFinalTime, setFinalTimeEdition)}
                            onBlur={(e) => handleTime.finalFormatting(e, finalTime, finalTimeEdition, setFinalTime, setFinalTimeEdition)}
                            placeholder="00h00" />
                    </div>

                </label>
                <label id="ce-designated-1-label" className="ce-item-label"
                    htmlFor="ce-designated-1">
                    Desig. 1:

                    <input type="text"
                        id="ce-designated-1"
                        className="ce-item"
                        spellCheck="false"
                        value={designated1Edition}
                        onChange={(e) => { handleName.formattingData(e, designated1, setDesignated1, designated1Edition, setDesignated1Edition, allowedCharactersText, 15) }}
                        placeholder="" />

                </label>

                <label id="ce-designated-2-label" className="ce-item-label"
                    htmlFor="ce-designated-2">
                    Desig. 2:

                    <input type="text"
                        id="ce-designated-2"
                        className="ce-item"
                        spellCheck="false"
                        value={designated2Edition}
                        onChange={(e) => { handleName.formattingData(e, designated2, setDesignated2, designated2Edition, setDesignated2Edition, allowedCharactersText, 15) }}
                        placeholder="" />

                </label>

                <div id="buttons-edition">

                    <img id="clean-button"
                        title="Limpar Dados"
                        type="button"
                        src={DeleteIcon}
                        onClick={() => {
                            cleanStates([setPlace, setInitialTime, setFinalTime, setDesignated1, setDesignated2])
                            cleanStates([setPlaceEdition, setInitialTimeEdition, setFinalTimeEdition, setDesignated1Edition, setDesignated2Edition])
                        }} />

                    <button id="cancel-button"
                        onClick={() => exitEdition(false)}
                        type="button">Cancelar</button>

                    <button id="save-button"
                        title={!verifyChanges([placeEdition, initialTimeEdition, finalTimeEdition, designated1Edition, designated2Edition], originalValues) ? "Realize alguma modificação!" : ""}
                        onClick={() => {
                            exitEdition(true, true)
                            handleSave(id, placeEdition, initialTimeEdition, finalTimeEdition, designated1Edition, designated2Edition)
                        }}
                        type="button"
                        disabled={!verifyChanges([placeEdition, initialTimeEdition, finalTimeEdition, designated1Edition, designated2Edition], originalValues)}>Salvar</button>

                </div>

                <div id="confirm-exit">
                    <h3>As alterações não serão salvas:</h3>
                    <button id="confirm-exit-button"
                        type="button"
                        onClick={() => {
                            exitEdition(true)
                        }}>Continuar</button>
                </div>

            </form>

        </div>
    )
}

export default CellEdition;