import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import axios from "axios";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {

    const [success, setSuccess] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState("");

    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleSubmit = (event) => {

        event.preventDefault();
        setSuccess(false);
        setError(false);
        const data = new FormData(event.currentTarget);
        console.log(data.get('username'), data.get('password'))
        axios.post("users/login", {
            username: data.get('username'),
            password: data.get('password'),
        })
        .then(res => {
            localStorage.setItem("userId", res.data.id);
            localStorage.setItem("username", res.data.username);
            console.log(res)
            window.location.href = "/";
            setSuccess(true);
            setSuccessMessage("Signed in")
        })
        .catch(function (e) {
            setError(true);
            setErrorMessage("Wrong username or password");
        });
        };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="signUp" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    {error && <Alert severity="error">{errorMessage}</Alert>}
                    {success && <Alert severity="success">{successMessage}!</Alert>}
                </Stack>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}