import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useState, useEffect} from 'react'
import { Env } from '../../dev/env'
import { fetcher } from '../../src/util/fetcher'
export default function Barcoder(){

  const host = "https://api2.isbndb.com"
  const _token = "49980_e32a246e2978c4aa142c837c798aa880"

  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(null)
  const [text, setText] = useState('not scanned yet')

  const askForCameraPermission = () =>{
    (async()=>{
      const {status} = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status == 'granted')
    })()
  }

  // Request Camera Permission
  useEffect(()=>{
    askForCameraPermission()
  },[])

  // When Scan the Bar Code
  const handleBarCodeScanned = ({type, data}) =>{
    setScanned(true)
    setText(data)
    console.log('Type: ' + type + '\nData: '+ data)
  }

  // When Click 'Search ISBN'
  const searchISBN = async (isbn)=>{

    console.log(`token:${_token}`)
    console.log(`host:${host}`)
    const url = host+'/book'+'/'+ isbn
    console.log(`url:${url}`)
    const data = await fetcher(url, _token)
    
    console.log(data)
  }

  // Check Permissions and return the screens
  if (hasPermission === null){
    return (
      <View style={styles.container}>
        <View style={styles.barcodebox}></View>
      </View>
    )
  }

  if (hasPermission === false){
    return (
      <View style={styles.container}>
        <Text style={{margin: 10}}>No Access to camera</Text>
        <Burron title={'Allow Camera'} onPress={()=>{askForCameraPermission()}}></Burron>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned? undefined: handleBarCodeScanned}
          style={{height:400, width:400}}
        />
      </View>
      <Text style={styles.maintext}>{text}</Text>
      {
        scanned && 
        <View>

          <Button title={'Scan again?'} onPress={()=>{
            setScanned(false)
            setText('')
            }} color='tomato' />

          <Button  title={'.'} onPress={()=>{}} color='white'/>

          <Button  title={'Search ISBN'} onPress={()=>{
            searchISBN(text)
          }} color='tomato'/>

        </View>
      }
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
  barcodebox: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  }
});