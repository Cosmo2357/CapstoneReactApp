import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { theme } from '../config'
import { useStore } from '../store'

export default function Categolies() {
  // insert code here
  const {foodCategory, handleSelectedCategory , selectedCategory} = useStore()



  return (
    <View style={styles.container} >
      {foodCategory.map((item) => (
        <Pressable key={item}
          onPress={() => handleSelectedCategory(item)}
        >
          <View style={[styles.pillButton, selectedCategory.includes(item) &&styles.active ]}>
            <Text style={[styles.pillButtonText, selectedCategory.includes(item)&&styles.activeText] }>{item}</Text>
          </View>
        </Pressable>
      ))
      }
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: '100%',
    backgroundColor: '#f3f3f3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 8,
    gap: 8
  },
  pillButton: {
    backgroundColor: '#E0E0E0',
    padding: 6,
    borderRadius: 16,

  },
  pillButtonText: {
    fontWeight: 'bold'
  },
active: {
    backgroundColor: '#495E57',
  },
  activeText: {
    color: '#FFFFFF'
  },

  primaryBtn: theme.primaryBtn
});
