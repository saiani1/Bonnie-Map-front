import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Entypo } from '@expo/vector-icons';

interface IProps {
  locationInfo: any;
}

const DetailInfoTab = ({ locationInfo }: IProps) => {
  const [clickOpeningHourBtn, setClickOpeningHourBtn] = useState(false);

  const handleClickMoreBtn = () => {
    setClickOpeningHourBtn((prev) => !prev);
  };
  return (
    <View style={styles.detailInfoWrap}>
      <View style={styles.addressWrap}>
        <Entypo name="location-pin" size={22} color="#555" />
        <Text style={styles.address}>{locationInfo.address.slice(4).trim()}</Text>
      </View>
      <View style={styles.timeWrap}>
        <Entypo name="time-slot" size={16} color="#555" />
        <Text style={styles.isOpen}>{locationInfo.isOpen}</Text>
        {locationInfo.openingHour.length !== 0 && (
          <View style={styles.openingHourWrap}>
            <Text style={styles.hourTit}>영업시간 보기</Text>
            <TouchableOpacity onPress={handleClickMoreBtn}>
              <View>
                <Entypo
                  name="chevron-small-down"
                  size={24}
                  color="#888"
                  style={clickOpeningHourBtn ? styles.hideBtn : styles.showBtn}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {clickOpeningHourBtn && (
        <FlatList
          data={locationInfo.openingHour}
          renderItem={({ item }) => <Text style={styles.li}>{item}</Text>}
          keyExtractor={(item) => item}
          style={styles.liWrap}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  detailInfoWrap: {
    padding: 30,
    paddingTop: 18,
  },
  addressWrap: {
    marginLeft: -3,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  address: {
    width: '100%',
    fontSize: 14,
    color: '#333',
  },
  timeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 7,
  },
  isOpen: {
    fontWeight: '500',
    color: 'red',
  },
  openingHourWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hourTit: {
    color: '#444',
  },
  hideBtn: {
    transform: [{ rotate: '180deg' }],
  },
  showBtn: {
    transform: [{ rotate: '0deg' }],
  },
  liWrap: {
    marginLeft: 23,
    marginTop: 3,
  },
  li: {
    marginBottom: 4,
    fontSize: 13,
    color: '#777',
  },
});

export default DetailInfoTab;
