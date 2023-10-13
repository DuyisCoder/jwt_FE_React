import './App.scss';
import NavHeader from './Components/Navigation/Nav';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes/AppRoutes';
import { useContext } from 'react';
import { UserContext } from './Context/UserContext';
import { ColorRing } from 'react-loader-spinner';
function App() {

  const { user } = useContext(UserContext);

  return (
    <>

      <Router>
        {user && user.isLoading ?
          <div className='item-loading'>
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          </div> : <>
            <div className='app-header'>
              <NavHeader />
            </div>
            <div className='app-container'>
              <AppRoutes />
            </div>
          </>

        }
      </Router>


      <ToastContainer position="bottom-right"
        autoClose={1500}
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
