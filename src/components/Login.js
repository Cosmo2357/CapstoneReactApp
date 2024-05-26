import React, { useState } from 'react';
import { Platform, View, Text, TextInput, Pressable, StyleSheet, Image, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native';
import { theme } from '../config';
import { useStore } from '../store';
import { z } from 'zod';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const { login } = useStore();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  const RegisterSchema = z.object({
    firstName: z.string().min(3).max(20),
    email: z.string().email(),
  });

  async function handleRegister() {
    setLoading(true);
    try {
      RegisterSchema.parse({
        email: email,
        firstName: firstName
      });
      // 3 seconds delay
      setTimeout(() => {
        setLoading(false);
        login(firstName, email);
      }, 1500);

    } catch (err) {
      setLoading(false);
      Alert.alert('Error', err.errors[0].message);
      return;
    }

  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -190}
      style={styles.container}
    >
      <View style={styles.heroSection}>
        <Image source={require('../../assets/images/hero2.jpg')} style={styles.heroImage} />
        <View style={styles.overlay} />
        <View style={styles.heroContent}>
          <Text style={styles.title}>Little Lemon</Text>
          <Text style={styles.subtitle}>Little Lemon is a restaurant that serves the best food in town</Text>
          <View style={styles.mainSection}>
            <Text style={styles.label}>Firstname *</Text>
            <TextInput
              onChangeText={setFirstName}
              style={[styles.input, styles.marginBottom16]}
              placeholder="First Name"
              editable={!loading}
            />
            <Text style={styles.label}>Email *</Text>
            <TextInput
              keyboardType='email-address'
              onChangeText={setEmail}
              value={email}
              style={[styles.input, styles.marginBottom16]}
              placeholder="Email"
              editable={!loading}
            />
            <Pressable
              style={[styles.primaryButton]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? 
              <ActivityIndicator color='black' size="large" /> : 
              <Text style={styles.buttonText}>NEXT</Text>}
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.footerSection}></View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  primaryButton: {
    ...theme.primaryBtn,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  input: {
    ...theme.input,
    width: '100%',
  },
  marginBottom16: {
    marginBottom: 16,
  },
  heroSection: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heroImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // darken the image
  },
  heroContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    width: '100%',
    marginBottom: 160,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFD817',
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontFamily: 'MarkaziText',
    backgroundColor: '#495E57',
    width: '100%',
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 16,
    textAlign: 'left',
    marginBottom: 8,
    backgroundColor: '#495E57',
    width: '100%',
    paddingBottom: 16,
  },
  mainSection: {
    width: '100%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',

  },
  footerSection: {
    backgroundColor: '#495E57',
    width: '100%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 8,
    marginBottom: 4,
  },
});

