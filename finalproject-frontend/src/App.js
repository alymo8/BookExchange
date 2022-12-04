import './App.css';
import ProfileCard from "./components/ProfileCard";
import React from "react";
import BookCard from "./components/BookCard";

function App() {

    const user = {
        name: "Aly",
        username: "aly1",
        email: "aly@mail.com",
        phoneNumber: "321233"
    }

    const book = {
        name: "Messi the GOAT",
        author: "Aly Mohamed",
        isbn: "aaaadew34rwadsdc",
        available: "Available"
    }
  return (
    <div className="App">
        <h1>hi</h1>
        <ProfileCard key = {null} user = {user}/>
        <BookCard key = {null} book = {book}/>
    </div>
  );
}

export default App;
