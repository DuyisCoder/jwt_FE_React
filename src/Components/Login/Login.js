import './login.scss'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import axios from 'axios'
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {
        axios.post('http://localhost:8888/api/v1/login', {
            email, password
        })
        toast.success('Đăng nhập thành công!');
        // navigate('/Home')
    }
    const handleCreateAccount = () => {
        navigate('/register');
    }
    const defaultValidInput = {
        isValidEmail: true,
        isValidPassword: true,
        isValidConfirmPassword: true
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

    return (
        <div className='login-container'>
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
                        <input type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                            placeholder='Email and phone number....'></input>
                        <input type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                            placeholder='Password....'></input>
                        <button className='btn btn-primary' onClick={() => handleLogin()}>Login</button>
                        <span className='text-center'>
                            <a className='forgot-password'>Forgot your password?</a>
                        </span>
                        <hr></hr>
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={(e) => handleCreateAccount()}>Create new account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;