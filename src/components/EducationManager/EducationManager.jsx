import React, { useState, useEffect } from 'react';
import { getEducation, createEducation, updateEducation, deleteEducation } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './EducationManager.css';

const EducationManager = () => {
    const { user } = useAuth();
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        institucion: '',
        titulo: '',
        fechaInicio: '',
        fechaFin: ''
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchEducation();
    }, []);

    const fetchEducation = async () => {
        try {
            const data = await getEducation();
            setEducation(data);
        } catch (err) {
            setError('Error loading education');
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
                fechaFin: formData.fechaFin || null
            };

            if (editingId) {
                await updateEducation({ ...payload, id: editingId }, user.token);
            } else {
                await createEducation({ ...payload, userId: user.id }, user.token);
            }

            setFormData({
                institucion: '',
                titulo: '',
                fechaInicio: '',
                fechaFin: ''
            });
            setEditingId(null);
            fetchEducation();
        } catch (err) {
            setError('Failed to save education');
        }
    };

    const handleEdit = (edu) => {
        setFormData({
            institucion: edu.institucion,
            titulo: edu.titulo || '',
            fechaInicio: edu.fechaInicio,
            fechaFin: edu.fechaFin || ''
        });
        setEditingId(edu.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this education entry?')) {
            try {
                await deleteEducation(id, user.token);
                fetchEducation();
            } catch (err) {
                setError('Failed to delete education');
            }
        }
    };

    const handleCancel = () => {
        setFormData({
            institucion: '',
            titulo: '',
            fechaInicio: '',
            fechaFin: ''
        });
        setEditingId(null);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="education-manager">
            <h3>Manage Education</h3>

            {error && <div className="error-msg">{error}</div>}

            <form onSubmit={handleSubmit} className="education-form">
                <div className="form-group">
                    <input
                        type="text"
                        name="institucion"
                        placeholder="Institution (e.g. University of Tokyo)"
                        value={formData.institucion}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Degree / Title"
                        value={formData.titulo}
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
                <div className="form-actions">
                    <button type="submit">{editingId ? 'Update' : 'Add'}</button>
                    {editingId && <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>}
                </div>
            </form>

            <div className="education-list">
                {education.map((edu) => (
                    <div key={edu.id} className="education-item">
                        <div className="education-info">
                            <strong>{edu.institucion}</strong>
                            <span>{edu.titulo || 'N/A'}</span>
                            <div className="edu-dates">
                                {edu.fechaInicio} - {edu.fechaFin || 'Present'}
                            </div>
                        </div>
                        <div className="education-actions">
                            <button onClick={() => handleEdit(edu)} className="edit-btn">Edit</button>
                            <button onClick={() => handleDelete(edu.id)} className="delete-btn">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EducationManager;
