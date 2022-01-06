import { ToastAndroid } from "react-native";
import { useSelector } from "react-redux";


const ProductFilterApi = async(data) =>{
    const token = useSelector(state=>state.data.token)
    console.log(data);
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
        ToastAndroid.show(data.msg,2000)
        return data;
        
    })
}
export default ProductFilterApi;