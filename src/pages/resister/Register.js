import axios  from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./register.css";


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [file, setFile] = useState('');
    

    const handelSubmit = async(e) => {
        e.preventDefault();
        setError(false);
        const user = {
            username,
            email,
            password,
            profilePic:file
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename)
            data.append("file", file)
            user.profilePic = filename;
            try{
              await axios.post("/upload", data);
            }catch(err){
              console.log(err);
            }
          }
        try{
            const res = await axios.post("https://sandip-blog-api.herokuapp.com/api/auth/register", user);
            res.data && window.location.replace("/login")
        } catch(err){
            setError(true);
        }
    } 
    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handelSubmit}>
            <div className="settings">
                {file && <img
                src={file && URL.createObjectURL(file)}
                alt=""
                />}
                <label htmlFor="fileInput">
                <i className="settingsIcon far fa-user-circle"></i>{" "}
                </label>
                <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                className="settingsInput"
                onChange={(e) => setFile(e.target.files[0])}
                />
            </div>
                <label>Username</label>
                <input 
                    required
                    onChange={e => setUsername(e.target.value)} 
                    className="registerInput" 
                    type="text"
                    placeholder="Enter your username..." 
                 />
                <label>Email</label>
                <input
                    required
                    onChange={e => setEmail(e.target.value)} 
                    className="registerInput" 
                    type="email" 
                    placeholder="Enter your email..." 
                />
                <label>Password</label>
                <input 
                    required
                    onChange={e => setPassword(e.target.value)} 
                    className="registerInput" type="password" 
                    placeholder="Enter your password..." 
                />
                <button type="submit" className="registerButton">Register</button>
            </form>
                <Link className="link" to="/login">
                    <button className="registerLoginButton"> Login</button>
                </Link>
                {error && <>
                    <span className="error">Something went wrong!!</span><span className="error"> (Username or email is/are already in use)</span>
                        </>}
            
    </div>
    )
}

export default Register
