import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import BookIcon from '@mui/icons-material/Book';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';



function Bar() {


    const loggedIn = (() => {
        console.log("user", localStorage.getItem("userId"))
        if (localStorage.getItem("userId") != null) {
            return true;
        } else {
            return false
        }
    })();


    const handleLogOut = (event) => {
        console.log("Log out button pressed")
        localStorage.removeItem("userId");
        window.location.href = "/";
    };

    const handleLogIn = (event) => {
        console.log("Log in button pressed")
        window.location.href = "signIn";
    };

    const handleProfile = (event) => {
        console.log("Profile button pressed")
        window.location.href = "profile";
    };

    const handleAddBook = (event) => {
        console.log("Add book button pressed")
        window.location.href = "offerBook";
    };

    const handleYourBooks = (event) => {
        console.log("Your books button pressed")
        window.location.href = "yourBooks";
    };

    return (
        <AppBar position="static" style={{backgroundColor:'mediumseagreen'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <BookIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        BookXchange
                    </Typography>
                    <BookIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        BookXchange
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {loggedIn &&
                        <Button
                            onClick={handleYourBooks}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Your books
                        </Button>}
                        {loggedIn &&
                        <Button
                            onClick={handleAddBook}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Add book
                        </Button>}
                        {loggedIn &&
                        <Button
                            onClick={handleProfile}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Profile
                        </Button>}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {loggedIn && <Tooltip title="Log Out">
                            <IconButton onClick={handleLogOut} sx={{ p: 0 }}>
                                <LogoutIcon/>
                            </IconButton>
                        </Tooltip>}
                        {!loggedIn && <Tooltip title="Sign in/Sign up">
                            <IconButton onClick={handleLogIn} sx={{ p: 0 }}>
                                <LoginIcon/>
                            </IconButton>
                        </Tooltip>}

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Bar;