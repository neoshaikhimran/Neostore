import React from "react";
import { View,Text,StyleSheet,FlatList,ScrollView,SafeAreaView,TouchableOpacity,Image} from "react-native";
import { useSelector } from "react-redux";
import { useState,useEffect ,useCallback} from "react";
import axios from "axios";
import RazorpayCheckout from 'react-native-razorpay';


export default function Placeorder({route,navigation}) {
  const info=useSelector((state)=>state.data)
    const token = useSelector(state=>state.data.token)
    const cartid = useSelector(state=>state.data.cartId)
    const{seladd}=route.params;
    const[cart,setCart]=useState([])
    const [total, setTotal] = useState([])
    const [newdata, setNewdata] = useState([])
    // const [orderdata, setOrderdata] = useState([])

    const makepayment =()=>{
      var options = {
        description: 'Check payment',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: 'rzp_test_QvD5ucBSNIhdJc',
        amount: total*100/1,
        name: newdata.userName,
        prefill: {
          email: newdata.userEmail,
          contact: info.mobile,
          name: newdata.userName
        },
        theme: {color: '#53a20e'}
      }
      console.log('razorpay@@',options)
      RazorpayCheckout.open(options).then((data) => {
        // placeorder()
        // getcartdetail()
        navigation.navigate('Order',{id:`${newdata._id}`})
        
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      }).catch((error) => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });

      
    }

    
    useEffect(()=>{
        getcartdetail()
      },[])
    const getcartdetail= async() => {

        var config = {
            method: "post",
            url:`https://nameless-savannah-21991.herokuapp.com/proceedToCheckout/${cartid}`,
            headers: {
                'Authorization':`Bearer ${token}`,
              'Content-Type': 'application/json',
              
            },
            data:
            {
                'address': {
                  'address': seladd.item.address,
                  'pincode': seladd.item.pincode,
                  'city': seladd.item.city,
                  'state': seladd.item.state,
                  'country':seladd.item.country,
                }
              }
        }; 
        
        const getresponse= await axios(config)
        .then(function (response) {
          if (response.status==200){
          console.log("carddetailadd$$$", response.data.data)
          console.log("orderID@@", response.data.data._id)
          setCart(response.data.data.productDetails)
          setTotal(response.data.data.totalPrice)
          setNewdata(response.data.data)
          
         
          }
        })
        .catch(function (error) {
          console.log("error", error)
        })
      }

      
      const renderItem = ({ item }) =>{

    
        console.log('item',item);
        const {productName,productSeller,productColor,productImage,productPrice,orderQuantity}=item;
        
       return(
         
         <View style={styles.cardViewone}>
          
                <Image source={{uri:`https://nameless-savannah-21991.herokuapp.com/images/productImages/${productImage}`}} style={styles.Image}/>
                    <View>
                          <Text style={styles.title}>{productName}</Text>
                          <Text style={styles.title}>{productSeller}</Text>
                          <Text style={styles.title}>Color: {productColor}</Text>
                          <Text style={styles.title}>Rs: {productPrice}/-  Qty:{orderQuantity}</Text>
                         
                  {/* // <Rating readonly startingValue={rating} imageSize={25}/> */}
                    </View>
            
         
         </View>
        
       ) 
       
       };


    return (
        
            <View style={styles.container}>  
                <ScrollView>
                    <View >
                                
                                    <Text style={styles.title}>{seladd.item.address}, {seladd.item.city}</Text>
                                    <Text style={styles.title}>{seladd.item.state}</Text>
                                    <Text style={styles.title}>pincode:{seladd.item.pincode}</Text>
                                    <Text style={styles.title}>{seladd.item.country}</Text>
                                
                    </View>
                    
                            <SafeAreaView >
                                    
                                        
                                    <FlatList
                                        data={cart}
                                        renderItem={renderItem}
                                        keyExtractor={(item) => String(item.id)}
                                        
                                    />
                                    
                                    
                            </SafeAreaView>
                            
                    <View style={styles.Overlay}>
                            <TouchableOpacity style={styles.Buttontwo} onPress={()=>Editadd()}>
                                <Text style={styles.texLogin} >{total}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.Buttontwo} onPress={()=>makepayment()} >
                                <Text style={styles.texLogin} >Confirm Order</Text>
                            </TouchableOpacity>
                    </View> 
                    </ScrollView> 
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
  Image:{
    
    height:200,
    width:150,
    borderRadius:10,
    resizeMode: 'contain'

  },
  Overlay:{
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    //position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
    flexDirection:'row'
    
  },
 
  Buttontwo:{
    marginLeft:20,
    borderRadius:10,
    backgroundColor:'red',
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
})