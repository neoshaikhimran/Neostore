import React from "react";
import { View,Text,StyleSheet,FlatList,ScrollView,SafeAreaView,TouchableOpacity,Image} from "react-native";
import { useState,useEffect ,useCallback} from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Order({route}) {
   const{id}=route.params;
   const token = useSelector(state=>state.data.token)
   const [historder, setHistorder] = useState([])
   console.log('Order detail',id);
   useEffect(()=>{
    orderhist()
  },[])

   const orderhist= useCallback( async() => {
    console.log('()(()(@@',id);
        

    var config = {
        method: "post",
        url:`https://nameless-savannah-21991.herokuapp.com/placeOrder/${id}`,
        headers: {
          'accept': '*/*',
          'Authorization':`Bearer ${token}`, 
        },
        
    }; 
    
    const getorderhist= await axios(config)
    .then(function (response) {
      if (response.status==200){
      console.log("MMM##place", response.data.products)
      setHistorder(response.data.products)
     
      }
    })
    .catch(function (error) {
      console.log("error", error)
    })
  }) 


  const renderItem = ({ item }) =>{

    
    console.log('item',item);
    const {product,seller,color}=item;
    
   return(
     
     <View style={styles.cardViewone}>
      
            
                <View>
                      <Text style={styles.title}>{product}</Text>
                      <Text style={styles.title}>{seller}</Text>
                      <Text style={styles.title}>{color}</Text>
                      
                     
              
                </View>
        
     
     </View>
    
   ) 
   
   };

    return (
      <View style={styles.container}>
      <SafeAreaView >
                                    
                                        
                                    <FlatList
                                        data={historder}
                                        renderItem={renderItem}
                                        keyExtractor={(item) => String(item.id)}
                                        
                                    />
                                    
                                    
                            </SafeAreaView>
                            </View>
                            
    );
  } 

  const styles = StyleSheet.create({

    container:{
      alignItems:'center'
  },
  cardViewone: {
    width: 375,
    height:  200,
    backgroundColor:'white',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    flexDirection:'row',
    justifyContent:'center'
    
},
title: {
  fontSize: 20,
 marginHorizontal:33,
  marginVertical: 10,
  fontWeight:'bold' ,
  color:'black',
  textAlign:'center'
  

},

  })