import React from 'react';
import { useLocation } from 'react-router-dom';

const FlightResult = () => {
    const location = useLocation();
    console.log(location)
    return (
        <div>
            <h2>result</h2>
        </div>
    );
};

export default FlightResult;