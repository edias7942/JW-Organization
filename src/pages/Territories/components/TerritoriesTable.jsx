// Importing CSS:
import "./TerritoriesTable.css"

// Importing Official Libraries:
import { useEffect, useState } from "react"
import Axios from "axios"

// Importing personal Components and Media:
import ArrowLeftIcon from "./../../../components/media/arrow_left_icon.svg"

const apiHost = process.env.API_HOST

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
import Territory17 from "./media/SVG/Territory_17.svg"
import Territory18 from "./media/SVG/Territory_18.svg"
import Territory19 from "./media/SVG/Territory_19.svg"
import Territory20 from "./media/SVG/Territory_20.svg"
import Territory21 from "./media/SVG/Territory_21.svg"
import Territory23 from "./media/SVG/Territory_23.svg"
import { capitalize, scrollToTop } from "../../../components/Functions"

// Importing MapIcons:
import MapIconDefault from "./media/icons/map_icon_default.svg"
import MapIconGreen from "./media/icons/map_icon_green.svg"
import MapIconRed from "./media/icons/map_icon_red.svg"
import MapIconYellow from "./media/icons/map_icon_yellow.svg"

export default function TerritoriesTable() {

    const [isOpenTerritory, setIsOpenTerritory] = useState(false)

    // Block of code if you want to add some action in the territory status click

    // function handleClick(e) {

    //     console.log(e.target.classList[0])
    //     // console.log(e.srcElement.attributes["territory"])
    // }

    // useEffect(() => {
    //     document.addEventListener("click", handleClick)
    // }, [])

    const [currentTerritory, setCurrentTerritory] = useState({})
    const [territoriesList, setTerritoriesList] = useState("")
    const [streets, setStreets] = useState([])

    const mapIcons = {
        "d": MapIconDefault,
        "g": MapIconGreen,
        "r": MapIconRed,
        "y": MapIconYellow
    }

    let Territory22 = ""
    let Territory24 = ""
    const territoriesImages = [null,
        Territory1, Territory2, Territory3, Territory4, Territory5, Territory6, Territory7, Territory8,
        Territory9, Territory10, Territory11, Territory12, Territory13, Territory14, Territory15, Territory16,
        Territory17, Territory18, Territory19, Territory20, Territory21, Territory22, Territory23, Territory24]

    useEffect(() => {

        Axios.post(apiHost + "/territories").then((response) => setTerritoriesList(response.data))

    }, [])

    function openTerritorie(territoryNumber) {

        let selectedTerritory = document.getElementById(`territory-card-${territoryNumber}`)
        let secondTerritories = [...document.getElementsByClassName("territory-card")]

        if (!isOpenTerritory) {

            // Opening Territory:
            selectedTerritory.classList.add("opening")
            setTimeout(() => {
                selectedTerritory.classList.remove("opening")
            }, 600);

            // Hidden other territories:
            secondTerritories.map((e) => {
                if (e.id !== `territory-card-${territoryNumber}`) {
                    let element = document.getElementById(e.id)
                    element.classList.add("hide")
                    setTimeout(() => {
                        element.style.display = "none"
                        element.classList.remove("hide")
                    }, 300)
                }
            })

        } else {

            // Showing other territories:
            secondTerritories.map((e) => {
                if (e.id !== `territory-card-${territoryNumber}`) {
                    let element = document.getElementById(e.id)
                    element.style.display = "inherit"
                    element.classList.add("show")
                    setTimeout(() => {
                        element.classList.remove("show")
                    }, 400);
                }
            })
            
        }
        setIsOpenTerritory(!isOpenTerritory)
    }

    let streetsArray
    useEffect(() => {
        streetsArray = currentTerritory.STREETS
        if (streetsArray) {
            streetsArray = streetsArray.split("|")
            setStreets(streetsArray)
        }
    }, [currentTerritory])

    console.log(streets)

    function openTerritory(element) {

        scrollToTop(0, 0, "auto")

        let containerTerritories = document.getElementById("container-territories")
        let territoriesTable = document.getElementById("territories-table")
        let openedTerritoryContainer = document.getElementById("opened-territory-container")

        // OPENING TERRITORY
        if (element) {
            setTimeout(() => {
                openedTerritoryContainer.classList.add("show")
                openedTerritoryContainer.style.display = "flex"
            }, 200);

            setCurrentTerritory(element)

            territoriesTable.classList.add("hide")
            setTimeout(() => {
                territoriesTable.style.display = "none"
            }, 350);
            setTimeout(() => {
                openedTerritoryContainer.classList.remove("show")
                containerTerritories.style.height = "800px"
                scrollToTop()
            }, 800);
        } else { // CLOSING TERRITORY
            containerTerritories.style.height = "1650px"
            openedTerritoryContainer.classList.add("hide")
            setTimeout(() => {
                openedTerritoryContainer.classList.remove("hide")
                openedTerritoryContainer.style.display = "none"
            }, 350);
            setTimeout(() => {
                territoriesTable.style.display = "grid"
                territoriesTable.classList.remove("hide")
                territoriesTable.classList.add("show")
            }, 200);
            setTimeout(() => {
                territoriesTable.classList.remove("show")
                scrollToTop()
            }, 600);
        }
    }

    return (
        <div id="container-territories">
            <div id="territories-table">
                {territoriesList ? (territoriesList.map((territory) => {
                    return (
                        <div territory={territory.NUMBER} id={`territory-card-${territory.NUMBER}`} className="territory-card" onClick={() => openTerritory(territory)}>
                            <img territory={territory.NUMBER} className="territory-img" src={territoriesImages[territory.ID]} alt="" />
                            <div territory={territory.NUMBER} className="territory-section1">
                                <div territory={territory.NUMBER} className="territory-header">
                                    <div territory={territory.NUMBER} className="territory-title-title"> Território {territory.NUMBER}</div>
                                    <div territory={territory.NUMBER} className="territory-localization">{territory.LOCALIZATION}</div>
                                </div>
                                <div territory={territory.NUMBER} title={capitalize(territory.STATUS)} className={"territory-status " + territory.STATUS}>{capitalize(territory.STATUS)}</div>
                            </div>
                        </div>
                    )
                })) : (<div>Carregando...</div>)}
            </div>
            <div id="opened-territory-container">
                <div id="ot-header">
                    <img id="ot-header-back" title="Voltar" src={ArrowLeftIcon} alt="" onClick={() => openTerritory()} />
                    <div id="ot-header-title">Território {currentTerritory.NUMBER} : {currentTerritory.LOCALIZATION}</div>
                    <div>.</div>
                </div>
                <div id="ot-images">
                    <img id="ot-img" src={territoriesImages[currentTerritory.ID]} alt="" />
                    <div id="ot-streets">
                        <div id="ot-streets-header">Ruas: ({streets.length})</div>
                        {streets.map((e, i) => (
                            <div id={`ot-street${++i}`} className="ot-street">
                                <img src={mapIcons[e.slice(1, 2)]} alt="" className="ot-street-icon" />
                                <div className="ot-street-name">{e.slice(2)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
