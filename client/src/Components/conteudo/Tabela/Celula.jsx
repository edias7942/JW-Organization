import BancoDeDados from "./../../../bancoDeDados/BancoDeDados"
import { useState, useEffect, createContext, useContext } from "react"
import { Contexto } from "../../Contexto"
import { meses } from "../../../formatacaoDados/Dicio"
import "./Celula.css"
import Axios from "axios"

const BD = BancoDeDados()

export default function Celula({ posicaoSemana, semana, mesSelecionado, celulaDupla }) {

    // Declarando useStates:

    const { conteudo, setConteudo } = useContext(Contexto)

    const [designacao1, setDesignacao1] = useState([])  // Definindo informações da primeira designação
    const [designacao2, setDesignacao2] = useState([])  // Definindo informações da segunda designação

    const [ID1, setID1] = useState('')
    const [local1, setLocal1] = useState('')
    const [horarioInicial1, setHorarioInicial1] = useState('')
    const [horarioFinal1, setHorarioFinal1] = useState('')
    const [designado11, setDesignado11] = useState('')
    const [designado21, setDesignado21] = useState('')

    const [ID2, setID2] = useState('')
    const [local2, setLocal2] = useState('')
    const [horarioInicial2, setHorarioInicial2] = useState('')
    const [horarioFinal2, setHorarioFinal2] = useState('')
    const [designado12, setDesignado12] = useState('')
    const [designado22, setDesignado22] = useState('')

    // Buscando Dados na API:

    useEffect(() => {
        Axios.post("http://localhost:3001/designacao", {
            semana: semana,
            posicaoSemana: posicaoSemana,
            celulaDupla: celulaDupla
        }).then((response) => {

            let dados = response.data[0]
            if (!dados.LUGAR) dados.LUGAR = ""
            if (!dados.HORARIO) dados.HORARIO = ""
            if (!dados.DESIGNADO_1) dados.DESIGNADO_1 = ""
            if (!dados.DESIGNADO_2) dados.DESIGNADO_2 = ""


            // Formatando os dados da requisição:

            setID1(dados.ID)
            setLocal1(dados.LUGAR)

            let horario = dados.HORARIO
            if (horario) {
                setHorarioInicial1(`${horario.slice(0, 2)}h${horario.slice(2, 4)}`)
                setHorarioFinal1(`${horario.slice(4, 6)}h${horario.slice(6)}`)
            }

            if (!horario) {
                setHorarioInicial1("")
                setHorarioFinal1("")
            }

            setDesignado11(dados.DESIGNADO_1)
            setDesignado21(dados.DESIGNADO_2)

            dados = response.data[1]

            if (!dados) return

            if (!dados.LUGAR) dados.LUGAR = ""
            if (!dados.HORARIO) dados.HORARIO = ""
            if (!dados.DESIGNADO_1) dados.DESIGNADO_1 = ""
            if (!dados.DESIGNADO_2) dados.DESIGNADO_2 = ""

            // Formatando os dados da requisição:

            dados = dados ? dados : { ID: '', LUGAR: '', HORARIO: '', DESIGNADO_1: '', DESIGNADO_2: '' }
            setID2(dados.ID)
            setLocal2(dados.LUGAR)

            horario = dados.HORARIO
            if (horario) {
                setHorarioInicial2(`${horario.slice(0, 2)}h${horario.slice(2, 4)}`)
                setHorarioFinal2(`${horario.slice(4, 6)}h${horario.slice(6)}`)
            }

            if (!horario) {
                setHorarioInicial2("")
                setHorarioFinal2("")
            }

            setDesignado12(dados.DESIGNADO_1)
            setDesignado22(dados.DESIGNADO_2)
        })
    }, [mesSelecionado])



    // Declarando variáveis:

    let mesString = meses[mesSelecionado]  // example: "Janeiro"
    let mesCelula = BD.semana[semana][posicaoSemana].slice(-3)  // example: "01/Jan".slice(-3); | output: "Jan"
    let diaCelula = BD.semana[semana][posicaoSemana].slice(0, 2)  // example: "01/Jan".slice(0, 2) | output: "01"


    // Adicionando classes aos elementos:

    let classes = ""
    classes += diaCelula == "01" ? "primeiro-dia-mes " : ""
    classes += posicaoSemana === 1 ? "primeira-celula " : ""  // Referente à primeira celula de cada linha da tabela
    classes += mesString.includes(mesCelula) ? "mes-atual " : "outro-mes "


    // Função para abrir a janela de edição de uma celula:

    function abrirOpcoesCelula(
        ID,
        id,
        horarioInicial,
        setHorarioInicial,
        horarioFinal,
        setHorarioFinal,
        designado1,
        setDesignado1,
        designado2,
        setDesignado2,
        classes,
        local,
        setLocal
    ) {

        if (classes.includes("outro-mes")) {

            return
        }

        setConteudo({
            ID, id, horarioInicial, setHorarioInicial, horarioFinal, setHorarioFinal,
            designado1, setDesignado1, designado2, setDesignado2, diaCelula, mesCelula,
            local, setLocal
        })

        document.getElementById("celula-selecionada").innerHTML = id
        document.getElementById(id).classList.toggle("celula-opcoes")

        {   // Definindo a posição X da janela de edição de celulas
            let margemEsquerda
            switch (posicaoSemana) {
                case 1:
                    margemEsquerda = 8;
                    break;
                case 2:
                    margemEsquerda = 16;
                    break;
                case 3:
                    margemEsquerda = 32;
                    break;
                case 4:
                    margemEsquerda = 40;
                    break;
                case 5:
                    margemEsquerda = 21;
                    break;
                case 6:
                    margemEsquerda = 29;
                    break;
                case 7:
                    margemEsquerda = 37;
                    break;
            }

            margemEsquerda += id == id2 ? 8 : 0
            document.getElementById("editando-celula").style.marginLeft = (12 + margemEsquerda) + "vw"
        }

        document.getElementById("editando-celula").style.display = "flex"
        document.getElementById("bloquear-tela").style.display = "flex"
        document.body.style.overflowY = "hidden"
        document.getElementById("edicao-celula-local").focus()

    }

    let id1 = "celula_" + semana + "_" + posicaoSemana + "_" + 1
    let id2 = "celula_" + semana + "_" + posicaoSemana + "_" + 2
    let idheader = "celula_" + semana + "_" + posicaoSemana + "_" + "_header"

    return (
        <div id="celula" className={classes}>

            <div id={idheader} className={classes + " celula-header"}>
                {diaCelula + "/" + mesCelula}
            </div>

            <div className={celulaDupla + " celulas-conteudo" }>

                <div id={id1}
                    className={classes + " celula-conteudo"}
                    onClick={() => { abrirOpcoesCelula(ID1, id1, horarioInicial1, setHorarioInicial1, horarioFinal1, setHorarioFinal1, designado11, setDesignado11, designado21, setDesignado21, classes, local1, setLocal1) }}>
                    {local1 || horarioInicial1 || horarioFinal1 || designado11 || designado21 ? (
                    <div>
                        <p id="local-valor" className="celula-item">{local1}</p>
                        <p id="horario-valor" className="celula-item">{horarioInicial1} • {horarioFinal1}</p>
                        <p id="designado-1-valor" className="celula-item">{designado11}</p>
                        <p id="designado-2-valor" className="celula-item">{designado21}</p>
                    </div>
                    ) : (
                    <div id="botao-adicionar" className={classes}>Adicionar <br /> Designação <br />+</div>
                    )}
                </div>

                {celulaDupla &&  // Condição para adicionar um segundo conteudo à celula
                    <div id={id2}
                        className={classes + "celula-1-2 celula-conteudo"}
                        onClick={() => { abrirOpcoesCelula(ID2, id2, horarioInicial2, setHorarioInicial2, horarioFinal2, setHorarioFinal2, designado12, setDesignado12, designado22, setDesignado22, classes, local2, setLocal2) }}>
                        {local2 || horarioInicial2 || horarioFinal2 || designado12 || designado22 ?
                        (<div>
                            <p id="local-valor" className="celula-item">{local2}</p>
                            <p id="horario-valor" className="celula-item">{horarioInicial2} • {horarioFinal2}</p>
                            <p id="designado-1-valor" className="celula-item">{designado12}</p>
                            <p id="designado-2-valor" className="celula-item">{designado22}</p>
                        </div>)
                         : 
                        (<div id="botao-adicionar" className={classes}>Adicionar Designação <br />+</div>)
                        }
                    </div>}

            </div>

        </div>
    )
}