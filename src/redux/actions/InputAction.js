const inputForm =   (value) => dispatch => {
    dispatch({type : "INPUT-FORM", payload : value})
}

const validation = () => dispatch => {
    dispatch({type : "VALIDATION-FORM"})
}

export {inputForm, validation}