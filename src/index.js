import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { AuthProvider } from "./context/AuthContext";
import {Toaster} from "react-hot-toast";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <AuthProvider>
        <div><Toaster/></div>
        <App />
    </AuthProvider>
);


