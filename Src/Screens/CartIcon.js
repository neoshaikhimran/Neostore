import React from "react";
import { TouchableOpacity,Text} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

 

export default function CartIcon({navigation}) {
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
      <FontAwesome5 name={'shopping-cart'} color={'white'} size={20} style={{paddingRight:10}}/>
      </TouchableOpacity>
    );
  }