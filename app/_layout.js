import { router, Stack } from 'expo-router'
import React,{useCallback} from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BackHandler, Button, Image, Pressable, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useStore } from '../src/store';
import { RootSiblingParent } from 'react-native-root-siblings';
import { theme } from '../src/config';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function Page() {



  const { isLoggedIn } = useStore()
  return (
    <SafeAreaProvider>
    <RootSiblingParent> 
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            presentation: 'containedModal',
            title: '',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => (
              <Image
                style={{ width: 132, height: 32 }}
                source={require('../assets/images/logo.jpg')}
              />
            ),

            headerRight: () => (<>
              {isLoggedIn && <>
                <Pressable
                  onPress={() => {
                    //console.log('cart pressed')
                    router.push('cart')
                  }
                  }>
                  <Feather name="shopping-cart" size={24} color="black" style={
                    { marginRight: 10 }
                  } />
                </Pressable>
                <Pressable
                  onPress={() => {
                    router.push('profile')
                  }
                  }>
                  <Image
                    style={{ width: 36, height: 36 }}
                    source={require('../assets/images/userImg.png')}
                  />
                </Pressable></>}
            </>

            ),
          }} />
        <Stack.Screen
          name="profile"
          options={{
            presentation: 'card',
            animation: 'default',
            title: 'Profile',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitle: () => (
              <Image
                style={{ width: 132, height: 32 }}
                source={require('../assets/images/logo.jpg')}
              />
            ),
            headerBackTitle: 'Back',
            headerLeft: () => (
              <Pressable
                style={{ 
                  backgroundColor: '#495E57',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                }}
                onPress={() => {
                  router.dismissAll()
                }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 24,
                    }}
                  >←</Text>
              </Pressable>
            ),
          }}
        />
         <Stack.Screen
          name="cart"
          options={{
            presentation: 'modal',
            animation: 'default',
            title: 'Cart',
            headerTitle: () => (
              <Image
                style={{ width: 132, height: 32 }}
                source={require('../assets/images/logo.jpg')}
              />
            ),
          }}
        />
      </Stack>
      </RootSiblingParent>
    </SafeAreaProvider>
  )
}
