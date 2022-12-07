import React, {useEffect, useState} from "react";
import BookCard from "../components/BookCard";
import axios from "axios";
import Bar from "../components/AppBar";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from '@mui/icons-material/Search';
import BookIcon from '@mui/icons-material/Book';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";


function Home() {

    const [availableBooks, setAvailableBooks] = useState([]);
    const [offeredBooks, setOfferedBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const handleBookSearch = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchButton = (event) => {
        console.log(searchValue)
        // setSearchValue(event.target.value);
    };

    const loggedIn = (() => {
        console.log("user", localStorage.getItem("userId"))
        if (localStorage.getItem("userId") != null) {
            return true;
        } else {
            return false
        }
    })();

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
        <>
        <Bar/>
        <div>
            <div className="App">
                <div style={{display: 'flex', justifyContent:'center', marginTop:20}}>
                        <BookIcon style={{ fontSize:"100", fill:'mediumseagreen'}}/>
                        <h1 style={{marginTop:20}}>Xchange</h1>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop:20
                    }}
                >
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search for books to borrow"
                            inputProps={{ 'book': 'search for a book' }}
                            onChange={handleBookSearch}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearchButton}>
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </div>

            </div>
            <div style={{ marginBottom: 20 }}>
                {!loading && availableBooks != null && availableBooks.map((book) => {
                    if(offeredBooks.includes(book.id) || !book.name.toLowerCase().includes(searchValue.toLowerCase())) {
                        return null;
                    }
                    else {
                        return (
                            <BookCard key={book.id} book={book} available={true} loggedIn={loggedIn}/>
                        );
                    }

                })}
            </div>
        </div>
            </>

    );
}

export default Home;
