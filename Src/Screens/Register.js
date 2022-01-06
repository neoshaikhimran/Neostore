import React from "react";
import { View,Text, TextInput,StyleSheet,TouchableOpacity} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { RadioButton,Checkbox } from 'react-native-paper';
import axios from "axios";




 function Register({navigation}) {
 /* const [data, setData] = React.useState({
    secureTextEntry: true
});
  const handlePasswordChange = (val) => {
    setData({
        ...data,
        password: val
    });
}

const updateSecureTextEntry = () => {

    setData({
        ...data,
        secureTextEntry: !data.secureTextEntry
    });
}*/
  const [checked, setChecked] = React.useState();
  const [clicked, setClicked] = React.useState(false);
  const [firstname, setFirstname]=React.useState('');
  const [lastname, setLastname]=React.useState('');
  const [email, setEmail]=React.useState('');
  const [phone, setPhoneno]=React.useState('');
  const [password,setPassword]=React.useState();
  const [nameErr,setNameErr]=React.useState(false);
  
  const postUser= async() => {
    var data = new FormData();
    let headers= {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
    data.append('firstName',firstname);
    data.append('secondName',lastname);
    data.append('contactNo',phone);
    data.append('email',email);
    data.append('password',password);
    data.append('gender',checked);
    console.log(" form data", data)

    return await axios.post('https://nameless-savannah-21991.herokuapp.com/register',data
    ,{ "headers": {headers},})
    
    
    .then(function (response) {
      if (response.status==200){
      console.log("response", response.data)
      navigation.navigate('Login')
      }
    })
    .catch(function (error) {
      console.log("error", error)
    })
  }
  
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

  
    return (
      <View style={styles.container1}>

      <View style={styles.Inputfields}>
        <Text style={styles.NeoStore} >NeoStore</Text>
        <Text style={styles.Username}>First Name</Text>
        <TextInput placeholder="First Name"  style={styles.Inputfields} value={firstname} onChangeText={(text) => setFirstname(text)}/>

        <Text style={styles.Username} >Last Name</Text>
        <TextInput placeholder="Last Name"  style={styles.Inputfields}value={lastname}  onChangeText={(text) => setLastname(text)}/>

        <Text style={styles.Username}>Email</Text>
        <TextInput placeholder="Test@gmail.com"  style={styles.Inputfields}  value={email} onChangeText={(text) => setEmail(text)}/>

        <Text style={styles.Username}>Phone no</Text>
        <TextInput placeholder="Phone no"  style={styles.Inputfields} value={phone}  onChangeText={(phone) => setPhoneno(phone)}/>


        <Text style={styles.Username}>Password</Text>
        <TextInput placeholder="Password"  style={styles.Inputfields} value={password}
        onChangeText={(text) => setPassword(text)}
        />
       {/* <TouchableOpacity
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
                  </TouchableOpacity>*/}


        <Text style={styles.Username}>Conform Password</Text>
        <TextInput placeholder="Conform Password"  style={styles.Inputfields} 
        />
       {/* <TouchableOpacity
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
                  </TouchableOpacity>*/}

        <View style={styles.Radio}>
          <Text style={styles.gender}>Select Gender</Text>
          <Text style={styles.gender}>Male</Text>
      <RadioButton
        value="Male"
        status={ checked === 'Male' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Male')}
      />
      <Text style={styles.gender}>Female</Text>
      <RadioButton
        value="Female"
        status={ checked === 'Female' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Female')}
      />
    </View>
    <View style={styles.Radio}>
    <Checkbox
      status={clicked ? 'checked' : 'unchecked'}
      onPress={() => {
        setClicked(!clicked);
      }}
    />
    <Text style={styles.gender}>I agree the Terms And Conditions</Text>
    </View>
        <TouchableOpacity style={styles.ButtonFields} onPress={()=>postUser()}>
              <Text style={styles.texLogin}>Register</Text>
            </TouchableOpacity>
        <View>
      
    </View>
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
       
       
      },
    Inputfields:{
      borderBottomWidth:1,
      
    
    },
    NeoStore:{
      textAlign:'center',
      color:'red',
      fontWeight:"bold",
      fontSize:50 
  },
  Username:{
    fontSize:15,
    marginTop:5,
    fontWeight:'bold',
    color:'black',

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
eye:{
  bottom:30,
  left:340,
  color:'black'
},
Radio:{
  flexDirection:'row',
alignItems:'center',
justifyContent:'center',

},
gender:{
  fontSize:15,
  color:'black',
  paddingLeft:20,
  fontWeight:'bold'
}
    
  })

  
  
  export default Register;