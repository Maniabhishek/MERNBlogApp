import React from 'react'
import styled from "styled-components";
import {motion} from "framer-motion";
import {fetchPost} from "../../action/";
import {useSelector} from "react-redux";
import {CircularProgress} from "@material-ui/core";
import Post from "./Post/Post";


function Posts({currentId,setCurrentId,displayForm,setDisplayForm}) {

    const allPosts = useSelector(state=>state.posts);
    const isLoading = useSelector(state=>state.loading);
    return (
        <Container>
            
            {isLoading?<Loading><CircularProgress color="secondary"/></Loading>:""}
            <StyledPosts>
                {
                allPosts.map((post)=>
                    <Post displayForm={displayForm} 
                    setDisplayForm={setDisplayForm} 
                    currentId={currentId} 
                    setCurrentId={setCurrentId} 
                    key={post._id} 
                    post={post}/>)
                }
            </StyledPosts>
        </Container>
    )
}

const Container = styled(motion.div)`
    min-height: 80vh;
    padding:1rem 2rem;
`;

const StyledPosts = styled(motion.div)`
    display: flex;
    width:50%;
    margin:0 auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width:900px){
        width:90%;
    }
`;

const Loading = styled.div`
    margin:10%;
    text-align: center;
    @media (max-width:900px){
        margin-top: 50%;
    }
`;

export default Posts
