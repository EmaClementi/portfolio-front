import React, { useEffect, useState } from 'react';
import { getExperience } from '../../services/api';
import '../../components/Timeline.css'; // Shared CSS

const Experience = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const data = await getExperience();
                // Sort by date descending if possible, or trust backend order
                setExperiences(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExperience();
    }, []);

    if (loading) return <div className="loading">Loading experience...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <section id="experience">
            <h2>Experience</h2>
            <div className="timeline">
                {experiences.map((exp) => (
                    <div key={exp.id} className="timeline-item">
                        <div className="timeline-content">
                            <h3>{exp.titulo}</h3>
                            <h4>{exp.empresa}</h4>
                            <p className="timeline-date">{exp.fechaInicio} - {exp.fechaFin || 'Present'}</p>
                            <p className="timeline-description">{exp.descripcion}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
