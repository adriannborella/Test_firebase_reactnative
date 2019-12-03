import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import FormularioCLiente from './app/components/FormularioCliente'
import * as firebase from 'firebase';

import firebaseConfig from './app/utils/firebase'

firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <View style={styles.container}>      
      <FormularioCLiente />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
