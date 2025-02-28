import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Svg, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import Home from '../screens/HomeScreen/Home';
import YoloPay from '../screens/YoloPayScreen/YoloPay';
import Genie from '../screens/GenieScreen/Genie';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

// Custom Bottom Tab with Reversed Curved Border at the Top
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      <Svg width={width} height={40} style={styles.curvedTopBorder}>
        <Defs>
          <LinearGradient id='borderGradient' x1='0' y1='0' x2='1' y2='0'>
            <Stop offset='0' stopColor='transparent' stopOpacity='0' />
            <Stop offset='0.2' stopColor='#fff' stopOpacity='1' />
            <Stop offset='0.8' stopColor='#fff' stopOpacity='1' />
            <Stop offset='1' stopColor='transparent' stopOpacity='0' />
          </LinearGradient>
        </Defs>

        {/* Reversed Concave Curve */}
        <Path
          d={`M0,40 Q${width / 2},-20 ${width},40`}
          fill='none'
          stroke='url(#borderGradient)'
          strokeWidth='0.5'
        />
      </Svg>

      {/* Tab Buttons */}
      <View style={styles.tabsContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || options.title || route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'YoloPay') {
            iconName = 'qrcode-scan';
          } else if (route.name === 'Ginie') {
            iconName = 'brightness-percent';
          }

          return (
            <TouchableOpacity
              key={index}
              style={[styles.tabButton, isFocused && styles.elevatedTab]}
              onPress={onPress}
              activeOpacity={0.7}>
              <View
                style={[
                  styles.tabIconContainer,
                  isFocused && styles.elevatedTabInner,
                ]}>
                <MaterialCommunityIcons
                  name={iconName}
                  size={28}
                  color={isFocused ? '#fff' : '#666'}
                />
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  { color: isFocused ? '#fff' : '#666' },
                ]}>
                {label.toLowerCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name='Home'
          component={Home}
          options={{ tabBarLabel: 'home' }}
        />
        <Tab.Screen
          name='YoloPay'
          component={YoloPay}
          options={{ tabBarLabel: 'yolo pay' }}
        />
        <Tab.Screen
          name='Ginie'
          component={Genie}
          options={{ tabBarLabel: 'ginie' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  curvedTopBorder: {
    position: 'absolute',
    top: -30,
  },
  tabsContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 30,
    paddingBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  tabButton: {
    alignItems: 'center',
    flex: 1,
  },
  elevatedTab: {
    marginBottom: 10,
  },
  tabIconContainer: {
    width: 50,
    height: 50,
    borderRadius: scale(30),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  elevatedTabInner: {
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 0.5,
    height: moderateVerticalScale(50),
    width: moderateVerticalScale(50),
    borderRadius: scale(30),
    elevation: 5,
  },
  tabLabel: {
    fontSize: 13,
    marginTop: 6,
  },
});

export default Navigation;
