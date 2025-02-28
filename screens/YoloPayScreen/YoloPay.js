import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { faker } from '@faker-js/faker';
import CardBackView from './CardBackView'; // Import the new component

const YoloPay = () => {
  const [selectedMode, setSelectedMode] = useState('card');
  const [flipped, setFlipped] = useState(false);
  const [cardNumber, setCardNumber] = useState([]);
  const [cardExpiry, setCardExpiry] = useState('');
  const [isCVV, setIsCVV] = useState(false);
  const [CVV, setCVV] = useState('');
  const [isFreezed, setFreezed] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const cardNo = faker.finance.creditCardNumber().toString();
    setCardNumber(cardNo.split('-'));

    const expiryDate = faker.date
      .future()
      .toLocaleDateString('en-GB', { month: '2-digit', year: '2-digit' });
    setCardExpiry(expiryDate);

    const cvv = faker.finance.creditCardCVV();
    setCVV(cvv);

    console.log(cardNo.split('-'));
  }, []);

  // Additional useEffect for flipped state changes
  useEffect(() => {
    // This useEffect is triggered when flipped state changes
  }, [flipped]);

  const flipCard = () => {
    Animated.timing(rotateAnim, {
      toValue: flipped ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setFlipped(!flipped));
  };

  const frontRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const backRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>select payment mode</Text>
        <Text style={styles.headerSubtitle}>
          choose your preferred payment method to make payment.
        </Text>
      </View>

      {/* Payment Mode Buttons */}
      <View style={styles.paymentToggle}>
        <TouchableOpacity
          style={[
            styles.paymentButton,
            selectedMode === 'pay' && styles.activeButton,
          ]}
          onPress={() => setSelectedMode('pay')}>
          <Text
            style={[
              styles.paymentText,
              selectedMode === 'pay' && styles.activeText,
            ]}>
            pay
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paymentButton,
            selectedMode === 'card' && styles.activeButton,
          ]}
          onPress={() => setSelectedMode('card')}>
          <Text
            style={[
              styles.paymentText,
              selectedMode === 'card' && styles.activeText,
            ]}>
            card
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.cardSectionTitle}>YOUR DIGITAL DEBIT CARD</Text>

      {/* Digital Card Section */}
      <View style={styles.cardSection}>
        {/* Flip Animation */}
        <View style={styles.cardContainer}>
          <Animated.View
            style={[
              styles.cardFlip,
              { transform: [{ rotateY: frontRotation }] },
            ]}>
            <Image
              source={require('./../../assets/images/deb_card.png')}
              style={styles.debitCard}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.cardFlip,
              styles.cardBack,
              { transform: [{ rotateY: backRotation }] },
            ]}>
            <CardBackView
              cardNumber={cardNumber}
              cardExpiry={cardExpiry}
              CVV={CVV}
              isCVV={isCVV}
              setIsCVV={setIsCVV}
            />
          </Animated.View>
        </View>

        {/* Unfreeze Button */}
        <View
          style={isFreezed ? styles.freezeContainer : styles.unfreezeContainer}>
          <TouchableOpacity
            style={isFreezed ? styles.btnFreeze : styles.btnUnFreeze}
            onPress={() => {
              flipCard();
              setFreezed(!isFreezed);
            }}>
            <Ionicons
              name='snow-outline'
              size={24}
              color={isFreezed ? 'white' : '#A90808'}
            />
          </TouchableOpacity>
          <Text style={isFreezed ? styles.freezeText : styles.unfreezeText}>
            {isFreezed ? 'freeze' : 'unfreeze'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: scale(30),
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'P-bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'P-semibold',
  },
  cardSection: {
    marginBottom: 20,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: moderateScale(30),
  },
  cardSectionTitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: moderateVerticalScale(50),
    letterSpacing: 1,
    fontFamily: 'P-bold',
  },
  cardContainer: {
    width: moderateScale(200),
    height: moderateVerticalScale(350),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardFlip: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    backgroundColor: '#121212',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    height: moderateVerticalScale(300),
  },
  debitCard: {
    width: '100%',
    height: moderateVerticalScale(300),
    marginTop: moderateVerticalScale(20),
    resizeMode: 'contain',
  },
  paymentToggle: {
    flexDirection: 'row',
    backgroundColor: 'black',
    width: moderateScale(230),
    justifyContent: 'flex-start',
    paddingHorizontal: moderateScale(10),
    gap: moderateScale(10),
    borderRadius: 20,
    padding: 5,
  },
  paymentText: {
    color: 'gray',
    fontSize: 16,
    fontFamily: 'P-bold',
  },
  activeText: {
    color: '#A90808',
  },
  paymentButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: scale(20),
    backgroundColor: 'black',
    borderColor: 'white',
    borderLeftWidth: 0.3,
    borderRightWidth: 0.3,
    borderTopWidth: 0.3,
    width: moderateScale(90),
    height: moderateVerticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: 'black',
    borderColor: '#A90808',
    borderLeftWidth: 0.3,
    borderRightWidth: 0.3,
    borderTopWidth: 0.3,
    borderRadius: scale(20),
    width: moderateScale(90),
    height: moderateVerticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnUnFreeze: {
    borderColor: '#A90807',
    borderWidth: 0.2,
    padding: scale(10),
    borderRadius: scale(30),
  },
  btnFreeze: {
    borderColor: '#FFFFFF',
    borderWidth: 0.2,
    padding: scale(10),
    borderRadius: scale(30),
  },
  unfreezeContainer: {
    alignItems: 'center',
    marginTop: 20,
    gap: scale(5),
  },
  freezeContainer: {
    alignItems: 'center',
    marginTop: 20,
    gap: scale(5),
  },
  unfreezeText: {
    color: '#A90808',
    fontSize: scale(12),
    fontFamily: 'P-semibold',
  },
  freezeText: {
    color: '#FFFFFF',
    fontFamily: 'P-semibold',
    fontSize: scale(12),
  },
});

export default YoloPay;
