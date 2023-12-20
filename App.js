import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
// import Barcode from './BarCode'
import React, {useState, useEffect} from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Env } from './dev/env'
import { fetcher, postData } from './util/fetcher'

export default function App() {

  const host = Env.ISBN_HOST
  const _token = Env.TOKEN
  const _serverHost=Env.SERVER_HOST

  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(null)
  const [text, setText] = useState('not scanned yet')
  const [bookData, setBookData] = useState({})

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
  const getISBN = async (isbn)=>{
    const url = host+'/book'+'/'+ isbn
    return await fetcher(url, _token)
  }

  const requestApiServer = async (payload) => {
    const url = _serverHost + '/book/create'
    // const mock = {
    //   "title":"noddd",
    //   "isbn":555,
    //   "language":"chinese"
    // }
    return await postData(url, _token, payload)

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

          <Button  title={'Search ISBN'} onPress={ async ()=>{
            const data = await getISBN(text)
            console.log(data)
            setBookData(data)
            console.log(bookData)
          }} color='tomato'/>

          <Button  title={'.'} onPress={()=>{}} color='white'/>

          <Button  title={'Append Record to DB'} onPress={()=>{
            console.log(bookData.book.authors)
            const payload = {
              title: bookData.book.title,
              isbn: bookData.book.isbn,
              language: bookData.book.language
            }
            payload.title = "abcdef"
            console.log("payload: ", payload)
            requestApiServer(payload)
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
