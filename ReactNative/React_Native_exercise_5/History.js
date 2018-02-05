import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class History extends React.Component {
    static navigationOptions = {title: 'Calculator',};
    
    render () {
        const { params } = this.props.navigation.state;
        
         return(
            <View style={styles.container}>
             
             <Text>History</Text>
            <FlatList data={params.data}
                renderItem={({item}) =>
                <Text>{item.key}</Text>} />
    </View>
    )
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