import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SectionList, Image , FlatList} from 'react-native';
import { useStore } from '../store';
import { theme } from '../config';

export default function FoodList() {
  const { loadFoodMenu, selectedFoodMenu  } = useStore(); 

  return (
    <View style={styles.container}>
      <SectionList
        sections={selectedFoodMenu}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.imgUrl }} style={styles.image} />
            <View style={styles.itemDetails}>
              <Text style={styles.title}>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { category } }) => (
          <Text style={styles.header}>{category}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  header: {
    fontSize: 14,
    backgroundColor: '#E3E3E3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    //fontFamily: 'Karla',
    fontWeight: 'bold',
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 18,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});