import React from "react";
import {Card, CardHeader, CardContent, Typography, Button} from "@mui/material";

const loggedIn = (() => {
    console.log("user", localStorage.getItem("userId"))
    if (localStorage.getItem("userId") != null) {
        return true;
    } else {
        return false
    }
})();

// const handleBorrowBook = React.useCallback(() => {
//     console.log("Offer book button pressed")
//     window.location.href = "offerBook";
// }, [])

const BookCard = (props) => {
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
                        {"Availability: " + props.book.available}
                        {loggedIn && <Button style={{display: 'flex', justifyContent:'flex-end', alignItems:"flex-end"}}>Borrow book</Button>}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default BookCard;
