import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import ClickableFiveStar from './ClickableFiveStar';
import ReviewItem from './ReviewItem';

const ReviewTab = () => {
  const [showWriteReview, setShowWriteReview] = useState(false);

  const handleClickReviewBtn = () => {
    setShowWriteReview((prev) => !prev);
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.writeReviewContainer}>
          <View style={styles.btnWrap}>
            <TouchableOpacity
              style={styles.writeReviewBtn}
              activeOpacity={0.6}
              onPress={handleClickReviewBtn}
            >
              <View style={styles.btnTxtWrap}>
                <Text style={styles.reviewTxt}>{showWriteReview ? '닫기' : '리뷰쓰기'}</Text>
                <Entypo
                  name="chevron-small-down"
                  size={24}
                  color="#1a73e8"
                  style={showWriteReview ? styles.hideBtn : styles.showBtn}
                />
              </View>
            </TouchableOpacity>
          </View>
          {showWriteReview && (
            <View style={styles.writeReviewWrap}>
              <StatusBar style="auto" />
              <View style={styles.rateWrap}>
                <Text style={styles.rateTit}>가성비</Text>
                <ClickableFiveStar />
              </View>
              <View style={styles.rateWrap}>
                <Text style={styles.rateTit}>재방문의사</Text>
                <ClickableFiveStar />
              </View>
              <TextInput
                style={styles.input}
                // onChangeText={onChangeNumber}
                placeholder="리뷰 내용을 입력해주세요 :)"
              />
              <View style={styles.writeBtnWrap}>
                <TouchableOpacity style={[styles.writeBtn, styles.cancelBtn]}>
                  <Text style={styles.writeBtnTxt}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.writeBtn}>
                  <Text style={styles.writeBtnTxt}>등록</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <View style={styles.existReviewContainer}>
          <ReviewItem star={3} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  writeReviewContainer: {
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#aaa',
  },
  btnWrap: {
    flex: 1,
    alignItems: 'center',
  },
  writeReviewBtn: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderColor: '#1a73e8',
    borderWidth: 1,
    borderRadius: 4,
  },
  btnTxtWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  hideBtn: {
    transform: [{ rotate: '180deg' }],
  },
  showBtn: {
    transform: [{ rotate: '0deg' }],
  },
  reviewTxt: {
    fontWeight: '500',
    color: '#1a73e8',
  },
  writeReviewWrap: {
    marginTop: 20,
    paddingHorizontal: 30,
    overflow: 'scroll',
  },
  rateWrap: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rateTit: {
    width: 75,
    paddingTop: 3,
    fontSize: 14,
    color: '#555',
  },
  input: {
    marginTop: 8,
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
    fontWeight: '600',
    color: '#666',
  },
  writeBtnWrap: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 10,
  },
  writeBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 3,
    backgroundColor: '#1a73e8',
  },
  cancelBtn: {
    backgroundColor: '#aaa',
  },
  writeBtnTxt: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  existReviewContainer: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
});

export default ReviewTab;
