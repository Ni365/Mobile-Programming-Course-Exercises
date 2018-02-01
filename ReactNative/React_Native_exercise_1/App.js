import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {num1: '', num2: '', result: ''}
        }
    
    sumButtonPressed = () => {
            const result = parseInt(this.state.num1) + parseInt(this.state.num2);
        
        this.setState(() => {
            return {result : result}
        });
        }
    
    substractButtonPressed = () => {
        const result = parseInt(this.state.num1) - parseInt(this.state.num2);
            this.setState(() => {
            return {result : result}
        });        
        }

    render() {
        
        return (
        <View style={styles.container}>
        <Text>Result: {this.state.result}</ Text>
            
        <TextInput style={{width: 200, borderColor: 'gray', borderWidth: 1}}
            keyboardType={'numeric'}
            onChangeText={(num1) => this.setState({num1})}
            />
            
            <TextInput style={{width: 200, borderColor: 'gray', borderWidth: 1}}
            keyboardType={'numeric'}
            onChangeText={(num2) => this.setState({num2})}
            />
        
        <Button title="Sum" onPress={this.sumButtonPressed} />
        <Button title="Subtract" onPress={this.substractButtonPressed}/>
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
