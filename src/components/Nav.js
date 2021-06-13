import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useHistory,useLocation} from "react-router-dom";
import decode from "jwt-decode";


function Nav({setUser,user,setDisplayForm,displayForm}) {

    const location = useLocation();
    const image = user?.result.imageUrl;
    const disptach = useDispatch();
    const history = useHistory();
    const logout =() =>{
        disptach({type:'LOGOUT'});
        history.push('/auth');
    }

    useEffect(()=>{
        const token = user?.token;
        if(token){
            const decodedToken = decode(token);
            if(decodedToken*1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));

        console.log("user profile ",user)
    },[location])

    return (
        <Container>
            
            <h3 onClick={()=>setDisplayForm(!displayForm)}>Start a post</h3>
            <div>
                {user && <img src={image} alt="#" />}
                <h2>{user ?(user.result?.givenName&&user.result?.name.toUpperCase() || user.result?.name&&user.result?.name.toUpperCase() ):""}</h2>
                <Link to="/auth">
                    {
                        user?
                            <motion.button onClick={logout} whileTap={{scale:0.9}}>SignOut</motion.button>
                        :
                            <motion.button whileTap={{scale:0.9}}>SignIn</motion.button>
                    }
                </Link>
            </div>
        </Container>
    )
}

export const Container = styled(motion.div)`
    width:80%;
    height:10vh;
    padding:1rem 2rem;
    align-items: center;
    display: flex;
    justify-content: space-between  ;
    background: #ffffff;
    margin: 1rem auto;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
    h2{
        font-size: 16px;
        margin-right: 1rem;
    }
    @media (max-width:900px){
        width:100%
    }
    h3{
        cursor: pointer;    
        padding:1rem 3rem;
        width:50%;
        border-radius:2rem;
        opacity: 0.7;
        @media (max-width:900px){
            padding:0.5rem 0.8rem;
            width:30%;
        }
        &:hover{
            background: rgba(0,0,0,0.2);
            color:black;
        }
    }
    button{
        border: none;
        padding: 1rem 2rem;
        width: 9rem;
        border-radius:1rem;
        cursor: pointer;
        background: #08689f;
        box-shadow: 0px 20px 10px -15px rgba(0,0,0,0.8);
        font-size: 16px;
        @media (max-width:900px){
            padding: 0.3rem 1rem;
            font-size: 14px;
            width: 5rem;
            box-shadow: 0px 50px 10px -15px rgba(0,0,0,0.8);
        }
    }
    border-radius: 2rem;
    div{
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 50px;
            border-radius: 50%;
            margin-right: 1rem;
        }
    }
`;

export default Nav
