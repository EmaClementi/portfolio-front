import React, { useEffect, useState } from 'react';
import { getEducation } from '../../services/api';
import '../../components/Timeline.css'; // Shared CSS

const Education = () => {
    const [educations, setEducations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper para formatear (YYYY-MM-DD a DD/MM/YYYY)
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const parts = dateString.split('-');
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return dateString;
    };

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const data = await getEducation();
                setEducations(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEducation();
    }, []);

    if (loading) return <div className="loading">Loading education...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <section id="education">
            <h2>Education</h2>
            <div className="timeline">
                {educations.map((edu) => (
                    <div key={edu.id} className="timeline-item">
                        <div className="timeline-content">
                            <h3>{edu.institucion}</h3>
                            <h4>{edu.titulo}</h4>
                            <p className="timeline-date">{formatDate(edu.fechaInicio)} - {edu.fechaFin ? formatDate(edu.fechaFin) : 'Present'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Education;
