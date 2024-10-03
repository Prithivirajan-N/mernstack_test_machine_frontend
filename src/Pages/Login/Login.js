// src/Pages/Login/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Custom CSS
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages

        try {
            const response = await axios.post('http://localhost:8005/login', {
                email: formData.email,
                password: formData.password,
            });

            const { token,user} = response.data; // Destructure response data
            localStorage.setItem('token', token); // Store token in local storage
            localStorage.setItem('userName',user);
            console.log(user) // Assuming response.data.user contains the username

            setMessage("User logged in successfully");
            setMessageType('success');
            

         // Call the callback to update the parent component
            navigate('/'); // Redirect to home or another page
        } catch (error) {
            console.error('Error during login:', error);
            if (error.response) {
                setMessage(error.response.data.message || 'Error during login');
            } else {
                setMessage('Server error');
            }
            setMessageType('error');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                    <p className="text-center mt-3">
                        Don't have an account? <Link to={'/register'}>Signup</Link>
                    </p>
                </form>
                {message && (
                    <p className={`message ${messageType}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;
