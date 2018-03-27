import React from 'react';
import {StyleSheet, Text, TextInput, View, FlatList, Alert} from 'react-native';
import Expo, { SQLite } from 'expo';
import {FormLabel, FormInput, Button, List, ListItem, Icon} from 'react-native-elements';


const db = SQLite.openDatabase('shoppingdb.db');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {product: '', amount: '', items: []};
  }

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shopping (id integer primary key not null, product text, amount text);');
    });
    this.updateList();
  }

  saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into shopping (product, amount) values (?, ?)', [this.state.product, this.state.amount]);
    }, null, this.updateList)
  }

  updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shopping', [], (_, { rows }) =>
        this.setState({items: rows._array})
      );
    });
  }

  deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql('delete from shopping where id = ?;', [id]);
      }, null, this.updateList
    )
  }


  render() {

    const rowData = this.state.items.map(item => (
      <ListItem key={item.id} title={item.product} subtitle={item.amount} onPress={() => this.deleteItem(item.id)} />)
    );

    return (
      <View style={styles.container}>
        <Text style={{marginTop: 30, fontSize: 25}}>Enter product & amount</Text>
        <FormLabel>Product</FormLabel>
        <FormInput placeholder='Product'
          onChangeText={(product) => this.setState({product})}
          value={this.state.product} />
        <FormLabel>Amount</FormLabel>
        <FormInput placeholder='Amount'
          onChangeText={(amount) => this.setState({amount})}
          value={this.state.amount} />
          <Icon
              reverse
              name="sc-telegram"
              type="evilicon"
              color="blue"
              raised={true}
              underlayColor="blue"
              onPress={this.saveItem}
            />
        <Text style={{marginTop: 30, marginBottom: 10, fontSize: 25}}>Shopping List</Text>
        <View style={styles.listcontainer}>
          <List>
            {rowData}
          </List>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listcontainer: {
    flex: 5
  }
});
