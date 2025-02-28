import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const CardBackView = ({ cardNumber, cardExpiry, CVV, isCVV, setIsCVV }) => {
  return (
    <View style={styles.cardDetails}>
      <View style={styles.cardHeaderView}>
        <Text style={styles.cardHeading}>YOLO</Text>
        <Image
          source={require('./../../assets/images/yes_bank_logo.png')}
          style={styles.bank_logo}
          resizeMode='contain'
        />
      </View>
      <View style={styles.credentialView}>
        <View style={styles.cardNumber}>
          {cardNumber.map((item, index) => (
            <Text key={index} style={styles.cardNoText}>
              {item}
            </Text>
          ))}
        </View>
        <View style={styles.expiry}>
          <View style={styles.expiryView}>
            <Text style={styles.expiryHead}>expiry</Text>
            <View>
              <Text style={styles.expiryDates}>{cardExpiry}</Text>
            </View>
          </View>
          <View style={styles.cvvView}>
            <Text style={styles.cvvHeading}>CVV</Text>
            <View style={styles.cvvText}>
              <Text style={[styles.cvvInner, isCVV && { fontSize: scale(15) }]}>
                {isCVV ? CVV : '***'}
              </Text>
              <TouchableOpacity onPress={() => setIsCVV(!isCVV)}>
                <FontAwesome5
                  name={isCVV ? 'eye' : 'eye-slash'}
                  color={'white'}
                  size={scale(16)}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.copyView}>
        <TouchableOpacity>
          <FontAwesome5 name='copy' color={'#A90808'} size={scale(19)} />
        </TouchableOpacity>
        <Text style={styles.copyText}>copy details</Text>
      </View>
      <View style={styles.rupayView}>
        <Image
          source={require('./../../assets/images/rupay_logo.png')}
          style={styles.rupayImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardDetails: {
    alignItems: 'flex-start',
    height: '100%',
    width: '100%',
  },
  cardHeaderView: {
    height: moderateVerticalScale(40),
    width: '100%',
    marginTop: moderateVerticalScale(5),
    paddingHorizontal: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeading: {
    color: 'red',
    fontFamily: 'P-extrabold',
    fontSize: scale(18),
  },
  bank_logo: {
    height: moderateVerticalScale(20),
    width: moderateScale(50),
  },
  credentialView: {
    height: moderateVerticalScale(130),
    width: '100%',
    marginTop: moderateVerticalScale(20),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardNumber: {
    width: moderateScale(90),
    justifyContent: 'space-evenly',
    height: '100%',
    alignItems: 'center',
  },
  cardNoText: {
    fontSize: scale(17),
    color: 'white',
    fontFamily: 'P-bold',
  },
  expiry: {
    width: moderateScale(90),
    justifyContent: 'space-between',
    height: '100%',
    alignItems: 'center',
  },
  expiryView: {
    width: '100%',
    paddingHorizontal: moderateScale(15),
    flexDirection: 'column',
    paddingVertical: moderateVerticalScale(10),
  },
  expiryHead: {
    fontSize: scale(10),
    color: 'grey',
    fontFamily: 'P-semibold',
  },
  expiryDates: {
    fontSize: scale(15),
    color: 'white',
    marginTop: moderateVerticalScale(3),
    fontFamily: 'P-semibold',
  },
  cvvHeading: {
    fontSize: scale(10),
    color: 'grey',
    fontFamily: 'P-semibold',
  },
  cvvView: {
    width: '100%',
    marginLeft: moderateScale(30),
  },
  cvvInner: {
    fontSize: scale(20),
    color: 'white',
    fontFamily: 'P-semibold',
  },

  cvvText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: moderateScale(60),
    alignItems: 'center',
  },
  copyView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    paddingLeft: moderateScale(20),
    marginTop: moderateVerticalScale(20),
    gap: moderateScale(10),
  },
  copyText: {
    fontSize: scale(13),
    color: '#A90808',
    fontFamily: 'P-semibold',
  },
  rupayView: {
    marginTop: moderateVerticalScale(15),
    flexDirection: 'row',
    width: moderateScale(220),
    justifyContent: 'flex-end',
  },
  rupayImage: {
    height: moderateVerticalScale(30),
    resizeMode: 'contain',
  },
});

export default CardBackView;
