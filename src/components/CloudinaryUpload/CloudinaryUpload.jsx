import React, { useState, useRef } from 'react';
import './CloudinaryUpload.css';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// Debug: verificar que las env vars están cargadas
console.log('[Cloudinary] Cloud Name:', CLOUD_NAME);
console.log('[Cloudinary] Upload Preset:', UPLOAD_PRESET);

const CloudinaryUpload = ({ currentImageUrl, onUploadSuccess }) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState(currentImageUrl || null);
    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file.');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image must be smaller than 5MB.');
            return;
        }

        setError(null);
        setUploading(true);

        // Show local preview immediately
        const localUrl = URL.createObjectURL(file);
        setPreview(localUrl);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', UPLOAD_PRESET);

            const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
            console.log('[Cloudinary] Uploading to:', uploadUrl);
            console.log('[Cloudinary] Using preset:', UPLOAD_PRESET);

            const response = await fetch(uploadUrl, { method: 'POST', body: formData });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error?.message || 'Upload failed');
            }

            const data = await response.json();
            setPreview(data.secure_url);
            onUploadSuccess(data.secure_url);
        } catch (err) {
            setError(err.message || 'Failed to upload image. Check your Cloudinary config.');
            setPreview(currentImageUrl || null);
        } finally {
            setUploading(false);
            // Reset input so the same file can be re-selected if needed
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleRemove = () => {
        setPreview(null);
        setError(null);
        onUploadSuccess('');
    };

    return (
        <div className="cloudinary-upload">
            {preview ? (
                <div className="image-preview-wrapper">
                    <img src={preview} alt="Project preview" className="image-preview" />
                    <div className="image-preview-overlay">
                        <button
                            type="button"
                            className="change-image-btn"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                        >
                            {uploading ? '⏳ Uploading...' : '🔄 Change Image'}
                        </button>
                        <button
                            type="button"
                            className="remove-image-btn"
                            onClick={handleRemove}
                            disabled={uploading}
                        >
                            🗑 Remove
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    className={`upload-area ${uploading ? 'uploading' : ''}`}
                    onClick={() => !uploading && fileInputRef.current?.click()}
                >
                    {uploading ? (
                        <div className="upload-spinner-wrapper">
                            <div className="upload-spinner" />
                            <span>Uploading to Cloudinary...</span>
                        </div>
                    ) : (
                        <>
                            <div className="upload-icon">☁️</div>
                            <p className="upload-text">Click to upload image</p>
                            <p className="upload-hint">PNG, JPG, GIF up to 5MB</p>
                        </>
                    )}
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            {error && <p className="upload-error">⚠️ {error}</p>}
        </div>
    );
};

export default CloudinaryUpload;
