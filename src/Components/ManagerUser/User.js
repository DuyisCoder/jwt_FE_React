import React from 'react'
import './User.scss'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function User() {
    const navigate = useNavigate();
    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (!session) {
            navigate('/login');
        }
    }, [])
    return (
        <div>
            <h1>User</h1>
        </div>
    )
}
