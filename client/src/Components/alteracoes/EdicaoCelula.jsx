// Importando CSS:
import './EdicaoCelula.css'

// Importando Bibliotecas Oficiais
import { useState, useEffect, createContext, useContext } from 'react'
import Axios from 'axios'

// Importando Contexto:
import { Contexto } from '../Contexto'

// Importando formatação de dados e funções:
import { diaSemana, caracteresPermitidosTexto, meses } from '../../formatacaoDados/Dicio'
import { handleHorario, handleName } from '../../formatacaoDados/FormatacaoDados'

// Importando Mídia:
import ClimaIcon from './clima_icon.svg'


function EdicaoCelula(props) {

    const { conteudo, setConteudo } = useContext(Contexto)

    // Importando Dados e States Globais:
    let {
        ID,
        id,
        horarioInicial,
        horarioFinal,
        setHorarioInicial,
        setHorarioFinal,
        designado1,
        designado2,
        setDesignado1,
        setDesignado2,
        diaCelula,
        mesCelula,
        local,
        setLocal
    } = conteudo

    switch (mesCelula) {
        case "Jan":
            mesCelula = "Janeiro"
            break
        case "Fev":
            mesCelula = "Fevereiro"
            break
        case "Mar":
            mesCelula = "Março"
            break
        case "Abr":
            mesCelula = "Abril"
            break
        case "Mai":
            mesCelula = "Maio"
            break
        case "Jun":
            mesCelula = "Junho"
            break
        case "Jul":
            mesCelula = "Julho"
            break
        case "Ago":
            mesCelula = "Agosto"
            break
        case "Set":
            mesCelula = "Setembro"
            break
        case "Out":
            mesCelula = "Outubro"
            break
        case "Nov":
            mesCelula = "Novembro"
            break
        case "Dez":
            mesCelula = "Dezembro"
            break
        default:
            break;
    }

    if (!horarioInicial) horarioInicial = ''

    const [localEdicao, setLocalEdicao] = useState('')

    const [horarioInicialEdicao, setHorarioInicialEdicao] = useState('')
    const [horarioFinalEdicao, setHorarioFinalEdicao] = useState('')

    const [designado1Edicao, setDesignado1Edicao] = useState('')
    const [designado2Edicao, setDesignado2Edicao] = useState('')

    const [originalValues, setOriginalValues] = useState({})

    const [valuesChanged, setValuesChanged] = useState(false)

    let horarioInicialOriginal, horarioFinalOriginal, designado1Original, designado2Original

    useEffect(() => {
        setLocalEdicao(local)
        setHorarioInicialEdicao(horarioInicial)
        setHorarioFinalEdicao(horarioFinal)
        setDesignado1Edicao(designado1)
        setDesignado2Edicao(designado2)
        setOriginalValues({local, horarioInicial, horarioFinal, designado1, designado2 })
    }, [id])


    const [locais, setLocais] = useState([])
    const celulaSelecionada = document.getElementById('celula-selecionada').innerHTML


    // Buscando dados dos Locais do Carrinho:

    useEffect(() => {
        Axios.post('http://localhost:3001/locais_carrinho', {
            comando: 'SELECT ID, NOME_LOCAL FROM LOCAIS_CARRINHO'
        }).then((response) => setLocais(response.data));
    }, [])

    function verifyChanges() {
        let localValid, horarioInicialValid, horarioFinalValid, designado1Valid, designado2Valid
        if (localEdicao !== originalValues.local) localValid = true
        if (horarioInicialEdicao !== originalValues.horarioInicial) horarioInicialValid = true
        if (horarioFinalEdicao !== originalValues.horarioFinal) horarioFinalValid = true
        if (designado1Edicao !== originalValues.designado1) designado1Valid = true
        if (designado2Edicao !== originalValues.designado2) designado2Valid = true

        return (localValid || horarioInicialValid || horarioFinalValid || designado1Valid || designado2Valid)
    }


    function handleSave(id, local, horarioInicial, horarioFinal, designado1, designado2) {

        Axios.post('http://localhost:3001/designar', {
            ID, local, horarioInicial, horarioFinal, designado1, designado2
        })
        
    }


    function sairDaEdicao(definitivamente, salvarAlteracoes = false) {
        if (!definitivamente && verifyChanges()) {
            document.getElementById('confirmar-saida').style.display = "flex"
            return
        }

        if (definitivamente) document.getElementById('confirmar-saida').style.display = "none"

        if (salvarAlteracoes) {
            setOriginalValues({
                local: localEdicao,
                horarioInicial: horarioInicialEdicao,
                horarioFinal: horarioFinalEdicao,
                designado1: designado1Edicao,
                designado2: designado2Edicao
            })
            
        } else {
            setLocal(originalValues.local)
            setLocalEdicao(originalValues.local)
            setHorarioInicial(originalValues.horarioInicial)
            setHorarioInicialEdicao(originalValues.horarioInicial)
            setHorarioFinal(originalValues.horarioFinal)
            setHorarioFinalEdicao(originalValues.horarioFinal)
            setDesignado1(originalValues.designado1)
            setDesignado1Edicao(originalValues.designado1)
            setDesignado2(originalValues.designado2)
            setDesignado2Edicao(originalValues.designado2)
        }

        let id = document.getElementById('celula-selecionada').innerHTML
        document.getElementById(id).classList.remove('celula-opcoes')
        document.getElementById('editando-celula').style.display = 'none'
        document.getElementById("celula-selecionada").innerHTML = ''
        document.getElementById("body").style.overflowY = 'inherit'
        document.getElementById('bloquear-tela').style.display = 'none'


    }

    return (
        <div id='editando-celula'>

            <div id="edicao-celula-header">
                <div id="edicao-celula-data">{diaCelula} de {mesCelula}</div>
                <button id="edicao-celula-close-button" onClick={() => sairDaEdicao(false)}>X</button>
            </div>
            <div id="edicao-celula-informacoes">
                <div id="edicao-celula-dia-semana">Segunda-feira</div>
                <div id="edicao-celula-clima">
                    <div id="edicao-celula-clima-graus">23°</div>
                    <img id="edicao-celula-clima-icone" src={ClimaIcon} alt="" />
                </div>
            </div>

            <form action="" id="edicao-celula-form">
                <label id="edicao-celula-local-label" className='edicao-celula-item-label'
                    htmlFor="edicao-celula-local"
                >Local:<select type="text"
                    id="edicao-celula-local"
                    className='edicao-celula-item'
                    value={localEdicao}
                    onChange={(e) => {
                        setLocal(e.target.value)
                        setLocalEdicao(e.target.value)
                        }}>
                        {
                            locais.map(element => {
                                return (
                                <option key={element.ID}
                                    className='edicao-celula-local-opcao'
                                    value={element.NOME_LOCAL}>
                                    {element.NOME_LOCAL}
                                </option>
                            )
                        })}
                        <option value=""></option>

                    </select>
                </label>
                <label id="edicao-celula-horario-inicial-label" className='edicao-celula-item-label'
                    htmlFor="horarios">
                    Horário:

                    <div id='horarios'>
                        <input type="text"
                            id="edicao-celula-horario-inicial"
                            className='edicao-celula-item edicao-celula-horario'
                            spellCheck='false'
                            value={horarioInicialEdicao}
                            onChange={(e) => handleHorario.formatandoDados(e, horarioInicial, horarioInicialEdicao, setHorarioInicial, setHorarioInicialEdicao, 23, 59)}
                            onBlur={(e) => {
                                let value = handleHorario.formatacaoFinal(e, horarioInicial, horarioInicialEdicao, setHorarioInicial, setHorarioInicialEdicao, 23, 59)
                                value = handleHorario.somandoAoProximo(value, setHorarioFinal, setHorarioFinalEdicao, 23, 59)
                            }}
                            placeholder="00h00" />
                        às
                        <input type="text"
                            id="edicao-celula-horario-final"
                            className='edicao-celula-item edicao-celula-horario'
                            spellCheck='false'
                            value={horarioFinalEdicao}
                            onChange={(e) => handleHorario.formatandoDados(e, horarioFinal, horarioFinalEdicao, setHorarioFinal, setHorarioFinalEdicao, 23, 59)}
                            onBlur={(e) => handleHorario.formatacaoFinal(e, horarioFinal, horarioFinalEdicao, setHorarioFinal, setHorarioFinalEdicao, 23, 59)}
                            placeholder="00h00" />
                    </div>

                </label>
                <label
                    id="edicao-celula-designado-1-label"
                    className='edicao-celula-item-label'
                    htmlFor="edicao-celula-designado-1" >
                    Desig. 1:

                    <input type="text"
                        id="edicao-celula-designado-1"
                        className='edicao-celula-item'
                        spellCheck='false'
                        value={designado1Edicao}
                        onChange={(e) => {
                            handleName.formatandoTexto(e, designado1, setDesignado1, designado1Edicao, setDesignado1Edicao, caracteresPermitidosTexto, 15)
                            verifyChanges(designado1Original, designado1)
                        }}
                        onBlur={(e) => handleName.formatacaoFinal(e, setDesignado1)}
                        placeholder="" />

                </label>

                <label id="edicao-celula-designado-2-label"
                    className='edicao-celula-item-label'
                    htmlFor="edicao-celula-designado-2">
                    Desig. 2:

                    <input type="text"
                        id="edicao-celula-designado-2"
                        className='edicao-celula-item'
                        spellCheck='false'
                        value={designado2Edicao}
                        onChange={(e) => handleName.formatandoTexto(e, designado2, setDesignado2, designado2Edicao, setDesignado2Edicao, caracteresPermitidosTexto, 15)}
                        onBlur={(e) => handleName.formatacaoFinal(e, setDesignado2)}
                        placeholder="" />

                </label>

                <div id='edicao-buttons'>

                    <button id='button-cancel'
                        onClick={() => sairDaEdicao(false)}
                        type="button">Cancelar</button>

                    <button id='button-save'
                        title={!verifyChanges() ? "Realize alguma modificação!" : ""}
                        onClick={() => {
                            sairDaEdicao(true, true)
                            handleSave(id, localEdicao, horarioInicialEdicao, horarioFinalEdicao, designado1Edicao, designado2Edicao)
                        }}
                        type="button"
                        disabled={!verifyChanges()}>Salvar</button>
                </div>

                <div id='confirmar-saida'>
                    <h3>As alterações não serão salvas:</h3>
                    <button id='confirmar-saida-button'
                        type='button'
                        onClick={() => sairDaEdicao(true)}>Continuar</button>
                </div>

            </form>

        </div>
    )
}


export default EdicaoCelula