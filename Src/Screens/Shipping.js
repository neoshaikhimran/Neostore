import React,{useState,useEffect} from "react";
import { View,Text,StyleSheet,SafeAreaView,FlatList,TouchableOpacity} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux"; 
//import Editadderss from "./Editaddress";

export default function Shipping({navigation}) {
  const token = useSelector(state=>state.data.token)
    const [data, setData] = useState([])  
  
    
      

   
  useEffect(()=>{
    fetchcustadderss()
  },[])
      
      const fetchcustadderss = async()=> {
      const getcustadd = await axios.get('https://nameless-savannah-21991.herokuapp.com/getCustAddress',{
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
        const {_id,address,city,state,pincode,country}=item;
        function Editadd(){
          return(
          navigation.navigate('Editaddress',{addinfo:{item}})
          )
        }
        console.log('***',city)
        return(
            <View style={styles.cardView}>
              
                <View style={styles.Newview}> 
                        <Text style={styles.title}>{address} ,{city} ,{state}</Text>
                        <Text style={styles.title}>pin:{pincode}</Text>
                        <Text style={styles.title}>{country}</Text>
                        <View style={styles.Button}>
                    <TouchableOpacity style={styles.Buttontwo} onPress={()=>Editadd()}>
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
        <View style={styles.container}>
          
          <View>          
                    <SafeAreaView >
                  
                  <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => String(item.id)}
                    
                  />
                  
                </SafeAreaView>
          </View>
          <View style={styles.Overlay}>
              <TouchableOpacity style={styles.ButtonFields} onPress={()=>navigation.navigate('Address')}>
                            <Text style={styles.texLoginbutton}>+</Text>
              </TouchableOpacity>
          </View>      
        </View>
    );
  }

  const styles = StyleSheet.create({
    container:{
       
        alignItems: 'center', 
       
        flex:1
      },
      Title:{
        fontSize:30,
        fontWeight:'bold',
        backgroundColor:'red',
        width:400,
        textAlign:'center',
        borderWidth:1,
        color:'white'

    },
    ButtonFields:{
        borderRadius:50,
        backgroundColor:'red',
        height:70,
        width:70,
        top:570,
        left:140,
      },

      Overlay:{
        position:'absolute',
        left:170,
      },

      texLoginbutton:{
        textAlign:'center',
        fontSize:30,
        fontWeight:'bold',
        color:'white',
        marginTop:6,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.9,
        shadowRadius: 5,
        elevation: 5,
      },
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
        height:60,
        width:60,
        top:570,
        left:140,
        
      },
  })