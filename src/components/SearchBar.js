import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import { theme } from '../config'
import { useStore } from '../store'
// import searchIcon 
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar() {
  // insert code here
  const { searchKey, search } = useStore()

  return (

    <View style={styles.input}>
      <Ionicons name="search" size={24} color="black" />
      <TextInput
        placeholder="Search"
        style={{ marginLeft: 10, width: '100%' }}
        onChangeText={(e) => {
          useStore.setState({ searchKey: e })
          search()
        }}
        value={searchKey}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    width: 240,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 6,
  },
  primaryBtn: theme.primaryBtn,
});
