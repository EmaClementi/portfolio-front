import React, { useState, useEffect } from 'react';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './SkillsManager.css';

const SkillsManager = () => {
    const { user } = useAuth();
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        nivel: 'BASICO'
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const data = await getSkills();
            setSkills(data);
        } catch (err) {
            setError('Error loading skills');
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
            if (editingId) {
                await updateSkill({ ...formData, id: editingId }, user.token);
            } else {
                await createSkill({ ...formData, userProfileId: user.id }, user.token);
            }
            setFormData({ nombre: '', nivel: 'BASICO' });
            setEditingId(null);
            fetchSkills();
        } catch (err) {
            setError('Failed to save skill');
        }
    };

    const handleEdit = (skill) => {
        setFormData({ nombre: skill.nombre, nivel: skill.nivel });
        setEditingId(skill.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this skill?')) {
            try {
                await deleteSkill(id, user.token);
                fetchSkills();
            } catch (err) {
                setError('Failed to delete skill');
            }
        }
    };

    const handleCancel = () => {
        setFormData({ nombre: '', nivel: 'BASICO' });
        setEditingId(null);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="skills-manager">
            <h3>Manage Skills</h3>

            {error && <div className="error-msg">{error}</div>}

            <form onSubmit={handleSubmit} className="skill-form">
                <input
                    type="text"
                    name="nombre"
                    placeholder="Skill Name (e.g. Java)"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
                <select name="nivel" value={formData.nivel} onChange={handleChange}>
                    <option value="BASICO">Básico</option>
                    <option value="MEDIO">Medio</option>
                    <option value="AVANZADO">Avanzado</option>
                </select>
                <div className="form-actions">
                    <button type="submit">{editingId ? 'Update' : 'Add'}</button>
                    {editingId && <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>}
                </div>
            </form>

            <div className="skills-list">
                {skills.map((skill) => (
                    <div key={skill.id} className="skill-item">
                        <div className="skill-info">
                            <strong>{skill.nombre}</strong>
                            <span className={`badge ${skill.nivel.toLowerCase()}`}>{skill.nivel}</span>
                        </div>
                        <div className="skill-actions">
                            <button onClick={() => handleEdit(skill)} className="edit-btn">Edit</button>
                            <button onClick={() => handleDelete(skill.id)} className="delete-btn">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsManager;
