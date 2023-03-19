/**
 * Array to replace the states with the original values
 * @param {*} setStates Array [ ]
 * @param {*} originalValues Array [ ] or Object { }
 */
export function toOriginalValues([...setStates], originalValues = []) {

    originalValues = Object.values(originalValues)
    setStates.map((setState, index) => setState(originalValues[index]))

}


/**
 * 
 * @returns 
 */
export function verifyChanges([...states], originalValues) {

    let validation = false
    originalValues = Object.values(originalValues)

    states.map((e, i) => {
        if (e !== originalValues[i]) validation = true
    })

    return validation
}


/**
 * Function to handle with a keypress
 * @param {*} keyPress Current key is been pressed;
 * @param {function} callback Function();
 * @param {*} keyFunction Key to active the function;
 */
export const handleKeyPress = (keyPress, callback, keyFunction) => {
    if (keyPress === keyFunction)
        callback()
}

