import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons';

const App = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [permission, setPermission] = useState(false);

  const locationPermission = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setPermission(false);
      return;
    } else {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setLocation({ latitude: latitude, longitude: longitude });
      setPermission(true);
    }
  };

  useEffect(() => {
    locationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputWrap}>
        <FontAwesome name="search" size={20} color="black" style={styles.icon} />
        <GooglePlacesAutocomplete
          placeholder="검색할 장소를 입력해주세요 :)"
          onPress={(data, details) => {
            console.log(data, details);
          }}
          onNotFound={() => console.log('no results')}
          query={{
            key: process.env.REACT_NATIVE_APP_GOOGLE_MAP_ID,
            language: 'ko',
          }}
          keyboardShouldPersistTaps={'handled'}
          fetchDetails={true}
          enablePoweredByContainer={false}
          keepResultsAfterBlur={true}
          styles={styles.googleSearch}
        />
      </View>
      <View>
        {permission && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
            provider={PROVIDER_GOOGLE}
          >
            <Marker
              draggable
              coordinate={location}
              onDragEnd={(e) => setLocation(e.nativeEvent.coordinate)}
              pinColor="red"
              title="판다월드"
              description="바오가족들이 살아요"
            />
          </MapView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  inputWrap: {
    position: 'absolute',
    top: 70,
    width: 350,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  icon: {
    position: 'absolute',
    top: 11,
    left: 15,
    color: '#888',
    zIndex: 1,
  },
  googleSearch: {
    position: 'absolute',
    top: 70,
    width: 350,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
    textInput: {
      paddingLeft: 45,
      borderWidth: 2.5,
      borderColor: '#ddd',
      borderRadius: 30,
    },
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default App;
