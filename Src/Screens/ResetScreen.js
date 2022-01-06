import React from "react";
import { View,Text,TouchableOpacity,StyleSheet ,TextInput} from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ResetScreen({navigation}) {
    const [password,setPassword]=React.useState();
    const [confpassword, setConfpassword]=React.useState();
    const token = useSelector(state=>state.data.token)

    const postPasswordreset =async()=>{
        var config = {
            method: "post",
            url: "https://nameless-savannah-21991.herokuapp.com/changePassword",
            headers: {
              "Content-Type": "application/json",
              'Authorization':`Bearer ${token} `
            },
            data:{'currentPassword':password,'newPassword':confpassword},
        };  
    const response= await axios(config)
    .then(function (response) {
      if (response.status==200){
        navigation.navigate('Login')
      console.log("response", response.data)

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
                  <Text style={styles.Forget} >Password Reset</Text>
                  
                  <TextInput placeholder="Current Password" placeholderTextColor="#000"   style={styles.Inputfields} value={password}  onChangeText={(text) => setPassword(text)} />
                  
                  <TextInput placeholder="New Password" placeholderTextColor="#000"  style={styles.Inputfields} value={confpassword} onChangeText={(text) => setConfpassword(text)}/>
                  
                  <TextInput placeholder="Confirm Password" placeholderTextColor="#000" style={styles.Inputfields} />

                  <TouchableOpacity style={styles.ButtonFields} onPress={()=>postPasswordreset()}>
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
        fontSize:18,
        
      }

  })    