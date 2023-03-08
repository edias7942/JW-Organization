import './Conteudo.css'
import Tabela from './Tabela/Tabela'
import { createContext, useContext } from 'react'
import { Contexto } from '../Contexto'

export default function Conteudo() {

    let letra = 'a'
    
    return <div id="conteudo">
        
        <Contexto.Provider value={{letra}} />

        <ul id="titulo">
            <div id="anterior">Home</div>
            <div id="atual">Carrinho</div>
        </ul>
        <Tabela />
    </div>
}