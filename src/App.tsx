import { useState } from 'react'
import Auth from './components/Auth'
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import './App.css'

export default function App() {

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="" />
                    <Route path="" />
                    <Route path="" />
                </Routes>
            </Router>
        </div>
    )
}


