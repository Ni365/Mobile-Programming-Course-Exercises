import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Calculator extends React.Component {
    static navigationOptions = {title: 'Calculator',};
    
    constructor(props) {
        super(props);
        this.state = {num1: '', num2: '', result: '', resulttext: '', history: '',  data: []}
        }
    
    sumButtonPressed = () => {
        const result = parseInt(this.state.num1) + parseInt(this.state.num2);
        const history = this.state.num1 + " + " + this.state.num2 + " = " + result;
        
        this.setState({resulttext: result, data: [...this.state.data, {key: history}]});
        }
    
    substractButtonPressed = () => {
        const result = parseInt(this.state.num1) - parseInt(this.state.num2);
        const history = this.state.num1 + " - " + this.state.num2 + " = " + result;
        
        this.setState({resulttext: result, data: [...this.state.data, {key: history}]});
        }
    
    render() {
        const { navigate } = this.props.navigation;
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
                <Button onPress={() => navigate('History', {data: this.state.data})} title="History" />

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

