import React from 'react';
import Profile from '../../components/Profile/Profile';
import Skills from '../../components/Skills/Skills';
import Projects from '../../components/Projects/Projects';
import Experience from '../../components/Experience/Experience';
import Education from '../../components/Education/Education';
import Contact from '../../components/Contact/Contact';

const Home = () => {
    return (
        <div className="home-container">
            <header>
                {/* Semantic header - can be enhanced later with nav */}
            </header>
            <main>
                <Profile />
                <Skills />
                <Projects />
                <Experience />
                <Education />
                <Contact />
            </main>
            <footer>
                <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
