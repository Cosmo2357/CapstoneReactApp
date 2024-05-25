import Checkbox from 'expo-checkbox';
import { StatusBar } from 'expo-status-bar';
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useStore } from '../src/store';

import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { theme } from '../src/config';
//const db = SQLite.openDatabaseAsync('databaseName');
export default function Profile() {
  const {
    email,
    username,
    saveUserData,
    userInfo,
    isLoggedIn,
    user,
    setIntialState,
    removeUserData
  } = useStore()


  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')

  const [orderStatusesValue, setOrderStatusesValue] = useState(false)
  const [passwordChangeValue, setPasswordChangeValue] = useState(false)
  const [specialOffersValue, setSpecialOffersValue] = useState(false)
  const [newsLetterValue, setNewsLetterValue] = useState(false)

  const [isEdit, setIsEdit] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setFirstName(userInfo.firstName)
    setLastName(userInfo.lastName)
    setOrderStatusesValue(userInfo.orderStatuses)
    setPasswordChangeValue(userInfo.passwordChange)
    setSpecialOffersValue(userInfo.specialOffers)
    setNewsLetterValue(userInfo.newsLetter)

  }, [userInfo])

  const UserInfoSchema = z.object({
  })


  const newUserInfo = {
    firstName: firstName,
    lastName: lastName,
    orderStatuses: orderStatusesValue,
    passwordChange: passwordChangeValue,
    specialOffers: specialOffersValue,
    newsLetter: newsLetterValue
  }
  function saveData() {
    console.log('saveData', newUserInfo)
    try {
      UserInfoSchema.parse(newUserInfo)
      saveUserData(newUserInfo)

    } catch (err) {
      setError(err)
      //console.log('err', err)
      Alert.alert('Error', err.errors[0].message)
      return
    }

  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -190}
      style={styles.container}>
      <StatusBar style="auto" />

      <View>
        {/* <Text style={styles.headerTitle}>Personal information</Text> */}
        <View style={styles.header}>
          <Image
            style={{ width: 80, height: 80 }}
            source={require('../assets/images/userImg.png')}
          />
          <View>
            <Text>{username}</Text>
            <Text>{email}</Text>
          </View>
          <Pressable style={styles.saveBtn}
            onPress={() => {
              saveData()
            }}>
            <Text>SAVE</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={() => {
            removeUserData()
          }}>
            <Text>REMOVE</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.inputSetion}>
        <TextInput
          style={styles.textInput}
          placeholder="First name"
          value={firstName}
          onChangeText={(data) => {
            console.log('data', data)
            setFirstName(data)
          }} />
        <TextInput
          style={styles.textInput}
          placeholder="Last name"
          value={lastName}
          onChangeText={(data) => {
            console.log('data', data)
            setLastName(data)
          }}
        />
        {/* <TextInput
          style={styles.textInput}
          placeholder="Phone"
          value={phone}
          keyboardType='phone-pad'
          onChange={(data) => { setPhone(data) }}
        /> */}
      </View>

      <View style={styles.checkBoxSection}>
        <View style={styles.section}>
          <Checkbox style={styles.checkbox}
            value={orderStatusesValue}
            onValueChange={setOrderStatusesValue} />

          <Text style={styles.paragraph}>Order statuses {orderStatusesValue && "TRUE"}</Text>
        </View>
        {<View style={styles.section}>
          <Checkbox style={styles.checkbox}
            value={passwordChangeValue}
            onValueChange={setPasswordChangeValue} />
          <Text style={styles.paragraph}>Password Change</Text>
        </View>}
        <View style={styles.section}>
          <Checkbox style={styles.checkbox}
            value={specialOffersValue}
            onValueChange={setSpecialOffersValue} />
          <Text style={styles.paragraph}>Special offers</Text>
        </View>
        <View style={styles.section}>
          <Checkbox style={styles.checkbox}
            value={newsLetterValue}
            onValueChange={setNewsLetterValue} />
          <Text style={styles.paragraph}>Newslatter</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.logoutBtn} onPress={() => {
          useStore.setState({ isLoggedIn: false })
          router.dismissAll()
        }
        }>
          <Text>Log out</Text>
        </Pressable>

      </View>


    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  btn: {
    backgroundColor: '#D9D9D9',
    padding: 8,
    borderRadius: 10
  },
  logoutBtn: theme.primaryBtn,
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
  checkBoxSection: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: '#F2F2F2',
  },
  inputSetion: {
    width: '100%',
    height: 'auto',
    padding: 0,
    marginVertical: 16,
    gap: 16,
  },
  textInput: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#D9D9D9',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 16,
    borderColor: '#D9D9D9',
    borderWidth: 1
  },
  footer: {
    width: '100%',
    marginBottom: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveBtn: {
    backgroundColor: '#FFD817',

    padding: 8,
    borderRadius: 10
  },
  explanation: {
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    width: '100%',
    borderWidth: '2px',
    border: 'solid',
    borderColor: '#EF0E0E',
  },
});
