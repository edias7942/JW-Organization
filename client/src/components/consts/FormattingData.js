export const handleHorario = {

    formatandoDados(e, time, timeEdition, setTime, setTimeEdition, maxHour, maxMinute) {

        const validCharacters = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ""]

        let value = e.target.value
        let character = value.slice(-1)
        let isValidCharacter = validCharacters.includes(character)  // Verificando se o Caracter inserido é válido

        // Characteres Limit:
        const maxCharacters = 5
        if (value.length > maxCharacters) return

        // Permitindo alterações no caso de deletar:
        if (value < timeEdition) {
            if (value.length === 2) {
                setTime(value.slice(0, 1))
                setTimeEdition(value)
                return
            } else setTime(value)
            setTimeEdition(value)
        }

        // Avaliar se o caracter inserido é válido:
        if (!isValidCharacter) return

        // Colocar o "h" para separar horas e minutes:
        if (value.length == 2) {

            // Verificando se a hour é válida:
            if (value > maxHour) value = maxHour

            setTime(value + 'h')
            setTimeEdition(value + 'h')
            return
        }

        // Verificando se os minutes são válidos:
        let minutes = value.slice(-2)
        if (value.length == 5 && minutes > maxMinute)
            value = value.slice(0, 3) + maxMinute

        setTime(value)
        setTimeEdition(value)
    },

    formatacaoFinal(e, time, timeEdition, setTime, setTimeEdition, maxHour, maxMinute) {
        let value = e.target.value

        switch (value.length) {
            case 1: {
                value = '0' + value + 'h00'
                setTime(value)
                setTimeEdition(value)
                break
            }
            case 2: {
                value += 'h00'
                setTime(value)
                setTimeEdition(value)
                break
            }
            case 3: {
                value += '00'
                setTime(value)
                setTimeEdition(value)
                break
            }
            case 4: {
                value = value[2] == 'h' ? value + '0' : '0' + value
                setTime(value)
                setTimeEdition(value)
                break
            }
        }

        let hour = value.slice(0, 2)
        let minutes = value.slice(-2)

        if (isNaN(hour)) {
            value = '00h00'
            setTime(value)
            setTimeEdition(value)
        }

        if (hour > maxHour) {
            value = maxHour + value.slice(2)
            setTime(value)
            setTimeEdition(value)
        }
        return value

    },

    somandoAoProximo(value, setTime2, setTime2Edition, maxHour, maxMinute) {
        if (!value) {
            setTime2('')
            setTime2Edition('')
            return
        }

        let currentHour = value.slice(0, 2)
        let time2 = (parseInt(currentHour)) + 2

        if (time2 > maxHour) {
            time2 = maxHour
            value = maxHour + 'h' + maxMinute
            setTime2(value)
            setTime2Edition(value)
            return value
        }

        if (time2 <= 9) {
            value = '0' + time2 + value.slice(2)
            setTime2(value)
            setTime2Edition(value)
            return
        }

        value = time2 + value.slice(2)
        setTime2(value)
        setTime2Edition(value)
        return value
    }


}


// Objeto com funções para formatação de text:

export const handleName = {

    formatandoTexto(e, text, setText, textoEdicao, setTextEdition, allowedCharacters, maxCharacters = 10) {
        let value = e.target.value
        let character = value.slice(-1)
        let isValidCharacter = allowedCharacters.includes(character)

        if (!isValidCharacter) return
        if (value.length > maxCharacters) return
        value = value ? value[0].toUpperCase() + value.slice(1) : ''
        if (value.slice(-2, -1) === ' ') value = value.slice(0, -1) + value.slice(-1).toUpperCase()
        setText(value)
        setTextEdition(value)
    },

    formatacaoFinal(e, setText) {
        let value = e.target.value
        if (!value) return
        setText(value)
    }

}