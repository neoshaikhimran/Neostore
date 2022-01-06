import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import ForgetPassword from '../Screens/ForgetPassword'
import Location from '../Screens/Location';
import HomeScreen from '../Screens/HomeScreen';
import All from '../Screens/All';
import Customdrawer from './Customdrawer';
import Cart from '../Screens/Cart';
import Myaccount from '../Screens/Myaccount';
import Order from '../Screens/Order';
import PasswordRecovery from '../Screens/PasswordRecovery';
import ResetScreen from '../Screens/ResetScreen';
import Editprofile from '../Screens/Editprofile';
import Shipping from '../Screens/Shipping';
import Address from '../Screens/Address';
import Editadderss from '../Screens/Editaddress';
import Product from '../Screens/Product';
import Prodetails from '../Screens/Prodetails';
import Proceedtobuy from '../Screens/Proceedtobuy';
import Placeorder from '../Screens/Placeorder'
import CartIcon from '../Screens/CartIcon'
//import { TouchableOpacity } from 'react-native';





const Drawer = createDrawerNavigator();
function Back (){
    return(
      <Drawer.Navigator  
      drawerContent={props => <Customdrawer{...props}/>} >
        <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{ drawerIcon:({color, size})=>(
                <FontAwesome5 name={'home'} color={color} size={20}/>
            ), headerShown: false
           }}/>
        <Drawer.Screen name="Login" component={Login} options={{ drawerIcon:({color, size})=>(
                <FontAwesome5 name={'sign-in-alt'} color={color} size={20}/>
            ),headerShown: false}} />
        <Drawer.Screen name="Register" component={Register} options={{ drawerIcon:({color, size})=>(
        <FontAwesome5 name={'user-plus'} color={color} size={20}/>
        )}}/>
        <Drawer.Screen name="All" component={All} options={{ drawerLabel:'All Product',drawerIcon:({color, size})=>(
                <FontAwesome5 name={'couch'} color={color} size={20}/>
            )}}/>
        <Drawer.Screen name="Location" component={Location} options={{ drawerIcon:({color, size})=>(
                <FontAwesome5 name={'map-marker-alt'} color={color} size={20}/>
            ),headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize:25
            },headerTitleAlign:'center',}}/>
      </Drawer.Navigator>
    )
  }
  
  function front (){
    return(
      <Drawer.Navigator  
      drawerContent={props => <Customdrawer{...props}/>} >
        <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{ drawerIcon:({color, size})=>(
                <FontAwesome5 name={'home'} color={color} size={20}/>
            ), headerShown: false
            
            }}/>
        <Drawer.Screen name="Myaccount" component={Myaccount} options={{ drawerIcon:({color, size})=>(
                <FontAwesome5 name={'user'} color={color} size={20}/>
            ), title: 'My Account',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize:25,
            },headerTitleAlign:'center',}} />
        <Drawer.Screen name="All" component={All} options={{ drawerLabel:'All Product',drawerIcon:({color, size})=>(
                <FontAwesome5 name={'couch'} color={color} size={20}/>
            ), title: 'All Product',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize:25,
            },headerTitleAlign:'center',
            headerRight: props => <CartIcon  {...props} />,}}/>
        <Drawer.Screen name="Cart" component={Cart} options={{ drawerIcon:({color, size})=>(
        <FontAwesome5 name={'shopping-cart'} color={color} size={20}/>
        ),headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize:25
        },headerTitleAlign:'center',}}/>

        <Drawer.Screen name="Order" component={Order} options={{ drawerIcon:({color, size})=>(
        <FontAwesome5 name={'list-alt'} color={color} size={20}/>
        ),headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize:25
        },headerTitleAlign:'center',}}/>
        <Drawer.Screen name="Location" component={Location} options={{ drawerIcon:({color, size})=>(
                <FontAwesome5 name={'map-marker-alt'} color={color} size={20}/>
            )}}/>
      </Drawer.Navigator>
    )
  }


const Stack = createNativeStackNavigator();


 function MyStack() {
  const {isLogged} = useSelector(state=>state.data)

  return (
    <NavigationContainer>
       <Stack.Navigator screenOptions={{headerShown: false}}>
                {
                isLogged ==true?
                <Stack.Screen name="front" component={front} />:null}
                 {isLogged ==true ?null:
                <Stack.Screen name="Add" component={Back} />}

                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
                <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
                <Stack.Screen name="PasswordRecovery" component={PasswordRecovery}/>
                <Stack.Screen name="ResetScreen" component={ResetScreen} options={{
          title: 'Reset Password',
          headerShown:'true',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:25
          },headerTitleAlign:'center',
        }}/>
                <Stack.Screen name="Editprofile" component={Editprofile} options={{
          title: 'Edit Profile',
          headerShown:'true',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:25
          },headerTitleAlign:'center',
        }}/>
                <Stack.Screen name="Shipping" component={Shipping} options={{
          title: 'Shipping Address',
          headerShown:'true',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:25
          },headerTitleAlign:'center',
        }}/>
                <Stack.Screen name="Address" component={Address}/>
                <Stack.Screen name="Product" component={Product}/>
                <Stack.Screen name="Prodetails" component={Prodetails} options={{
          title: 'Product Details',
          headerShown:'true',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:25
          },headerTitleAlign:'center',
        }}/>
        <Stack.Screen name="Proceedtobuy" component={Proceedtobuy} options={{
          title: 'Place Order',
          headerShown:'true',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:25
          },headerTitleAlign:'center'}}/>

            <Stack.Screen name="Placeorder" component={Placeorder} options={{
          title: 'Order',
          headerShown:'true',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:25
          },headerTitleAlign:'center'}}/>

            <Stack.Screen name="Cart" component={Cart} options={{
          title: 'Cart',
          headerShown:'true',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:25
          },headerTitleAlign:'center'}}/>

                <Stack.Screen name="CartIcon" component={CartIcon}/>
                <Stack.Screen name="Editaddress" component={Editadderss}/>
                
              
                
        </Stack.Navigator>
        </NavigationContainer>
    
  );
}

export default MyStack
