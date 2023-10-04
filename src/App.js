import './App.scss';
import Nav from './Components/Navigation/Nav';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';
function App() {
  const [account, setAccount] = useState({});

  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if (session) {
      setAccount(JSON.parse(session));
    }

  }, [])
  return (
    <>
      <Router>
        <div className='app-header'>
          <Nav />
        </div>
        <div className='app-container'>

          <AppRoutes />
        </div>
      </Router>
      <ToastContainer position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      ></ToastContainer>
    </>

  );
}

export default App;
