import { useState } from 'react';
import './register.scss'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const Register = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const isValidate = () => {
        if (!email) {
            toast.success("Email is required!!")
            return false;
        }
        if (!phone) {
            toast.error("Email is required!!")
            return false;
        }
        if (!username) {
            toast.error("Email is required!!")
            return false;
        }
        if (!password) {
            toast.error("Email is required!!")
            return false;
        }
        if (password != confirmPassword) {
            toast.error('Password not the same!!');
            return false;
        }
        let regex = /^\S+@\S+\.\S+$/;
        if (!regex.test(email)) {
            toast.error('Email is not validation!!');
            return false;
        }

        return true;
    }
    const handleSubmit = () => {
        let check = isValidate();
        let userData = { email, phone, username, password };
        console.log("userData", userData);
    }

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }
    return (
        <div className='register-container'>
            <div className='container'>
                <div className='row px-3 px-sm-0'>
                    <div className='content-left col-12 col-sm-7 d-sm-block d-none '>
                        <div className='brand'>
                            Facebook
                        </div>
                        <div className='detail'>
                            Learning everything..............
                        </div>
                    </div>
                    <div className='content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3 '>
                        <div className='brand d-sm-none'>Facebook</div>
                        <div className='form-group'>
                            <label>Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type='text' className='form-control' placeholder='@gmail.com...'></input>
                        </div>
                        <div className='form-group'>
                            <label>Phone Number</label>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type='text' className='form-control' placeholder='Phone number....'></input>
                        </div>
                        <div className='form-group'>
                            <label>Username</label>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} type='text' className='form-control' placeholder='Phone number....'></input>
                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' className='form-control' placeholder='Password....'></input>
                        </div>
                        <div className='form-group'>
                            <label>Re-Password</label>
                            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type='password' className='form-control' placeholder='Password....'></input>
                        </div>

                        <button className='btn btn-primary' onClick={() => handleSubmit()}>Register</button>
                        <hr></hr>
                        <div className='text-center'>
                            <span>Already have account?</span>
                            <button className='btn btn-success' onClick={(e) => handleLogin()}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;