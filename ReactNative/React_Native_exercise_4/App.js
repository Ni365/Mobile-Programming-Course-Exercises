import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Button } from 'react-native';

export default class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {inputText: '', data: []}
    }
    
    addButtonPressed = () => {
        const inputText = this.state.inputText;
        
        this.setState({data: [...this.state.data, {key: inputText}], inputText: ''});
    }
    
    clearButtonPressed = () => {
        
        this.setState({data: [], inputText: ''});
    }
    
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
            <TextInput style={{width: 200, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(inputText) => this.setState({inputText})}
                />
            <Button title="Add item" onPress={this.addButtonPressed} />
            <Button title="Clear list" onPress={this.clearButtonPressed} />
        </View>
        <View style={styles.flatlist}>
            <Text style={{ fontSize: 18, color: 'blue' }}>Shopping List</Text>
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
      justifyContent: 'space-between',
  },
});
