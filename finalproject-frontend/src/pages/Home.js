import React, {useEffect, useState} from "react";
import BookCard from "../components/BookCard";
import axios from "axios";
import Bar from "../components/AppBar";


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
                <h1>Welcome to BookExchange!</h1>
                <h2>Available books</h2>
            </div>
            <div style={{ marginBottom: 20 }}>
                {!loading && availableBooks != null && availableBooks.map((book) => {
                    if(offeredBooks.includes(book.id)) {
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
