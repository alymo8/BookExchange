import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const CreateBookModal = () => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

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
        console.log(datePublished)
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

    return (
        <Box sx={style}>
            <h2>Create a book</h2>
            <div style={{marginBottom:20, marginTop: 20}}>
                <TextField label="Book name" variant="standard" required="true" onChange={handleNameChange}/>
                <TextField label="Author" variant="standard" required="true" onChange={handleAuthorChange}/>
            </div>
            <div style={{marginBottom:20, marginTop: 20}}>
                <TextField label="Isbn" variant="standard"  required="true" onChange={handleISBNChange}/>
                <TextField
                    id="date"
                    label="Date Published"
                    variant={"standard"}
                    type="date"
                    required="true"
                    onChange={handleDatePublishedChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <div style={{marginBottom:20, marginTop: 20}}>
                {!bookCreated && <Button variant='contained' onClick={handleCreateBook} color="primary" disabled={disable}>
                    Create book
                </Button>}
            </div>
            {error && <Alert severity="error">{errorMessage}</Alert>}
            {success && <Alert severity="success">{successMessage}</Alert>}
        </Box>
    )
}

export default CreateBookModal;
