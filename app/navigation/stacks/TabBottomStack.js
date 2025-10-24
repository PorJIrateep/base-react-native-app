import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeStack from './HomeStack';
import InboxStack from './InboxStack';
import ProfileStack from './ProfileStack';
import MenuStack from './MenuStack';
import BottomTab from './components/BottomTab';

const Tab = createBottomTabNavigator();
const focusedColor = '#FFFFFF';
const unfocusedColor = '#B2CFCB';

const TabBottomStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <BottomTab {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: (isFocused) => (
            <Ionicons
              name="home-outline"
              color={isFocused ? focusedColor : unfocusedColor}
              size={isFocused ? 22 : 26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={InboxStack}
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: (isFocused) => (
            <Ionicons
              name="mail-outline"
              color={isFocused ? focusedColor : unfocusedColor}
              size={isFocused ? 22 : 26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: (isFocused) => (
            <Ionicons
              name="person-outline"
              color={isFocused ? focusedColor : unfocusedColor}
              size={isFocused ? 22 : 26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuStack}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: (isFocused) => (
            <Ionicons
              name="settings-outline"
              color={isFocused ? focusedColor : unfocusedColor}
              size={isFocused ? 28 : 30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBottomStack;
