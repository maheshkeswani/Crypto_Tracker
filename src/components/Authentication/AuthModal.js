import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Box, Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from 'react-google-button'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../firebase';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    color:'white',
    width:'400',
    borderRadius:'10',
  },google:{
    padding:24,
    paddingTop:0,
    display:"flex",
    flexDirection:"column",
    textAlign:"center",
    gap:20,
    fontSize:20,
  }

}));


const AuthModal = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
const {setAlert} = CryptoState();
  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const googleprovider = new GoogleAuthProvider();
const googleSignIn = () => {
signInWithPopup(auth,googleprovider).then(res => {
  setAlert({
    open:true,
    message:`Sign Up Successful. Welcome ${res.user.email} `,
    type:"success",
  })
  handleClose();
}).catch((error) => {
    setAlert({
    open:true,
    message:error.message,
    type:"error",
    })
})
  handleClose();

}
  return (
     <div>
      <Button variant='contained' style={{width:85,height:40,marginLeft:15,backgroundColor:"#EEBC1D"}} onClick={handleOpen}>Log In</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
        <AppBar position="static" style={{backgroundColor:"transparent",color:'white'}}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" style={{borderRadius:10}}>
          <Tab label="Log In"/>
          <Tab label="Sign Up"/>
        </Tabs>
      </AppBar>
      {value===0 && <Login handleClose={handleClose}/>}
      {value===1 && <Signup handleClose={handleClose}/>}
      <Box className={classes.google}>
        <span>OR</span>
        <GoogleButton style={{width:"100%",outline:"none"}} onClick = {googleSignIn}/>
      </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default AuthModal ;