
  import axios from 'axios'
  import React, { useEffect, useState, } from 'react'
  import { View, StyleSheet,Image,Text,SafeAreaView,ScrollView,TouchableOpacity,Modal,Pressable} from 'react-native'
  import { FlatList} from 'react-native-gesture-handler'
  import { useSelector } from 'react-redux'
  import { Rating } from 'react-native-elements';
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
  
  
  
  export default function All({navigation}) {
    
    
    
    const token = useSelector(state=>state.data.token)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleone, setModalVisibleone] = useState(false);
    const [modalVisibletwo, setModalVisibletwo] = useState(false);
    const [modalVisiblethree, setModalVisiblethree] = useState(false);
    const [data, setData] = useState([]);
    const [products, setproducts] = useState();
    const [filterenable, setfilterenable] = useState(false);
    const requiredcategory = ['mobiles','earphones','laptops'];
    const requiredColors  = ['silver','red','black','white','green'];
     
    useEffect(()=>{
      console.log(token)
      fetchcarddata()
    },[]) 
        
        const fetchcarddata = async()=> {
        const respnse = await axios.get('https://nameless-savannah-21991.herokuapp.com/getDashboard',{
          headers: { 'Authorization':`Bearer ${token} ` }, })
      
      
            .then(response => {
              console.log(response.data);
              if (response.status === 200) {
                 setData(response.data.productOfEachCategory)
                 setproducts(response.data.productOfEachCategory)
                 console.log('$#',response.data.productOfEachCategory)
                  
                
              }
            })
            .catch(function (error) {
              console.log(error);
            });
          
        }
  
        const renderItem = ({ item }) =>{
  
      
         console.log('item',item);
         const {id,name,image,price,rating}=item;
         
        return(
          <TouchableOpacity onPress={()=>navigation.navigate('Prodetails',{
            name:{id,name,image,price,rating}
          })}>
          <View style={{alignItems:'center'}}>
          <View style={styles.cardView}>
          
            <Image source={{uri:`https://nameless-savannah-21991.herokuapp.com/images/productImages/${image}`}} style={styles.Image}/>
            <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.title}>{price}</Text>
          <Text style={styles.title}>{rating}</Text>
          <Rating readonly startingValue={rating} imageSize={25}/>
  
              
          </View>
          
        
          
          </View>
          </View>
          </TouchableOpacity>

        ) 
        
        };


      
        const addingfilter = async(data) =>{
          return await fetch('https://nameless-savannah-21991.herokuapp.com/filterCommonProducts',
          {
              method : 'POST',
              headers : {
                  'accept' : '*/*',
                  'Content-Type': 'application/json',
                  'Authorization' : `Bearer ${token}`
              },
              body : data
          }
          )
          .then(res =>res.json())
          .then(data => {
              console.log(data);
              return data;
              
          })
      }
       
    
      return (
        <View>
          {
          filterenable ?
          <View style = {{
            borderColor : '#F00',
            borderWidth : 1,
            padding : 1,
            width : '98%',
            alignSelf : 'center',
            alignItems : 'center',
            justifyContent : 'center',
            borderRadius : 10,
          }}>
          <TouchableOpacity onPress ={() => {
            setfilterenable(false)
            setproducts(data)
          }} style = {{
            borderColor : '#000',
            borderWidth : 1,
            width : '99%',
            justifyContent : 'center',
            alignItems : 'center',
            height : 40,
            borderRadius : 10,
            flexDirection : 'row'
          }}>
            
            <Text style={styles.textStyle}><FontAwesome5
                        name="times"
                        color="red"
                        size={20}
                        
                    />  Remove Filter</Text>
            </TouchableOpacity>
            </View>
            :
            <></>
        }
          <View>
            <SafeAreaView >
              <ScrollView>
                
              <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => String(item.id)}
                
              />
              
            
              </ScrollView> 
            </SafeAreaView>
            </View>
            

            
               <View> 
                    <View style={styles.Overlay}>
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
                                                                        
                                                                        {(requiredcategory).map((prop,key) =>{
                                                                            return( 
                                                                          
                                                                          <TouchableOpacity
                                                                            key={key}
                                                                            onPress ={
                                                                              () => {
                                                                                var data = JSON.stringify({
                                                                                  "categories": [prop],
                                                                                  "colors": [],
                                                                                  "sort": {
                                                                                    "basedOn": "price",
                                                                                    "order": "desc"
                                                                                  }
                                                                                })
                                                                                var responce =  addingfilter(data);
                                                                                
                                                                              responce.then(data => {
                                                                              if (data.msg == 'success') {
                                                                                setModalVisible(!modalVisible)
                                                                                 setfilterenable(true)
                                                                              }
                                                                              setproducts(data.filteredcommonProducts);
                                                                                 console.log('hig',data)
                                                                              })
                                                                               }
                                                                            }>
                                                                            <Text  style={styles.modalText} >{prop}</Text>
                                                                           
                                                                            
                                                                           
                                                                          </TouchableOpacity>
                                                                            )
                                                                          })
                                                                        } 
                                                                        </View>
                                                                      </View>
                                                                    </Modal>
                                                                  <TouchableOpacity
                                                                    style={[styles.button, styles.buttonOpen]}
                                                                    onPress={() => setModalVisible(true)}
                                                                  >
                                                                    <Text style={styles.textStyle}><FontAwesome5
                                                                                    name="tags"
                                                                                    color="red"
                                                                                    size={20}
                                                                                    
                                                                                />Categories :</Text>
                                                                  </TouchableOpacity>
                                    </View>
                                     <View style={styles.centeredView}>
                                                                    <Modal
                                                                      animationType="slide"
                                                                      transparent={true}
                                                                      visible={modalVisibleone}
                                                                      onRequestClose={() => {
                                                                        Alert.alert("Modal has been closed.");
                                                                        setModalVisibleone(!modalVisibleone);
                                                                      }}
                                                                    >
                                                                      <View style={styles.centeredView}>
                                                                        <View style={styles.modalView}>
                                                                        {(requiredColors).map((prop,key) =>{
                                                                            return( 
                                                                          <TouchableOpacity
                                                                            key={key}
                                                                            onPress ={
                                                                              () => {
                                                                                var data = JSON.stringify({
                                                                                  "categories": [],
                                                                                  "colors": [prop],
                                                                                  "sort": {
                                                                                    "basedOn": "price",
                                                                                    "order": "desc"
                                                                                  }
                                                                                })
                                                                                var responce =  addingfilter(data);
                                                                                
                                                                              responce.then(data => {
                                                                              if (data.msg == 'success') {
                                                                                setModalVisibleone(!modalVisibleone)
                                                                                 setfilterenable(true)
                                                                              }
                                                                              setproducts(data.filteredcommonProducts);
                                                                                 console.log('hig',data)
                                                                              })
                                                                               }
                                                                            }
                                                                            
                                                                          >
                                                                            <Text style={styles.textStyle}>{prop}</Text>
                                                                          </TouchableOpacity>
                                                                          )
                                                                        })
                                                                      } 
                                                                        </View>
                                                                      </View>
                                                                    </Modal>
                                                                  <TouchableOpacity
                                                                    style={[styles.button, styles.buttonOpen]}
                                                                    onPress={() => setModalVisibleone(true)}
                                                                  >
                                                                    <Text style={styles.textStyle}> <FontAwesome5
                                                                                    name="palette"
                                                                                    color="red"
                                                                                    size={20}
                                                                                    
                                                                                />Color :</Text>
                                                                  </TouchableOpacity>
                                    </View>
                                    <View style={styles.centeredView}>
                                                                    <Modal
                                                                      animationType="slide"
                                                                      transparent={true}
                                                                      visible={modalVisibletwo}
                                                                      onRequestClose={() => {
                                                                        Alert.alert("Modal has been closed.");
                                                                        setModalVisibletwo(!modalVisibletwo);
                                                                      }}
                                                                    >
                                                                      <View style={styles.centeredView}>
                                                                        <View style={styles.modalView}>
                                                                          <Text style={styles.modalText}>Hello World!</Text>
                                                                          <TouchableOpacity   onPress ={
                                                                                () => {
                                                                                  var data = JSON.stringify({
                                                                                    "categories": ['mobiles','earphones','laptops'],
                                                                                    "colors": [],
                                                                                    "sort": {
                                                                                      "basedOn": "price",
                                                                                      "order": "desc"
                                                                                    }
                                                                                  })
                                                                                  var responce =  addingfilter(data);
                                                                                  responce.then(data => {
                                                                                    if (data.msg == 'success') {
                                                                                      setModalVisibletwo(!modalVisibletwo)
                                                                                      setfilterenable(true)
                                                                                    }
                                                                                    setproducts(data.filteredcommonProducts);
                                                                                  })
                                                                                }
                                                                              }>
                                                                                <Text>High to Low</Text>
                                                                              </TouchableOpacity>
                                                                              <TouchableOpacity   onPress ={
                                                                                () => {
                                                                                  var data = JSON.stringify({
                                                                                    "categories": ['mobiles','earphones','laptops'],
                                                                                    "colors": [],
                                                                                    "sort": {
                                                                                      "basedOn": "price",
                                                                                      "order": "asc"
                                                                                    }
                                                                                  })
                                                                                  var responce =  addingfilter(data);
                                                                                  responce.then(data => {
                                                                                    if (data.msg == 'success') {
                                                                                      setModalVisibletwo(!modalVisibletwo);
                                                                                      setfilterenable(true)
                                                                                    }
                                                                                    setproducts(data.filteredcommonProducts);
                                                                                  })
                                                                                }
                                                                              }>
                                                                                <Text>Low to High</Text>
                                                                              </TouchableOpacity>
                                                                        </View>
                                                                      </View>
                                                                    </Modal>
                                                                  <TouchableOpacity
                                                                    style={[styles.button, styles.buttonOpen]}
                                                                    onPress={() => setModalVisibletwo(true)}
                                                                  >
                                                                    <Text style={styles.textStyle}> <FontAwesome5
                                                                                    name="filter"
                                                                                    color="red"
                                                                                    size={20}
                                                                                    
                                                                                />Sort :</Text>
                                                                  </TouchableOpacity>
                                    </View> 

                                    <View style={styles.centeredView}>
                                                                    <Modal
                                                                      animationType="slide"
                                                                      transparent={true}
                                                                      visible={modalVisiblethree}
                                                                      onRequestClose={() => {
                                                                        Alert.alert("Modal has been closed.");
                                                                        setModalVisiblethree(!modalVisiblethree);
                                                                      }}
                                                                    >
                                                                      <View style={styles.centeredView}>
                                                                        <View style={styles.modalView}>
                                                                          <Text style={styles.modalText}>Hello World!</Text>
                                                                          <TouchableOpacity   onPress ={
                                                                                () => {
                                                                                  var data = JSON.stringify({
                                                                                    "categories": ['mobiles','earphones','laptops'],
                                                                                    "colors": [],
                                                                                    "sort": {
                                                                                      "basedOn": "rating",
                                                                                      "order": "desc"
                                                                                    }
                                                                                  })
                                                                                  var responce =  addingfilter(data);
                                                                                  responce.then(data => {
                                                                                    if (data.msg == 'success') {
                                                                                      setModalVisiblethree(!modalVisiblethree);
                                                                                      setfilterenable(true)
                                                                                    }
                                                                                    setproducts(data.filteredcommonProducts);
                                                                                  })
                                                                                }
                                                                              }>
                                                                                <Text>High to Low</Text>
                                                                              </TouchableOpacity>
                                                                              <TouchableOpacity   onPress ={
                                                                                () => {
                                                                                  var data = JSON.stringify({
                                                                                    "categories": ['mobiles','earphones','laptops'],
                                                                                    "colors": [],
                                                                                    "sort": {
                                                                                      "basedOn": "rating",
                                                                                      "order": "asc"
                                                                                    }
                                                                                  })
                                                                                  var responce =  addingfilter(data);
                                                                                  responce.then(data => {
                                                                                    if (data.msg == 'success') {
                                                                                      setModalVisiblethree(!modalVisiblethree);
                                                                                      setfilterenable(true)
                                                                                    }
                                                                                    setproducts(data.filteredcommonProducts);
                                                                                  })
                                                                                }
                                                                              }>
                                                                                <Text>Low to High</Text>
                                                                              </TouchableOpacity>
                                                                        </View>
                                                                      </View>
                                                                    </Modal>
                                                                  <TouchableOpacity
                                                                    style={[styles.button, styles.buttonOpen]}
                                                                    onPress={() => setModalVisiblethree(true)}
                                                                  >
                                                                    <Text style={styles.textStyle}> <FontAwesome5
                                                                                    name="star-half"
                                                                                    color="red"
                                                                                    size={20}
                                                                                    
                                                                                />Rating :</Text>
                                                                  </TouchableOpacity>
                                    </View> 
                      </View> 
                </View>
                
                
            
            </View> 
     
      
      );
    }
    
   
   
  
  const styles = StyleSheet.create({
      cardView: {
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
          flexDirection:'row'
      },
      item: {
          backgroundColor: '#f9c2ff',
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16,
        },
        title: {
          fontSize: 32,
          marginHorizontal:20,
          marginVertical: 4,
          fontWeight:'bold' ,
          color:'black',
          flexDirection:'column'
  
        },
        Star:{
          flexDirection:'row',
          marginHorizontal: 16,
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
         // bottom: 0, //Here is the trick
          flexDirection:'row'
          
        },
        Buttontwo:{
          marginLeft:10,
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
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
        borderRadius: 10,
        border:10,
        padding: 1,
        borderWidth:3,
       borderColor:'red',
        elevation: 2,
        width:100,  
        height:30
      },
      buttonOpen: {
        backgroundColor: "white",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "red",
        fontWeight: "bold",
        textAlign: "center",
        fontSize:15
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
  })
  
  