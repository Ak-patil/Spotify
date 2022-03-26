/* eslint-disable react-native/no-inline-styles */
import Slider from '@react-native-community/slider';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';

import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import songs from '../model/Data';

const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
    });
    await TrackPlayer.add(songs);
  } catch (error) {
    console.log(error);
  }
};

const togglePlayBack = async playBackState => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack != null) {
    if (playBackState == State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

const Musicplayer = props => {
  const [like, setLike] = useState(true);
  let data = props.route.params.item;

  const playBackState = usePlaybackState();
  const {position, duration} = useProgress();

  useEffect(() => {
    setupPlayer();

    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  const skipTenSecForward = async () => {
    const skip = 10;
    try {
      const currentPosition = await TrackPlayer.getPosition();
      const currentDuration = await TrackPlayer.getDuration();

      if (currentDuration - currentPosition > skip) {
        await TrackPlayer.seekTo(currentPosition + skip);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const skipTenSecBackward = async () => {
    const skip = 10;
    try {
      const currentPosition = await TrackPlayer.getPosition();
      if (currentPosition - skip > 0) {
        await TrackPlayer.seekTo(currentPosition - skip);
      } else {
        await TrackPlayer.seekTo(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeActive = () => {
    setLike(!like);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerMain}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons
            name="chevron-back-outline"
            size={35}
            color="#FFFFFF"
            style={{marginTop: 15}}
          />
        </TouchableOpacity>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.headertitle}>
          {data.trackName}
        </Text>
        <TouchableOpacity>
          <Feather
            name="more-vertical"
            size={35}
            color="#FFFFFF"
            style={{marginTop: 15}}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <View>
          <Image source={{uri: data.artworkUrl100}} style={styles.artworkImg} />
        </View>
        <View style={styles.artistContainer}>
          <View>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {data.trackName}
            </Text>
            <Text style={styles.artist} numberOfLines={1} ellipsizeMode="tail">
              {data.artistName}
            </Text>
          </View>
          <TouchableOpacity
            style={{marginTop: '-65%'}}
            onPress={handleChangeActive}>
            {like ? (
              <Ionicons
                name="ios-heart-outline"
                size={30}
                color="#FFFFFF"
                style={{marginTop: 20}}
              />
            ) : (
              <Ionicons
                name="heart"
                size={30}
                color="#1BF110"
                style={{marginTop: 20}}
              />
            )}
          </TouchableOpacity>
        </View>

        <View>
          <Slider
            style={styles.progressBar}
            value={position}
            minimumValue={0}
            maximumValue={duration}
            thumbTintColor="#1BF110"
            minimumTrackTintColor="#1BF110"
            maximumTrackTintColor="#848784"
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
            }}
          />
          <View style={styles.progressLabelContainer}>
            <Text style={styles.progressLabelCount}>
              {(position / 60).toPrecision(2)}
            </Text>
            <Text style={styles.progressLabelCount}>
              {((duration - position) / 60).toPrecision(3)}
            </Text>
          </View>
        </View>
        <View style={styles.musicControl}>
          <TouchableOpacity>
            <Ionicons
              name="ios-repeat"
              size={35}
              color="#FFFFFF"
              style={{marginTop: 20}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipTenSecBackward}>
            <FontAwesome
              name="rotate-left"
              size={35}
              color="#FFFFFF"
              style={{marginTop: 20}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => togglePlayBack(playBackState)}>
            <Ionicons
              name={
                playBackState === State.Playing
                  ? 'ios-pause-circle'
                  : 'ios-play-circle'
              }
              size={60}
              color="#1BF110"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipTenSecForward}>
            <FontAwesome
              name="rotate-right"
              size={35}
              color="#FFFFFF"
              style={{marginTop: 20}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="ios-shuffle-outline"
              size={35}
              color="#FFFFFF"
              style={{marginTop: 20}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#1BF110',
  },
  headerMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 360,
    marginLeft: 10,
  },
  headertitle: {
    marginTop: 22,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    color: '#FFFFFF',
    width: 250,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artworkImg: {
    marginTop: 10,
    top: -20,
    width: 340,
    height: 360,
    borderRadius: 15,
  },
  artistContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 335,
    marginTop: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    width: 250,
    color: '#EEEEEE',
  },
  artist: {
    fontSize: 15,
    fontWeight: '200',
    width: 250,
    color: '#EEEEEE',
  },
  progressBar: {
    width: 340,
    height: 40,
    color: '#1BF110',
    flexDirection: 'row',
  },
  progressLabelContainer: {
    width: 335,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelCount: {
    color: '#fff',
  },
  musicControl: {
    width: '80%',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginLeft: 25,
    flexDirection: 'row',
  },
});

export default Musicplayer;
