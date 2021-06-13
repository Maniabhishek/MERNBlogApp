import React, { useEffect, useState } from 'react'
import {useDispatch} from "react-redux";
import {fetchPost} from "./action";
import {GlobalStyle} from "./components/GlobalStyle";
import Nav from "./components/Nav";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts"; 
import {Switch,Route} from "react-router-dom";
import Login from "./components/Auth/Login";

const App = () => {
    const dispatch = useDispatch();
    const [displayForm,setDisplayForm] = useState(false);
    const [postData, setPostData] = useState({
        title:'',message:'',tags:'',selectedFile:'',
    })

    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [currentId,setCurrentId] = useState();
    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('profile')));
        dispatch(fetchPost());
        
    },[dispatch]);

    return (
        <div>
            <GlobalStyle />
            
            <Switch>
                <Route exact path="/">
                <Nav setUser={setUser} user={user} displayForm={displayForm} setDisplayForm={setDisplayForm}/>
                    {displayForm? <Form currentId={currentId} setCurrentId={setCurrentId} postData={postData} setPostData={setPostData} displayForm={displayForm} setDisplayForm={setDisplayForm}/>:""}
                    <Posts user={user} displayForm={displayForm} setDisplayForm={setDisplayForm} currentId={currentId} setCurrentId={setCurrentId}/>
                </Route>
                <Route exact path="/auth">
                    <Login/>
                </Route>
            </Switch>
        </div>
    )
}

export default App
