import React from "react";
import { View,Text,TouchableOpacity,StyleSheet ,TextInput} from "react-native";
import axios from "axios";

export default function PasswordRecovery({navigation}) {
    const [password,setPassword]=React.useState();
    const [otp,setOtp]=React.useState();

   const postPasswordrecovery =async()=>{
        var data = {'verificationCode': otp, 'password':password }
    let headers= {
        "accept": "*/*" ,
        "Content-Type": "application/json"
    }
    
    console.log(" form data", data)
  
    return await axios.post('https://nameless-savannah-21991.herokuapp.com/recoverPassword',data
    ,{ "headers": {headers},})
    
    .then(function (response) {
      if (response.status==200){
      console.log("response", response.data)
      navigation.navigate('Login')
      }
    })
    .catch(function (error) {
      console.log("error", error)
    })
  }
    
    return (
            <View style={styles.container1}>
      
                <View >
                  <Text style={styles.NeoStore} >NeoStore</Text>
                  <Text style={styles.Forget} >Recovery Password?</Text>
                  
                  <TextInput placeholder="Enter OTP" placeholderTextColor="#000" style={styles.Inputfields} value={otp}  onChangeText={(text) => setOtp(text)} />
                  
                  <TextInput placeholder="Password" placeholderTextColor="#000" style={styles.Inputfields} value={password} onChangeText={(text) => setPassword(text)}/>
                  
                  <TextInput placeholder="Confirm Password" placeholderTextColor="#000" style={styles.Inputfields} />

                  <TouchableOpacity style={styles.ButtonFields} onPress={()=>postPasswordrecovery()}>
                    <Text style={styles.texLogin}>Submit</Text>
                  </TouchableOpacity>
              
                  </View>
            </View>
          );
    }

        
        const styles = StyleSheet.create({
          container1:{
            marginTop:10,
            paddingLeft:10,
            paddingRight:10,
             justifyContent: 'center',
             backgroundColor:'white',
             alignItems: 'center',
             flex:1,
             paddingBottom:200
            },
          NeoStore:{
              textAlign:'center',
              color:'red',
              fontWeight:"bold",
              fontSize:60 ,
              
          },
          Forget:{
            textAlign:'center',
            fontWeight:"bold",
            fontSize:30 ,
            color:'black',
        },
          Username:{
              fontSize:15,
              marginTop:10,
              fontWeight:'bold',
              color:'black',
          },
          ButtonFields:{
            marginTop:20,
            borderRadius:50,
            backgroundColor:'blue',
            height:50
            
          },
          texLogin:{
            textAlign:'center',
            fontSize:20,
            color:'white',
            marginTop:10
          },
          
          Inputfields:{
            borderWidth:3,
              marginVertical:10,
              fontWeight:'bold',
              fontSize:23,
              width:350,
              alignItems: 'center',
        
          }
        })      