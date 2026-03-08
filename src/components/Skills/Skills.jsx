import React, { useEffect, useState } from 'react';
import { getSkills } from '../../services/api';
import './Skills.css';

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const data = await getSkills();
                setSkills(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    if (loading) return <div>Loading skills...</div>;
    if (error) return <div>Error loading skills: {error}</div>;

    return (
        <section id="skills">
            <h2>Skills</h2>
            <div className="skills-grid">
                {skills.map((skill) => (
                    <div key={skill.id} className="skill-card">
                        <h3>{skill.nombre}</h3>
                        <p>Level: {skill.nivel}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
