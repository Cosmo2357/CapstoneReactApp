import React, { useState } from 'react'
import {    Platform, View, Text, TextInput, Pressable, StyleSheet, Image, KeyboardAvoidingView, Alert } from 'react-native'
import { theme } from '../config'
import { useStore } from '../store'
import {z } from 'zod'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const { login } = useStore()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const Register = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),

  })

  async function handleRegister() {
    console.log('register', username, email)
    try {
      Register.parse({
        email: email,
        username: username
      })
    } catch (err) {
      Alert.alert('Error', err.errors[0].message)
      return
    }

    console.log('register', username, email)
    login(username, email)
  }
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -190}
      style={styles.container}>
      <View style={styles.hero}>

        <Image source={require('../../assets/images/hero2.jpg')} style={{ width: '100%', height: 140}} />
        <Text style={[styles.title]}>Little Lemon</Text>
        <Text style={styles.headerSubText}>Little Lemon is a restaurant that serves the best food in town</Text>
      </View>

      <View style={styles.main}>
        <TextInput
          onChangeText={(e) => {
            setUsername(e)
          }}
          style={[styles.input, styles.mb16]} placeholder="Username" />
        <TextInput
          keyboardType='email-address'
          onChangeText={(e) => {
            setEmail(e)
          }}
          value={email}
          style={[styles.input, styles.mb16]} placeholder="email" />
        <Pressable style={[styles.primaryBtn]}
          onPress={() => {
            handleRegister()
            //login(username, email)
          }}
        >
          <Text>NEXT</Text>
        </Pressable>
        <Pressable style={[styles.secretBtn]}
          onPress={ async () => {
            try {
              const savedUsername = await AsyncStorage.getItem('username')
              const savedEmail = await AsyncStorage.getItem('email')
              console.log('savedUsername', savedUsername)
              console.log('savedEmail', savedEmail)
              Alert.alert('Secret', `Username: ${savedUsername} Email: ${savedEmail}`)
            } catch (e) {
              console.log('error: ', e);
              return
            }
          }}
        >
          <Text>You can click here to see registered username and email in case you forget. This is just for peer grading purpose. not in the wireframe</Text>
        </Pressable>
      </View>
      <View style={styles.footer}>
     
      </View>
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  primaryBtn: theme.primaryBtn,
  input: theme.input,
  mb16: {
    marginBottom: 16
  },
  m16: {
    margin: 16,
    marginHorizontal: 16
  },
  hero: {
    //marginBottom: 16,
    backgroundColor: '#495E57',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  main: {
    width: '100%',
    padding: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer : {
    backgroundColor: '#495E57',
    width: '100%',
    padding: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    width: '100%',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal : 16,
    paddingVertical: 8
  },
  secretBtn: {
    padding: 16,
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    width: '100%',
    margin: 16,
    borderWidth: '2px' ,
   border: 'solid',
   borderColor:  '#EF0E0E',
  },
  headerSubText : {
    color: '#fff',
    fontSize: 14,
    paddingHorizontal: 16,
    textAlign: 'flex-start',
    marginBottom: 8
  }

});
