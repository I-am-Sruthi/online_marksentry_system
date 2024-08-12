import React from "react";
import Login from './Login';
import Register from "./Register";
import FormComponent from "./FormComponent"
import "bootstrap-icons/font/bootstrap-icons.css";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute";
import DoctorProfile from "./Docprofile";
import Camera from "./Camera";
import AppointmentsHistory from "./Userapp";

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/' element={<Login />}></Route>
                <Route path='/upload' element={<DoctorProfile />}></Route>
                <Route path='/camera' element={<Camera />}></Route>
                <Route path='/userapp' element={<AppointmentsHistory />}></Route>
                <Route path="/home" element={<ProtectedRoute><FormComponent /></ProtectedRoute>}></Route>
                
                
            </Routes>

        </BrowserRouter>
        
        
    )
}
export default App;