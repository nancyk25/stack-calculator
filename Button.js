import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';


const baseContainer = {
  alignItems: 'center',
  justifyContent: 'center',
  borderRightWidth: 1,
  borderColor: '#fff',
};

const baseText = {
  fontSize: 36,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    ...baseContainer,
  },
  specialContainer: {
    flex: 2,
    backgroundColor: '#f2f2f2',
    ...baseContainer,
  },
  text: baseText,
  specialText: {
    ...baseText,
    color: '#000',
  },
});

const Button = ({ text, special, onPress }) => (
  // special is passed to Enter button
  // num is passed as text through onPress
  <TouchableOpacity onPress={ () => onPress(text)} style={special ? styles.specialContainer : styles.container}>
    <Text style={special ? styles.specialText : styles.text}>{text}</Text>
  </TouchableOpacity>
);

export default Button;
