import React, { useState } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const STAR_ARR = [1, 2, 3, 4, 5];

const StarWrap = () => {
  const [clickStar, setClickStar] = useState(0);
  const handleClickStar = (item: number) => {
    setClickStar(item);
  };

  return (
    <View style={styles.starWrap}>
      {STAR_ARR.map((item) => (
        <TouchableHighlight key={item} onPress={() => handleClickStar(item)}>
          <AntDesign
            name={clickStar >= item ? 'star' : 'staro'}
            size={24}
            color="black"
            style={clickStar >= item ? styles.star : styles.staro}
          />
        </TouchableHighlight>
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

export default StarWrap;
