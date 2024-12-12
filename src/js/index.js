//import react into the bundle
import React from "react";
import ReactDOM from "react-dom/client";


//import your own components
import Home from "./component/home.jsx";

//render your react application
ReactDOM.createRoot(document.getElementById('app')).render(<Home/>);

