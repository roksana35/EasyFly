import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Main from "../layout/Main";
import FlightResult from "../components/FlightResult";


const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/flight-results',
                element:<FlightResult></FlightResult>
            }
        ]
            
        
    }
]);

export default router; 