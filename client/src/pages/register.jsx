import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            await api.post('/users/register', formData);
            setMessage('Registration successful! Please log in.');
            setTimeout(() => navigate('/'), 800);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="auth-card">
            <h2 className="text-xl font-semibold mb-4">Register</h2>
            <p>Create your account to make a reservation.</p>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                {message ? <p className="error-text">{message}</p> : null}
                <button type="submit" className="button primary">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;