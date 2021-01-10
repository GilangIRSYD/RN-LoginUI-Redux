import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {secondaryDarkColor, yellowColor} from '../constants';

class InputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidePassword: props.spyMode,
      isFocus: false,
    };
  }
  showHidePassword = () => {
    const icoImage = !this.state.hidePassword ? 'eye' : 'eye-slash';
    return (
      <View style={{position: 'absolute', end: 0, top: 32}}>
        <TouchableOpacity
          onPress={() =>
            this.setState({hidePassword: !this.state.hidePassword})
          }>
          <Icon
            style={{marginEnd: 12}}
            name={icoImage}
            size={24}
            color="#941239"
          />
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const {errorMsg, onChangeText, placeholder, spyMode} = this.props;
    const borderWidth = this.state.isFocus ? 1 : 0;

    return (
      <View>
        <Text
          style={{
            color: yellowColor,
            fontSize: 12,
            marginStart: 12,
            marginBottom: 4,
          }}>
          {errorMsg}
        </Text>
        <TextInput
          onFocus={() => this.setState({isFocus: true})}
          onBlur={() => this.setState({isFocus: false})}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={this.state.hidePassword}
          style={[styles.inputForm, {borderWidth: borderWidth}]}
        />
        {spyMode && this.showHidePassword()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputForm: {
    backgroundColor: secondaryDarkColor,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#FFF',
    borderColor: yellowColor,
  },
});

export default InputForm;
