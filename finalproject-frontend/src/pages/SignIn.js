import React from "react";
import { Button, TextField, Alert, Link } from "@mui/material";
import axios from "axios";
import Stack from '@mui/material/Stack';

const SignIn = () => {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [success, setSuccess] = React.useState(false);
    const [disable, setDisable] = React.useState(true);

    React.useEffect(() => {
        if (username && password){
            setDisable(false);
        }
        else{
            setDisable(true);
        }
    }, [username, password]);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = React.useCallback(() => {

        setSuccess(false);
        setError(false);
        axios.post("users/login", {
            username: username,
            password: password
        })
            .then(res => {
                localStorage.setItem("userId", res.data.id);
                localStorage.setItem("username", res.data.username);
                console.log(res)
                window.location.href = "/";
                setSuccess(true);
            })
            .catch(function (e) {
                setError(true);
                setErrorMessage("Wrong username or password");
            });
    }, [username, password]);

    return (

        <>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 120}}>
                    <h1>Sign in</h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                    <TextField label="username" variant="standard" onChange={handleUsernameChange}/>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                    <TextField type="password" label="password" variant="standard" onChange={handlePasswordChange}/>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                    <Button variant='contained' onClick={handleLogin} color="primary" disabled={disable}>
                        Log in
                    </Button>
                </div>
            </div>
            <Stack sx={{ width: '100%' }} spacing={2}>
                {error && <Alert severity="error">{errorMessage}</Alert>}
                {success && <Alert severity="success">Signed in</Alert>}
            </Stack>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                <Link href="/signUp">New? Create Account</Link>
            </div>
        </>
    )
};
export default SignIn;