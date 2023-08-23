import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const STAR_ARR = [1, 2, 3, 4, 5];

const ClickFiveStar = () => {
  const [clickStar, setClickStar] = useState(0);
  const handleClickStar = (item: number) => {
    setClickStar(item);
  };

  return (
    <View style={styles.starWrap}>
      {STAR_ARR.map((item) => (
        <TouchableOpacity key={item} activeOpacity={0.6} onPress={() => handleClickStar(item)}>
          <AntDesign
            name={clickStar >= item ? 'star' : 'staro'}
            size={16}
            color="black"
            style={clickStar >= item ? styles.star : styles.staro}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  starWrap: {
    flexDirection: 'row',
  },
  star: {
    color: 'gold',
  },
  staro: {
    color: '#ddd',
  },
});

export default ClickFiveStar;
