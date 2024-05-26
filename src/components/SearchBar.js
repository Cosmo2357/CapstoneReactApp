import React, { useEffect } from 'react';
import { View, StyleSheet, TextInput, Keyboard } from 'react-native';
import { useStore } from '../store';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { theme } from '../config';

export default function SearchBar() {
  const { searchKey, search } = useStore();

  useFocusEffect(
    React.useCallback(() => {
      // This effect runs when the screen is focused
      search();
      return () => {
        // Reset searchKey when the screen is unfocused
        useStore.setState({ searchKey: '' });
        useStore.setState({ selectedCategory: [] });
      };
    }, [])
  );

  return (
    <View style={styles.inputContainer}>
      <Ionicons name="search" size={24} color="black" />
      <TextInput
        placeholder="Search"
        style={styles.input}
        onChangeText={(e) => {
          useStore.setState({ searchKey: e });
          search();
        }}
        value={searchKey}
        returnKeyType="search"
        onSubmitEditing={Keyboard.dismiss}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 6,
    width: 240,
  },
  input: {
    marginLeft: 10,
    flex: 1,
  },
  primaryBtn: theme.primaryBtn,
});
