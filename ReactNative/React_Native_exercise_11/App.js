import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { MapView, Location, Permissions }  from 'expo';

export default class App extends React.Component {

  state = {
    location: { coords: { latitude: 0, longitude: 0 }},
   };

  componentDidMount() {
    this.getLocation();
  }

  getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('No permission to access location');
    }
    else {
      let location = await Location.getCurrentPositionAsync({});
      region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      marker = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
      this.setState({ location, region, marker });
    }
  };

  constructor(props) {
    super(props);
    this.state = { address: '', marker: { latitude: 0, longitude: 0 }, }
  }

  searchAddress = () => {
      fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.address + '&key=AIzaSyAAELJPA6Tuy22LuQ_DLE-VWp6063LdGeo')
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({region: {
              latitude: responseJson.results[0].geometry.location.lat,
              longitude: responseJson.results[0].geometry.location.lng,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            },
            marker: { latitude: responseJson.results[0].geometry.location.lat, longitude: responseJson.results[0].geometry.location.lng }
      });
  })
}



  render() {

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.search}>
                     <TextInput placeholder='Enter address to search' onChangeText={(address) => this.setState({ address})} />
                     <Button title="Search" onPress={this.searchAddress} />
                </View>
                <View style={styles.mapCont}>
                    <MapView
                     style={styles.map}
                     region={this.state.region}
                            >
                    <MapView.Marker
                     coordinate={this.state.marker}
                     title={this.state.address} />
                    </MapView>
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

  mapCont: {
    flex: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },

  map: {
      position: 'absolute',
      height: '100%',
      width: '100%',

  },

  search: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  }
});
