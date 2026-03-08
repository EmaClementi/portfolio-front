import React, { useEffect, useState } from 'react';
import { getProjects } from '../../services/api';
import './Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) return <div className="loading">Loading projects...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <section id="projects">
            <h2>Featured Projects</h2>
            <div className="projects-grid">
                {projects.map((project) => (
                    <div key={project.id} className="project-card">
                        <img src={project.imagenUrl || 'https://via.placeholder.com/600x400'} alt={project.nombre} className="project-image" />
                        <div className="project-info">
                            <h3>{project.nombre}</h3>
                            <p>{project.descripcion}</p>
                            <div className="project-links">
                                <a href={project.urlDemo} target="_blank" rel="noopener noreferrer" className="project-link demo">Live Demo</a>
                                <a href={project.urlGithub} target="_blank" rel="noopener noreferrer" className="project-link github">GitHub Repo</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
