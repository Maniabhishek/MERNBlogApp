import React from 'react'
import styled from "styled-components";
import {motion} from "framer-motion";
import moment from "moment";
import {Button} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import {ThumbUpAltOutlined} from "@material-ui/icons/";
import DeleteIcon from "@material-ui/icons/Delete";
import {deletePost,likePost} from "../../../action"
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress} from "@material-ui/core";




function Post({post,currentId,setCurrentId,displayForm,setDisplayForm}) {
    
    const isLoading = useSelector(state=>state.loading);
    const dispatch = useDispatch();
    const editHandler = () =>{
        setCurrentId(post._id);
        setDisplayForm(!displayForm);
    }

    const user = JSON.parse(localStorage.getItem('profile'));
    console.log("⬜",user?.result?._id===post?.creator)
    const Likes = () =>{
        if(post.likes.length>0){
            return post.likes.find((like)=>like===(user?.result?.googleId||user?.result?._id))
            ?(
                <><ThumbUpAltIcon fontSize="small"/>&nbsp;{(post.likes.length>2) ? `you and ${post.likes.length-1} others`: `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
            )
            :
            (
                <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            )
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    }

    return (
        <StyledPost>
            <Heading>
                <div><h3>{post.name}</h3> <p>{moment(post.createdAt).fromNow()} </p> </div>
                {(user?.result?._id===post?.creator||user?.result?.googleId===post?.creator) &&
                <Button onClick={editHandler} variant="contained" color="primary" >
                    Edit
                </Button>}
            </Heading>
            <Message>
                <p>{post.message}</p>
            </Message>
            <Image>
                <img src={post.selectedFile} alt="" />
            </Image>
            <Tags>
                <p>#{post.tags}</p>
            </Tags>
            <Buttons>
                <Button size="small" disabled={!user?.result} color="primary" onClick={()=>dispatch(likePost(post._id))} >
                    <Likes/> 
                </Button>
            
            {
            (user?.result?._id===post?.creator||user?.result?.googleId===post?.creator)
            ?
                
                <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}  >{isLoading ? <CircularProgress/>:<><DeleteIcon fontSize="small" /> Delete</>}</Button>
            :
            ""
            }
                
            </Buttons>
        </StyledPost>
    )
}

const StyledPost = styled(motion.div)`
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 0px 20px rgba(0,0,0,0.7);
    margin: 1rem 0rem;
    border-radius: 1rem;
`;

const Image = styled(motion.div)`
    padding: 0rem 1rem;
    img{
        width: 100%;
        height: 30vh;
        object-fit: cover;
    }
`;

const Heading = styled(motion.div)`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    h3{
        padding:0 0.5rem;
    }
    p{
        padding:0rem 0.7rem;
        font-size: 15px;
    }

`;

const Tags = styled(motion.div)`
    padding: 0rem 1.5rem;
    margin-bottom: 1rem;
    p{
        font-weight: bolder;
    }
`;

const Message = styled(motion.div)`
    padding: 0rem 1.5rem;
    margin-bottom: 1rem;
    p{
        font-weight: bolder;
    }

`;

const Buttons = styled(motion.div)`
    padding: 0rem 1.5rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-evenly;
`;

export default Post
