import React, { useEffect, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  View,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SCREEN_WIDTH } from '../../../utillities/device';
import colors, {
  BAR_BUTTON_COLOR,
  TRANSPARENT,
} from '../../../utillities/constants/colors';
import { fontBold } from '../../../utillities/constants/fonts';
import { setFocusedTab } from '../../../store/slices/bottomtabSlice';

const UNFOCUSD_TAB_WIDTH = SCREEN_WIDTH / 8;
const FOCUSED_TAB_WIDTH = UNFOCUSD_TAB_WIDTH * 4; // Reduced from 5 to 4 for better spacing
const FOCUSED_OFFSET = -80; // Reduced from -100 to -80
const UNFOCUSED_OFFSET = 16; // Reduced from 20 to 16

const Tab = ({ 
  state, 
  descriptors, 
  route, 
  index, 
  navigation 
}) => {
  const dispatch = useDispatch();
  
  // Get data from Redux store
  const { focusedTab, prevFocusedTab } = useSelector((reduxState) => reduxState.bottomTab);
  const routename = useSelector((reduxState) => reduxState.routename);
  const user = useSelector((reduxState) => reduxState.user);
  const notification = useSelector((reduxState) => reduxState.notification);
  
  const width = useRef(new Animated.Value(0)).current;
  const bgcolor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    _toggleAnimetion();
  }, [focusedTab, prevFocusedTab]);

  useEffect(() => {
    // Check for both tab names and nested screen names
    const currentRoute = routename?.currentRouteName;
    if (currentRoute === 'Home' || currentRoute === 'HomeScreen') {
      dispatch(setFocusedTab(0));
    }
    if (currentRoute === 'Inbox' || currentRoute === 'InboxScreen') {
      dispatch(setFocusedTab(1));
    }
    if (currentRoute === 'Profile' || currentRoute === 'ProfileScreen') {
      dispatch(setFocusedTab(2));
    }
    if (currentRoute === 'Menu' || currentRoute === 'MenuScreen') {
      dispatch(setFocusedTab(3));
    }
  }, [routename?.currentRouteName, dispatch]);

  const _toggleAnimetion = () => {
    let initialWidth = null;
    let finalWidth = null;
    let initialColor = null;
    let finalColor = null;
    
    if (focusedTab === index) {
      initialWidth = UNFOCUSD_TAB_WIDTH + UNFOCUSED_OFFSET;
      finalWidth = FOCUSED_TAB_WIDTH + FOCUSED_OFFSET;
      initialColor = 0;
      finalColor = 1;
    } else if (prevFocusedTab === index) {
      initialWidth = FOCUSED_TAB_WIDTH + FOCUSED_OFFSET;
      finalWidth = UNFOCUSD_TAB_WIDTH + UNFOCUSED_OFFSET;
      initialColor = 1;
      finalColor = 0;
    } else {
      initialWidth = UNFOCUSD_TAB_WIDTH + UNFOCUSED_OFFSET;
      finalWidth = UNFOCUSD_TAB_WIDTH + UNFOCUSED_OFFSET;
      initialColor = 0;
      finalColor = 0;
    }
    
    width.setValue(initialWidth);
    bgcolor.setValue(initialColor);
    
    Animated.parallel([
      Animated.spring(width, {
        toValue: finalWidth,
        friction: 50,
        useNativeDriver: false,
      }),
      Animated.timing(bgcolor, {
        toValue: finalColor,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const _onPress = (route, isFocused) => {
    dispatch(setFocusedTab(index));
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });
    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const isFocused = state?.index === index;
  const { options } = descriptors?.[route?.key] || {};

  let ongoing = null;
  if (index === 1) { // Inbox tab
    const teleclinicLength = user?.teleclinic?.length || 0;
    const rtclinicLength = user?.rtclinic?.length || 0;
    ongoing = teleclinicLength + rtclinicLength;
    if (ongoing <= 0) {
      ongoing = null;
    }
  }

  let badge = null;
  if (index === 3) { // Menu tab (which is the 4th tab - index 3)
    badge = notification?.badge || 0;
    if (badge <= 0) {
      badge = null;
    }
  }

  // Ensure we have valid data before rendering
  if (!options || !state || !route) {
    return null;
  }

  const barColor = [
    colors.main,
    colors.main,
    colors.main,
  ];

  const animatedBgColor = bgcolor.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255,255,255,0)', barColor[index] || colors.main],
  });

  const animetedStyle = {
    width: width,
    backgroundColor: animatedBgColor,
  };

  return (
    <Animated.View style={[styles.tabContainer, animetedStyle]}>
      <TouchableOpacity
        style={styles.tab}
        accessibilityRole="button"
        accessibilityState={{ selected: isFocused }}
        onPress={() => _onPress(route, isFocused)}>
        {options?.tabBarIcon && options.tabBarIcon(isFocused)}
        {isFocused && options?.tabBarLabel && (
          <Text style={styles.textLabel}>{options.tabBarLabel}</Text>
        )}
        {ongoing && (
          <View style={styles.notiBadge}>
            <Text style={styles.notiText}>{ongoing}</Text>
          </View>
        )}
        {badge && (
          <View style={styles.notiBadge}>
            <Text style={styles.notiText}>{badge}</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    marginHorizontal: 4, // Add horizontal margin for spacing
    overflow: 'hidden', // Ensure content doesn't overflow the rounded corners
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8, // Add internal padding
    minWidth: 44, // Ensure minimum touch target size
  },
  textLabel: {
    ...fontBold,
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 3,
    marginLeft: 5,
  },
  notiText: {
    ...fontBold,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  notiBadge: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -10,
    right: 5,
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#ff0c29',
  },
});

export default Tab;
