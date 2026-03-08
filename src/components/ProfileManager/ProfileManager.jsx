import React, { useState, useEffect } from 'react';
import { getProfileById, updateProfile } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './ProfileManager.css';

const ProfileManager = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        titulo: '',
        descripcion: '',
        fotoUrl: '',
        ubicacion: '',
        githubUrl: '',
        linkedinUrl: '',
        email: ''
    });

    useEffect(() => {
        if (user && user.id) {
            fetchProfile();
        }
    }, [user]);

    const fetchProfile = async () => {
        try {
            const data = await getProfileById(user.id);
            setFormData({
                nombre: data.nombre || '',
                apellido: data.apellido || '',
                titulo: data.titulo || '',
                descripcion: data.descripcion || '',
                fotoUrl: data.fotoUrl || '',
                ubicacion: data.ubicacion || '',
                githubUrl: data.githubUrl || '',
                linkedinUrl: data.linkedinUrl || '',
                email: data.email || ''
            });
        } catch (err) {
            setError('Error loading profile data');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSuccess(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (!user || !user.id) {
            setError('User session missing.');
            return;
        }

        try {
            await updateProfile({ ...formData, id: user.id }, user.token);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError('Failed to update profile');
        }
    };

    if (loading) return <div>Loading profile...</div>;

    return (
        <div className="profile-manager">
            <h3>Edit Profile</h3>

            {error && <div className="error-msg">{error}</div>}
            {success && <div className="success-msg">Profile updated successfully!</div>}

            <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Professional Title</label>
                    <input
                        type="text"
                        name="titulo"
                        placeholder="e.g. Fullstack Developer"
                        value={formData.titulo}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Personal Description</label>
                    <textarea
                        name="descripcion"
                        rows="5"
                        value={formData.descripcion}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Photo URL</label>
                        <input
                            type="text"
                            name="fotoUrl"
                            placeholder="https://..."
                            value={formData.fotoUrl}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input
                            type="text"
                            name="ubicacion"
                            placeholder="e.g. Buenos Aires, Argentina"
                            value={formData.ubicacion}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>GitHub URL</label>
                        <input
                            type="text"
                            name="githubUrl"
                            placeholder="https://github.com/..."
                            value={formData.githubUrl}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>LinkedIn URL</label>
                        <input
                            type="text"
                            name="linkedinUrl"
                            placeholder="https://linkedin.com/in/..."
                            value={formData.linkedinUrl}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="save-btn">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default ProfileManager;
