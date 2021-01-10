const initialState = {
  inputForm: {
    username: '',
    usernameErrorMsg: '',
    emailErrorMsg: '',
    passwordErrorMsg: '',
    confirmPasswordErrorMsg: '',
    password: '',
    isValidForm: false,
  },
  name: 'Input Reducer',
};

const validation = (stateCheck) => {
  let isValid = true;
  let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let {
    username,
    email,
    password,
    confirm,
    usernameErrorMsg,
    emailErrorMsg,
    passwordErrorMsg,
    confirmPasswordErrorMsg,
  } = stateCheck.inputForm;

  if (username === '') {
    isValid = false;
    console.log('validation 1 : ', 'username kosong');
    usernameErrorMsg = 'Username harus diisi';
  } else {
    usernameErrorMsg = '';
  }

  if (password.length < 8) {
    isValid = false;
    passwordErrorMsg = 'Password minimal 8 karakter';
  } else {
    passwordErrorMsg = '';
  }

  if (password !== confirm) {
    isValid = false;
    confirmPasswordErrorMsg = 'Password tidak cocok';
  } else {
    confirmPasswordErrorMsg = '';
  }

  if (regEmail.test(email) === false) {
    isValid = false;
    emailErrorMsg = 'Masukkan email yang valid';
  } else {
    emailErrorMsg = '';
  }

  const state = {
    ...stateCheck.inputForm,
    usernameErrorMsg,
    emailErrorMsg,
    passwordErrorMsg,
    confirmPasswordErrorMsg,
    isValidForm: isValid,
  };

  console.log('validaation state :', state);
  return state;
};

const InputReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INPUT-FORM':
      return {
        ...state,
        inputForm: {
          ...state.inputForm,
          ...action.payload,
        },
      };

    case 'VALIDATION-FORM':
      return {
        ...state,
        inputForm: {
          ...state.inputForm,
          ...validation(state),
        },
      };

    case 'RESET-STATE':
      return {
        ...state,
        inputForm : {
          isValidForm : false,
          password:'',
          username:''
        }
      };

    default:
      return state;
  }
};

export default InputReducer;
