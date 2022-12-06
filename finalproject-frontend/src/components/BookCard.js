import React, {useState} from "react";
import {Card, CardHeader, CardContent, Typography, Alert} from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";


const BookCard = (props) => {

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const bookId = props.book.id;

    const handleReturn = React.useCallback(() => {
        console.log("Return button pressed")
    }, [])

    const handleRemove = React.useCallback(() => {
        console.log("Remove button pressed");
        axios.delete("books/" + bookId, {}).then(res => {
            setSuccess(true);
            setSuccessMessage("Book was deleted successfully");
            localStorage.removeItem("userId");
            window.location.href = "/";
        }).catch(function (error) {
            setError(true);
            setErrorMessage("Book could not be deleted.");
        });
        }, [bookId])

    const handleBorrow = React.useCallback(() => {
        console.log("Borrow button pressed")
    }, [])

    return (
        <div style={{ marginTop:20, marginRight:80, marginLeft:80, color:'gray'}}>
            <Card variant={"outlined"}>
                <CardHeader
                    title={
                        <h1>{props.book.name}</h1>
                    }
                    subheader={
                        "BY " + props.book.author
                    }
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {"isbn: " + props.book.isbn} <br/>
                        {"Availability: " + props.book.bookAvailability} <br/>
                    </Typography>
                </CardContent>
                <div style={{display: 'flex', justifyContent:'flex-end', flexDirection: "row"}}>
                    {props.offered === true && <Button onClick={handleRemove}>Remove</Button>}
                    {props.offered === false && <Button onClick={handleReturn}>Return</Button>}
                    {props.available === true && <Button onClick={handleBorrow}>Borrow</Button>}
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
