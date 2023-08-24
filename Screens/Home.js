import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Title from '../Components/Title';
const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Title titleText="QUIZZLER" />
      <View style={styles.bannercontainer}>
        <Image
          source={{
            uri: 'https://img.freepik.com/free-vector/boys-taking-exam_1308-33689.jpg?w=740&t=st=1692175908~exp=1692176508~hmac=a8b82b2761a2aa55c69747f5f3ac9af5dd740154ad8501ffb74079f923af1df1',
          }}
          style={styles.banner}
          resizeMode={'contain'}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Quiz')}
        style={styles.button}>
        <Text style={styles.bottonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

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
});
