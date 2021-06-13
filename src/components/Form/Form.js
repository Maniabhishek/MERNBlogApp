import React, { useEffect } from 'react';
import styled from "styled-components";
import {motion} from "framer-motion";
import { Input } from '@material-ui/core';
import {TextField,Typography,Paper,Button} from "@material-ui/core"
import useStyles from "./style";
import FileBase from "react-file-base64";
import {useDispatch,useSelector} from 'react-redux';
import {createPost,updatepost} from "../../action";


function Form({currentId,setCurrentId,postData,setPostData,displayForm, setDisplayForm}) {
    
    const currentPostToUpdate = useSelector(state=>currentId ? state.posts.find(post=>post._id===currentId) : null);
    const user = JSON.parse(localStorage.getItem('profile'));
    // const currentPostToUpdate = allPosts.filter(post=>currentId? post._id===currentId:null);

    const dispatch = useDispatch();

    const exitHandler = (e) =>{
        if(e.target.classList.contains("formExit")){
            setDisplayForm(!displayForm)
            setCurrentId(null);
            clearHandler();
        }
    }

    //submit handler
    const submitHandler = (e) => {
        e.preventDefault();
        if(currentId){
            console.log("Current ID is available")
            dispatch(updatepost(currentId,{...postData,name:user?.result?.name}));
        }else{
            console.log("Current ID is not available")
            console.log(user)
            dispatch(createPost({...postData,name:user?.result?.name}));
        }
        
        setDisplayForm(!displayForm);
        clearHandler();
    }

    const clearHandler = () =>{
        setPostData({
            title:'',message:'',tags:'',selectedFile:'',
        })
    }
    
    useEffect(()=>{
        if(currentPostToUpdate) setPostData(currentPostToUpdate)
    },[currentPostToUpdate])

    if(!user){
        return (
            <Container className="formExit" onClick={exitHandler}>
                <StyledForm style={{width:"30%",height:"10vh",color:'#086295',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <h3>Please login to create a post</h3>
                </StyledForm>
            </Container>
        )
    }

    return (
        <Container className="formExit" onClick={exitHandler}>
            <StyledForm>
            
                <form onSubmit={submitHandler}>
                    <h3>Create a Post</h3>
                    <TextField value={postData.title} onChange={(e)=>setPostData({...postData,title:e.target.value})} name="title" id="outlined-secondary" className="textField" fullWidth  label="Title" variant="outlined" />
                    <TextField value={postData.message} onChange={(e)=>setPostData({...postData,message:e.target.value})} name="message" id="outlined-secondary" className="textField" fullWidth  label="Message" variant="outlined" />
                    <TextField value={postData.tags} onChange={(e)=>setPostData({...postData,tags:e.target.value})} name="tags" id="outlined-secondary" className="textField" fullWidth  label="Tags" variant="outlined" />
                    <FileBase
                            type="file"
                            muultiple={false}
                            onDone={({base64})=>setPostData({...postData,selectedFile:base64})}
                        />
                    <Button  variant="contained" className="ButtonField" color="primary" size="large" fullWidth type="submit">{currentId?'Update':'Submit'}</Button>
                    <Button onClick={clearHandler} variant="contained" className="ButtonField" color="secondary" size="small" fullWidth  >Clear</Button>
                </form>
            </StyledForm>
        </Container>
    )
}

const Container = styled(motion.div)`
    z-index:10;
    top:0;
    left:0;
    position: absolute;
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.5);
    align-items: center;
    display: flex;
    overflow-y: scroll;
`;

const StyledForm = styled(motion.div)`
    width:40%;
    height:70vh;
    margin:0 auto;
    border-radius:1rem;
    background: #f3f2ef;
    overflow-y: scroll;
    &::-webkit-scrollbar{
        -webkit-appearance:none;

    }
    @media (max-width:900px){
        width:100%;
    }
    
    form{
        width:100%;
        padding:1rem 5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .textField{
            margin-bottom: 0.5rem;
        }
        .ButtonField{
            margin:0.8rem 0rem;
        }
    }
`;

export default Form
