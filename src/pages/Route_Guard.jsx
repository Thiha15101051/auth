import Cookies from "js-cookie";
import React from "react";
import Login from "./Login";

const Route_Guard = ({children}) => {
    const token=Cookies.get('token');
    if (token) {
        return <div>
            {children}
        </div>
    }else{
        return <Login/>
    }
};

export default Route_Guard;
