import * as SQLite from "expo-sqlite";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Categolies from '../src/components/Categolies';
import FoodList from '../src/components/FoodList';
import Hero from '../src/components/Hero';
import Login from '../src/components/Login';
import { useStore } from '../src/store';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { theme } from '../src/config';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
const db = SQLite.openDatabaseAsync('databaseName');

export default function Index() {

  const { loadFoodMenu, isLoggedIn, user, setIntialState, selectedFoodMenu, foodCategory } = useStore()

  useEffect(() => {
    setIntialState()
    loadFoodMenu();
  }
    , []);


  const [fontsLoaded, fontError] = useFonts({
    'MarkaziText': require('../assets/fonts/MarkaziText.ttf'),
    'Karla': require('../assets/fonts/Karla.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  console.log('foodCategory', foodCategory)


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
