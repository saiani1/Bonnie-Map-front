import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';

import StarWrap from '../UI/StarWrap';

const ReviewModal = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.tit}>판다월드</Text>
      <Image
        style={styles.img}
        source={{
          uri: 'https://thumb.mt.co.kr/06/2016/04/2016040712078272562_1.jpg/dims/optimize/',
        }}
      />
      <View style={styles.rateWrap}>
        <Text style={styles.rateTit}>가성비</Text>
        <StarWrap />
      </View>
      <View style={styles.rateWrap}>
        <Text style={styles.rateTit}>재방문의사</Text>
        <StarWrap />
      </View>
      <Text style={styles.comment}>아여사님 짱귀ㅠ</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  tit: {
    marginBottom: 25,
    fontSize: 30,
    fontWeight: '700',
    color: '#666',
  },
  img: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  rateWrap: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rateTit: {
    paddingTop: 3,
    fontSize: 15,
    fontWeight: '600',
    width: 75,
  },
  rate: {
    fontWeight: '600',
  },
  comment: {
    marginTop: 20,
    width: 300,
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center',
  },
});

export default ReviewModal;
