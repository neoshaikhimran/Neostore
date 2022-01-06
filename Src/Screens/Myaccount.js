import React from "react";
import { View,Text,StyleSheet,Image} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from "react-redux";


 function Myaccount({navigation}) {
  const info=useSelector((state)=>state.data)
  
  
    return (
      <View >
        <View style={styles.container}>
              <Image style={styles.Image} source={{uri:'https://cdn2.iconfinder.com/data/icons/avatars-2-7/128/16-512.png'}}/>
              <View>
                    <Text style={styles.Texttwo}>{info.firstName}  {info.secondName} </Text>
                    <Text style={styles.Texttwo}>{info.email}</Text>
               </View>
        </View>            
              
      <View style={styles.cardView} >
        <TouchableOpacity onPress={()=>navigation.navigate('Order')}>
            <Text style={styles.Text} ><FontAwesome5 name={'list-alt'} size={20} />  Order History</Text>
            <FontAwesome5 name={'arrow-right'} size={20} style={styles.allign}/>
        </TouchableOpacity>
      </View>

      <View style={styles.cardView} >
        <TouchableOpacity>
            <Text style={styles.Text} ><FontAwesome5 name={'shopping-cart'} size={20} />  Cart</Text>
            <FontAwesome5 name={'arrow-right'} size={20} style={styles.allign}/>
        </TouchableOpacity>
      </View>

      <View style={styles.cardView} >
        <TouchableOpacity onPress={()=>navigation.navigate('Shipping')}>
            <Text style={styles.Text} ><FontAwesome5 name={'map-marker-alt'} size={20} />  Shipping Address</Text>
            <FontAwesome5 name={'arrow-right'} size={20} style={styles.allign}/>
        </TouchableOpacity>
      </View>

      <View style={styles.cardView} >
        <TouchableOpacity onPress={()=>navigation.navigate('Editprofile')}>
            <Text style={styles.Text} ><FontAwesome5 name={'pencil-alt'} size={20} />  Edit Profile</Text>
            <FontAwesome5 name={'arrow-right'} size={20} style={styles.allign}/>
        </TouchableOpacity>
      </View>

      <View style={styles.cardView} >
        <TouchableOpacity onPress={()=>navigation.navigate('ResetScreen')}>
            <Text style={styles.Text} ><FontAwesome5 name={'lock'} size={20} />  Reset Password</Text>
            <FontAwesome5 name={'arrow-right'} size={20} style={styles.allign}/>
        </TouchableOpacity>
      </View>

        
      </View>
    );
    
  }



  const styles = StyleSheet.create({
    cardView: {
        width: 375,
        height:  60,
        backgroundColor: 'white',
        margin: 10,
        marginTop:10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
        justifyContent: 'center' 
        
    },
    Image:{
      marginLeft:10,
      marginTop:10,
      height:150,
      width:150,
      borderRadius:50

    },
    allign:{
      left:350,
      bottom:10,
      color:'black'
    },
    Text:{
      marginLeft:10,
      top:10,
      fontSize:18,
      fontWeight:'bold',
      color:'black',
      
    },
    Texttwo:{
      marginLeft:30,
      marginTop:10,
      top:10,
      fontSize:25,
      fontWeight:'bold',
      color:'black',
      flexDirection:'column',
      alignItems: 'center',

    },
    container:{
      flexDirection:'row',
    }
  })

  export default Myaccount