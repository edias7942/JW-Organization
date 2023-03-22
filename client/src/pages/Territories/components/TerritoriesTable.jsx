// Importing CSS:
import "./TerritoriesTable.css"

// Importing Official Libraries:
import { useEffect, useState } from "react"
import Axios from "axios"

// Importing personal Components and Media:
import Territory1 from "./media/SVG/Territory_1.svg"
import Territory2 from "./media/SVG/Territory_2.svg"
import Territory3 from "./media/SVG/Territory_3.svg"
import Territory4 from "./media/SVG/Territory_4.svg"
import Territory5 from "./media/SVG/Territory_5.svg"
import Territory6 from "./media/SVG/Territory_6.svg"
import Territory7 from "./media/SVG/Territory_7.svg"
import Territory8 from "./media/SVG/Territory_8.svg"
import Territory9 from "./media/SVG/Territory_9.svg"
import Territory10 from "./media/SVG/Territory_10.svg"
import Territory11 from "./media/SVG/Territory_11.svg"
import Territory12 from "./media/SVG/Territory_12.svg"
import Territory13 from "./media/SVG/Territory_13.svg"
import Territory14 from "./media/SVG/Territory_14.svg"
import Territory15 from "./media/SVG/Territory_15.svg"
import Territory16 from "./media/SVG/Territory_16.svg"
import Territory21 from "./media/SVG/Territory_21.svg"
import Territory23 from "./media/SVG/Territory_23.svg"
import { capitalize } from "../../../components/Functions"

export default function TerritoriesTable() {
    let Territory17 = ""
    let Territory18 = ""
    let Territory19 = ""
    let Territory20 = ""
    let Territory22 = ""
    let Territory24 = ""
    const [territoriesList, setTerritoriesList] = useState("")

    const territoryImages = [Territory1, Territory2, Territory3, Territory4, Territory5, Territory6, Territory7, Territory8, Territory9, Territory10, Territory11,
                             Territory12, Territory13, Territory14, Territory15, Territory16, Territory17, Territory18, Territory19, Territory20, Territory21,
                             Territory22, Territory23, Territory24]

    useEffect(() => {

        Axios.post("http://localhost:3001/territories").then((response) => setTerritoriesList(response.data))
        
    }, [])

    function openTerritorie(territoryNumber) {
        
    }
    
    return (
        <div id="territories-table">
            {territoriesList ? (territoriesList.map((e, i) => {
                return (
                    <div className="territory-card" onClick={() => console.log("Território: ", e.NUMBER)}>
                        <img className="territory-img" src={territoryImages[i]} alt="" />
                        <div className="territory-section1">
                            <div className="territory-header">
                                <div className="territory-title-title"> Território {e.NUMBER}</div>
                                <div className="territory-localization">{e.LOCALIZATION}</div>
                            </div>
                            <div title={capitalize(e.STATUS)} className={"territory-status " + e.STATUS}>{capitalize(e.STATUS)}</div>
                        </div>
                    </div>
                )
            })) : (<div>Carregando...</div>)}
        </div>
    )
}