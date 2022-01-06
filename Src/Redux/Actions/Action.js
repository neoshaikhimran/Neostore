import {LOGIN_TYPE,LOGOUT,STOREDATA,PRODUCTDATA} from '../Type'



  export function rawdata(data){
    console.log("Payload data " , data)
    return{
      type:LOGIN_TYPE,
      payload:data
    }
  }

  export function consumer(data){
    console.log("()()& " , data)
    return{
      type: STOREDATA,
      payload:data
    }
  }

  export function detailsproduct(data){
    console.log("pro@@@$ " , data)
    return{
      type: PRODUCTDATA,
      payload:data
    }
  }


  export function logout(){
    return{
      type: LOGOUT
    }
  }
