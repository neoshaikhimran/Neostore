import React from "react";
import MyStack from "./Src/Navigation/Funstacknavigator";
import {store} from './Src/Redux/Store/Store';
import {Provider} from 'react-redux';
 import SplashScreen from 'react-native-splash-screen'
 import { useEffect } from "react";

function App() {
  useEffect(() => {
    setTimeout(()=>{

    },2000)
    SplashScreen.hide();
}, []);


 
  return (
    <Provider store={store}>
    <MyStack/>
    </Provider>
    
   
  );
}
 
export default App;
 