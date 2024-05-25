import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { theme } from '../config'
import { useStore } from '../store'

export default function FoodItem(props) {


  const { item } = props
  console.log('item', item)
  return (
    <View style={[styles.categorContainer]}>
      <Text style={[{ fontWeight: 'bold' }]}>{item.category}</Text>
      {/* {
        item.items.map((food, index) => (
          <View key={food.name} style={styles.itemContainer}>
            <View>
              {food.imgUrl
                ? < Image source={require('../../assets/images/hero2.jpg')} style={{ width: 80, height: 80 }} />
                : < Image source={require('../../assets/images/hero2.jpg')} style={{ width: 80, height: 80 }} />
              }
            </View>
            <View style={styles.info}>
              <View style={styles.menulHeadre}>
                <Text style={{ fontWeight: 'bold' }}>{food.name}</Text>
                <Text style={{ fontWeight: 'bold' }}>${food.price}</Text></View>
              <Text style={{ color: '#424242' }}>{food.description}</Text>

            </View>
          </View>))
      } */}
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  primaryBtn: theme.primaryBtn,
  categorContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    gap: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    flexDirection: 'row',
  },
  info: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    flexDirection: 'column',
    gap: 5,
    marginLeft: 10,
    overflow: 'hidden',
    maxHeight: 70
  },
  // hide if it's wrapped over 3 lines
  description: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    width: '100%',
    flexDirection: 'column',
    gap: 5,
    //paddingHorizontal: 10,
    overflow: 'hidden',
    color: 'gray',
    //maxHeight: 30
  },
  primaryBtn: theme.primaryBtn,
  menulHeadre: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  }
});
