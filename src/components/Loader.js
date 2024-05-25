import React from 'react'
import { View, Text, StyleSheet, Image, } from 'react-native'
import { theme } from '../config'
import { useStore } from '../store'
export default function Loader() {
  // insert code here
  const { bears, increasePopulation, removeAllBears } = useStore()
  return (
    <View>
      <Text>Hero</Text>
      {/* make spinner here */}

    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24
  },
  primaryBtn: theme.primaryBtn
});
