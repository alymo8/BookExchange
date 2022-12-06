import React from "react";
import {Card, CardHeader, CardContent, Typography} from "@mui/material";
import Button from "@mui/material/Button";
const BookCard = (props) => {

    const handleReturn = React.useCallback(() => {
        console.log("Return button pressed")
    }, [])

    const handleRemove = React.useCallback(() => {
        console.log("Remove button pressed")
    }, [])

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
            </Card>
        </div>
    )
}

export default BookCard;
