import React, { useEffect, useState } from 'react'
import './Nav.scss'
import { NavLink, useLocation } from 'react-router-dom'
export default function Nav() {
    const [showNav, setShowNav] = useState(true);
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/login') {
            setShowNav(false);
        }
    }, [])
    return (
        <>
            {showNav === true &&
                <div className="topnav">
                    <NavLink className="active" exact to="/">Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/project">Project</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            }
        </>
    )
}
