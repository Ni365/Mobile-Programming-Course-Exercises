import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Calculator from './Calculator';
import History from './History';

export default class App extends React.Component {
    
  render() {
    
    const MyApp = StackNavigator({
        Calculator: {screen: Calculator},
        History: {screen: History}
    });
      
    return <MyApp/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
