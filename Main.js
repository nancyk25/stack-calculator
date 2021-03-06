import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  pressNum,
  enter,
  operation,
  clear,
  swap,
  toggleNegative,
} from './Modules';
import Button from './Button';

const baseNumber = {
  backgroundColor: '#424242',
  textAlign: 'right',
  padding: 10,
  fontSize: 40,
  borderBottomWidth: 1,
  borderColor: '#fff',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  top: {
    paddingTop: 20,
    backgroundColor: 'blue',
  },
  bottom: {
    flex: 1,
    backgroundColor: 'red',
  },
  number: {
    color: '#fff',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'pink',
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  append: {
    color: '#fff',
    ...baseNumber,
  },
  push: {
    color: '#2e71e5',
    ...baseNumber,

  },
  replace: {
    color: '#9bc23c',
    ...baseNumber,

  },
});
// calculatorState holds an object of stack
const App = ({
  calculatorState: { stack, inputState },
  // pass dispatchers here
  pressNumWithDispatch,
  enterAction,
  operationAction,
  clearAction,
  swapAction,
  toggleNegativeAction,
}) => (
  <View style={styles.container}>
    <View style={styles.top}>
      <TouchableOpacity onPress={() => toggleNegativeAction(2)}>
        <Text style={styles.append}>{stack[2] || 0}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleNegativeAction(1)}>
        <Text style={styles.append}>{stack[1] || 0}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleNegativeAction(0)}>
        <Text style={styles[inputState]}>
          {stack[0] || 0}
        </Text>
      </TouchableOpacity>
    </View>
    <View style={styles.bottom}>
      <View style={styles.row}>
        <Button text="clear" onPress={clearAction} />
        <Button text="pow" onPress={operationAction} />
        <Button text="swap" onPress={swapAction} />
        <Button text="/" onPress={operationAction} />
      </View>
      <View style={styles.row}>
        <Button text="9" onPress={pressNumWithDispatch} />
        <Button text="8" onPress={pressNumWithDispatch} />
        <Button text="7" onPress={pressNumWithDispatch} />
        <Button text="X" onPress={operationAction} />
      </View>
      <View style={styles.row}>
        <Button text="6" onPress={pressNumWithDispatch} />
        <Button text="5" onPress={pressNumWithDispatch} />
        <Button text="4" onPress={pressNumWithDispatch} />
        <Button text="-" onPress={operationAction} />
      </View>
      <View style={styles.row}>
        <Button text="3" onPress={pressNumWithDispatch} />
        <Button text="2" onPress={pressNumWithDispatch} />
        <Button text="1" onPress={pressNumWithDispatch} />
        <Button text="+" onPress={operationAction} />
      </View>
      <View style={styles.row}>
        <Button text="0" onPress={pressNumWithDispatch} />
        <Button text="." onPress={pressNumWithDispatch} />
        <Button text="enter" onPress={enterAction} special />
      </View>
    </View>
  </View>
);
/*
connect has 2 args: mapStateToProps(state=>{reduxPropName: state}, dispatch => ({actions},dispatch))
add dispatch to the action pressNum from ./Modules as an object
then pass down as props on the event listener
*/
export default connect(
  state => ({ calculatorState: state }),
  dispatch =>
    bindActionCreators(
      {
        pressNumWithDispatch: pressNum,
        enterAction: enter,
        operationAction: operation,
        clearAction: clear,
        swapAction: swap,
        toggleNegativeAction: toggleNegative,
      },
      dispatch,
    ),
)(App);

