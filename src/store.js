import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import { create } from 'zustand'
import { menuData, foodMenu } from './mock'
import { Alert } from 'react-native';
import Toast from 'react-native-root-toast';
import { generateCategory, organizeMenu, filterMenu, generateSelectedCategory } from './helper'

export const useStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  username: '',
  email: '',
  userInfo: {
    firstName: '',
    lastName: '',
    orderStatuses: false,
    passwordChange: false,
    specialOffers: true,
    newsLetter: false,
  },
  foodMenu: [],
  foodCategory: [],
  selectedFoodMenu: [],
  selectedCategory: [],
  searchKey: '',

  setIntialState: async () => {
    set({
      selectedFoodMenu: foodMenu,
      foodMenu: foodMenu,
    })
    try {
      const savedUsername = await AsyncStorage.getItem('username')
      const savedEmail = await AsyncStorage.getItem('email')
      const savedUserData = await AsyncStorage.getItem('userData')
      const savedLoggedIn = await AsyncStorage.getItem('isLoggedIn')
      if (savedUsername && savedEmail && savedLoggedIn === 'true') {
        set({
          username: savedUsername,
          email: savedEmail,
          isLoggedIn: true,
          userInfo: JSON.parse(savedUserData)
        })
      }
    }
    catch (e) {
      console.log('error: ', e);
      return
    }
  },

  loadFoodMenu: async () => {

    const categoryGroup = generateCategory(menuData);

    set({
      foodCategory: categoryGroup,
      selectedCategory: categoryGroup
    })

    const organizedMenu = organizeMenu(menuData);
    set({ selectedFoodMenu: organizedMenu })

    //filterMenu()
  },

  login: async (username, email) => {
    console.log('login tiggered')
    try {
      const savedUsername = await AsyncStorage.getItem('username')
      const savedEmail = await AsyncStorage.getItem('email')
      console.log('savedUsername', savedUsername)
      console.log('savedEmail', savedEmail)

      if (!savedUsername || !savedEmail) {
        console.log('no saved data, make account')
        await AsyncStorage.setItem('username', username)
        await AsyncStorage.setItem('email', email)
        set({
          username: username,
          email: email,
          isLoggedIn: true
        })
        return
      }

      if (username !== savedUsername || email !== savedEmail) {
        Alert.alert('Error', 'Username or email is incorrect')
        return
      }
    
      // login 
      set({
        username: savedUsername,
        email: savedEmail,
        isLoggedIn: true
      })

    } catch (e) {
      console.log('error: ', e);
      return
    }
  },

  saveUserData: async (data) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data))
      set({ userInfo: data })
      Toast.show('Successfully Saved ', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
    } catch (e) {
      console.log('error: ', e);
      return
    }
  },

  removeUserData: async () => {
    try {
      await AsyncStorage.removeItem('userData')
      set({ userInfo: {} })

      Toast.show('Successfully removed ', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
    } catch (e) {
      console.log('error: ', e);
      return
    }
  },

  fetchFoodMenu: () => {
    set({
      selectedFoodMenu: foodMenu,
      foodMenu: foodMenu,
    })
  },

  handleSelectedCategory: (category) => {
    const selectedCategories = useStore.getState().selectedCategory
    const allCategories = useStore.getState().foodCategory
    const newSelectedCategory = generateSelectedCategory(category,selectedCategories, allCategories )
    set({ selectedCategory: newSelectedCategory})

 const filteredMenu = filterMenu (menuData, newSelectedCategory, useStore.getState().searchKey)
 set({ selectedFoodMenu: organizeMenu(filteredMenu) })
},

  search: () => {
    const selectedCategory = useStore.getState().selectedCategory
    const searchKey = useStore.getState().searchKey

    const filteredMenu = filterMenu(menuData, selectedCategory, searchKey)
    set({ selectedFoodMenu: organizeMenu(filteredMenu) })
  }

}))


