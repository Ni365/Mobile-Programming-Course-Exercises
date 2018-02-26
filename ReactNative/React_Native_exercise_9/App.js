import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { MapView }  from 'expo';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {address: '', markerLat: 0, markerLng: 0,
                      region: {
                        latitude: 60.200692,
                        longitude: 24.934302,
                        latitudeDelta: 0.0322,
                        longitudeDelta: 0.0221,
                        }
                };
    }
    
    
    searchAddress = () => {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.address + '&key=AIzaSyAAELJPA6Tuy22LuQ_DLE-VWp6063LdGeo')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({region: {
                latitude: responseJson.results[0].geometry.location.lat, 
                longitude: responseJson.results[0].geometry.location.lng,
                latitudeDelta: 0.0322,
                longitudeDelta: 0.0221,
            },
                markerLat: responseJson.results[0].geometry.location.lat, 
                markerLng: responseJson.results[0].geometry.location.lng});
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
                     coordinate={{
                        latitude: this.state.markerLat,
                        longitude: this.state.markerLng,
                        }}
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
