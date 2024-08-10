import './App.css';
import Login from "./components/Loginandregister/Loginandregister"
import Home from "./components/Home/Home"
import { Route, Routes } from 'react-router-dom';
import { useAuthContext } from '../context/context';

function App() {

  const {Authuser} = useAuthContext();

  return (
    <div className="App">
      <Routes>
        <Route path={'/login'} element={Authuser ? <Navigate to="/" /> : <Login/>}/>
        <Route path={'/'} element={<Home/>}/>
      </Routes> 
    </div>
  );
}

export default App;
