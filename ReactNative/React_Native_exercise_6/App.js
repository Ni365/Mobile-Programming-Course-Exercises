import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Alert, Button } from 'react-native';

export default class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {guess: '', num: parseInt(Math.floor(Math.random() * 100) + 1), output: 'Guess a number between 1 - 100!', counter: 1}
        }
    
    componentDidMount() {
        this.getKey();    
    }
    
     saveKey = async () => {
        try {
            await AsyncStorage.setItem('myKey', JSON.stringify(this.state.counter));
        } catch (error) {
                Alert.alert('Error saving data' + error);
            }
    }
     
     getKey = async () => {
        try {
            let value = await AsyncStorage.getItem('myKey');
            this.setState({myKey: Number(value)})
        } catch (error) {
            Alert.alert('Error reading data' + error);
        }
    }
    
    clearKey = async () => {
        try {
            await AsyncStorage.removeItem('myKey');
        } catch (error) {
            Alert.alert('Error removing data' + error);
        }
    }
     
    guessButton = () => {
        
        const num = this.state.num;
        const guess = parseInt(this.state.guess);
        const counter = parseInt(this.state.counter);
        
        if (num > guess) {
           const output = 'Your guess ' + guess + ' is too low';
            
            this.setState({output : output, counter : this.state.counter + 1});
            
        } else if (num < guess) {
            
           const output = 'Your guess ' + guess + ' is too high';
            
           this.setState({output : output, counter : this.state.counter + 1});
            
        } else {
            
            const output = 'Congratulations! Please try again to beat the high score.'
            Alert.alert('You guessed the number in ' + counter + ' guesses');
            this.saveKey();
            
                if ((counter) < this.state.myKey) {
                this.saveKey();
                this.setState({myKey: counter});
                }
            
            this.setState({output: output, counter: 1, num: parseInt(Math.floor(Math.random() * 100) + 1)});
        }
    }
    
  render() {

      return (
        
      <View style={styles.container}>
        <Text>{this.state.output}</ Text>
        <TextInput style={{width: 200, borderColor: 'gray', borderWidth: 1}}
            keyboardType={'numeric'}
            onChangeText={(guess) => this.setState({guess})}
            />
        
        <Button title="Guess!" onPress={this.guessButton} />
        <Text>Highscore is: {this.state.myKey} guesses</Text>
        <Button title="Reset highscore" onPress={this.clearKey} />
      </View>
    );
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