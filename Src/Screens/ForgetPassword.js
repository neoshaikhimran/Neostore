import React from "react";
import { View,Text, TextInput,StyleSheet,TouchableOpacity} from "react-native";
import axios from "axios";


export default function ForgetPassword({navigation}) {
  const [email, setEmail]=React.useState('');

  const postEmail= async() => {
    var data = {'email':email}
    let headers= {
      "accept": "*/*",
      "Content-Type": "application/json"
    }
    
    console.log(" form data", data)
  
    return await axios.post('https://nameless-savannah-21991.herokuapp.com/forgotPassword',data
    ,{ "headers": {headers},})
    
    .then(function (response) {
      if (response.status==200){
      console.log("response", response.data)
      navigation.navigate('PasswordRecovery')
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
            <Text style={styles.Forget} >Forget Password?</Text>
            <Text style={styles.Username}>Email</Text>
            <TextInput placeholder="Test@gmail.com" placeholderTextColor="#000" style={styles.Inputfields} value={email} onChangeText={(text) => setEmail(text)}/>
            <TouchableOpacity style={styles.ButtonFields} onPress={()=>postEmail()}>
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
    Inputfields:{
      borderWidth:3,
        marginVertical:10,
        fontWeight:'bold',
        fontSize:23,
        width:350,
        alignItems: 'center',
        
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
  })