import React from "react";
import ProfileCard from "../components/ProfileCard";
import Bar from "../components/AppBar";

const Profile = () => {

    return (
        <>
            <Bar/>
            <div style={{display: 'flex', justifyContent:'center', marginTop:20}}>
                <h1>Profile</h1>
            </div>
            <ProfileCard/>
        </>
    )
}

export default Profile