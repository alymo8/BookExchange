import React from "react";
import {Card, CardHeader, CardContent, Typography} from "@mui/material";
const ProfileCard = (props) => {
    return (
        <div style={{ marginTop:20, marginRight:80, marginLeft:80, color:'gray'}}>
            <Card variant={"outlined"}>
                <CardHeader
                    title={
                        <h1>{props.user.username}</h1>
                    }
                    subheader={
                        props.user.name
                    }
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {"Email: " + props.user.email} <br/>
                        {"Phone Number: " + props.user.phoneNumber} <br/>
                        {"Address: " + props.user.address} <br/>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfileCard;
