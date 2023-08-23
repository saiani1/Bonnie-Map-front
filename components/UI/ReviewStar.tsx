import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface IProps {
  tit: string;
  star: number;
}

const ReviewStar = ({ tit, star }: IProps) => {
  const starIcons = Array.from({ length: 5 }, (_, index) => (
    <AntDesign
      key={index}
      name="star"
      size={17}
      color={Math.ceil(star) >= index + 1 ? 'gold' : '#ddd'}
    />
  ));

  return (
    <View style={styles.reviewWrap}>
      <Text style={styles.reviewTit}>{tit}</Text>
      <View style={styles.starWrap}>{starIcons}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
    marginBottom: 7,
  },
  reviewTit: {
    width: 65,
    color: '#555',
  },
  starWrap: {
    flexDirection: 'row',
  },
});

export default ReviewStar;
