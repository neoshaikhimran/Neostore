import React, { useCallback } from "react";
import { View,Text,StyleSheet,FlatList,SafeAreaView,ScrollView,Image,TouchableOpacity} from "react-native";
import { useState,useEffect } from "react";
import { useSelector  } from "react-redux";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


import axios from "axios";

export default function Cart({navigation}) {
  const token = useSelector(state=>state.data.token)
  const [data, setData] = useState([])  
  const [total, setTotal] = useState([])
  const[num,setNum]=useState([])
  
 // const[totalvalue,setTotalvalue]=useState([])

  
    const incNum= async() =>{
      setNum(num+1)
    // setTotalvalue(total+productPrice)
    //   var config = {
    //     method: "post",  
    //     url: 'https://nameless-savannah-21991.herokuapp.com/updateCart',
    //     headers: {
    //       'accept': '*/*',
    //       'Authorization':`Bearer ${token} `,
    //       'Content-Type': 'application/json'
    //     },
    //     data:{
    //       'cart': {
    //         'productIds': [
    //           data.productIds
    //         ],
    //         '_id': data._id,
    //         'productDetails': [
    //           {
    //             '_id': data._id,
    //             'productId': data.productId,
    //             'productName': data.productName,
    //             'productSeller': data.productSeller,
    //             'productColor': data.productColor,
    //             'productImage': data.productImage,
    //             'productStock': data.productStock,
    //             'orderQuantity': num,
    //             'productPrice': data.productPrice,
    //             'total': data.total,
    //           }
    //         ]
    //       }
    //     }
    // };  
    
    // const incNumber= await axios(config)
    // .then(function (response) {
    //   if (response.status==200){
    //   console.log("responseadding", response.data)
      
      
      
    //   }
    // })
    // .catch(function (error) {
    //   console.log("error", error)
    // })
    

    
  }
  const decNum = ()=>{
    if(num>0){
      setNum(num-1)
    }else{
      setNum(0)
    }
    
  }
 


  useEffect(()=>{
    getcarddata()
  },[])

  const getcarddata = async()=> {
    const getcart = await axios.get('https://nameless-savannah-21991.herokuapp.com/getCart',{
      headers:{'accept': '*/*',
       'Authorization':`Bearer ${token} `
       }, })
  
  
        .then(response => {
          console.log(response.data);
          if (response.status === 200) {
             
             console.log('cartData#',response.data)
             setData(response.data.cart.productDetails)
             setTotal(response.data.cart.totalPrice)
             setNum(response.data.cart.productDetails[0].orderQuantity)
             console.log('quntno',response.data.cart.productDetails[0].orderQuantity)
             
             console.log()
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      
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
                          <Text style={styles.title}>Rs: {productPrice}/-</Text>
                          <View style={styles.mainflex}>
                            <TouchableOpacity style={styles.titlebutton} onPress={()=>incNum()} >
                            <FontAwesome5 name={'plus-circle'} color={'red'} size={20} />
                            </TouchableOpacity>
                            <Text style={{fontSize:20}}>{orderQuantity}</Text>
                            <TouchableOpacity style={styles.titlebutton} onPress={decNum}>
                            <FontAwesome5 name={'minus-circle'} color={'red'} size={20} />
                            </TouchableOpacity>
                          </View>

                  {/* // <Rating readonly startingValue={rating} imageSize={25}/> */}
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
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => String(item.id)}
                        
                      />
                      </ScrollView>
                    
                      
            </SafeAreaView>
            </View>
            <View style={styles.Overlay}>
                    <TouchableOpacity style={styles.Buttontwo} onPress={()=>Editadd()}>
                        <Text style={styles.texLogin} >{total}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Buttontwo}onPress={()=>navigation.navigate('Proceedtobuy')} >
                        <Text style={styles.texLogin} >proceed to buy</Text>
                    </TouchableOpacity>
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
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
    flexDirection:'row'
    
  },
  Main:{
    flexDirection:'row'
  },
  Buttontwo:{
    marginLeft:20,
    borderRadius:50,
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
title: {
  fontSize: 20,
 marginHorizontal:33,
  marginVertical: 7,
  fontWeight:'bold' ,
  color:'black',
  flexDirection:'column'

},
titlebutton:{
  marginHorizontal:25,
  marginVertical: 6,
  
},
mainflex:{
flexDirection:'row',


}
})