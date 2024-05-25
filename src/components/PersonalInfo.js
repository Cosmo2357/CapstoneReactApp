import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { theme } from '../config'
import { useStore } from '../store'

export default function PersonalInfo() {
  // insert code here
  const { bears, increasePopulation, removeAllBears, handleSelectedCategory } = useStore()

  const categolies = [
    {
      name: 'Burgers',
      items: [
        {
          name: 'Burger',
          price: 10
        },
        {
          name: 'Cheeseburger',
          price: 12
        }
      ]
    },
    {
      name: 'Drinks',
      items: [
        {
          name: 'Coke',
          price: 2
        },
        {
          name: 'Pepsi',
          price: 2
        }
      ]
    }
  ]


  return (
    <View style={styles.container} >

      <Text>Personal Info</Text>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24
  },
  pillButton: {
    backgroundColor: '#f3f3f3',
    padding: 8,
    borderRadius: 16,
    margin: 8
  },
  pillButtonActive: {
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 16,
    margin: 8
  },

  primaryBtn: theme.primaryBtn
});
