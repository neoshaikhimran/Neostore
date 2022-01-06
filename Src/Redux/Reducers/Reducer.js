import  {LOGIN_TYPE,LOGOUT,PRODUCTDATA,STOREDATA } from '../Type';

const initialState = {
  userId:'',
  token:'',
  cartId:'',
  firstName:'',
  secondName:'',
  email:'',
  mobile:'',
  name:'',
  price:'',
  rating:'',
  id:'',
  isLogged:false
  
 };

const mainReducer = (state = initialState, action) => {
  console.log("reducer", action)
  switch (action.type) {
    case LOGIN_TYPE:{
      console.log("###Data after Login", action.payload)
      return{
      ...state,
    cartId:action.payload.cartId,
    userId:action.payload.userId,
    token:action.payload.token,
    isLogged:true,

      }
    }
    case STOREDATA:{
      return{
        ...state,
       firstName:action.payload.firstName,
       secondName:action.payload.secondName,
       email:action.payload.email,
       mobile:action.payload.mobile,
       isLogged:true,
   
      }
    } 

    case PRODUCTDATA:{
      return{
        ...state,
        id:action.payload.id,
       name:action.payload.name,
       price:action.payload.price,
       rating:action.payload.rating,
       isLogged:true,
   
      }
    } 
   
    case LOGOUT:{
      return{
       isLogged:false
   
      }
    } 


    default:{
      return state;
    }

  }
};


export default mainReducer;