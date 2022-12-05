import React from "react";
import ProfileCard from "../components/ProfileCard";
import Button from "@mui/material/Button";

const Profile = () => {

    const handleHomeButton = React.useCallback(() => {
        console.log("Home button pressed")
        window.location.href = "/";
    }, [])

    return (
        <>
            <Button onClick={handleHomeButton}>Home</Button>
            <div style={{display: 'flex', justifyContent:'center', marginTop:20}}>
                <h1>Profile</h1>
            </div>
            <ProfileCard/>
            <div style={{display: 'flex', justifyContent:'center', marginTop:20}}>
                <h1>Your books</h1>
            </div>

        </>
    )
}

export default Profile