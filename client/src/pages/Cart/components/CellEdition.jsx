import "./CellEdition.css"

import { useContext, useEffect, useState } from "react";
import Axios from "axios"

import Context from "../../../context/Context";

function CellEdition() {

    const { context, setContext } = useContext(Context)

    // Importing Global States and Global Data:
    let {
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
        cellDay
    } = context

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

    if (!initialTime) setInitialTime("")

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

    // Seraching Cart Places:

    useEffect(() => {
        Axios.post("http://localhost:3001/cart_places", {
            command: "SELECT ID, PLACE_NAME FROM CART_PLACES"
        }).then((response) => setPlaces(response.data))
    }, [])

    function verifyChanges() {
        let validPlace, validInitialTime, validFinalTime, validDesignated1, validDesignated2
        if (validPlace !== originalValues.place) validPlace = true
        if (validInitialTime !== originalValues.initialTime) validInitialTime = true
        if (validFinalTime !== originalValues.finalTime) validFinalTime = true
        if (validDesignated1 !== originalValues.designated1) validDesignated1 = true
        if (validDesignated2 !== originalValues.designated2) validDesignated2 = true
        return (validPlace || validInitialTime || validFinalTime || validDesignated1 || validDesignated2)
    }

    function handleSave(id, place, initialTime, finalTime, designated1, designated2) {

        Axios.post("http://localhost:3001/designate", {
            id, place, initialTime, finalTime, designated1, designated2
        })
        
    }

    function exitEditing(definitely, saveEdition = false) {
        if (!definitely && verifyChanges()) {
            document.getElementById("confirm-exit")
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
            setPlace(originalValues.place)
            setInitialTime(originalValues.initialTime)
            setFinalTime(originalValues.finalTime)
            setDesignated1(originalValues.designated1)
            setDesignated2(originalValues.designated2)
            setPlaceEdition(originalValues.place)
            setInitialTimeEdition(originalValues.initialTime)
            setFinalTimeEdition(originalValues.finalTime)
            setDesignated1Edition(originalValues.designated1)
            setDesignated2Edition(originalValues.designated2)
        }

        let idHtml = document.getElementById("selected-cell").innerHTML
        document.getElementById(idHtml).classList.remove("selected")
        document.getElementById("cell-edition-modal").style.display = "none"
        document.getElementById("selected-cell").innerHTML = ""
        document.getElementById("body").style.overflowY = "inherit"
        document.getElementById("lock-screen").style.display = "none"
    }

    return (
        <div id="cell-edition-modal">

        </div>
    )
}

export default CellEdition;