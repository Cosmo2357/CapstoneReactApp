import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { theme } from '../config'
import { useStore } from '../store'
export default function Header() {

  return (
    <View>
      <Text>Header</Text>
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
