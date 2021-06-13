import React,{useState} from 'react'
import {Avatar,Button,Paper,Grid,Typography,Container} from "@material-ui/core"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from "./Style";
import GoogleLogin from "react-google-login";
import Icon from "./Icon";
import Input from './Input';
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {signin,signup} from "../../action/auth";


function Login() {
    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const [userData,setUserData] = useState({firstName:'',lastName:'',email:'',password:'',confirmPassword:''});
    const dispatch = useDispatch();
    const switchMode =() => {
        setIsSignup(!isSignup);
    }

    //defining history
    const history = useHistory();


    const googleSuccess = async (res) =>{
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            await dispatch({type:'AUTH',payload:{result,token}});
            history.push('/');
            
        } catch (error) {
            
        }

        console.log(res)
    };

    const submitHandler = (e) =>{
        e.preventDefault();
        if(isSignup){
          console.log("object",userData)
            dispatch(signup(userData,history))
        }else{
          console.log("object")
            dispatch(signin(userData,history))
        }
    }

    const handleChange = (e) =>{
        setUserData({...userData,[e.target.name]:e.target.value})
    }

    const googleFailure =async () =>{
        console.log("Google login was unsuccesful try again later");
    };

    return (
        <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{isSignup?'SignUp':'SignIn'}</Typography>
        <form className={classes.form} onSubmit={submitHandler} >
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input handleChange={handleChange} name="firstName" label="First Name" fullWidth  autoFocus half />
              <Input handleChange={handleChange} name="lastName" label="Last Name" fullWidth  half />
            </>
            )}
            <Input handleChange={handleChange} name="email" label="Email Address" fullWidth type="email" />
            <Input handleChange={handleChange} name="password" label="Password" fullWidth  type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input handleChange={handleChange} name="confirmPassword" label="Repeat Password"  type="password" /> }
          </Grid>
          <Button  type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
            clientId="836384644646-ndbf5pd0igj8riin6djinkblbn2t0kib.apps.googleusercontent.com"
            
            render={(renderProps) => (
              <Button 
              onClick={renderProps.onClick} 
              disabled={renderProps.disabled}
              className={classes.googleButton} 
              color="primary" 
              fullWidth  
              disabled={renderProps.disabled} 
              startIcon={<Icon />} 
              variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>

    )
}

export default Login
