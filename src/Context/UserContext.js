import React, { useState, useEffect } from 'react'
import { getUserAccount } from '../services/userServices';
const UserContext = React.createContext(null);
const UserProvider = ({ children }) => {
    const defaultUser = {
        isLoading: true,
        isAuthenticated: false,
        token: "",
        account: {}
    }
    const [user, setUser] = useState(defaultUser);
    const LoginContext = (userData) => {
        setUser({ ...userData, isLoading: false });
        console.log("Check user from context", userData);
    };
    const LogoutContext = () => {
        setUser({ ...defaultUser, isLoading: false });

    }
    const fetchUser = async () => {
        let res = await getUserAccount();
        if (res && res.EC === 0) {
            let groupWithRoles = res.DT.groupWithRoles;
            let email = res.DT.email;
            let username = res.DT.username;
            let token = res.DT.access_token;
            let data = {
                isAuthenticated: true,
                token: token,
                account: { groupWithRoles, email, username },
                isLoading: false
            };
            setUser(data);
        } else {
            setUser({ ...defaultUser, isLoading: false })
        }
    }
    useEffect(() => {
        // && window.location.pathname !== '/login'
        if (window.location.pathname !== '/' && window.location.pathname !== '/login') {
            fetchUser();
        } else {
            setUser({ ...user, isLoading: false });
        }
    }, [])
    return (
        <>
            <UserContext.Provider value={{ user, LoginContext, LogoutContext }}>
                {children}
            </UserContext.Provider>
        </>
    )
}
export { UserProvider, UserContext }
