import React, {useState} from "react";
import {Card, CardHeader, CardContent, Typography, Alert} from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Chip from "@mui/material/Chip";


const BookCard = (props) => {

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const bookId = props.book.id;

    const handleReturn = React.useCallback(() => {
        console.log("Return button pressed");
        console.log("bookId", bookId)
        axios.put("users/" + localStorage.getItem("userId") + "/return", {
            "id": bookId
        }).then(res => {
            setSuccess(true);
            setSuccessMessage("Book was returned successfully");
        }).catch(function (error) {
            setError(true);
            setErrorMessage("Book could not be returned.");
        });

    }, [bookId])

    const handleRemove = React.useCallback(() => {
        console.log("Remove button pressed");
        axios.put("users/" + localStorage.getItem("userId") + "/unOffer", {
            id: bookId
        }, ).then(res => {
            setSuccess(true);
            setSuccessMessage("Book was deleted successfully");
        }).catch(function (error) {
            setError(true);
            setErrorMessage("Book could not be deleted.");
        });
        axios.delete("books/" + bookId, {}).then(res => {
            setSuccess(true);
            setSuccessMessage("Book was deleted successfully");
        }).catch(function (error) {
            setError(true);
            setErrorMessage("Book could not be deleted.");
        });
        }, [bookId])


    const handleBorrow = React.useCallback(() => {
        console.log("Borrow button pressed");
        console.log("bookId", bookId)
        axios.put("users/" + localStorage.getItem("userId") + "/borrow", {
            "id": bookId
        }).then(res => {
            setSuccess(true);
            setSuccessMessage("Book was borrowed successfully");
        }).catch(function (error) {
            setError(true);
            setErrorMessage("Book could not be borrowed.");
        });
    }, [bookId])



    return (
        <div style={{ marginTop:20, marginRight:80, marginLeft:80, color:'gray'}}>
            <Card variant={"outlined"}>
                <CardHeader
                    title={
                        <h2>{props.book.name}</h2>
                    }
                    subheader={
                        "BY " + props.book.author
                    }
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {"isbn: " + props.book.isbn} <br/>
                        {/*{"Availability: " + props.book.bookAvailability} <br/>*/}
                    </Typography>
                </CardContent>
                <div style={{display: 'flex', justifyContent:'flex-end', flexDirection: "row", marginRight:40, marginBottom:10}}>
                    {props.book.bookAvailability === "AVAILABLE" && <Chip style={{backgroundColor:'greenyellow'}} label={props.book.bookAvailability} />}
                    {props.book.bookAvailability === "NOTAVAILABLE" && <Chip style={{backgroundColor:'red'}} label={props.book.bookAvailability} />}
                </div>
                <div style={{display: 'flex', justifyContent:'flex-end', flexDirection: "row", marginRight:40}}>
                    {props.offered === true && props.book.bookAvailability === "AVAILABLE" && <Button onClick={handleRemove}>Remove</Button>}
                    {props.offered === false && <Button onClick={handleReturn}>Return</Button>}
                    {props.available === true && props.loggedIn === true && <Button onClick={handleBorrow}>Borrow</Button>}
                </div>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    {error && <Alert severity="error">{errorMessage}</Alert>}
                    {success && <Alert severity="success">{successMessage}</Alert>}
                </Stack>
            </Card>
        </div>
    )
}

export default BookCard;
