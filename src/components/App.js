import React from "react";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import {AuthProvider} from "../context/AuthContext";
import {BrowserRouter as Router, Route, Routes, Link, Switch} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";


function App() {
    return (


        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path='/' element={<PrivateRoute>
                        <Dashboard/>
                    </PrivateRoute>}/>
                    <Route exact path='/update-profile' element={<PrivateRoute>
                        <UpdateProfile/>
                    </PrivateRoute>}/>
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/forgot-password' element={<ForgotPassword/>}/>
                </Routes>
            </AuthProvider>
        </Router>


    );
}

export default App;
