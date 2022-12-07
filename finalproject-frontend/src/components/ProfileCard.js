import React, {useEffect, useState} from "react";
import {Card, CardHeader, CardContent, Typography} from "@mui/material";
import axios from "axios";
const ProfileCard = () => {
    
    // const user = localStorage.getItem("userId");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        setLoading(true);
        loadData();
        setLoading(false);
        // eslint-disable-next-line
    }, []);

    const loadData = () => {
        setLoading(true);
        axios
            .get(`users/` + localStorage.getItem("userId"))
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
                setUser({});
            });
        setLoading(false);
    };
    return (
        <div style={{ marginTop:20, marginRight:80, marginLeft:80, color:'gray'}}>
            {!loading && <Card variant={"outlined"}>
                <CardHeader
                    title={
                        <h2>{user.username}</h2>
                    }
                    subheader={
                        user.name
                    }
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {"Email: " + user.email} <br/>
                        {"Phone Number: " + user.phoneNumber} <br/>
                        {"Address: " + user.address} <br/>
                    </Typography>
                </CardContent>
            </Card>}
        </div>
    )
}

export default ProfileCard;
