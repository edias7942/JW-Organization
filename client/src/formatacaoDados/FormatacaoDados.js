export const handleHorario = {

    formatandoDados(e, horario, horarioEdicao, setHorario, setHorarioEdicao, horaMaxima, minutoMaximo) {

        const validCharacters = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ""]

        let value = e.target.value
        let character = value.slice(-1)
        let isValidCharacter = validCharacters.includes(character)  // Verificando se o Caracter inserido é válido

        // Limite de Caracteres:
        const maximumCharacters = 5
        if (value.length > maximumCharacters) return

        // Permitindo alterações no caso de deletar:
        if (value < horarioEdicao) {
            if (value.length === 2) {
                setHorario(value.slice(0, 1))
                setHorarioEdicao(value)
                return
            } else setHorario(value)
            setHorarioEdicao(value)
        }

        // Avaliar se o caracter inserido é válido:
        if (!isValidCharacter) return

        // Colocar o "h" para separar horas e minutos:
        if (value.length == 2) {

            // Verificando se a hora é válida:
            if (value > horaMaxima) value = horaMaxima

            setHorario(value + 'h')
            setHorarioEdicao(value + 'h')
            return
        }

        // Verificando se os minutos são válidos:
        let minutos = value.slice(-2)
        if (value.length == 5 && minutos > minutoMaximo)
            value = value.slice(0, 3) + minutoMaximo

        setHorario(value)
        setHorarioEdicao(value)
    },

    formatacaoFinal(e, horario, horarioEdicao, setHorario, setHorarioEdicao, horaMaxima, minutoMaximo) {
        let value = e.target.value

        switch (value.length) {
            case 1: {
                value = '0' + value + 'h00'
                setHorario(value)
                setHorarioEdicao(value)
                break
            }
            case 2: {
                value += 'h00'
                setHorario(value)
                setHorarioEdicao(value)
                break
            }
            case 3: {
                value += '00'
                setHorario(value)
                setHorarioEdicao(value)
                break
            }
            case 4: {
                value = value[2] == 'h' ? value + '0' : '0' + value
                setHorario(value)
                setHorarioEdicao(value)
                break
            }
        }

        let hora = value.slice(0, 2)
        let minutos = value.slice(-2)

        if (isNaN(hora)) {
            value = '00h00'
            setHorario(value)
            setHorarioEdicao(value)
        }

        if (hora > horaMaxima) {
            value = horaMaxima + value.slice(2)
            setHorario(value)
            setHorarioEdicao(value)
        }
        return value

    },

    somandoAoProximo(value, setHorarioSecundario, setHorarioSecundarioEdicao, horaMaxima, minutoMaximo) {
        if (!value) {
            setHorarioSecundario('')
            setHorarioSecundarioEdicao('')
            return
        }

        let horaAtual = value.slice(0, 2)
        let horaSecundaria = (parseInt(horaAtual)) + 2

        if (horaSecundaria > horaMaxima) {
            horaSecundaria = horaMaxima
            value = horaMaxima + 'h' + minutoMaximo
            setHorarioSecundario(value)
            setHorarioSecundarioEdicao(value)
            return value
        }

        if (horaSecundaria <= 9) {
            value = '0' + horaSecundaria + value.slice(2)
            setHorarioSecundario(value)
            setHorarioSecundarioEdicao(value)
            return
        }

        value = horaSecundaria + value.slice(2)
        setHorarioSecundario(value)
        setHorarioSecundarioEdicao(value)
        return value
    }


}


// Objeto com funções para formatação de texto:

export const handleName = {

    formatandoTexto(e, texto, setTexto, textoEdicao, setTextoEdicao, caracteresPermitidos, maximumCharacters = 10) {
        let value = e.target.value
        let character = value.slice(-1)
        let isValidCharacter = caracteresPermitidos.includes(character)

        if (!isValidCharacter) return
        if (value.length > maximumCharacters) return
        value = value ? value[0].toUpperCase() + value.slice(1) : ''
        if (value.slice(-2, -1) === ' ') value = value.slice(0, -1) + value.slice(-1).toUpperCase()
        setTexto(value)
        setTextoEdicao(value)
    },

    formatacaoFinal(e, setTexto) {
        let value = e.target.value
        if (!value) return
        setTexto(value)
    }

}