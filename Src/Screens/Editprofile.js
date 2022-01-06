import React from "react";
import { View,Text,StyleSheet,Image,TextInput,TouchableOpacity} from "react-native";
import { useSelector } from "react-redux";



export default function Editprofile() {
    const info=useSelector((state)=>state.data)
    console.log('&&&',info)
    return (
      <View style={styles.container}>
         
       <Image style={styles.Image} source={{uri:'https://cdn2.iconfinder.com/data/icons/avatars-2-7/128/16-512.png'}}/>
       <View>
           
           <TextInput placeholder='Firstname' placeholderTextColor="#000"  style={styles.Inputfields}>{info.firstName}</TextInput>
       </View>

       <View>
          
           <TextInput placeholder='Lastname' placeholderTextColor="#000"  style={styles.Inputfields}>{info.secondName}</TextInput>
       </View>

       <View>
           
           <TextInput placeholder='Email' placeholderTextColor="#000"  style={styles.Inputfields}>{info.email}</TextInput>
       </View>

       <View>
           
           <TextInput placeholder='Phone no' placeholderTextColor="#000"  style={styles.Inputfields}>{info.mobile}</TextInput>
       </View>

       <View>
           <Text style={styles.Text}>Enter Date of Birth</Text>
           <TextInput placeholder='01-01-2021' placeholderTextColor="#000"  style={styles.Inputfields}></TextInput>
       </View>
       <TouchableOpacity style={styles.ButtonFields} >
                    <Text style={styles.texLogin}>Submit</Text>
                  </TouchableOpacity>
      </View>
    );
  }

  const styles = StyleSheet.create({
      container:{
       
        alignItems: 'center',
        backgroundColor: 'white',
        flex:1


      },
      Image:{
        
        height:150,
        width:150,
        borderRadius:50,
        borderWidth:2,
        marginTop:10 , 
        alignItems: 'center',
  
      },
      Inputfields:{
        borderWidth:3,
        marginVertical:10,
        fontWeight:'bold',
        fontSize:23,
        width:350,
        alignItems: 'center',
        
        
      },
      Text:{
          marginTop:10,
          fontSize:18,
          textAlign:'center',
          fontWeight:'bold',
          color:'black'
         
      },
      ButtonFields:{
        marginTop:20,
        borderRadius:50,
        backgroundColor:'blue',
        height:50,
        width:300
        
      },
      texLogin:{
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold',
        color:'white',
        marginTop:10
      },
      Title:{
          fontSize:30,
          fontWeight:'bold',
          backgroundColor:'red',
          width:400,
          textAlign:'center',
          borderWidth:1

      }

  })