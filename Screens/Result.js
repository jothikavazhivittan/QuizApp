import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Title from '../Components/Title';

const Result = ({navigation, route}) => {
  const {score} = route.params;

  const resultBanner =
    score > 70
      ? 'https://cdni.iconscout.com/illustration/premium/thumb/men-celebrating-victory-4587301-3856211.png'
      : 'https://cdni.iconscout.com/illustration/free/thumb/concept-about-business-failure-1862195-1580189.png';
  return (
    <View style={styles.container}>
      <Title titleText="RESULTS" />
      <Text style={styles.scoreValue}>{score}</Text>
      <View style={styles.bannercontainer}>
        <Image
          source={{
            uri: resultBanner,
          }}
          style={styles.banner}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.button}>
        <Text style={styles.bottonText}>GO TO HOME</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  banner: {
    height: 400,
    width: 500,
  },
  bannercontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    height: '100%',
  },
  button: {
    width: '100%',
    backgroundColor: '#FF019E',
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    alignItems: 'center',
  },
  bottonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: '800',
    alignSelf: 'center',
  },
});
