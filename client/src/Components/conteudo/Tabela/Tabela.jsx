import BD from "./../../../bancoDeDados/BancoDeDados"
import LinhaTabela from "./LinhaTabela"
import React, { useState } from "react"
import "./Tabela.css"

const axios = require('axios')
const BancoDeDados = BD()
const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
]



export default function Tabela() {

    const [mesSelecionado, setMesSelecionado] = useState(1)
    const semana = BancoDeDados.semanasMeses[mesSelecionado].semanaInicial

    return (
        <div id="tabela">
            <ul id="tabela-header">
                <ul id="titulo-meses" >
                    <li id="mes-anterior" onClick={() => setMesSelecionado(mesSelecionado - 1)}>{meses[mesSelecionado - 1]}</li>
                    <li id="mes-atual">{meses[mesSelecionado]}</li>
                    <li id="mes-posterior" onClick={() => setMesSelecionado(mesSelecionado + 1)}>{meses[mesSelecionado + 1]}</li>
                </ul>
            </ul>
            <ul>
                <ul id="dias-semana">
                    <li className="dia-semana" id="domingo">Domingo</li>
                    <li className="dia-semana" id="segunda">Segunda</li>
                    <li className="dia-semana" id="terca">Terça</li>
                    <li className="dia-semana" id="quarta">Quarta</li>
                    <li className="dia-semana" id="quinta">Quinta</li>
                    <li className="dia-semana" id="sexta">Sexta</li>
                    <li className="dia-semana" id="sabado">Sábado</li>
                </ul>
                <LinhaTabela semana={semana} mesSelecionado={mesSelecionado} />
                <LinhaTabela semana={semana + 1} mesSelecionado={mesSelecionado} />
                <LinhaTabela semana={semana + 2} mesSelecionado={mesSelecionado} />
                <LinhaTabela semana={semana + 3} mesSelecionado={mesSelecionado} />
                <LinhaTabela semana={semana + 4} mesSelecionado={mesSelecionado} />
                {BancoDeDados.semanasMeses[mesSelecionado].semanaFinal - semana === 5 && <LinhaTabela semana={semana + 5} mesSelecionado={mesSelecionado} />}
            </ul>
        </div>
    )
}
