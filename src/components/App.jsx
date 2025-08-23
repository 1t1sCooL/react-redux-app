import React from 'react';
import './App.less'
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Main from "./main/Main.jsx";
import Card from "./card/Card.jsx";
import Error from "./main/Error.jsx";

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/card/:username/:reponame" element={<Card/>}/>
                <Route path="/error" element={<Error/>}/>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App;