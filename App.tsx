import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions } from 'react-native';
import { GooglePlaceData, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
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
    isOpen: '',
    openingHour: [],
    photo: '',
  });
  const [permission, setPermission] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const handleClickMap = async (e: PoiClickEvent) => {
    setLocation(e.nativeEvent.coordinate);
    const placeId = e.nativeEvent.placeId;
    const detailRes = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
      params: {
        place_id: placeId,
        key: API_KEY,
      },
    });

    const detailData = detailRes.data.result;
    const weekdayHour =
      detailData.current_opening_hours && detailData.current_opening_hours.weekday_text
        ? detailData.current_opening_hours.weekday_text
        : [];
    let isOpenTxt = '알 수 없음';
    if (detailData.current_opening_hours && detailData.current_opening_hours.open_now)
      isOpenTxt = detailData.current_opening_hours.open_now === true ? '영업중' : '영업종료';

    const photoRes = await axios.get('https://maps.googleapis.com/maps/api/place/photo', {
      params: {
        photoreference: detailData.photos[0].photo_reference,
        maxwidth: 400,
        key: API_KEY,
      },
      responseType: 'arraybuffer',
    });

    setLocationInfo({
      ...locationInfo,
      title: detailData.name,
      address: detailData.formatted_address,
      isOpen: isOpenTxt,
      openingHour: weekdayHour,
      photo: photoRes.request.responseURL,
    });

    setShowModal(true);
  };

  const handleClickLocation = async (data: GooglePlaceData, details: any) => {
    if (details) {
      setLocation({
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      });
      const res = await axios.get('https://maps.googleapis.com/maps/api/place/photo', {
        params: {
          photoreference: details.photos[0].photo_reference,
          maxwidth: 400,
          key: API_KEY,
        },
        responseType: 'arraybuffer',
      });

      const weekdayHour =
        details.current_opening_hours && details.current_opening_hours.weekday_text
          ? details.current_opening_hours.weekday_text
          : [];

      let isOpenTxt = '알 수 없음';

      if (details.current_opening_hours && details.current_opening_hours.open_now)
        isOpenTxt = details.current_opening_hours.open_now === true ? '영업중' : '영업종료';

      setLocationInfo({
        title: details.name,
        address: details.formatted_address,
        isOpen: isOpenTxt,
        openingHour: weekdayHour,
        photo: res.request.responseURL,
      });
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (location.latitude === 0 || location.longitude === 0) locationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {showModal && (
        <PlaceModal locationInfo={locationInfo} showModal={showModal} setShowModal={setShowModal} />
      )}
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
