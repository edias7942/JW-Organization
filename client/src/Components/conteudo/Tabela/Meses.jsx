import React, { Component } from 'react'

import './Meses.css'

export default class Meses extends Component {

    state = {
        mesSelecionadoString: "0"
    }

    setMesSelecionado(mesSelecionado, e) {
        e == '+' ? this.setState({mesSelecionadoString: ++mesSelecionado}) : this.setState({mesSelecionadoString: --mesSelecionado})
    }
dd
    render() {
        const { mesSelecionadoString } = this.state
        const mesSelecionado = parseInt(mesSelecionadoString)

        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        return (
            <ul id='titulo-meses'>
                <li id='mes-anterior' onClick={() => this.setMesSelecionado(mesSelecionado, '-')}>{meses[mesSelecionado - 1]}</li>
                <li id='mes-atual'>{meses[mesSelecionado]}</li>
                <li id='mes-posterior' onClick={() => this.setMesSelecionado(mesSelecionado, '+')}>{meses[mesSelecionado + 1]}</li>
            </ul>
        )
    }
}
