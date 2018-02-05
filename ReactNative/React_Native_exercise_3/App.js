import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button } from 'react-native';

export default class App extends React.Component {
    
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
    return (
    
      <View style={styles.container}>
        <View style={styles.input}>
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
        <View style={styles.flatlist}>
            <Text>History</Text>
            <FlatList data={this.state.data}
                renderItem={({item}) =>
                <Text>{item.key}</Text>} />
        </View>    
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
    
  input: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    
  flatlist: {
      flex: 2,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
    
});
