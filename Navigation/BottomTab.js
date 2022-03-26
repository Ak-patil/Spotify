/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../Screens/Homescreen';
import Collectionscreen from '../Screens/Collectionscreen';
import Accountscreen from '../Screens/Accountscreen';
import Search from '../Screens/Search';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {backgroundColor: '#222831'},
        tabBarActiveTintColor: '#1BF110',
        tabBarInactiveTintColor: 'grey',
      }}>
      <Tab.Screen
        options={() => ({
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={'ios-home-outline'}
              style={{color: focused ? '#1BF110' : 'grey'}}
              size={26}
            />
          ),
        })}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={() => ({
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={'ios-search-outline'}
              style={{color: focused ? '#1BF110' : 'grey'}}
              size={26}
            />
          ),
        })}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={() => ({
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              style={{color: focused ? '#1BF110' : 'grey'}}
              name={'account-outline'}
              size={28}
            />
          ),
        })}
        name="Account"
        component={Accountscreen}
      />
      <Tab.Screen
        options={() => ({
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name={'favorite-outline'}
              size={28}
              style={{color: focused ? '#1BF110' : 'grey'}}
            />
          ),
        })}
        name="Collection"
        component={Collectionscreen}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
