const initialState = {
  name: 'Auth Reducer',
  datasetUser : [],
  userLogin :{
    isLogin : false
  }
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STORE-USER':
      return {
        ...state,
        datasetUser: [...state.datasetUser, action.payload]
      };

    case "USER-LOGGED" :
      return {
        ...state,
        userLogin : {...action.payload,isLogin:true}
      }

    case "REMOVE-USER-LOGIN" :
      return{
        ...state,
        userLogin : {isLogin : false}
      }

    default:
      return state;
  }
};

export default AuthReducer;
