import * as SQLite from "expo-sqlite";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Categolies from '../src/components/Categolies';
import FoodList from '../src/components/FoodList';
import Hero from '../src/components/Hero';
import Login from '../src/components/Login';
import { useStore } from '../src/store';

import { useEffect } from 'react';
import { theme } from '../src/config';

const db = SQLite.openDatabaseAsync('databaseName');

export default function Index() {


  const { loadFoodMenu, isLoggedIn, user, setIntialState } = useStore()



  useEffect(() => {
    setIntialState()
    loadFoodMenu();
  }
    , []);


  return (<>
    {!isLoggedIn && <Login />}
    {isLoggedIn && <View style={styles.container}>
      <StatusBar style="auto" />
      <Hero />
      <Categolies />
      <FoodList />
    </View >}
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    //padding: 24
  },
  primaryBtn: theme.primaryBtn
});
