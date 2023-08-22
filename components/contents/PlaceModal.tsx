import React from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';

import StarWrap from '../UI/StarWrap';

interface IProps {
  locationInfo: any;
}

const PlaceModal = ({ locationInfo }: IProps) => {
  return (
    <View style={styles.locationInfo}>
      <View style={styles.imgWrap}>
        <Image source={{ uri: `${locationInfo.photo}` }} style={styles.img} />
      </View>
      <Text style={styles.title}>{locationInfo.title}</Text>
      <StarWrap />
      <Text style={styles.address}>{locationInfo.address}</Text>
      <Text>방문횟수 : 0회</Text>
      <View>
        <TouchableHighlight>
          <Text>위시리스트 저장</Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text>리뷰 남기기</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationInfo: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    borderRadius: 20,
    padding: 30,
    width: 350,
    height: 500,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  imgWrap: {
    width: '100%',
    height: 200,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 5,
  },
  address: {
    marginTop: 5,
    fontSize: 15,
  },
});

export default PlaceModal;
