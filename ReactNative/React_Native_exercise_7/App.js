import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert, StatusBar, Image } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {recipes: [], search: ''};
  }

  getRecipes = () => {
    const url = 'http://www.recipepuppy.com/api/?i=' + this.state.search;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => { 
        this.setState({recipes: responseJson.results});
      })
      .catch((error) => { 
        Alert.alert(error); 
      });    
  }

  listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  render() {     
    return (
      <View style={styles.container}>
        <View style={styles.flatlist}>
        <StatusBar hidden={true} />
        <FlatList 
          style={{marginLeft : "5%"}}
          keyExtractor={item => item.title} 
          renderItem={({item}) => <Text style={{fontSize: 18}}>{item.title} {"\n"} {"\n"}  
          <Image style={{width:70, height: 70}} source={{uri: item.thumbnail}} /></Text>}
          data={this.state.recipes} 
          ItemSeparatorComponent={this.listSeparator} />
          </View>
          <View style={styles.input}>
        <TextInput style={{fontSize: 25}} placeholder='Enter ingredient' onChangeText={(search) => this.setState({search})} />
        <Button title="Find recipe" onPress={this.getRecipes} />
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
    
      flatlist: {
    flex: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    
  input: {
      flex: 1,
      padding: 20,
      margin: 5,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-between',
  },
});