import React from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import Expo, { SQLite, Font, AppLoading } from 'expo';
import { TextInput, Icon, ListView, Screen, Tile, Title, Subtitle, Divider, NavigationBar, Button } from '@shoutem/ui';


const db = SQLite.openDatabase('shoppingdb.db');

export default class App extends React.Component {

  state = {
    fontsAreLoaded: false,
  };

  async componentWillMount() {
    await Font.loadAsync({
      'Rubik-Black': require('./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf'),
    });

    this.setState({ fontsAreLoaded: true });
  }

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
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

  renderRow(item) {
    return (
      <View>
          <Title styleName="md-gutter-bottom">{item.product}</Title>
          <View style={{flex:1, width: "100%", flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
            <Subtitle styleName="sm-gutter-horizontal">{item.amount}</Subtitle>
            <Button styleName="stacked clear" onPress={() => this.deleteItem(item.id)}>
              <Text>Remove Item</Text><Icon name="close" />
            </Button>
          </View>
        <Divider styleName="line" />
      </View>
    )
  }


  render() {

    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }

    const items = this.state.items;

    return (
      <View style={styles.container}>
        <View style={styles.inputArea}>
          <Screen>
            <Text style={{marginTop: 30, fontSize: 25}}>Shopping list</Text>
            <TextInput placeholder={'Product'}
              onChangeText={(product) => this.setState({product})}
              value={this.state.product} />
            <TextInput placeholder={'Amount'}
              onChangeText={(amount) => this.setState({amount})}
              value={this.state.amount} />
            <Button onPress={this.saveItem}>
                <Text>Add Item</Text>
                <Icon name="add-to-cart" />
              </Button>
            <Text style={{margin: 30, fontSize: 25, textAlign: 'center'}}>Items</Text>
            <Divider styleName="line" />
          <View style={styles.list}>
            <ListView
              data={items}
              renderRow={this.renderRow}
            />
          </View>
          </Screen>
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
  inputArea: {
    flex: 1,
    width: "100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 2,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  }
});
