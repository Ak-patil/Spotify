import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Searchscreen from './Searchscreen';
import Musicplayer from './Musicplayer';

const Stack = createStackNavigator();

const Search = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Searchscreen">
      <Stack.Screen name="Searchscreen" component={Searchscreen} />
      <Stack.Screen name="Musicplayer" component={Musicplayer} />
    </Stack.Navigator>
  );
};

export default Search;
