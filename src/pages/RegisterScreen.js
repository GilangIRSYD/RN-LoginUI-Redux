import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import InputForm from '../components/InputForm';
import {
  backgroundColor,
  secondaryColor,
  secondaryDarkColor,
} from '../constants';
import { storeUser } from '../redux/actions/AuthAction';
import {inputForm, validation} from '../redux/actions/InputAction';

class RegisterScreen extends Component {
  componentDidMount() {
    this.props.resetState();
  }

  _inputFormContainer = (inputType, value) => {
    this.setState({
      [inputType]: value,
    });
  };

  _onClickBtnRegister = () => {
    // dispatch inputForm on redux
    console.log('local state :', this.state);
    this.props.inputForm(this.state);
    //do Validation on Redux
    this.props.validation();

    setTimeout(() => {
      const isValidForm = this.props.inputState.isValidForm;
      const {username,email,password} = this.props.inputState
      const newUser = {username,email,password}
      console.log('newUser : ', newUser);
      console.log('is valid : ', isValidForm);
      if (isValidForm) {
        this.props.storeUser(newUser)
        this.props.navigation.goBack(null);
        this.showToast('Registrasi Berhasil');
      }
    }, 500);
  };

  showToast(msg) {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/salt_logo.png')} />
        <Text style={styles.title}>Account Registration</Text>
        {/* Base Form */}
        <View style={styles.baseForm}>
          <InputForm
            placeholder={'Username'}
            errorMsg={this.props.inputState.usernameErrorMsg}
            onChangeText={(v) => this._inputFormContainer('username', v)}
          />
          <InputForm
            placeholder={'Email'}
            errorMsg={this.props.inputState.emailErrorMsg}
            onChangeText={(v) => this._inputFormContainer('email', v)}
          />
          <InputForm
            onChangeText={(v) => this._inputFormContainer('password', v)}
            placeholder={'Password'}
            spyMode
            errorMsg={this.props.inputState.passwordErrorMsg}
          />
          <InputForm
            onChangeText={(v) => this._inputFormContainer('confirm', v)}
            placeholder={'Confirm Password'}
            spyMode
            errorMsg={this.props.inputState.confirmPasswordErrorMsg}
          />

          <TouchableOpacity onPress={() => this._onClickBtnRegister()}>
            <View style={styles.buttonRegist}>
              <Text style={{color: 'white'}}>REGISTER</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    flex: 1,
    paddingHorizontal: 16,
  },
  baseForm: {
    backgroundColor: secondaryColor,
    width: '100%',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 52,
  },
  title: {
    color: 'white',
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 32,
  },
  inputForm: {
    backgroundColor: secondaryDarkColor,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#FFF',
    marginBottom: 18,
  },
  buttonRegist: {
    backgroundColor: backgroundColor,
    paddingVertical: 18,
    alignItems: 'center',
    width: '70%',
    borderRadius: 8,
    marginTop: 45,
    alignSelf: 'center',
  },
});
const mapStatetoProps = (state) => {
  return {
    name: state.InputReducer.name,
    inputState: state.InputReducer.inputForm,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    inputForm: (value) => dispatch(inputForm(value)),
    validation: () => dispatch(validation()),
    resetState: () => {
      dispatch({
        type: 'RESET-STATE',
      });
    },
    storeUser : (user) => dispatch(storeUser(user))
  };
};
export default connect(mapStatetoProps, mapDispatchtoProps)(RegisterScreen);

