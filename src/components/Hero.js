import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { theme } from '../config'
import { useStore } from '../store'
import SearchBar from './SearchBar'

export default function Hero() {
  // insert code here
  const { bears, increasePopulation, removeAllBears } = useStore()
  return (
    <View style={styles.container}>

      <Image source={require('../../assets/images/hero2.jpg')} style={{
        width: 400, height: 160,
        opacity: 0.5,

      }} />
      <Text style={styles.headerTitle}>Little Lemon</Text>
      <Text style={styles.headerSubText}>Little Lemon is a restaurant that serves the best food in town</Text>

      <SearchBar />
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',

    position: 'relative',
  },
  primaryBtn: theme.primaryBtn,
  headerTitle: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
    height: 50,
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  headerSubText: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 50,
    height: 50,
    fontSize: 16,
    color: '#FFFFFF',
  },
});
