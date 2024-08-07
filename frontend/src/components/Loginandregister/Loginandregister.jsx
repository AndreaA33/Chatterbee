import './loginandregister.css'
import { useState } from "react";
import BG from "../../assets/chatapp-background.jpg"

function Login() {

    const [Name,setName] = useState("")
    const [logUsername,setlogUsername] = useState("")
    const [logPassword,setlogPassword] = useState("")
    const [Username,setUsername] = useState("")
    const [Password,setPassword] = useState("")
    const [logerror, setlogError] = useState("")
    const [error, setError] = useState("")
    const [isLoginorReg,setisLoginorReg] = useState(true)


    function handleLogin() {
        try{
            if (logUsername == "" || logPassword == ""){
                throw new Error('Username or password cannot be empty');
            } else if (logUsername != localStorage.getItem("Username") || logPassword != localStorage.getItem("Password")){
                throw new Error('Invalid username or password');
            } else {
                window.location.href = '/home';
            }
        } catch (logerror) {
            setlogError(logerror.message)
        }
    }

    function handleRegister() {
        try{
            if (Username == "" || Password == "" || Name == ""){
                throw new Error('Name, Username or password cannot be empty');
            } else if (Username == localStorage.getItem("Username")){
                throw new Error('User already exists');
            } else {
                localStorage.setItem("Name",Name)
                localStorage.setItem("Username",Username)
                localStorage.setItem("Password",Password)
                window.location.href = '/home';
            }
        } catch (error) {
            setError(error.message)
        }

    }


    return (
        <div className="loginandRegister">
            <div className='card-container'>
                    <div className="main-login-form">
                        <h2>Login</h2>
                        {logerror && <div className="main-error"><p>{logerror}</p></div>}
                        <input className={"main-input"} placeholder={"Username"} value={logUsername} onChange={(e) => setlogUsername(e.target.value)}/>
                        <input className={"main-input"} placeholder={"Password"} type="password" value={logPassword} onChange={(e) => setlogPassword(e.target.value)}/>
                        <div className="options">
                            <input type="checkbox" id="remember" name="remember"/>
                            <label>Remember me</label>
                            <a href="#">Forgot Password?</a>
                        </div>
                        <button onClick={handleLogin} className='main-login-button'>Login</button>
                        {/* <p>Don't have an account? <button onClick={handleflip} className='main-LogandReg-container-alt'>Register</button></p> */}
                    </div>
                    <div className="main-register-form">
                        <h2>Register</h2>
                        {error && <div className="main-error"><p>{error}</p></div>}
                        <input className={"main-input"} placeholder={"Name"} value={Name} onChange={(e) => {setName(e.target.value)}}/>
                        <input className={"main-input"} placeholder={"Username"} value={Username} onChange={(e) => {setUsername(e.target.value)}}/>
                        <input className={"main-input"} placeholder={"Password"} type="password" value={Password} onChange={(e) => {setPassword(e.target.value)}}/>
                        <div className="options">
                            <input type="checkbox" id="remember" name="remember"/>
                            <label>Remember me</label>
                        </div>
                        <button className={"main-login-button"} onClick={handleRegister}>Register</button>
                        {/* <p>Already have an account? <button onClick={handleflip} className='main-LogandReg-container-alt'>Login</button></p> */}
                    </div>
                </div>
        </div>
    );
}

export default Login;