import React from 'react'
import {Text, View,TouchableOpacity,StyleSheet,TextInput,Image} from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Permissions from "expo-permissions"
import db from '../config'
export default class Transaction extends React.Component{
    constructor(){
        super()
        this.state={
        hascamerapermission:null,
        scanned:false,
        scannedbook:'',
        scannedstudent:'',
buttonState:'normal',
studentId:'',
bookId:''
        
        }
    }
    issuebook=()=>{
db.collection('transaction').doc(this.state.studentId).set({
    studentId:this.state.studentId,
    bookId:this.state.bookId,
    TransactionType:'issue'
})
    }
    returnbook=()=>{
db.collection('transaction').doc(this.state.studentId).set({
studentId:this.state.studentId,
bookId:this.state.bookId,
TransactionType:'return'
})

    }
    getCameraPermission=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hascamerapermission:status==="granted",
            buttonState:'click',
            scanned:false
        })
    }
    handleBarCodeScanned=async({type,data})=>{
        this.setState({
        scanned:true,
        scannedbook:data,
        scannedstudent:data,
        buttonState:'normal'

        })
    }
render(){    
         const hascamerapermission=this.state.hascamerapermission
        const scanned=this.state.scanned
        const buttonState=this.state.buttonState
        if(buttonState==='click'&&hascamerapermission){
return(
   <BarCodeScanner
   onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
   style={StyleSheet.absoulteFillObject}/> 
)


        }
        else if(buttonState==='normal'){
return(
    <View style={{marginTop:150,alignSelf:"center",alignItems:"center"}}>
     <Image source={require('../assets/booklogo.jpg')}
     style={{width:200,height:200,alignSelf:"center"}}/>   
    <Text>{hascamerapermission===true?this.state.scanneddata:"please grant camera permission"}</Text>
    <TextInput style={{width:200,height:30,borderWidth:3,alignSelf:"center",marginTop:30}}
    onChangeText={(text)=>{
this.setState({studentId:text})
    }}
    placeholder={'enter studentId'}
    />
       <TouchableOpacity
    style={{width:200,height:30,borderWidth:3,backgroundColor:"orange",margin:30}}
    onPress={()=>{
        this.getCameraPermission()
    }}>
        <Text>scan studentId</Text>
    </TouchableOpacity>
    <TextInput style={{width:200,height:30,borderWidth:3,alignSelf:"center",marginTop:30}}
    onChangeText={(text)=>{
        this.setState({bookId:text})
    }}
    placeholder={'enter BookId'}
    />
   <TouchableOpacity
    style={{width:200,height:30,borderWidth:3,backgroundColor:"orange",margin:30}}
    onPress={()=>{
        this.getCameraPermission()
    }}>
        <Text>scan bookId</Text>
    </TouchableOpacity>

    <TouchableOpacity
    style={{width:200,height:30,borderWidth:3,backgroundColor:"orange",margin:30}}
    onPress={()=>{
       this.issuebook()
    }}>
        <Text>issuebook</Text>
    </TouchableOpacity>
 <TouchableOpacity 
 style={{width:200,height:30,borderWidth:3,backgroundColor:"orange",margin:30}}
 onPress={()=>{
this.returnbook()

 }}
 >
<Text>Return book</Text>



 </TouchableOpacity>
    </View>
)
        }

    }  
