export const handleTime = {

    setTime2(value, setTime, setTimeEdition) {
        setTime(value)
        setTimeEdition(value)
    },

    formattingData(e, time, timeEdition, setTime, setTimeEdition, maxHour = 23, maxMinute = 59) {

        const validCharacters = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ""]

        let value = e.target.value
        let character = value.slice(-1)
        let isValidCharacter = validCharacters.includes(character)  // Checking if the entered character is valid

        // Characteres Limit:
        const maxCharacters = 5
        if (value.length > maxCharacters) return

        // Allowing changes in case of deletion:
        if (value < timeEdition) {
            if (value.length === 2) {
                this.setTime2(value.slice(0, 1), setTime, setTimeEdition)
                return
            } else this.setTime2(value)
        }

        // If the entered character is not valid:
        if (!isValidCharacter) return

        // Inserting "h" to split hours and minutes:
        if (value.length == 2) {

            // Checking if hour is valid:
            if (value > maxHour) value = maxHour

            this.setTime2(value + 'h', setTime, setTimeEdition)
            return
        }

        // Checking if minute is valid:
        let minutes = value.slice(-2)
        if (value.length == 5 && minutes > maxMinute)
            value = value.slice(0, 3) + maxMinute

        this.setTime2(value, setTime, setTimeEdition)
    },

    finalFormatting(e, time, timeEdition, setTime, setTimeEdition, maxHour = 23, maxMinute = 59) {

        let value = e.target.value

        switch (value.length) {
            case 1: {
                value = '0' + value + 'h00'
                this.setTime2(value, setTime, setTimeEdition)
                break
            }
            case 2: {
                value += 'h00'
                this.setTime2(value, setTime, setTimeEdition)
                break
            }
            case 3: {
                value += '00'
                this.setTime2(value, setTime, setTimeEdition)
                break
            }
            case 4: {
                value = value[2] == 'h' ? value + '0' : '0' + value
                this.setTime2(value, setTime, setTimeEdition)
                break
            }
        }

        let hour = value.slice(0, 2)
        let minutes = value.slice(-2)

        if (isNaN(hour)) {
            value = '00h00'
            this.setTime2(value, setTime, setTimeEdition)
        }

        if (hour > maxHour) {
            value = maxHour + value.slice(2)
            this.setTime2(value, setTime, setTimeEdition)
        }
        return value

    },

    addingInNext(value, setTime, setTimeEdition, maxHour, maxMinute) {
        if (!value) {
            this.setTime2('', setTime, setTimeEdition)
            return
        }

        let currentHour = value.slice(0, 2)
        let time2 = (parseInt(currentHour)) + 2

        if (time2 > maxHour) {
            time2 = maxHour
            value = maxHour + 'h' + maxMinute
            this.setTime2(value, setTime, setTimeEdition)
            return value
        }

        if (time2 <= 9) {
            value = '0' + time2 + value.slice(2)
            this.setTime2(value, setTime, setTimeEdition)
            return
        }

        value = time2 + value.slice(2)
        this.setTime2(value, setTime, setTimeEdition)
        return value
    }


}


// Text Formatting:

export const handleName = {

    formattingData(e, text, setText, textEditon, setTextEdition, allowedCharacters, maxCharacters = 10) {
        let value = e.target.value
        let character = value.slice(-1)
        let isValidCharacter = allowedCharacters.includes(character)

        if (!isValidCharacter) return
        if (value.length > maxCharacters) return
        value = value ? value[0].toUpperCase() + value.slice(1) : ''
        if (value.slice(-2, -1) === ' ') value = value.slice(0, -1) + value.slice(-1).toUpperCase()
        setText(value)
        setTextEdition(value)
    }

}

export function cleanStates([...setStates]) {
    setStates.map((setState) => setState(""))
}