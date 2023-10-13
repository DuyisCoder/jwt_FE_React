import React, { useContext, useEffect, useState } from 'react'
import './Nav.scss'
import { NavLink, useLocation } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext';
import NavBar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logoutUser } from '../../services/userServices'

import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
export default function NavHeader() {
    const { user, LogoutContext } = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    const handleLogout = async () => {
        let data = await logoutUser(); // xóa cookie
        localStorage.removeItem('jwt'); // xóa local
        LogoutContext(); // set lại userContext
        if (data && +data.EC === 0) {
            toast.success('LogOut success!!')
            history.push('/login');
        } else {
            toast.error('LogOut error!!')
        }
    }

    if (user && user.isAuthenticated === true || location.pathname === '/') {
        return (
            <>
                <div className='nav-header '>
                    <NavBar bg='header' expand='lg'>
                        <Container>
                            <NavBar.Brand href='#' className='logo-nav' >

                                REACT-BOOTSTRAP</NavBar.Brand>
                            <NavBar.Toggle aria-controls='basic-navbar-nav'></NavBar.Toggle>
                            <NavBar.Collapse id='basic-navbar-nav'>
                                <Nav className='me-auto'>
                                    <NavLink exact to="/" className="nav-link">Home</NavLink>
                                    <NavLink to="/users" className='nav-link'>Users</NavLink>
                                    <NavLink to="/project" className='nav-link'>Project</NavLink>
                                    <NavLink to="/about" className='nav-link'>About</NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.isAuthenticated === true ?
                                        <>
                                            <Nav.Item className='nav-link' >
                                                Welcome to {user.account.username}
                                            </Nav.Item>
                                            <NavDropdown title='Settings' id="basic-nav-dropdown">
                                                <NavDropdown.Item className='bg-white' href=''>Change Password</NavDropdown.Item>
                                                <NavDropdown.Divider></NavDropdown.Divider>
                                                <NavDropdown.Item onClick={() => handleLogout()} className='bg-white' href=''>LogOut</NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                        :
                                        <>
                                            <NavLink to="/login" className='nav-link'>Login</NavLink>
                                        </>
                                    }
                                </Nav>
                            </NavBar.Collapse>
                        </Container>
                    </NavBar>
                </div>
            </>
        )
    } else {
        return <></>
    }
}
