import { Button, Alert, TextField } from "@mui/material";
import axios from "axios";
import * as React from 'react';
import Stack from '@mui/material/Stack';


const Signup = () => {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [disable, setDisable] = React.useState(true);

  const handleHomeButton = React.useCallback(() => {
    console.log("Home button pressed")
    window.location.href = "/";
}, [])

const handleBackButton = React.useCallback(() => {
    console.log("Back button pressed")
    window.location.href = "/signIn";
}, [])

  React.useEffect(() => {
    if (name && email && address && phoneNumber && username && password){
      setDisable(false);
    }
    else{
      setDisable(true);
    }
  }, [name, email, phoneNumber, address, username, password]);

  const handleNameChange = (event) => {
    setError(false);
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setError(false);
    setEmail(event.target.value);
  };

  const handleAddressChange = (event) => {
    setError(false);
    setAddress(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setError(false);
    setPhoneNumber(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setError(false);
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setError(false);
    setPassword(event.target.value);
  };

  const handleSignUp = React.useCallback(() => {
    if(!isNaN(name)){
        setError(true);
        setErrorMessage("Name Must Be A String");
    }
    else if(!isNaN(email)){
      setError(true);
      setErrorMessage("Email Must Be A String");
    }
    else if(!isNaN(address)){
      setError(true);
      setErrorMessage("Address Description Must Be A String");
    }
    else if(isNaN(phoneNumber)){
      setError(true);
      setErrorMessage("Phone Number Description Must Be A Number");
    }
    else if(!isNaN(username)){
      setError(true);
      setErrorMessage("Username Must Be A String");
    }    
    else if(!isNaN(password)){
      setError(true);
      setErrorMessage("Password Must Be A String");
    }
    else{
        axios.post("users", {
            username: username,
            password: password,
            name: name,
            email: email,
            address: address,
            phoneNumber:phoneNumber,
            borrowedBooksIds: [],
            offeredBooksIds: []
          })
          .then(function (response) {
            setSuccess(true);
          })
          .catch(function (error) {
            setError(true);
            setErrorMessage("One input was wrongly entered, please check your choices again");
          });
    }
}, [name, email, phoneNumber, address, username, password]);

  return (
  <>
    <Button onClick={handleBackButton}>Back</Button><Button onClick={handleHomeButton}>Home</Button>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 120}}>
      <h1>Sign up</h1>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
      <TextField label="Name" variant="standard" required="true" onChange={handleNameChange}/>
      <TextField label="Email" variant="standard"  required="true" onChange={handleEmailChange}/>
      <TextField label="Address" variant="standard" required="true" onChange={handleAddressChange}/>

    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
      <TextField label="Phone number" variant="standard" required="true" onChange={handlePhoneNumberChange}/>
      <TextField label="username" variant="standard" required="true" onChange={handleUsernameChange}/>
      <TextField type="password" label="password" variant="standard" required="true" onChange={handlePasswordChange}/>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
      <Button variant='contained' onClick={handleSignUp} color="primary" disabled={disable}>
        Sign Up
      </Button>
    </div>
    <Stack sx={{ width: '100%' }} spacing={2}>
      {error && <Alert severity="error">{errorMessage}</Alert>}
      {success && <Alert severity="success">User account has been successfully created!</Alert>}
    </Stack>
  </>
  )
};
export default Signup;