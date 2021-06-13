import axios from "axios";
import {signinAPI,signupAPI} from "../API/api";

export const signin = (userData,history) => async(dispatch) =>{
    try {
        const loginData = await signinAPI(userData);
        console.log("logindata",loginData)
        dispatch({  
                    type:'AUTH',
                    payload:{result:loginData.data,token:loginData?.data.token}
    })
    history.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (userData,history) => async(dispatch) =>{
    try {
        
        const {data,token} = await signupAPI(userData);
        dispatch({type:'AUTH',payload:{result:data.user,token:data.token}})
        
        history.push('/');
    } catch (error) {

        console.log(error);
    }
}