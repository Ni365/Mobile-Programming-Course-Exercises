import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button } from 'react-native';

export default class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {text: '', data: []}
    }
    
    buttonPressed = () => {
        
        this.setState({data: [...this.state.data, {key: this.state.text}], text: ''});
    }
    
  render() {
    return (
    
      <View style={styles.container}>
        <View style={styles.input}>
            <TextInput style={{width: 200, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            />

            <Button title="Add item" onPress={this.buttonPressed} />
        </View>
        <View style={styles.flatlist}>
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
