import React from "react";
import {Card, CardHeader, CardContent, Typography} from "@mui/material";
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
                        {"Availability: " + props.book.available} <br/>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default BookCard;
