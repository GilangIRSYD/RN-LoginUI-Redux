const storeUser = (user) => dispatch => {
    dispatch({type:"STORE-USER" , payload:user})
}

const setUserLoged = (user) => dispatch => {
    dispatch({type:"USER-LOGGED", payload:user})
}

const removeUserLogin = () => dispatch => {
    dispatch({type:"REMOVE-USER-LOGIN"})
}

export{storeUser,setUserLoged,removeUserLogin}