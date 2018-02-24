import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Picker, Alert, FlatList, Keyboard, TouchableWithoutFeedback } from 'react-native';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currencies: [], currencyValues: [], data: '', amount: '', result: 'Enter amount and choose currency', selectedCur: ''}
    }
    
    fetchData = () => {
       fetch('https://api.fixer.io/latest')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({data: responseJson.rates, currencies: Object.keys(responseJson.rates), currencyValues: Object.values(responseJson.rates)});
        })
        .catch((error) => {
            Alert.alert(error);
        }); 
        
    }
    
    componentDidMount = () => {
        this.fetchData();
    }
    
    
    getConversion = () => {
        
        if (this.state.amount != '') {
        for (let i = 0; i < this.state.currencies.length; i++) {
            if (this.state.selectedCur === this.state.currencies[i]) {
            const result = this.state.amount + " " + this.state.currencies[i] + " = " + (parseInt(this.state.amount) / this.state.currencyValues[i]).toFixed(2) + " €"; 
            this.setState({result: result});
                  }
              }
        } else {
            const result = "No amount entered";
            this.setState({result: result});
        }
    }
    
  render() {

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <View style={styles.content}>
                <Text style={{fontSize: 20}}>Convert any currency to EUR (€)</ Text>
                <Image style={{width: 300, height: 150}} source={{uri: 'https://cdn.pixabay.com/photo/2016/09/19/17/15/currency-1680786_1280.png'}} /> 
                <Text> {this.state.result} {"\n"} {"\n"} </ Text>
                <TextInput placeholder='Enter amount' keyboardType={'numeric'} onChangeText={(amount) => this.setState({amount})} /> 
                <Button title="Convert" onPress={this.getConversion} />
                <Picker
                    style={{height: 100, width: 100}}
                    selectedValue={this.state.selectedCur}
                    onValueChange={(itemValue) => this.setState({selectedCur: itemValue})}
                    >
                        {this.state.currencies.map((item, key) => {
                         return <Picker.Item value={item} label={item} key={key} />
                        })}
                </Picker> 
                </View>
          </View>
        </TouchableWithoutFeedback>
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
    
  content: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    
});

