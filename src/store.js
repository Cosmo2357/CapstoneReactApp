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
  // userinfo
  email: '',
  firstName: '',
  lastName: '',
  orderStatuses: false,
  passwordChange: false,
  specialOffers: false,
  newsLetter: false,
  //food
  foodMenu: [],
  foodCategory: [],
  selectedFoodMenu: [],
  selectedCategory: [],
  searchKey: '',

  login: async (firstName, email) => {
    try {
      await AsyncStorage.setItem('firstname', firstName)
      await AsyncStorage.setItem('email', email)
      set({
        firstName: firstName,
        email: email,
        isLoggedIn: true
      })
      return

    } catch (e) {
      console.log('error: ', e);
      return
    }
  },

  setIntialState: async () => {
    set({
      selectedFoodMenu: foodMenu,
      foodMenu: foodMenu,
    })
    try {
      const savedFirstname = await AsyncStorage.getItem('firstname')
      const savedEmail = await AsyncStorage.getItem('email')
      const savedUserData = await AsyncStorage.getItem('userData')
      const savedLoggedIn = await AsyncStorage.getItem('isLoggedIn')
      if (savedFirstname && savedEmail && savedLoggedIn === 'true') {
        set({
          firstname: savedFirstname,
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
      //selectedCategory: categoryGroup
    })

    const organizedMenu = organizeMenu(menuData);
    set({ selectedFoodMenu: organizedMenu })

    //filterMenu()
  },



  saveUserData: async (data) => {
    try {
/*       await AsyncStorage.setItem('userData', JSON.stringify(data))
      set({ userInfo: data }) */
      const { email, firstName, lastName, phone, orderStatuses, passwordChange, specialOffers, newsLetter } = data;
      await AsyncStorage.multiSet([
        ['email', email],
        ['firstName', firstName],
        ['lastName', lastName],
        ['phone', phone],
        ['orderStatuses', orderStatuses.toString()],
        ['passwordChange', passwordChange.toString()],
        ['specialOffers', specialOffers.toString()],
        ['newsLetter', newsLetter.toString()]  
      ]);
        set({
          email: email,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          orderStatuses: orderStatuses,
          passwordChange: passwordChange,
          specialOffers: specialOffers,
          newsLetter: newsLetter,
        })

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
    const newSelectedCategory = generateSelectedCategory(category, selectedCategories, allCategories)
    set({ selectedCategory: newSelectedCategory })

    const filteredMenu = filterMenu(menuData, newSelectedCategory, useStore.getState().searchKey)
    set({ selectedFoodMenu: organizeMenu(filteredMenu) })
  },

  search: () => {
    const selectedCategory = useStore.getState().selectedCategory
    const searchKey = useStore.getState().searchKey

    const filteredMenu = filterMenu(menuData, selectedCategory, searchKey)
    set({ selectedFoodMenu: organizeMenu(filteredMenu) })
  }

}))


