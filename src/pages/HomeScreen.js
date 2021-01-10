import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import ButtonCustom from '../components/ButtonCustom';
import {backgroundColor, yellowColor} from '../constants';
import {removeUserLogin} from '../redux/actions/AuthAction';

class HomeScreen extends Component {
  _onLogOut = () => {
    this.props.removeUserLogin();
    this.props.navigation.replace('Login');
  };
  render() {
    const {username, email} = this.props.userProfile;
    return (
      <View
        style={{
          backgroundColor: backgroundColor,
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 16,
        }}>
        <Text
          style={{
            alignSelf: 'center',
            marginBottom: 24,
            fontSize: 24,
            color: yellowColor,
            fontWeight: 'bold',
          }}>
          Login Berhasil :)
        </Text>
        <Text style={styles.text}>Nama : {username}</Text>
        <Text style={[styles.text,{marginBottom:32}]}>Email : {email}</Text>
        <ButtonCustom
          onPress={() => this._onLogOut()}
          title="LOG OUT"
          color="tomato"
        />
      </View>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    userProfile: state.AuthReducer.userLogin,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    removeUserLogin: () => dispatch(removeUserLogin()),
  };
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 16,
    marginBottom: 14
  },
});

export default connect(mapStatetoProps, mapDispatchtoProps)(HomeScreen);
