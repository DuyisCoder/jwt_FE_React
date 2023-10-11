import React, { useContext, useEffect, useState } from 'react'
import './Nav.scss'
import { NavLink, useLocation } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext';
export default function Nav() {
    const { user } = useContext(UserContext);
    const location = useLocation();

    if (user && user.isAuthenticated === true || location.pathname === '/') {
        return (
            <>
                <div className="topnav">
                    <NavLink exact to="/">Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/project">Project</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            </>
        )
    } else {
        return <></>
    }
}
