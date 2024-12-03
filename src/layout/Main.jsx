import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;