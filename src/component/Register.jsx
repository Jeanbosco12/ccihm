import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios'; // Add axios for making API requests
import '../css/register.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Perform your registration logic here
        if (password === confirmPassword) {
            try {
                // Send a confirmation code to the email address
                const response = await axios.post('/api/send-confirmation-code', { email });

                if (response.status === 200) {
                    Swal.fire({ title: 'Confirmation code sent!', text: 'Please check your email.', icon: 'success' });
                    navigate('/confirm-email'); // Navigate to the confirmation page
                } else {
                    Swal.fire({ title: 'Failed!', text: 'Failed to send confirmation code.', icon: 'error' });
                }
            } catch (error) {
                Swal.fire({ title: 'Failed!', text: 'Failed to send confirmation code.', icon: 'error' });
            }
        } else {
            Swal.fire({ title: 'Failed!', text: 'Passwords do not match.', icon: 'error' });
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">
                        Register
                    </button>
                </form>
                <div className="login-link">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;