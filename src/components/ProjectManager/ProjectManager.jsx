import React, { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import CloudinaryUpload from '../CloudinaryUpload/CloudinaryUpload';
import './ProjectManager.css';

const ProjectManager = () => {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        urlDemo: '',
        urlGithub: '',
        imagenUrl: ''
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const data = await getProjects();
            setProjects(data);
        } catch (err) {
            setError('Error loading projects');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (url) => {
        setFormData((prev) => ({ ...prev, imagenUrl: url }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!user || !user.id) {
            setError('User session missing.');
            return;
        }

        try {
            if (editingId) {
                await updateProject({ ...formData, id: editingId, userProfileId: user.id }, user.token);
            } else {
                await createProject({ ...formData, userProfileId: user.id }, user.token);
            }

            setFormData({
                nombre: '',
                descripcion: '',
                urlDemo: '',
                urlGithub: '',
                imagenUrl: ''
            });
            setEditingId(null);
            fetchProjects();
        } catch (err) {
            setError('Failed to save project');
        }
    };

    const handleEdit = (project) => {
        setFormData({
            nombre: project.nombre,
            descripcion: project.descripcion || '',
            urlDemo: project.urlDemo || '',
            urlGithub: project.urlGithub || '',
            imagenUrl: project.imagenUrl || ''
        });
        setEditingId(project.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteProject(id, user.token);
                fetchProjects();
            } catch (err) {
                setError('Failed to delete project');
            }
        }
    };

    const handleCancel = () => {
        setFormData({
            nombre: '',
            descripcion: '',
            urlDemo: '',
            urlGithub: '',
            imagenUrl: ''
        });
        setEditingId(null);
    };

    if (loading) return <div>Loading projects...</div>;

    return (
        <div className="project-manager">
            <h3>Manage Projects</h3>

            {error && <div className="error-msg">{error}</div>}

            <form onSubmit={handleSubmit} className="project-form">
                <div className="form-group">
                    <label>Project Name</label>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="e.g. Portfolio Website"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="descripcion"
                        placeholder="Brief project description..."
                        value={formData.descripcion}
                        onChange={handleChange}
                        rows="7"
                    ></textarea>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Demo URL</label>
                        <input
                            type="text"
                            name="urlDemo"
                            placeholder="https://demo.com"
                            value={formData.urlDemo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>GitHub URL</label>
                        <input
                            type="text"
                            name="urlGithub"
                            placeholder="https://github.com/user/repo"
                            value={formData.urlGithub}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Project Image</label>
                    <CloudinaryUpload
                        currentImageUrl={formData.imagenUrl}
                        onUploadSuccess={handleImageUpload}
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="save-btn">{editingId ? 'Update Project' : 'Add Project'}</button>
                    {editingId && <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>}
                </div>
            </form>

            <div className="projects-list">
                {projects.map((project) => (
                    <div key={project.id} className="project-item">
                        {project.imagenUrl && (
                            <img src={project.imagenUrl} alt={project.nombre} className="project-thumb" />
                        )}
                        <div className="project-info">
                            <strong>{project.nombre}</strong>
                            <p>{project.descripcion}</p>
                            <div className="project-links">
                                {project.urlDemo && <span className="link-tag">Demo</span>}
                                {project.urlGithub && <span className="link-tag">GitHub</span>}
                            </div>
                        </div>
                        <div className="project-actions">
                            <button onClick={() => handleEdit(project)} className="edit-btn">Edit</button>
                            <button onClick={() => handleDelete(project.id)} className="delete-btn">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectManager;
