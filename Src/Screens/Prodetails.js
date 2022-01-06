import React,{useState,useEffect} from "react";
import { View,Text,StyleSheet,Image,ScrollView,TouchableOpacity,Dimensions,Modal} from "react-native";
import { Rating } from 'react-native-elements';
import axios from 'axios';
import { useSelector } from "react-redux"; 
import SwiperFlatList from 'react-native-swiper-flatlist';
import InputSpinner from "react-native-input-spinner";
import ColorPalette from 'react-native-color-palette'
//import Ratingstar from "../Components/Ratingstar";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Share from 'react-native-share';
import Cart from "./Cart";




export default function Prodetails({route,navigation}) {
    const{name}=route.params;
    const token = useSelector(state=>state.data.token)
    const [data, setData] = useState([])
    const [image,setImage]=useState([])
    const [color,setColor]=useState([])
    const [modalVisible, setModalVisible] = useState(false);
    //const [newcall,setNewcall]=useState([])


   
    
      
    
    const myCustomShare = async() => {
      const shareOptions = {
        message: 'Share',
        
      }
  
      try {
        const ShareResponse = await Share.open(shareOptions);
       
      } catch(error) {
        
      }
    };

    
   
    useEffect(()=>{
      fetchproductdetails()
    },[])
        
        const fetchproductdetails = async()=> {
          console.log('****%%%',name.id)
        const getproduct = await axios.get(`https://nameless-savannah-21991.herokuapp.com/getProductDetails/${name.id}&black`,{
          headers: { 'Authorization':`Bearer ${token} ` },
        data:{
          'id':name.id
        } })
          
      
            .then(response => {
              console.log(response.data);
              if (response.status === 200) {
                 setData(response.data)
                 console.log('$$$$Prod',response.data.images)
                 setImage(response.data.images)
                // setDesp('',response.data.description) 
                
              }
            })
            .catch(function (error) {
              console.log(error);
            });
          
        } 

        
      //add to cart
      const  addingcart= async() =>{
        
          var config = {
            method: "post",  
            url: `https://nameless-savannah-21991.herokuapp.com/addToCart/${name.id}&${color}`,
            headers: {
              'accept': '*/*',
              'Authorization':`Bearer ${token} `
            },
            data:{
              'id':name.id,
              'color':color,
            },
        };  
        
        const addproduct= await axios(config)
        .then(function (response) {
          if (response.status==200){
          console.log("responseadding", response.data)
          
          
          
          }
        })
        .catch(function (error) {
          console.log("error", error)
        })
        }
        //buynow
        const  buynowcart= async() =>{
        
          var config = {
            method: "post",  
            url: `https://nameless-savannah-21991.herokuapp.com/addToCart/${name.id}&${color}`,
            headers: {
              'accept': '*/*',
              'Authorization':`Bearer ${token} `
            },
            data:{
              'id':name.id,
              'color':color,
            },
        };  
        
        const buyproduct= await axios(config)
        .then(function (response) {
          if (response.status==200){
          console.log("buyprod", response.data)
          navigation.navigate('Cart')
          
          
          
          }
        })
        .catch(function (error) {
          console.log("error", error)
        })
        }

        

    return (
        <ScrollView>
      <View style={styles.container}>
              <View style={styles.containerdemon}>
                        <SwiperFlatList
                          autoplay
                          autoplayDelay={2}
                          autoplayLoop
                          index={0}
                          showPagination
                          data={image}
                          renderItem={({ item }) => (
                            <View style={styles.child}>
                              <Image source={{uri:`https://nameless-savannah-21991.herokuapp.com/images/productImages/${item}`}} style={styles.Image}/>
                              
                            </View>

                            
                          )}
                        />
                        <View style={styles.Overlay}  >
                            <TouchableOpacity style={styles.share} onPress={myCustomShare} >
                            <FontAwesome5 name={'share-alt'} color={'white'} size={30} style={styles.texLog} />
                            </TouchableOpacity>
                        </View>
                        
                </View>
                
            
                    
                       
            <Text style={styles.titletext}>{name.name}</Text>
            
            <Text style={styles.titletext}>price: {name.price}</Text>
            <Text style={styles.titletext}>rating: {name.rating}</Text>
            
            <Rating readonly startingValue={name.rating} imageSize={25}/>
            
            
            <View style={styles.Button}>
                    <View>
                    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Image source={{uri:`https://nameless-savannah-21991.herokuapp.com/images/productImages/${name.image}`}} style={styles.Image}/>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.Buttontwo}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.texLogin}>Rating</Text>
      </TouchableOpacity>
    </View>
                    </View>
                    <View>
                    <TouchableOpacity style={styles.Buttontwo} onPress={()=>buynowcart()}>
                        <Text style={styles.texLogin} >Buy Now</Text>
                    </TouchableOpacity>
                    </View>
            </View> 
                
                  
                
                <InputSpinner
							value={1}
							
							height={38}
              width={40}
							max={10}
              color={"red"}
              editable={false}
              buttonTextColor={'white'}
              buttonFontSize={32}
              buttonStyle={{buttonTextColor:'white',fontWeight:'bold'}}
              inputStyle={{fontSize:18,fontWeight:'bold'}}
							
						/> 

                   
                
            <Text style={styles.titletext}><Text>Description</Text>:{data.description}</Text>
            <Text style={styles.titletext}><Text>Features</Text>: {data.features}</Text>
            <Text style={styles.titletext}> <ColorPalette
              onChange={color => setColor(`${color}`)}
              title={"Color :"}colors={data.colors}
            />   
                {color}
            </Text>
            <View style={styles.Overlay}>
                <TouchableOpacity style={styles.ButtonFields} onPress={()=>addingcart()} >
                <FontAwesome5 name={'shopping-cart'} color={'white'} size={20} style={styles.texLoginbutton}/>
                        </TouchableOpacity>
            </View>


            
        </View>
      
      </ScrollView>
    );
  }
  const { width,height } = Dimensions.get('window');
  const styles = StyleSheet.create({
    containerdemon: { flex: 1,backgroundColor:'cyan'},
  child: { width,height:500, justifyContent: 'center',alignItems: 'center', },
  text: { fontSize:25, textAlign: 'center' },
    container:{
       
        alignItems: 'center',
        backgroundColor:'white',
        flex:1
        
      },
      cardView: {
        width: 350,
        height:450,
        backgroundColor: 'cyan',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
        alignItems: 'center',
        justifyContent:'center'
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
    
      titletext: {
        fontSize: 25,
        marginHorizontal:20,
        marginVertical: 4,
        fontWeight:'bold' ,
        color:'black',
        flexDirection:'column'
    
      },
      Button:{
        flexDirection:'row', 
        marginVertical:10,    
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
      Image:{
        height:350,
        width:300,
        justifyContent:'center',
        alignItems: 'center',
        resizeMode: 'contain'
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
        justifyContent:'center',
        fontSize:30,
        fontWeight:'bold',
        color:'white',
        marginTop:20,  
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
       
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      share:{
        backgroundColor:'red',
        borderRadius:50,
        marginLeft:180,
        marginTop:10,
        height:50,
        width:50
        
        
      },
      texLog:{
        justifyContent:'center',
        marginLeft:10,
        marginTop:10,
      }
      
    
  
})