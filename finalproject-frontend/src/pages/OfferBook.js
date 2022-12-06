import React from "react";
import {Stack,Alert,Button,TextField} from "@mui/material";

import axios from "axios";



const OfferBook = () => {

    const handleHomeButton = React.useCallback(() => {
        console.log("Home button pressed")
        window.location.href = "/";
    }, [])

    const [name, setName] = React.useState("");
    const [author, setAuthor] = React.useState("");
    const [isbn, setIsbn] = React.useState("");
    const [datePublished, setDatePublished] = React.useState("");

    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [disable, setDisable] = React.useState(true);
  
    React.useEffect(() => {
      if (name && author && isbn && datePublished){
        setDisable(false);
      }
      else{
        setDisable(true);
      }
    }, [name, author, isbn,datePublished]);
  
    const handleNameChange = (event) => {
      setError(false);
      setName(event.target.value);
    };
  
    const handleAuthorChange = (event) => {
      setError(false);
      setAuthor(event.target.value);
    };
  
    const handleISBNChange = (event) => {
      setError(false);
      setIsbn(event.target.value);
    };
  
    const handleDatePublishedChange = (event) => {
      setError(false);
      setDatePublished(event.target.value);
    };
  
    const handleSignUp = React.useCallback(() => {
      if(!isNaN(name)){
          setError(true);
          setErrorMessage("Book name Must Be A String");
      }
      else if(!isNaN(author)){
          setError(true);
          setErrorMessage("Author Must Be A String");
      }
      else if(!isNaN(isbn)){
        setError(true);
        setErrorMessage("ISBN Must Be A String");
      }
      else if(!isNaN(datePublished)){
        setError(true);
        setErrorMessage("Date Published Must Be A Date with format YYYY-MM-DD");
      }
      else{
          axios.post("books", {
              name: name,
              author:author,
              isbn:isbn,
              datePublished:datePublished
            })
            .then(function (response) {
              setSuccess(true);
            })
            .catch(function (error) {
              setError(true);
              setErrorMessage("One input was wrongly entered, please check your choices again");
            });
      }
  }, [name, author, isbn,datePublished]);
    return (
        <>
        <Button onClick={handleHomeButton}>Home</Button>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 120}}>
            <h1>Offer Book</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
            <TextField label="Book name" variant="standard" required="true" onChange={handleNameChange}/>
            <TextField label="Author" variant="standard" required="true" onChange={handleAuthorChange}/>
            <TextField label="Isbn" variant="standard"  required="true" onChange={handleISBNChange}/>
            <TextField label="Date Published" variant="standard" required="true" onChange={handleDatePublishedChange}/>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
            <Button variant='contained' onClick={handleSignUp} color="primary" disabled={disable}>
              Submit
            </Button>
          </div>
          <Stack sx={{ width: '100%' }} spacing={2}>
            {error && <Alert severity="error">{errorMessage}</Alert>}
            {success && <Alert severity="success">Book has been successfully offered!</Alert>}
          </Stack>
        </>
        )
}

export default OfferBook;