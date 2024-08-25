import './loginandregister.css'
import { useState } from "react";
import {toast, Toaster} from 'react-hot-toast';
import { useAuthContext } from '../../context/context';

function Login() {

    const {setAuthuser} = useAuthContext()

    const [fname,setFname] = useState("")
    const [lname,setLname] = useState("")
    const [logUsername,setlogUsername] = useState("")
    const [logPassword,setlogPassword] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")


    const handleLogin = async (e) => {
        e.preventDefault();
        if (logUsername === "" || logPassword === "") {
            return toast.error('None of the fields can be empty');
        }
    
        try {
            const res = await fetch('/api/auth/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: logUsername, password: logPassword }) 
            });
    
            if (!res.ok) {
                throw new Error("Failed to log in");
            }

            toast.success('Login successful');
    
            const data = await res.json();

            setTimeout(() => {
                setAuthuser(data);
                localStorage.setItem("chatuser", JSON.stringify(data));
            }, 1000);
            

    
    
        } catch (error) {
            toast.error("Login failed");
            console.log(error.message);
        }
    }
    
    const handleRegister = async (e) => {
        e.preventDefault();
    
        if (fname === "" || lname === "" || username === "" || password === "") {
            return toast.error('None of the fields can be empty');
        } else if (password.length < 6) {
            return toast.error("Password must be at least 6 characters long");
        }
    
        try {
            const res = await fetch('/api/auth/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fname, lname, username, password })
            });
    
            if (!res.ok) {
                throw new Error("Failed to register");
            }
    
            const data = await res.json();
            setAuthuser(data);
            localStorage.setItem("chatuser", JSON.stringify(data));
            toast.success("Registration complete");
    
            window.location.href = '/';
    
        } catch (error) {
            toast.error("Registration failed");
            console.log(error.message);
        }
    }
    


    return (
        <div className="loginandRegister">
            <div className='card-container'>
                    <form className="main-login-form" onSubmit={handleLogin}>
                        <h2>Login</h2>
                        <input className={"main-input"} placeholder={"Username"} value={logUsername} onChange={(e) => setlogUsername(e.target.value)}/>
                        <input className={"main-input"} placeholder={"Password"} type="password" value={logPassword} onChange={(e) => setlogPassword(e.target.value)}/>
                        <div className="options">
                            <input type="checkbox" id="remember" name="remember"/>
                            <label>Remember me</label>
                            <a href="#">Forgot Password?</a>
                        </div>
                        <input type='submit' className='main-login-button' value={"Login"}/>
                        {/* <p>Don't have an account? <button onClick={handleflip} className='main-LogandReg-container-alt'>Register</button></p> */}
                    </form>
                    <form className="main-register-form" onSubmit={handleRegister}>
                        <h2>Register</h2>
                        <input className={"main-input"} placeholder={"First name"} value={fname} onChange={(e) => {setFname(e.target.value)}}/>
                        <input className={"main-input"} placeholder={"Second name"} value={lname} onChange={(e) => {setLname(e.target.value)}}/>
                        <input className={"main-input"} placeholder={"Username"} value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                        <input className={"main-input"} placeholder={"Password"} type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                        <div className="options">
                            <input type="checkbox" id="remember" name="remember"/>
                            <label>Remember me</label>
                        </div>
                        <input type='submit'className={"main-login-button"} onClick={handleRegister} value={"Register"}/>
                        {/* <p>Already have an account? <button onClick={handleflip} className='main-LogandReg-container-alt'>Login</button></p> */}
                    </form>
                </div>
        </div>
    );
}

export default Login;