import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {backgroundColor} from '../constants';
class ButtonCustom extends Component {
  render() {
    const {onPress, title, color = backgroundColor} = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.buttonLogin, {backgroundColor: color}]}>
          <Text style={{color: '#FFF', fontWeight: 'bold'}}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ButtonCustom;

const styles = StyleSheet.create({
  buttonLogin: {
    paddingHorizontal: 42,
    paddingVertical: 14,
    marginLeft: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
});
