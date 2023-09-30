
import './App.scss';
import Login from './Components/Login/Login'
import Nav from './Components/Navigation/Nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/Register/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}

function App() {
  return (
    <Router>
      <div className='app-container'>
        {/* <Nav></Nav> */}
        <Routes>
          <Route path="/" exact  >home</Route>
          <Route path="/news" >News</Route>
          <Route path="/about" >About</Route>
          <Route path="/contact" >Contact</Route>

          <Route path='/login' element={<Login></Login>} />
          <Route path='/register' element={<Register></Register>} />

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <ToastContainer position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      ></ToastContainer>
    </Router>

  );
}

export default App;
