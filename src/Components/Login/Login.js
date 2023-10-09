import './login.scss'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import { loginUser } from '../../services/userServices';
const Login = () => {
    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const handleCreateAccount = () => {
        history.push('/register');
    }
    const defaultValidInput = {
        isValidLogin: true,
        isValidPassword: true,
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);
    const handleLogin = async () => {
        setObjCheckInput(defaultValidInput);
        if (!valueLogin) {
            setObjCheckInput({ ...defaultValidInput, isValidLogin: false });
            toast.error('Please enter your email address and phone number!')
            return;
        }
        if (!password) {
            setObjCheckInput({ ...defaultValidInput, isValidPassword: true });
            toast.error('Please enter your password!')
            return;

        }
        let res = await loginUser(valueLogin, password);
        if (res && +res.EC === 0) {
            toast.success(res.EM);
            let data = {
                isAuthenticated: true,
                token: 'fake token'
            }
            sessionStorage.setItem('account', JSON.stringify(data));

            history.push('/users');
            window.location.reload();
            return;
        }
        if (res && +res.EC !== 0) {
            toast.error(res.EM);
            return;
        }
    }
    const handlePressEnter = (e) => {
        console.log(e.charCode, e.key);
        if (e.charCode === 13 && e.code === "Enter") {
            handleLogin();
        }
    }
    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (session) {
            history.push('/');
            window.location.reload();
        }
    })
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
                            value={valueLogin}
                            onChange={(e) => setValueLogin(e.target.value)}
                            className={objCheckInput.isValidLogin ? 'form-control' : 'form-control is-invalid'}
                            placeholder='Email and phone number....'></input>
                        <input type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={(e) => handlePressEnter(e)}
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