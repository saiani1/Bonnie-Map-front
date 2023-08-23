import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import ReviewStar from '../UI/ReviewStar';
import PlaceModalTab from '../common/PlaceModalTab';
import DetailInfoTab from '../UI/DetailInfoTab';
import ReviewTab from '../UI/ReviewTab';

interface IProps {
  showModal: boolean;
  setShowModal: (newValue: boolean) => void;
  locationInfo: any;
}

const PlaceModal = ({ showModal, setShowModal, locationInfo }: IProps) => {
  const [clickTab, setClickTab] = useState('info');

  const handleClickModalCloseBtn = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <View style={styles.locationInfo}>
          <TouchableOpacity style={styles.closeBtn} onPress={handleClickModalCloseBtn}>
            <View>
              <AntDesign name="closecircleo" size={24} color="#fff" />
            </View>
          </TouchableOpacity>
          <View style={styles.imgWrap}>
            <Image source={{ uri: `${locationInfo.photo}` }} style={styles.img} />
          </View>
          <View style={styles.contentsWrap}>
            <View>
              <Text style={styles.title}>{locationInfo.title}</Text>
              <ReviewStar tit="가성비" star={3} />
              <ReviewStar tit="재방문의사" star={5} />
            </View>
            <TouchableOpacity style={styles.btn}>
              <View style={styles.btnTxtWrap}>
                <Entypo name="save" size={24} color="#fff" />
                <Text style={styles.btnTxt}>저장</Text>
              </View>
            </TouchableOpacity>
            <PlaceModalTab clickTab={clickTab} setClickTab={setClickTab} />
          </View>
          <ScrollView>
            {clickTab === 'info' ? <DetailInfoTab locationInfo={locationInfo} /> : <ReviewTab />}
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  locationInfo: {
    position: 'absolute',
    bottom: 0,
    borderRadius: 10,
    width: Dimensions.get('window').width,
    height: 700,
    backgroundColor: '#fff',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7,
  },
  closeBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 100,
  },
  imgWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  img: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    height: '100%',
  },
  contentsWrap: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 195,
    padding: 30,
    paddingBottom: 50,
    borderBottomColor: '#bbb',
    borderBottomWidth: 0.5,
  },
  title: {
    marginBottom: 15,
    width: 230,
    fontSize: 23,
    fontWeight: '600',
    color: '#333',
  },
  btn: {
    padding: 7,
    backgroundColor: '#888',
    borderRadius: 3,
    fontWeight: '500',
  },
  btnTxtWrap: {
    alignItems: 'center',
    rowGap: 2,
  },
  btnTxt: {
    fontSize: 13,
    color: '#fff',
  },
});

export default PlaceModal;
