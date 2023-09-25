import {createBrowserRouter} from "react-router-dom";
import {Home} from "../pages/Home/index.jsx";
import {SingUp} from "../pages/SingUp/index.jsx";
import App from "../App";
import {Activation} from "../pages/activation/index.jsx";


export default createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "/",
                index: true,
                Component: Home
            },
            {
                path: "/singup",
                Component: SingUp
            },
            {
                path: "/activation/:activationToken",
                Component: Activation
            }
        ]
    }
])