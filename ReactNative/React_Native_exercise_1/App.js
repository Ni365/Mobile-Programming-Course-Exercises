import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {num1: '', num2: '', result: '', resulttext: ''}
        }
    
    sumButtonPressed = () => {
            const result = parseInt(this.state.num1) + parseInt(this.state.num2);
        
        this.setState({resulttext: result});
        }
    
    substractButtonPressed = () => {
        const result = parseInt(this.state.num1) - parseInt(this.state.num2);
        
        this.setState({resulttext: result});
        }

    render() {
        
        return (
        <View style={styles.container}>
        <Text>Result: {this.state.resulttext}</ Text>
            
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
