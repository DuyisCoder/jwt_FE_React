import './register.scss'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
const Register = () => {
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
                            <input type='text' className='form-control' placeholder='@gmail.com...'></input>
                        </div>
                        <div className='form-group'>
                            <label>Phone Number</label>
                            <input type='text' className='form-control' placeholder='Phone number....'></input>
                        </div>
                        <div className='form-group'>
                            <label>Username</label>
                            <input type='text' className='form-control' placeholder='Phone number....'></input>
                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <input type='password' className='form-control' placeholder='Password....'></input>
                        </div>
                        <div className='form-group'>
                            <label>Re-Password</label>
                            <input type='password' className='form-control' placeholder='Password....'></input>
                        </div>

                        <button className='btn btn-primary'>Register</button>
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