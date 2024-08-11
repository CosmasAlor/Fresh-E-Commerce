import {createContext, useState } from "react";

export let UserContext = createContext();

// eslint-disable-next-line react/prop-types
export default function UserContextProvider({children}) {
    
const [userData, setUserData] = useState(null);

    return <UserContext.Provider value={{userData , setUserData}}>
        {children}
    </UserContext.Provider>
}