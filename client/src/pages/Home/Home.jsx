import './Home.css'

import React from "react";

import TerritoriosImg from './media/territorios_icon.svg'
import Card from "./components/Card/Card";
import CarrinhoImg from './media/carrinho_icon.svg'
import ConsideracoesImg from './media/consideracoes_icon.svg'

function Home() {

    let cardsSettings = {

        card1: {
            id: 1,
            toRef: "territories",
            img: TerritoriosImg,
            title: "Territórios",
            description: [
                "Visualização de territórios",
                "Organização de Territórios",
                "Localização no Google Maps"
            ]
        },

        card2: {
            id: 2,
            toRef: "cart",
            img: CarrinhoImg,
            title: "Carrinho",
            description: [
                "Datas de Designações",
                "Pontos do Carrinho",
                "Designados"
            ]
        },

        card3: {
            id: 3,
            toRef: "field_meets",
            img: ConsideracoesImg,
            title: "Considerações",
            description: [
                "Dirigentes de Campo",
                "Territórios que serão usados",
                "Companhias de Campo"
            ]
        }

    }

    return (
        <div className="container">

            <div id="section-1">
                <div id="greetings">
                    <div id="greetings-title">
                        Seja <b>Bem-Vindo(a)</b> ao <br /> Jw Organization
                    </div>
                    <div id="greetings-text">
                        Nesse site você encontrará auxílio para organizar
                        as informações e designações da sua Congregação
                    </div>
                </div>
                <div className="cards">
                    <Card id="card-1"
                    info={cardsSettings.card1}/>
                    <Card id="card-2" info={cardsSettings.card2} />
                    <Card id="card-3" info={cardsSettings.card3} />
                </div>
            </div>

            <div id="section-2">

                <div id="section-2-title">
                    Por criamos o Jw Organization?
                </div>

                <div id="section-2-content">
                    <div id="section-2-text">
                        O objetivo do site é
                    </div>
                </div>

            </div>

            {console.log("Página Home Carregada!")}
        </div>

    )
}

export default Home;