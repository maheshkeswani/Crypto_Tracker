import React from 'react'
import { Box,TextField } from '@material-ui/core'
import { useState } from 'react'
import {Button} from '@material-ui/core'
import { CryptoState } from '../../CryptoContext'
import {auth} from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
const Signup = ({handleClose}) => {
  const [email,setEmail]  = useState("");
  const [password,setPassword] = useState("");
  const [confirmPass,setconfirmPass] = useState("");
  const {setAlert} = CryptoState() ;
  const handleSubmit = async () => {
if(password !== confirmPass)
{
  setAlert({
    open: true,
    message: 'Passwords do not match',
    type:'error',
  })
}
try {
  const result = await createUserWithEmailAndPassword(auth,email,password);
  setAlert({open:true,
  message:`Sign Up Successful. Welcome ${result.user.email}`,
  type:"success",})
  handleClose();
} catch (error) {
  setAlert({
    open:true,
    message:error.message,
    type:"error",

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
      <TextField variant='outlined' type= "password"
      label="Re-Enter Password"
      value={confirmPass}
      onChange={(e) => setconfirmPass(e.target.value)}
      fullWidth/>
      <Button variant="contained" size="large"
      style={{backgroundColor:"#EEBC1D"}}
      onClick={handleSubmit}>Sign Up
      </Button>
    </Box>
  )
}

export default Signup