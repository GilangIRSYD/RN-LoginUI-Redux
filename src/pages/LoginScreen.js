import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import ButtonCustom from '../components/ButtonCustom';
import InputForm from '../components/InputForm';
import {backgroundColor, secondaryColor} from '../constants';
import {setUserLoged} from '../redux/actions/AuthAction';

class LoginScreen extends Component {
  state = {
    inputUsername: '',
    inputPassword: '',
    usernameErrorMsg: '',
    passwordErrorMsg: '',
  };

  _validasi = (username, password) => {
    let isValid = true;
    if (username.trim() == '') {
      isValid = false;
      this.setState({
        usernameErrorMsg: 'Username tidak boleh kosong',
      });
    } else {
      this.setState({
        usernameErrorMsg: '',
      });
    }

    if (password.trim() == '' || password.length < 8) {
      this.setState({
        passwordErrorMsg: 'Password < 8 karakter',
      });
      isValid = false;
    } else {
      this.setState({
        passwordErrorMsg: '',
      });
    }

    return isValid;
  };

  handelButtonLogin = () => {
    const {inputUsername, inputPassword} = this.state;
    const isValid = this._validasi(inputUsername, inputPassword);
    const userFind = this.props.datasetUser.filter(
      (item) => item.username === inputUsername || item.email === inputUsername,
    );

    try {
      if (isValid) {
        if (
          inputUsername === userFind[0].username ||
          inputUsername === userFind[0].email
        ) {
          if (inputPassword === userFind[0].password) {
            this.props.navigation.replace('Home');
            this.props.setUserLoged(userFind[0]);
          } else {
            this.showToast('Password salah');
          }
        }
      }
    } catch (error) {
      this.showToast('Username / Email tidak ditemukan');
    }
  };

  showToast(msg) {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  }

  render() {
    const {usernameErrorMsg, passwordErrorMsg} = this.state;

    return (
      <View style={styles.container}>
        <Image
          style={{marginTop: 42, marginBottom: 32}}
          source={require('../assets/salt_logo.png')}
        />
        {/* base Form */}
        <View style={styles.baseForm}>
          <InputForm
            placeholder={'Username'}
            errorMsg={usernameErrorMsg}
            onChangeText={(inputUsername) => this.setState({inputUsername})}
          />
          <InputForm
            onChangeText={(inputPassword) => this.setState({inputPassword})}
            placeholder={'Password'}
            spyMode
            errorMsg={passwordErrorMsg}
          />
          <View style={{flexDirection: 'row-reverse', marginTop: 18}}>
            <ButtonCustom
              title="LOGIN"
              onPress={() => this.handelButtonLogin()}
            />
            <ButtonCustom
              onPress={() => this.props.navigation.navigate('Register')}
              color={secondaryColor}
              title="REGISTER"
            />
          </View>
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
    alignItems: 'center',
  },
  baseForm: {
    backgroundColor: secondaryColor,
    width: '100%',
    paddingVertical: 54,
    borderRadius: 25,
    elevation: 10,
    paddingHorizontal: 16,
  },
});

const mapStatetoProps = (state) => {
  return {
    name: state.AuthReducer.name,
    datasetUser: state.AuthReducer.datasetUser,
    userLogin: state.AuthReducer.userLogin,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    setUserLoged: (user) => {
      dispatch(setUserLoged(user));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(LoginScreen);
