import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions, TouchableHighlight, Text } from 'react-native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import { PROVIDER_GOOGLE, PoiClickEvent } from 'react-native-maps';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons';
import { API_KEY } from '@env';
import axios from 'axios';
import PlaceModal from './components/contents/PlaceModal';

const App = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [locationInfo, setLocationInfo] = useState({
    title: '',
    address: '',
    photo: '',
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

  const handleClickMap = (e: PoiClickEvent) => {
    setLocation(e.nativeEvent.coordinate);
    const placeId = e.nativeEvent.placeId;
    axios
      .get('https://maps.googleapis.com/maps/api/place/details/json', {
        params: {
          place_id: placeId,
          key: API_KEY,
        },
      })
      .then((res) => {
        const resData = res.data.result;
        axios
          .get('https://maps.googleapis.com/maps/api/place/photo', {
            params: {
              photoreference: resData.photos[0].photo_reference,
              maxwidth: 400,
              key: API_KEY,
            },
            responseType: 'arraybuffer',
          })
          .then((res) =>
            setLocationInfo({
              title: resData.name,
              address: resData.formatted_address,
              photo: res.request.responseURL,
            }),
          );
      });
  };

  const handleClickLocation = (data: GooglePlaceData, details: any) => {
    if (details) {
      setLocation({
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      });
      axios
        .get('https://maps.googleapis.com/maps/api/place/photo', {
          params: {
            photoreference: details.photos[0].photo_reference,
            maxwidth: 400,
            key: API_KEY,
          },
          responseType: 'arraybuffer',
        })
        .then((res) =>
          setLocationInfo({
            title: details.name,
            address: details.formatted_address,
            photo: res.request.responseURL,
          }),
        );
    }
  };

  useEffect(() => {
    if (location.latitude === 0 || location.longitude === 0) locationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {locationInfo.title.length !== 0 && <PlaceModal locationInfo={locationInfo} />}
      <View style={styles.inputWrap}>
        <FontAwesome name="search" size={20} color="black" style={styles.icon} />
        <GooglePlacesAutocomplete
          minLength={2}
          placeholder="검색할 장소를 입력해주세요 :)"
          onPress={handleClickLocation}
          keepResultsAfterBlur={true}
          enablePoweredByContainer={false}
          onNotFound={() => console.log('no results')}
          query={{
            key: API_KEY,
            language: 'ko',
            components: 'country:kr',
            types: 'establishment',
          }}
          keyboardShouldPersistTaps={'handled'}
          fetchDetails={true}
          filterReverseGeocodingByTypes={['establishment']}
          styles={styles.googleSearch}
        />
      </View>
      <View>
        {permission && (
          <MapView
            style={styles.map}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.006,
              longitudeDelta: 0.006,
            }}
            provider={PROVIDER_GOOGLE}
            onPoiClick={handleClickMap}
          />
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
    padding: 100,
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
