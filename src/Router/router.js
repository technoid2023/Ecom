import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';


import Error from '../Pages/Error';
import UserLogin from '../Pages/Login';

import Sidebarmenu from '../Pages/Menubar';


import Reset from '../Pages/ResetPassword';

import Register from '../Pages/Registration';
import Update from '../Pages/UserUpdate';
import Captcha from '../Pages/Captcha';
import Profile from '../Module/Profile/Profile';





function MyRoute() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/captcha" element={<Captcha />} />
            <Route path='/reset'  element={<Reset/>}/>
            <Route path="/dashboard" element={<Sidebarmenu />}>
                <Route path='profile'  element={<Profile/>}/>
                <Route path='update-user'  element={<Update/>}/>

                <Route path="*" element={<Error />} />
            </Route>
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default MyRoute;

