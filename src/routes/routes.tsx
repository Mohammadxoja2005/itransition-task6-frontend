import { createBrowserRouter, useNavigate} from "react-router-dom";
// pages
import MAIN from "../pages/main";
import LOGIN from "../pages/login";

// const navigate = useNavigate(); 


export const router = createBrowserRouter([
    {
        path: "/",
        element: localStorage.getItem("userIndex") ? <MAIN /> : <LOGIN />
    },
    // {
    //     path: "/",
    //     element: <LOGIN />
    // },
])