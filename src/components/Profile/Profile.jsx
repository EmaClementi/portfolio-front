import React, { useEffect, useState } from 'react';
import { getProfile } from '../../services/api';
import './Profile.css';

const Profile = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfiles(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <div className="loading">Loading profile...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    // Assuming single profile for now
    const profile = profiles[0];
    if (!profile) return null;

    return (
        <section id="profile" className="profile-section">
            <div className="profile-header">
                <h1>{profile.nombre} {profile.apellido}</h1>
                <p className="profile-email">{profile.email}</p>
            </div>
            <div className="profile-content">
                <p className="profile-bio">{profile.descripcion}</p>
            </div>
        </section>
    );
};

export default Profile;
