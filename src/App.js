
import './App.scss';
import Login from './Components/Login/Login'
import Nav from './Components/Navigation/Nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/Register/Register';

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
    </Router>

  );
}

export default App;
