import './App.css';
import Login from "./components/Loginandregister/Loginandregister"
import Home from "./components/Home/Home"

function App() {

  const LoggedIn = false

  return (
    <div className="App">
      {LoggedIn ? (
        <>
          <Home/>
        </>
      ) : (
        <Home/>
      )}
    </div>
  );
}

export default App;
