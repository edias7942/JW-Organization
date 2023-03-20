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
import { capitalize } from "../../../components/Functions"

export default function TerritoriesTable() {

    const [territoriesList, setTerritoriesList] = useState("")

    const territoryImages = [Territory1, Territory2, Territory3, Territory4, Territory5, Territory6]
    const territoryNumber = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"]

    useEffect(() => {

        Axios.post("http://localhost:3001/territories").then((response) => setTerritoriesList(response.data))
        
    })
    
    return (
        <div id="territories-table">
            {territoriesList ? (territoriesList.map((e, i) => {
                return (
                    <div className="territory-card">
                        <img className="territory-img" src={territoryImages[i]} alt="" />
                        <div className="territory-section1">
                            <div className="territory-header">
                                <div className="territory-title-title">Território {e.NUMBER}</div>
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