import './App.css';
import Login from "./components/Loginandregister/Loginandregister"
import Home from "./components/Home/Home"
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/context';
import {Toaster} from 'react-hot-toast';

function App() {

  const {Authuser} = useAuthContext();

  return (
    <div className="App">
      <Toaster
        position="top-center"
        reverseOrder={false}
        />
      <Routes>
        <Route path={'/'} element={Authuser ? <Home/> : <Navigate to='/login'/>} />
        <Route path={'/login'} element={Authuser ? <Navigate to='/'/> : <Login/>}/>
      </Routes> 
    </div>
  );
}

export default App;
