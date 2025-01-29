import { createContext, useState } from "react";

// Create a context for the current user
const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [curr_user, setCurr_User] = useState(null);
    return (
        <UserContext.Provider value={{ curr_user, setCurr_User }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
