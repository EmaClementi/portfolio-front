import React, { useState, useEffect } from 'react';
import { getExperience, createExperience, updateExperience, deleteExperience } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './ExperienceManager.css';

const ExperienceManager = () => {
    const { user } = useAuth();
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        titulo: '',
        empresa: '',
        descripcion: '',
        fechaInicio: '',
        fechaFin: ''
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const data = await getExperience();
            setExperiences(data);
        } catch (err) {
            setError('Error loading experiences');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!user || !user.id) {
            setError('User ID missing. Please relogin.');
            return;
        }

        try {
            const payload = {
                ...formData,
                fechaFin: formData.fechaFin || null // Ensure empty string is null for backend
            };

            if (editingId) {
                await updateExperience({ ...payload, id: editingId }, user.token);
            } else {
                await createExperience({ ...payload, userId: user.id }, user.token);
            }

            setFormData({
                titulo: '',
                empresa: '',
                descripcion: '',
                fechaInicio: '',
                fechaFin: ''
            });
            setEditingId(null);
            fetchExperiences();
        } catch (err) {
            setError('Failed to save experience');
        }
    };

    const handleEdit = (exp) => {
        setFormData({
            titulo: exp.titulo,
            empresa: exp.empresa || '',
            descripcion: exp.descripcion || '',
            fechaInicio: exp.fechaInicio,
            fechaFin: exp.fechaFin || ''
        });
        setEditingId(exp.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this experience?')) {
            try {
                await deleteExperience(id, user.token);
                fetchExperiences();
            } catch (err) {
                setError('Failed to delete experience');
            }
        }
    };

    const handleCancel = () => {
        setFormData({
            titulo: '',
            empresa: '',
            descripcion: '',
            fechaInicio: '',
            fechaFin: ''
        });
        setEditingId(null);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="experience-manager">
            <h3>Manage Experience</h3>

            {error && <div className="error-msg">{error}</div>}

            <form onSubmit={handleSubmit} className="experience-form">
                <div className="form-group">
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Job Title (e.g. Senior Developer)"
                        value={formData.titulo}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="empresa"
                        placeholder="Company Name"
                        value={formData.empresa}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Start Date:</label>
                    <input
                        type="date"
                        name="fechaInicio"
                        value={formData.fechaInicio}
                        onChange={handleChange}
                        required
                    />
                    <label>End Date (Optional):</label>
                    <input
                        type="date"
                        name="fechaFin"
                        value={formData.fechaFin}
                        onChange={handleChange}
                    />
                </div>
                <textarea
                    name="descripcion"
                    placeholder="Description of your roles and achievements"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows="4"
                ></textarea>
                <div className="form-actions">
                    <button type="submit">{editingId ? 'Update' : 'Add'}</button>
                    {editingId && <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>}
                </div>
            </form>

            <div className="experience-list">
                {experiences.map((exp) => (
                    <div key={exp.id} className="experience-item">
                        <div className="experience-info">
                            <strong>{exp.titulo}</strong> at {exp.empresa || 'N/A'}
                            <div className="exp-dates">
                                {exp.fechaInicio} - {exp.fechaFin || 'Present'}
                            </div>
                        </div>
                        <div className="experience-actions">
                            <button onClick={() => handleEdit(exp)} className="edit-btn">Edit</button>
                            <button onClick={() => handleDelete(exp.id)} className="delete-btn">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperienceManager;
