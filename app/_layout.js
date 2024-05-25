import { router, Stack } from 'expo-router'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button, Image, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useStore } from '../src/store';
import { RootSiblingParent } from 'react-native-root-siblings';

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
            headerBackTitle: 'Back',
          }}
        />
         <Stack.Screen
          name="cart"
          options={{
            presentation: 'modal',
            animation: 'default',
            title: 'Cart',
            headerBackTitle: 'Back',
          }}
        />
      </Stack>
      </RootSiblingParent>
    </SafeAreaProvider>
  )
}
