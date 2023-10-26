import React,{useState} from 'react';
import userContext from "./userContext";
const UserProvider = ({children}) => {
    const [token,setToken] = useState(null);
    return (
        <userContext.Provider value={{token,setToken}}>{children}</userContext.Provider>
    );
}

export default UserProvider;
