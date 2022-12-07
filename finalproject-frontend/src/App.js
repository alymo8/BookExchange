import './App.css';
import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import YourBooks from "./pages/YourBooks";

function App() {

  return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="profile" element={<Profile />} />
            <Route path="yourBooks" element={<YourBooks />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
