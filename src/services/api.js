const API_URL = 'https://portfolio-t3zi.onrender.com';

export const get = async (endpoint) => {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

export const post = async (endpoint, data) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

export const getProfile = async () => {
    return await get('/profile');
};

export const getProfileById = async (id) => {
    return await get(`/profile/${id}`);
};

export const getSkills = async () => {
    return await get('/skills');
};

export const getProjects = async () => {
    return await get('/projects');
};

export const getExperience = async () => {
    return await get('/experience');
};

export const getEducation = async () => {
    return await get('/education');
};

export const createContactMessage = async (data) => {
    return await post('/contact', data);
};

// Skills Management
export const createSkill = async (data, token) => {
    const response = await fetch(`${API_URL}/skills`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create skill');
    return response.json();
};

export const updateSkill = async (data, token) => {
    const response = await fetch(`${API_URL}/skills`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update skill');
    return response.json();
};

export const deleteSkill = async (id, token) => {
    const response = await fetch(`${API_URL}/skills/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error('Failed to delete skill');
    return true;
};

// Experience Management
export const createExperience = async (data, token) => {
    const response = await fetch(`${API_URL}/experience`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create experience');
    return response.json();
};

export const updateExperience = async (data, token) => {
    const response = await fetch(`${API_URL}/experience`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update experience');
    return response.json();
};

export const deleteExperience = async (id, token) => {
    const response = await fetch(`${API_URL}/experience/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error('Failed to delete experience');
    return true;
};

// Education Management
export const createEducation = async (data, token) => {
    const response = await fetch(`${API_URL}/education`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create education');
    return response.json();
};

export const updateEducation = async (data, token) => {
    const response = await fetch(`${API_URL}/education`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update education');
    return response.json();
};

export const deleteEducation = async (id, token) => {
    const response = await fetch(`${API_URL}/education/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error('Failed to delete education');
    return true;
};

// Profile Management
export const updateProfile = async (data, token) => {
    const response = await fetch(`${API_URL}/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
};

// Project Management
export const createProject = async (data, token) => {
    const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create project');
    return response.json();
};

export const updateProject = async (data, token) => {
    const response = await fetch(`${API_URL}/projects`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update project');
    return response.json();
};

export const deleteProject = async (id, token) => {
    const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error('Failed to delete project');
    return true;
};

