import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SkillsManager from '../../components/SkillsManager/SkillsManager';
import ExperienceManager from '../../components/ExperienceManager/ExperienceManager';
import EducationManager from '../../components/EducationManager/EducationManager';
import ProfileManager from '../../components/ProfileManager/ProfileManager';
import ProjectManager from '../../components/ProjectManager/ProjectManager';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(null);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Admin Dashboard</h2>
                <div className="user-info">
                    <span>Welcome, {user?.email}</span>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </header>
            <main className="dashboard-content">
                {activeSection ? (
                    <div className="section-container">
                        <button onClick={() => setActiveSection(null)} className="back-btn">← Back to Menu</button>
                        {activeSection === 'skills' && <SkillsManager />}
                        {activeSection === 'experience' && <ExperienceManager />}
                        {activeSection === 'education' && <EducationManager />}
                        {activeSection === 'profile' && <ProfileManager />}
                        {activeSection === 'projects' && <ProjectManager />}
                    </div>
                ) : (
                    <>
                        <p>Select a section to edit:</p>
                        <div className="dashboard-grid">
                            <div className="dashboard-card">
                                <h3>Profile</h3>
                                <p>Edit your personal information</p>
                                <button onClick={() => setActiveSection('profile')}>Manage Profile</button>
                            </div>
                            <div className="dashboard-card">
                                <h3>Skills</h3>
                                <p>Manage your technical skills</p>
                                <button onClick={() => setActiveSection('skills')}>Manage Skills</button>
                            </div>
                            <div className="dashboard-card">
                                <h3>Projects</h3>
                                <p>Add or update your projects</p>
                                <button onClick={() => setActiveSection('projects')}>Manage Projects</button>
                            </div>
                            <div className="dashboard-card">
                                <h3>Experience</h3>
                                <p>Update your work history</p>
                                <button onClick={() => setActiveSection('experience')}>Manage Experience</button>
                            </div>
                            <div className="dashboard-card">
                                <h3>Education</h3>
                                <p>Update your educational background</p>
                                <button onClick={() => setActiveSection('education')}>Manage Education</button>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
