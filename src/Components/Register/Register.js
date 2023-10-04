import { useState } from 'react';
import './register.scss'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser } from '../services/userServices';
const Register = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidUsername: true,
        isValidPassword: true,
        isValidConfirmPassword: true
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);
    const isValidate = () => {
        setObjCheckInput(defaultValidInput);
        if (!email) {
            toast.error("Email is required!!")
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        let regex = /^\S+@\S+\.\S+$/;
        if (!regex.test(email)) {
            toast.error('Email is not validation!!');
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        if (!phone) {
            toast.error("Phone is required!!")
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
            return false;
        }
        if (!username) {
            toast.error("Username is required!!")
            setObjCheckInput({ ...defaultValidInput, isValidUsername: false });
            return false;
        }
        if (!password) {
            toast.error("Password is required!!")
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            return false;
        }
        if (password.length < 6) {
            toast.error('Password length is max 6!')
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            return false;
        }
        if (password != confirmPassword) {
            toast.error('Password not the same!!');
            setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
            return false;
        }
        return true;
    }
    const handleSubmit = async () => {
        let check = isValidate();
        if (check == true) {
            let res = await registerUser(email, phone, username, password);
            let dataServer = res.data;
            if (+dataServer.EC === 0) {
                toast.success(dataServer.EM);
                setTimeout(() => {
                    navigate('/login');
                }, [1500])
            } else {
                if (+dataServer.EC === 2) {
                    setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
                    toast.error(dataServer.EM);
                } else if (+dataServer.EC === 1) {
                    setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
                    toast.error(dataServer.EM);
                }
            }
        }
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
                            <input value={email} onChange={(e) => setEmail(e.target.value)}
                                type='text'
                                className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                                placeholder='@gmail.com...'></input>
                        </div>
                        <div className='form-group'>
                            <label>Phone Number</label>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)}
                                className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'}
                                type='text' placeholder='Phone number....'></input>
                        </div>
                        <div className='form-group'>
                            <label>Username</label>
                            <input value={username} onChange={(e) => setUsername(e.target.value)}
                                className={objCheckInput.isValidUsername ? 'form-control' : 'form-control is-invalid'}
                                type='text' placeholder='Phone number....'></input>
                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)}
                                type='password' placeholder='Password....'
                                className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}></input>
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