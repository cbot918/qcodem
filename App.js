import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
// import Barcode from './BarCode'
import React, {useState, useEffect} from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Env } from './dev/env'
import { fetcher } from './src/util/fetcher'
import  BarCoder from './src/components/Barcoder'
// import  Test  from './src/components/Test'

export default function App() {

  // const host = Env.host
  // const _token = Env.token
  

  return (
    <View>
      <BarCoder />
      {/* <Test/> */}
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
