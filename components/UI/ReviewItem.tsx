import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';

import ReviewStar from './ReviewStar';

interface IProps {
  star: number;
}

const ReviewItem = ({ star }: IProps) => {
  return (
    <View style={styles.wrap}>
      <ScrollView>
        <View style={styles.starWrap}>
          <Text style={styles.dateTxt}>2022.10.20</Text>
          <ReviewStar tit="가성비" star={star} />
          <ReviewStar tit="재방문의사" star={star} />
        </View>
        <Text style={styles.comment}>정말 맛있어요!!</Text>
        <Image
          style={styles.img}
          source={{
            uri: 'https://thumb.mt.co.kr/06/2016/04/2016040712078272562_1.jpg/dims/optimize/',
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  starWrap: {
    columnGap: 11,
    paddingBottom: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  dateTxt: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  comment: {
    marginVertical: 15,
    fontSize: 16,
    fontWeight: '500',
  },
  img: {
    width: '100%',
    height: 300,
    borderRadius: 5,
  },
});

export default ReviewItem;
