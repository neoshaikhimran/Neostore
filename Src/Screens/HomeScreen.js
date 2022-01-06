import Carousel from '../Components/Carousel'
import { dummyData } from '../Assets/Data'
import axios from 'axios'
import React, { useEffect, useState, } from 'react'
import { View, StyleSheet,Image,Text,SafeAreaView,ScrollView} from 'react-native'
import { FlatList, TextInput, TouchableOpacity} from 'react-native-gesture-handler'
import { useSelector} from 'react-redux'
import { Rating } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Search from '../Components/Search'
// import SplashScreen from 'react-native-splash-screen'








export default function HomeScreen ({navigation}) {
  const token = useSelector(state=>state.data.token)
  const [data, setData] = useState([])  
  const [search, setSearch] = useState([])
  const [filterData, setfilterData] = useState([])  
  const [masterData, setmasterData] = useState([])  
  const [filtesearch, setfiltesearch] = useState(false);

//   useEffect(() => {
//     SplashScreen.hide({ duration: 250 });
// }, []);

   
  useEffect(()=>{
    fetchdashboarddata()
  },[])
      
      const fetchdashboarddata = async()=> {
      const getdashboarddata = await axios.get('https://nameless-savannah-21991.herokuapp.com/getDashboard',{
        headers: { 'Authorization':`Bearer ${token} ` }, })
    
    
          .then(response => {
            console.log(response.data);
            if (response.status === 200) {
               setData(response.data.productOfEachCategory)
               console.log('$#',response.data.productOfEachCategory)
               
               
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        
      }

    const getsearchdetail= async(search) => {
        console.log('rrr',search)
        var config = {
            method: "post",
            url:`https://nameless-savannah-21991.herokuapp.com/find/${search}`,
            headers: {
                'Authorization':`Bearer ${token}`,
              'Content-Type': 'application/json',
              
            },
            
        }; 
        
        const getsearchresponse= await axios(config)
        .then(function (response) {
          if (response.status==200){
          
          console.log("searchresponce!!", response.data.searchResult)
          setfilterData(response.data.searchResult)
          setfiltesearch(true)
          
          }
        })
        .catch(function (error) {
          console.log("error", error)
        })
      }


      const renderItem = ({ item }) =>{

    
       console.log('item',item);
       const {id,name,image,price,rating}=item;
       
      return(
        <TouchableOpacity onPress={()=>navigation.navigate('Prodetails',{
          name:{id,name,image,price,rating}
        })}>
        <View style={styles.cardViewone}>
          
          <Image source={{uri:`https://nameless-savannah-21991.herokuapp.com/images/productImages/${image}`}} style={styles.Image}/>
          <View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.title}>{price}</Text>
        <Text style={styles.title}>{rating}</Text>
        <Rating readonly startingValue={rating} imageSize={25}/>

        </View>
      
        
        </View>
        </TouchableOpacity>
        
        )
      }
        
    return (
      <ScrollView>
        <View>
          <View style={styles.container}>
         
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.List}>
              <FontAwesome5 name={'bars'} color={'white'} size={22} />
              </TouchableOpacity>
              <Text style={styles.Titleone}>Home</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('Cart')} style={styles.cart}>
              <FontAwesome5 name={'shopping-cart'} color={'white'} size={20} />
              </TouchableOpacity>
            
          </View>
          <View style={styles.searchback}>
            <TextInput
            value={search}
            placeholder="Search "
            underlineColorAndroid="transparent"
            onChangeText={(text) => getsearchdetail(text)}
            style={styles.searchbar}/>
          </View>

                {filtesearch ==false ?
                 <View> 
                  <Carousel data = {dummyData}/>
                  
                  <Text style={styles.Textone}>Top Product for you</Text>
                  
                 
                  <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => String(item.id)}
                        onChangeText={() => {
                          setfiltesearch(false)
                          setfilterData(data)
                        }}
                        
                      />
                      </View>
                      :
                      <>
                      <SafeAreaView style={styles.contmain}>
                      <ScrollView>
                        
                      <FlatList
                        data={filterData}
                        renderItem={renderItem}
                        keyExtractor={(item) => String(item.id)}
                        
                      />
                    
                      </ScrollView> 
                       </SafeAreaView>
                      
                     
                  </>
                }
                 
                  
               

            

          
        
        </View>
        
        </ScrollView>
        
    )
}
const styles = StyleSheet.create({
  Textone:{
    marginLeft:10,
    fontSize:20,
    fontWeight:'bold',
    color:'red',

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
    alignItems:'center'

},
contmain:{
  alignItems:'center'
},
item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 25,
   marginHorizontal:29,
    marginVertical: 8,
    fontWeight:'bold' ,
    color:'black',
    flexDirection:'column'

  },

  Image:{
    
    height:200,
    width:150,
    borderRadius:10,
    resizeMode: 'contain'

  },
  Titleone:{
    fontSize:30,
    fontWeight:'bold',
    color:'white',
    textAlign: 'center',
    flex:1
    
  
 
},
container:{   
  backgroundColor:'#f4511e',
   alignItems: 'center',
  justifyContent:'center',
  flexDirection: 'row',
  height:60
},
List:{
  paddingLeft:10
},
cart:{
  paddingRight:10
},
searchbar:{
  backgroundColor:'white',
  borderWidth:4,
  borderRadius:29,
  borderColor:'red',
},
searchback:{
  backgroundColor:'red'
}


  
})












