import React, { useEffect, useState } from 'react';
import { getProfile } from '../../services/api';
import './Contact.css';

const Contact = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                if (data && data.length > 0) {
                    setProfile(data[0]);
                }
            } catch (err) {
                console.error("Error loading profile for contact section:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleCopyEmail = (email) => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <section id="contact">
                <h2>Contact</h2>
                <div className="contact-loading">Loading contact info...</div>
            </section>
        );
    }

    const email = profile?.email || 'emiclementi@hotmail.com';
    const linkedinUrl = profile?.linkedinUrl || 'https://www.linkedin.com/in/emanuel-clementi/';

    return (
        <section id="contact">
            <h2>Contact</h2>
            <p className="contact-subtitle">
                Let's build something together! Feel free to reach out through any of these platforms.
            </p>
            <div className="contact-cards-container">
                {/* Email Card */}
                <div className="contact-card-item email-card">
                    <div className="card-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                    </div>
                    <h3>Email</h3>
                    <p className="contact-value">{email}</p>
                    <div className="card-actions">
                        <button onClick={() => handleCopyEmail(email)} className="contact-btn copy-btn">
                            {copied ? 'Copied! ✓' : 'Copy Email'}
                        </button>
                    </div>
                </div>

                {/* LinkedIn Card */}
                <div className="contact-card-item linkedin-card">
                    <div className="card-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                    </div>
                    <h3>LinkedIn</h3>
                    <p className="contact-value">Let's connect professionally</p>
                    <div className="card-actions">
                        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-btn linkedin-btn">
                            Connect
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
