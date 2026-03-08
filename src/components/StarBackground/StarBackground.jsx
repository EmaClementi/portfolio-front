import React from 'react';
import './StarBackground.css';

const StarBackground = () => {
    return (
        <div className="star-background">
            <div className="nebula"></div>
            <div className="stars-container">
                <div className="star-layer stars-1"></div>
                <div className="star-layer stars-2"></div>
                <div className="star-layer stars-3"></div>
            </div>
        </div>
    );
};

export default StarBackground;
