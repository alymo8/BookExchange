import React from "react";
import {Stack,Alert,Button,TextField} from "@mui/material";

import axios from "axios";
import Bar from "../components/AppBar";



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
    const [bookId, setBookId] = React.useState("");
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");

    const [disable, setDisable] = React.useState(true);
    const [bookCreated, setBookCreated] = React.useState(false);

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

    const handleCreateBook = React.useCallback(() => {

        setSuccess(false);
        setError(false);
        setBookCreated(false);
        axios.post("users/" + localStorage.getItem("userId") + "/createAndOffer", {
            name: name,
            isbn: isbn,
            author: author,
            datePublished: datePublished,
        })
            .then(res => {
                setBookId(res.data.id)
                setSuccess(true)
                setSuccessMessage("Created book successfully")
                setBookCreated(true)
                console.log(bookId)
            })
            .catch(function (e) {
                setError(true);
                setErrorMessage("Wrong username or password");
            });

    }, [name, isbn, author, datePublished, bookId]);

    // const handleOfferBook = React.useCallback(() => {
    //
    //     setSuccess(false);
    //     setError(false);
    //     if(bookCreated) {
    //         axios.put("users/" + localStorage.getItem("userId") + "/offer", {
    //             id: bookId
    //         })
    //             .then(res => {
    //                 // setBookId(res.data.id)
    //                 setSuccess(true)
    //                 setSuccessMessage("Created and offered book succesfully")
    //                 console.log(bookId)
    //             })
    //             .catch(function (e) {
    //                 setError(true);
    //                 setErrorMessage("Wrong username or password");
    //             });
    //     }
    //
    // }, [ bookId, bookCreated]);

    return (
        <>
            <Bar/>
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
                  {!bookCreated && <Button variant='contained' onClick={handleCreateBook} color="primary" disabled={disable}>
                  Create book
                </Button>}
                  {/*{bookCreated && <Button variant='contained' onClick={handleOfferBook} color="primary" disabled={disable}>*/}
                  {/*    Offer book*/}
                  {/*</Button>}*/}

              </div>
              <Stack sx={{ width: '100%' }} spacing={2}>
                {error && <Alert severity="error">{errorMessage}</Alert>}
                {success && <Alert severity="success">{successMessage}</Alert>}
              </Stack>
        </>
        )
}

export default OfferBook;