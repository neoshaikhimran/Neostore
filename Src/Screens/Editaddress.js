import React from "react";
import { View,Text,StyleSheet,TouchableOpacity,TextInput} from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";


export default function Editadderss({route,navigation}) {
  const{addinfo}=route.params;
  console.log('DATA@@@',addinfo.item.address)
  const token = useSelector(state=>state.data.token)
 

  const postUpdateAddress= async() => {

    var config = {
        method: "post",
        url: "https://nameless-savannah-21991.herokuapp.com/updateAddress",
        headers: {
          "Content-Type": "application/json",
          'Authorization':`Bearer ${token} `
        },
        data:{
          'addressId': addinfo.item._id,
          'updatedAddress': {
            'address': addinfo.item.address,
            'pincode': addinfo.item.pincode,
            'city': addinfo.item.city,
            'state': addinfo.item.state,
            'country': addinfo.item.country
          }
        },
    };  
    
    const response= await axios(config)
    .then(function (response) {
      if (response.status==200){
      console.log("response", response.data)
      navigation.navigate('Shipping')
      }
    })
    .catch(function (error) {
      console.log("error", error)
    })
  }

   

    return (
        <View style={styles.container}>
          <Text style={styles.Title}>Edit Address</Text>
        
        <View>
        <Text style={styles.Text}>Address</Text>
        <TextInput placeholder="enter address"  style={styles.Inputfields}  >{addinfo.item.address}</TextInput>

        <Text style={styles.Text}>City</Text>
        <TextInput placeholder="enter city"  style={styles.Inputfields} >{addinfo.item.city}</TextInput>

        <Text style={styles.Text}>PIN Code</Text>
        <TextInput placeholder="enter pin"  style={styles.Inputfields}  >{addinfo.item.pincode}</TextInput>

        <Text style={styles.Text}>State</Text>
        <TextInput placeholder="enter state"  style={styles.Inputfields}  >{addinfo.item.state}</TextInput>

        <Text style={styles.Text}>Country</Text>
        <TextInput placeholder="enter country"  style={styles.Inputfields}  >{addinfo.item.country}</TextInput>
        </View>
        <View>
        <TouchableOpacity style={styles.ButtonFields} onPress={()=>postUpdateAddress()}>
                    <Text style={styles.texLogin}>Submit</Text>
                  </TouchableOpacity>
                  </View>
        </View>
    );
  }

  const styles = StyleSheet.create({
    container:{
       
        alignItems: 'center',
        backgroundColor: 'white',
        flex:1
      },
      Title:{
        fontSize:30,
        fontWeight:'bold',
        backgroundColor:'#f4511e',
        width:400,
        textAlign:'center',
        color:'white'

    },
    ButtonFields:{
        borderRadius:50,
        backgroundColor:'blue',
        height:50,
        width:300,
        marginTop:20
        
        
      },
      texLogin:{
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold',
        color:'white',
        marginTop:10
      },
      Inputfields:{
        borderWidth:2,
        width:350,
        height:50,
        fontSize:20,
        color:'black'
        
      },
      Text:{
          marginTop:20,
          textAlign:'left',
          fontWeight:'bold',
          fontSize:20,
          color:'black'

      }
  })