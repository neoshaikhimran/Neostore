import React,{useState,useEffect} from "react";
import { View,Text,StyleSheet,SafeAreaView,FlatList,TouchableOpacity} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux"; 

export default function Shipadd({navigation}) {
    const token = useSelector(state=>state.data.token)
    const [data, setData] = useState([])  
  
    function Editscreen(){
      navigation.navigate('Editaddress')
    }

   
  useEffect(()=>{
    fetchcustadderss()
  },[])
      
      const fetchcustadderss = async()=> {
      const respnse = await axios.get('https://nameless-savannah-21991.herokuapp.com/getCustAddress',{
        headers: { 'Authorization':`Bearer ${token} ` }, })
    
    
          .then(response => {
            console.log(response.data);
            if (response.status === 200) {
               setData(response.data.Addresses)
               console.log('$#',response.data.Addresses)
                
              
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        
      }

      const renderItem = ({ item }) =>{

    
        console.log('item',item);
        const {address,city,state,pincode,country}=item;
        console.log('***',city)
        return(
            <View style={styles.cardView}>
              
                <View style={styles.Newview}> 
                        <Text style={styles.title}>{address} ,{city} ,{state}</Text>
                        <Text style={styles.title}>pin:{pincode}</Text>
                        <Text style={styles.title}>{country}</Text>
                        <View style={styles.Button}>
                    <TouchableOpacity style={styles.Buttontwo} onPress={()=>Editscreen()}>
                        <Text style={styles.texLogin} >Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Buttontwo}>
                        <Text style={styles.texLogin} >Remove</Text>
                    </TouchableOpacity>
                </View> 
                </View> 
                
            </View>
          ) 
          
          };

    return (
        <SafeAreaView >
        
       <FlatList
         data={data}
         renderItem={renderItem}
         keyExtractor={(item) => String(item.id)}
         
       />
        
     </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    cardView: {
        width: 375,
        height:  150,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        flexDirection:'row', 
        justifyContent: 'center' ,
        
    },
    title:{
        fontSize: 20,
        fontWeight:'bold',
        color:'black'
        
    },
    Newview:{
        alignItems: 'center', 
        marginTop:10
    },
    Button:{
        flexDirection:'row', 
        marginVertical:10,    
    },
    Buttontwo:{
            marginLeft:20,
            borderRadius:50,
            backgroundColor:'blue',
            border:'1',
            height:40,
            width:150,
            border:1

    },
    texLogin:{
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold',
        color:'white',
        marginTop:5
        
      },
      ButtonFields:{
        borderRadius:50,
        backgroundColor:'red',
        height:50,
        width:50,
        top:570,
        left:140,
        
      },

})