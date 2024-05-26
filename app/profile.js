import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import Toast from 'react-native-root-toast';
import { router } from 'expo-router';
import { z } from 'zod';
import { theme } from '../src/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from '../src/store';

export default function Profile() {
  const {
    email,
    firstName,
    lastName,
    phone,
    saveUserData,
    orderStatuses,
    passwordChange,
    specialOffers,
    newsLetter,
    removeUserData
  } = useStore();

  const [inputEmail, setEmail] = useState('');
  const [inputFirstName, setFirstName] = useState('');
  const [inputLastName, setLastName] = useState('');
  const [inputPhone, setPhone] = useState('');

  const [inputOrderStatusesValue, setOrderStatusesValue] = useState(false);
  const [inputPasswordChangeValue, setPasswordChangeValue] = useState(false);
  const [inputSpecialOffersValue, setSpecialOffersValue] = useState(false);
  const [inputNewsLetterValue, setNewsLetterValue] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState('');

  function resetState() {
    setEmail(email);
    setFirstName(firstName);
    setLastName(lastName);
    setPhone(phone);
    setOrderStatusesValue(orderStatuses);
    setPasswordChangeValue(passwordChange);
    setSpecialOffersValue(specialOffers);
    setNewsLetterValue(newsLetter);
  }

  useEffect(() => {
    console.log('useEffect');
    resetState();
  }, [email, firstName, lastName, orderStatuses, passwordChange, specialOffers, newsLetter]);

  const UserInfoSchema = z.object({
    email: z.string().email(),
    firstName: z.string().min(3).max(20),
    // lastName: z.string().max(20),
    // phone should be a number
    // phone: z.string().max(20),
  });

  const newUserInfo = {
    email: inputEmail,
    firstName: inputFirstName,
    lastName: inputLastName,
    phone: inputPhone,
    orderStatuses: inputOrderStatusesValue,
    passwordChange: inputPasswordChangeValue,
    specialOffers: inputSpecialOffersValue,
    newsLetter: inputNewsLetterValue,
  };

  function saveData() {
    try {
      UserInfoSchema.parse(newUserInfo);
      saveUserData(newUserInfo);
      Toast.show('Successfully Saved', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    } catch (err) {
      setError(err);
      Alert.alert('Error', err.errors[0].message);
    }
  }

  async function handleLogout() {
    try {
      await AsyncStorage.multiRemove([
        'email',
        'firstName',
        'lastName',
        'phone',
        'orderStatuses',
        'passwordChange',
        'specialOffers',
        'newsLetter',
        'isLoggedIn',
      ]);
      useStore.setState({ 
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        orderStatuses: false,
        passwordChange: false,
        specialOffers: false,
        newsLetter: false,
        isLoggedIn: false,
      });
      router.dismissAll();
    } catch (e) {
      console.log('error: ', e);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -190}
      style={styles.container}
    >
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Image style={styles.profileImage} source={require('../assets/images/userImg.png')} />
        <Pressable style={styles.coloredBtn} onPress={() => { 
          Alert.alert('Change profile image', 'This feature is not available yet');
          
          }}>
          <Text style={styles.coloredBtnText}>Change</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={()=>{
          Alert.alert('Remove profile image', 'This feature is not available yet');
        }}>
          <Text style={styles.btnText}>REMOVE</Text>
        </Pressable>
      </View>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={inputEmail}
          onChangeText={setEmail}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
        <TextInput
          style={styles.textInput}
          placeholder="First name"
          value={inputFirstName}
          onChangeText={setFirstName}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last name"
          value={inputLastName}
          onChangeText={setLastName}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Phone"
          value={inputPhone}
          keyboardType="phone-pad"
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          onChangeText={(data) => {
            const reg = /^[0-9\b]+$/;
            if (data === '' || reg.test(data)) {
              setPhone(data);
            }
          }}
        />
        <View style={styles.section}>
          <Pressable onPress={() => setOrderStatusesValue(!inputOrderStatusesValue)} style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={inputOrderStatusesValue}
              color={'#495E57'}
              onValueChange={setOrderStatusesValue}
            />
            <Text style={styles.label}>Order statuses</Text>
          </Pressable>
        </View>
        <View style={styles.section}>
          <Pressable onPress={() => setPasswordChangeValue(!inputPasswordChangeValue)} style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              color={'#495E57'}
              value={inputPasswordChangeValue}
              onValueChange={setPasswordChangeValue}
            />
            <Text style={styles.label}>Password Change</Text>
          </Pressable>
        </View>
        <View style={styles.section}>
          <Pressable onPress={() => setSpecialOffersValue(!inputSpecialOffersValue)} style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              color={'#495E57'}
              value={inputSpecialOffersValue}
              onValueChange={setSpecialOffersValue}
            />
            <Text style={styles.label}>Special offers</Text>
          </Pressable>
        </View>
        <View style={styles.section}>
          <Pressable onPress={() => setNewsLetterValue(!inputNewsLetterValue)} style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              color={'#495E57'}
              value={inputNewsLetterValue}
              onValueChange={setNewsLetterValue}
            />
            <Text style={styles.label}>Newsletter</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.bold}>Log out</Text>
        </Pressable>
        <View style={styles.bottomBtnSection}>
          <Pressable style={styles.btn} onPress={resetState}>
            <Text style={styles.btnText}>Discard changes</Text>
          </Pressable>
          <Pressable style={styles.coloredBtn} onPress={saveData}>
            <Text style={styles.coloredBtnText}>Save changes</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
    width: '100%',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  profileImage: {
    width: 80,
    height: 80,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#495E57',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 8,
    minWidth: 120,
  },
  btnText: {
    fontWeight: 'bold',
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
  },
  inputSection: {
    width: '100%',
    marginVertical: 16,
    gap: 16,
  },
  textInput: {
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 16,
    borderColor: '#D1D2DA',
    borderWidth: 1,
  },
  footer: {
    width: '100%',
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coloredBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#495E57',
    height: 40,
    padding: 8,
    borderRadius: 8,
    minWidth: 120,
  },
  coloredBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomBtnSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
});
