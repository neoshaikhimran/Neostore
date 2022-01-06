import React from "react";
import { View,Text, TextInput,StyleSheet,TouchableOpacity} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {rawdata} from '../Redux/Actions/Action';
import {useDispatch} from 'react-redux';


import axios from "axios";


 function Login({navigation}) {
  const [data, setData] = React.useState({
    secureTextEntry: true
});
//   const handlePasswordChange = (password) => {
//     setData({
//         ...data,  
//         password: password
//     }); 
// }

const updateSecureTextEntry = () => {

    setData({
        ...data,
        secureTextEntry: !data.secureTextEntry
    });
}
const [email, setEmail]=React.useState('');
const [password,setPassword]=React.useState();
const [userErr,setUserErr]=React.useState(false);
const [passErr,setPassErr]=React.useState(false);
const dispatch=useDispatch();


//login
// function loginHandle(e)
//     {
//         if(email.length<3 || password.length<3)
//         {
//             alert("type correct values")
//         }
//         else
//         {
//             alert("all good :)")
//         }

//         e.preventDefault()
//     }
    function userHandler(e){
        let item=e    ;
        if(item.length<3 )
        {
           setUserErr(true)
        }
        else
        {
            setUserErr(false)
        }
        setEmail(item)
    }
    function passwordHandler(e){
      setData({
        ...data,  
        password: e
    }); 
        let item=e;
        if(item.length<3 )
        {
           setPassErr(true)
        }
        else
        {
            setPassErr(false)
        }
        setPassword(item)

    }


 

const postLogin= async() => {
  var data = {'email':email,'password':password}
  let headers= {
    "accept": "*/*",
    "Content-Type": "application/json"
  }
  
  console.log(" form data", data)

  return await axios.post('https://nameless-savannah-21991.herokuapp.com/login',data
  ,{ "headers": {headers},})
  
  .then(function (response) {
    if (response.status==200){
    console.log("response", response.data)
    let cartId = response.data.cartId
    let token = response.data.token
    let userId = response.data.userId
    var data = {cartId, token, userId};
    console.log('data contains',data)
    dispatch(rawdata(data))  
    
    navigation.navigate('HomeScreen')
    }
  })
  .catch(function (error) {
    console.log("error", error)
  })
  
}





    return (
      <View style={styles.container1}>

          <View >
            <Text style={styles.NeoStore} >NeoStore</Text>
            <Text style={styles.Username}>UserName</Text>
            <TextInput placeholder="Username"  style={styles.Inputfields}  onChangeText={(e)=>userHandler(e)}/>
            <Text>{userErr?<Text style={styles.Errortext}>user not Valid</Text>:""}</Text>

            <Text style={styles.Username}  >Password</Text>
            <TextInput placeholder="Password"  style={styles.Inputfields} secureTextEntry={data.secureTextEntry ? true : false}
             //value={password} 
            onChangeText={(e)=>passwordHandler(e)}
             />
            <Text> {passErr?<Text style={styles.Errortext}>Password Not Valid</Text>:""}</Text>
            <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <FontAwesome5 
                        name="eye-slash"
                        color="grey"
                        size={20}
                        style={styles.eye}
                    />
                    :
                    <FontAwesome5 
                        name="eye"
                        color="grey"
                        size={20}
                        style={styles.eye}
                    />
                    }
                </TouchableOpacity>
                 


            <TouchableOpacity style={styles.ButtonFields} onPress={()=>postLogin()}>
              <Text style={styles.texLogin}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('ForgetPassword')}>
            <Text style={styles.forget}>Forget Password</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>navigation.navigate('Register')} >
            <Text style={styles.Account}>Don't Have an Account?Signup</Text>
            </TouchableOpacity>
          </View>
      </View>
      
    );
  }
  

  const styles = StyleSheet.create({
    container1:{
      marginTop:10,
      paddingLeft:10,
      paddingRight:10,
       justifyContent: 'center',
       backgroundColor:'white',
       flex:1,
       paddingBottom:200
      },
    NeoStore:{
        textAlign:'center',
        color:'red',
        fontWeight:"bold",
        fontSize:60 
    },
    Username:{
        fontSize:15,
        marginTop:10,
        fontWeight:'bold',
        color:'black',  
       

    },
    Inputfields:{
      borderBottomWidth:1,
      
    },
    ButtonFields:{
      marginTop:20,
      borderRadius:50,
      backgroundColor:'blue',
      height:50
      
    },
    texLogin:{
      textAlign:'center',
      fontSize:20,
      color:'white',
      marginTop:10
    },
    forget:{
      marginTop:10,
      fontSize:20,
      fontWeight:'bold',
      textAlign:'center',
      color:'black',
      

    },
    Account:{
      marginTop:10,
      fontSize:20,
      fontWeight:'bold',
      textAlign:'center',
      color:'black',

    },
    eye:{
      bottom:50,
      left:360,
      color:'black'
    },
    Errortext:{
      color:'red',
      fontSize:15,
      fontWeight:'bold'
    }


  })
  
  
  export default Login