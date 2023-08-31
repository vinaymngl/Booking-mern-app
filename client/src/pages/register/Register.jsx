import React, { useEffect } from "react";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css"
import useFetch from "./../../hooks/useFetch.js";




const Register = () => {
    const [credentials, setCredentials] = useState({
        firstName: undefined,
        lastName: undefined,
        username: undefined,
        password: undefined,
        confirmPassword: undefined,
        email: undefined,
        isAdmin: false
    });
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [usernameExists, setUsernameExists] = useState(false);
    const [emailExists, setEmailExists] = useState(false);

    const { data, loading, error } = useFetch(`/auth/check?username=${credentials.username}&email=${credentials.email}`);


    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/auth/register", credentials);
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    };
    const handleCheckboxChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.checked }));
    }
    const handlePasswordChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));

    };

    const handlePasswordConfirmationChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        setPasswordsMatch(credentials.confirmPassword === credentials.password);

    };
    return (
        <div className="register">
            
                <div className="rContainer">
                <div className="nameContainer">
                    <input
                        type="text"
                        placeholder="First Name"
                        id="firstName"
                        onChange={handleChange}
                        className="rInputLeft"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        id="lastName"
                        onChange={handleChange}
                        className="rInputRight"
                        required
                    />
                </div>
                <div className="nameContainer">
                <input
                    type="text"
                    placeholder="please Enter username"
                    id="username"
                    onChange={handleChange}
                    className="rInputLeft"
                    required
                />
                <input
                    type="email"
                    placeholder="Enter Your Email"
                    id="email"
                    onChange={handleChange}
                    className="rInputRight"
                    pattern="[^ @]*@[^ @]*"
                    required
                />
                {data && <p className="data">Username of Email already exists.</p>}
                </div>
                
                <div className="nameContainer">
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={handlePasswordChange}
                    className="rInputLeft"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    onChange={handlePasswordConfirmationChange}
                    className="rInputRight"
                    required
                />
                {!passwordsMatch && credentials.confirmPassword !== undefined &&
                    <p style={{ color: 'red' }}>Passwords do not match</p>
                }
                </div>
                <div className="checkBox">
                    <p style={{ margin: "0" }}>Are you an Admin?</p>
                    <input
                        type="checkbox"
                        id="isAdmin"
                        checked={credentials.isAdmin}
                        onChange={handleCheckboxChange}
                    />
                </div>
                <button onClick={handleClick} disabled={!passwordsMatch && (credentials.confirmPassword == undefined || credentials.password == undefined) && data} className="lButton">
                    Register
                </button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    )

}

export default Register;
