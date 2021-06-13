import {FETCH_POST,UPDATE_POST,DELETE_POST,CREATE_POST,LIKE_POST,} from "./actionType";
import axios from "axios";
import {deletePostAPI,signinAPI,signupAPI,createPostAPI,fetchPostAPI,likePostAPI,updatePostAPI} from "../API/api";


export const fetchPost = () =>async (dispatch) =>{
    try{
        dispatch({
            type:'LOADING',    
        })

        const post = await fetchPostAPI();//or API.get('/posts')

        dispatch({
            type:FETCH_POST,
            payload:post.data
        })

        dispatch({
            type:'NOTLOADING'    
        })
    }
    catch(error){
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) =>{
    try {
        dispatch({
            type:'LOADING',    
        })

        const newPost = await createPostAPI(post);

        dispatch({
            type:CREATE_POST,
            payload:newPost.data,
        })

        dispatch({
            type:'NOTLOADING'    
        })

    } catch (error) {
        console.log("🌆",error)
    }
}

export const updatepost =  (id,updatedPost) =>async(dispatch) =>{
    try {
        const post = await updatePostAPI(updatedPost,id);
        dispatch({
            type:UPDATE_POST,
            payload:post.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) =>{
    try {
        dispatch({
            type:'LOADING'    
        })
        await deletePostAPI(id);
        
        dispatch({
            type:DELETE_POST,
            payload:id,
        })

        dispatch({
            type:'NOTLOADING'
        })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch)=>{
    try{
        const updatedPost = await likePostAPI(id);
        dispatch({
            type:LIKE_POST,
            payload:updatedPost.data
        })
    }
    catch(error){
        console.log(error);
    }
}