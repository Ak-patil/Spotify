/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Searchscreen = props => {
  const [filteredData, setfilterData] = useState([]);
  const [search, setSearch] = useState('');

  const fetchPosts = async url => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json.results;
    } catch (error) {
      console.log(error);
    }
  };

  const searchFilter = async text => {
    setSearch(text);
    let searchText = text.split(' ').join('+');
    if (text && text.length > 0) {
      let response = await fetchPosts(
        `https://itunes.apple.com/search?term=${searchText}&entity=musicTrack&country=in&limit=100`,
      ).catch(err => {
        console.log(err);
      });
      const newData = response.filter(item => {
        const itemData = item.artistName
          ? item.artistName.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterData(newData);
    } else {
      setfilterData([]);
    }
  };

  const ItemView = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Musicplayer', {item});
        }}>
        <View key={index} style={styles.itemContainer}>
          <Image source={{uri: item.artworkUrl100}} style={styles.image} />
          <View style={styles.itemView}>
            <Text
              style={styles.textName}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.trackName}
            </Text>
            <Text numberOfLines={1} style={styles.textKind}>
              {item.artistName}
              {' . '}
              {item.primaryGenreName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const emptyData = () => {
    return (
      <View>
        <Text style={styles.searchPage}>Play Some Music!</Text>
        <Text style={styles.searchPageChild}>
          Search for your favorite songs
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.parent}>
          <View style={styles.child}>
            <TextInput
              style={styles.textInputStyle}
              value={search}
              placeholder="Search for a Song..."
              placeholderTextColor="#FFF"
              underlineColorAndroid="transparent"
              onChangeText={text => searchFilter(text)}
            />
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons
                name="ios-close-circle-outline"
                size={28}
                color="#FFFFFF"
                style={{margin: 5}}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setfilterData([])}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.flatlist}
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          extraData={filteredData}
          renderItem={ItemView}
          ListEmptyComponent={emptyData}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#222831',
    borderBottomWidth: 3,
    borderBottomColor: '#1BF110',
  },
  parent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  child: {
    marginTop: 25,
    borderWidth: 1,
    height: 40,
    borderRadius: 5,
    borderColor: '#FFFFFF',
    marginLeft: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButtonParent: {
    marginRight: 10,
    paddingTop: 10,
  },
  cancelButton: {
    color: '#1BF110',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 32,
    marginLeft: 8,
    fontWeight: '600',
    marginRight: 30,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  itemView: {marginRight: 10, width: '85%'},

  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemStyle: {
    padding: 10,
  },
  textName: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },
  textKind: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 10,
    fontWeight: '200',
  },
  textInputStyle: {
    width: 225,
    color: '#FFFFFF',
    marginLeft: 16,
  },
  searchPage: {
    top: 180,
    textAlign: 'center',
    alignSelf: 'auto',
    margin: 100,
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '600',
  },
  searchPageChild: {
    textAlign: 'center',
    alignSelf: 'auto',
    margin: 100,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '300',
  },
});

export default Searchscreen;
