import React from "react";
import { View,Text,StyleSheet,FlatList,ScrollView,SafeAreaView,TouchableOpacity} from "react-native";
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import axios from "axios";


export default function Proceedtobuy({navigation}) {
  const token = useSelector(state=>state.data.token)
  const[buyadd,setBuyadd]=useState([])


  useEffect(()=>{
    proceedtoget()
  },[])
  
  const proceedtoget = async()=> {
    const buypod = await axios.get('https://nameless-savannah-21991.herokuapp.com/proceedToBuy',{
      headers:{'accept': '*/*',
       'Authorization':`Bearer ${token} `
       }, })
  
  
        .then(response => {
          console.log(response.data);
          if (response.status === 200) {
             
            console.log("Proceed to buy", response.data.Addresses)
            setBuyadd(response.data.Addresses)
            
           
            
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      
    }

    const renderItem = ({ item }) =>{

    
      console.log('item',item);
      const {_id,address,city,state,country,pincode}=item;
      function selectadd(){
        return(
        navigation.navigate('Placeorder',{seladd:{item}})
        )
      }
      
     return(
       
       <View style={styles.cardViewone}>
        
              
                  <View>
                        <Text style={styles.title}>{address}, {city}</Text>
                       
                        <Text style={styles.title}>{state}, {country}</Text>
                       
                        <Text style={styles.title}>pincode: {pincode}</Text>
                          <View style={{alignItems:'center'}}> 
                              <TouchableOpacity style={styles.Buttontwo} onPress={()=>selectadd()}>
                                  <Text style={styles.texLogin} >Select address</Text>
                              </TouchableOpacity>
                          </View>
                  </View>
          
       
       </View>
      
     ) 
     
     };
    return (
      <View style={styles.container}>
        <View >
            <SafeAreaView >
                      <ScrollView>
                        
                      <FlatList
                        data={buyadd}
                        renderItem={renderItem}
                        keyExtractor={(item) => String(item.id)}
                        
                      />
                    
                      </ScrollView> 
            </SafeAreaView>
            </View>
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
  Buttontwo:{
    borderRadius:50,
    backgroundColor:'red',
    border:'1',
    height:40,
    width:150,
    border:1,
  


},
texLogin:{
textAlign:'center',
fontSize:20,
fontWeight:'bold',
color:'white',
marginTop:5

},
})