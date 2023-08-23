import React, { useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';

interface IProps {
  clickTab: string;
  setClickTab: (newValue: string) => void;
}

const PlaceModalTab = ({ clickTab, setClickTab }: IProps) => {
  const tabBottomAni = useRef(new Animated.Value(5)).current;

  const handleTabPress = (tab: string) => {
    setClickTab(tab);

    if (tab === 'info') {
      Animated.timing(tabBottomAni, {
        toValue: 4,
        duration: 180,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(tabBottomAni, {
        toValue: 52,
        duration: 180,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.tabWrap}>
      <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('info')}>
        <Text style={[styles.tabTxt, clickTab === 'info' && styles.activeTabTxt]}>정보</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('review')}>
        <Text style={[styles.tabTxt, clickTab === 'review' && styles.activeTabTxt]}>리뷰</Text>
      </TouchableOpacity>
      <Animated.View
        style={[styles.borderAnimation, { transform: [{ translateX: tabBottomAni }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabWrap: {
    position: 'absolute',
    bottom: -1,
    left: 30,
    flexDirection: 'row',
    columnGap: 20,
  },
  tab: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  tabTxt: {
    fontSize: 16,
    fontWeight: '400',
    color: '#888',
  },
  activeTabTxt: {
    fontWeight: '600',
    color: '#1a73e8',
  },
  borderAnimation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 20,
    height: 3,
    backgroundColor: '#1a73e8',
  },
});

export default PlaceModalTab;
