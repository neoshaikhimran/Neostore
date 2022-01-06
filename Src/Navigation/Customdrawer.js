import { DrawerContentScrollView,DrawerItemList } from "@react-navigation/drawer";
import React, { useState } from "react";
import { Text, View,StyleSheet,Image, TouchableOpacity} from "react-native";
import { useSelector,useDispatch } from "react-redux";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios'
import { useEffect } from "react";
import { consumer } from "../Redux/Actions/Action";

//import { color } from "react-native-reanimated";


export default function Customdrawer(props){
   
    const {isLogged} = useSelector(state=>state.data)
    const token=useSelector((state)=>state.data.token)
   const [data, setData] = useState([])  
   const dispatch=useDispatch();
    useEffect(()=>{
        //console.log(token)
        CallDetail()
      },[props])
      
      const CallDetail = async()=> {
      const respnse = await axios.get('https://nameless-savannah-21991.herokuapp.com/profile',{
             headers: { 'Authorization':`Bearer ${token} ` },})
    
    
          .then(response => {
            
            if (response.status === 200) {
                console.log(response.data);
                setData(response.data.userData)
                let firstName=response.data.userData.firstName
                let secondName=response.data.userData.secondName
                let mobile=response.data.userData.mobile
                let email=response.data.userData.email
                var info={firstName,secondName,mobile,email}
                console.log('@@@###',info)
                dispatch(consumer(info))
                
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        
      }
    /*  useEffect(()=>{
        async function CallDetail(){
            try{
                const response = await axios.get('https://nameless-savannah-21991.herokuapp.com/profile',{
             headers: { 'Authorization':`Bearer ${token} ` },})
                console.log(response.data)
                setData(response.data)
            }
            catch (error){
                console.log(error);

            }
        }
        CallDetail()
    })*/

    /*const getdata=async() =>{

        let headers= {
            "Authorization": `Bearer $(token)`
        }
        return await  axios.get('https://nameless-savannah-21991.herokuapp.com/profile',{"headers": headers,})
        .then((response)=>{

            console.log(response);

        });

    }

    useEffect(()=>{getdata()},[])*/

    return(
            
        <DrawerContentScrollView {...props}>
        {
                isLogged ==true?
        <View>
                <View>
                     
                       <Image style={styles.Image} source={{uri:'https://cdn2.iconfinder.com/data/icons/avatars-2-7/128/16-512.png'}}/>
                    
                   <Text style={styles.Text}>{data.firstName}  {data.secondName}</Text>
                   
                   <DrawerItemList{...props}/>
                   <View>
                   
                       <TouchableOpacity>
                       <Text style={styles.Signout}> <FontAwesome5 name={'sign-out-alt'} size={20}/>Sign Out</Text>
                       </TouchableOpacity>
                   </View>
                   
                </View>
                
        </View>:null}
        {isLogged ==true ?null:
        <View>
        <Text style={styles.NeoStore}>NeoStore</Text>
        <DrawerItemList{...props}/>
        </View>}
        
        </DrawerContentScrollView>
        
    
    )
}



const styles = StyleSheet.create({
    
    NeoStore:{
        textAlign:'center',
        color:'red',
        fontWeight:"bold",
        fontSize:60 
    },
    Title:{
        fontSize:20,
        fontWeight:"bold",
        
    },
    Signout:{
        paddingLeft:10,
        marginTop:170,
        fontSize:20
    },
    Text:{
        fontSize:20,
        textAlign:'center',
        color:'black',
        fontWeight:'bold',
        marginBottom:10,
    },
    Image:{
        alignSelf:"center",
        height:120,
        width:120,
        borderRadius:50,
        marginBottom:10,
        marginTop:10

    }
})



