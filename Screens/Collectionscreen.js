import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const Collectionscreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/Lottie/favourite.json')}
        autoPlay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
    alignItems: 'center',
    borderBottomColor: '#1BF110',
    borderBottomWidth: 3,
  },
});

export default Collectionscreen;
