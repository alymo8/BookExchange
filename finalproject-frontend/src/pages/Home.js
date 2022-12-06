import React, {useEffect, useState} from "react";
import BookCard from "../components/BookCard";
import axios from "axios";
import Button from "@mui/material/Button";


function Home() {

    const [availableBooks, setAvailableBooks] = useState([]);
    const [offeredBooks, setOfferedBooks] = useState([]);
    const [loading, setLoading] = useState(false);


    const loggedIn = (() => {
        console.log("user", localStorage.getItem("userId"))
        if (localStorage.getItem("userId") != null) {
            return true;
        } else {
            return false
        }
    })();

    const handleSignInButton = React.useCallback(() => {
        console.log("Sign in button pressed")
        window.location.href = "signIn";
    }, [])

    const handleLogOutButton = React.useCallback(() => {
        console.log("Log out button pressed")
        localStorage.removeItem("userId");
        window.location.href = "/";
    }, [])

    const handleProfileButton = React.useCallback(() => {
        console.log("Profile button pressed")
        window.location.href = "profile";
    }, [])

    const handleOfferBook = React.useCallback(() => {
        console.log("Offer book button pressed")
        window.location.href = "offerBook";
    }, [])

    useEffect(() => {
        console.log(loggedIn);
        setLoading(true);
        loadData();
        setLoading(false);
        // eslint-disable-next-line
    }, []);

    const loadData = () => {
        setLoading(true);
        axios
            .get(`books/available`)
            .then((res) => {
                setAvailableBooks(res.data);
            })
            .catch((err) => {
                console.log(err);
                setAvailableBooks([]);
            });

        axios
            .get(`users/` + localStorage.getItem("userId"))
            .then((res) => {
                setOfferedBooks(res.data.offeredBooksIds);
                console.log(offeredBooks)
            })
            .catch((err) => {
                console.log(err);
                setOfferedBooks([]);
            });
        setLoading(false);
    };

    return (
        <div>
            <div className="App">
                <div style={{display: 'flex', justifyContent:'flex-end', marginTop:20, marginRight:20, flexDirection: "row"}}>

                    {!loggedIn && <Button onClick={handleSignInButton}>Sign in/Sign up</Button>}
                    {loggedIn &&
                    <>
                    <Button onClick={handleProfileButton}>Profile</Button>
                    <Button onClick={handleLogOutButton}>Log out</Button>
                    </>}

                </div>
                <h1>Welcome to BookExchange!</h1>
                {loggedIn && <Button onClick={handleOfferBook}>Offer book</Button>}
                <h2>Available books</h2>
            </div>
            <div style={{ marginBottom: 20 }}>
                {!loading && availableBooks != null && availableBooks.map((book) => {
                    if(offeredBooks.includes(book.id)) {
                        return null;
                    }
                    else {
                        return (
                            <BookCard key={book.id} book={book} available={true}/>
                        );
                    }

                })}
            </div>
        </div>

    );
}

export default Home;
