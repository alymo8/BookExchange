import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Tab from "@mui/material/Tab";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from "axios";
import BookCard from "../components/BookCard";
import Bar from "../components/AppBar";

const YourBooks = () => {

    const [value, setValue] = React.useState("borrowed");
    const [borrowedBooks, setBorrowedBooks] = React.useState([]);
    const [offeredBooks, setOfferedBooks] = React.useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        loadData();
        setLoading(false);
        // eslint-disable-next-line
    }, []);

    const loadData = () => {
        setLoading(true);
        axios
            .get(`users/` + localStorage.getItem("userId") + `/borrowed`)
            .then((res) => {
                setBorrowedBooks(res.data);
            })
            .catch((err) => {
                console.log(err);
                setBorrowedBooks([]);
            });
        axios
            .get(`users/` + localStorage.getItem("userId") + `/offered`)
            .then((res) => {
                setOfferedBooks(res.data);
            })
            .catch((err) => {
                console.log(err);
                setOfferedBooks([]);
            });
        setLoading(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(value)
    };

    return (
        <>
            <Bar/>
            <div style={{display: 'flex', justifyContent:'center', marginTop:20}}>
                <h1>Your books</h1>
            </div>
            <div style={{justifyContent:'center', marginTop:20}}>
                <TabContext value={value}>
                    <div style={{display: 'flex', justifyContent:'center', marginTop:20}}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="userBooks" centered>
                                <Tab label="Borrowed" value="borrowed" />
                                <Tab label="Offered" value="offered" />
                            </TabList>
                        </Box>
                    </div>
                    <div style={{ justifyContent:'center', marginTop:20}}>
                        <TabPanel value="borrowed">{!loading && borrowedBooks.map((book) => {
                            return (
                                <BookCard key={book.id} book={book} offered={false} />
                            );
                        })}
                        </TabPanel>
                        <TabPanel value="offered">{!loading && offeredBooks.map((book) => {
                            return (
                                <BookCard key={book.id} book={book} offered={true}/>
                            );
                        })}
                        </TabPanel>
                    </div>
                </TabContext>
            </div>


        </>
    )
}

export default YourBooks