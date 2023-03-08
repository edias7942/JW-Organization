import Celula from './Celula'
import './LinhaTabela.css'

export default function LinhaTabela(props) {

    return (
        <ul id='linha-tabela'>
            <Celula semana={props.semana} posicaoSemana={1} mesSelecionado={props.mesSelecionado} celulaDupla=""/>
            <Celula semana={props.semana} posicaoSemana={2} mesSelecionado={props.mesSelecionado} celulaDupla="celulaDupla" />
            <Celula semana={props.semana} posicaoSemana={3} mesSelecionado={props.mesSelecionado} celulaDupla=""/>
            <Celula semana={props.semana} posicaoSemana={4} mesSelecionado={props.mesSelecionado} celulaDupla="celulaDupla" />
            <Celula semana={props.semana} posicaoSemana={5} mesSelecionado={props.mesSelecionado} celulaDupla=""/>
            <Celula semana={props.semana} posicaoSemana={6} mesSelecionado={props.mesSelecionado} celulaDupla=""/>
            <Celula semana={props.semana} posicaoSemana={7} mesSelecionado={props.mesSelecionado} celulaDupla="celulaDupla" />
        </ul>
    )
}