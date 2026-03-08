import React, { useState } from 'react';
import { createContactMessage } from '../../services/api';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    });
    const [status, setStatus] = useState(null); // 'success', 'error', or null
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
        try {
            await createContactMessage(formData);
            setStatus('success');
            setFormData({ nombre: '', email: '', mensaje: '' });
        } catch (error) {
            setStatus('error');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact">
            <h2>Contact</h2>
            <div className="contact-card">
                <form onSubmit={handleSubmit} className="contact-form">
                    <div>
                        <label htmlFor="nombre">Name:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            maxLength="150"
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            maxLength="150"
                        />
                    </div>
                    <div>
                        <label htmlFor="mensaje">Message:</label>
                        <textarea
                            id="mensaje"
                            name="mensaje"
                            value={formData.mensaje}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                    {status === 'success' && <p className="success-msg">Message sent successfully!</p>}
                    {status === 'error' && <p className="error-msg">Error sending message. Please try again.</p>}
                </form>
            </div>
        </section>
    );
};

export default Contact;
