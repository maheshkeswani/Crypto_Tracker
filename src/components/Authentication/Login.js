import { Box, TextField,Button } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import {  auth} from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {CryptoState} from "../../CryptoContext"
const Login = ({handleClose}) => {
  const [email,setEmail]  = useState("");
  const [password,setPassword] = useState("")
  const {setAlert} = CryptoState();
  const handleSubmit = async () => {
if(!email || !password)
{
  setAlert({
    open:true,
message:"Please fill all the Fields",
type:"error",
  });
}
try {
  const res  = await signInWithEmailAndPassword(auth,email,password)
  setAlert({open:true,
  message:`Sign In Successful. Welcome ${res.user.email}`,
  type:"success",});
  handleClose();
} catch (error) {
  setAlert({
    open:true,
    message:error.message,
    type:"error"
  });
}
}

  return (
    <Box p ={3} style={{display:'flex',flexDirection:'column',gap:'20px'}}>
      <TextField variant='outlined' type= "email"
      label="Enter Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      fullWidth/>
      <TextField variant='outlined' type= "password"
      label="Enter Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      fullWidth/>
      <Button variant="contained" size="large"
      style={{backgroundColor:"#EEBC1D"}}
      onClick={handleSubmit}>Log In
      </Button>
</Box>
  )
}

export default Login