import React, { useState } from 'react';
import { useUser } from '../UserContext';

function UserInfoModal({ onClose, onSubmit }) {
    const { userInfo, updateUserInfo } = useUser();
    const [formData, setFormData] = useState({
        age: userInfo?.age || '',
        height: userInfo?.height || '',
        weight: userInfo?.weight || '',
        gender: userInfo?.gender || '',
        dietaryRestrictions: userInfo?.dietaryRestrictions || []
    });

    const dietaryOptions = [
        'None',
        'Halal',
        'Kosher',
        'Vegetarian',
        'Vegan',
        'Pork-free',
        'Beef-free',
        'Shellfish-free',
        'Dairy-free',
        'Gluten-free',
        'Nut-free'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserInfo(formData);
        onSubmit(formData);
    };

    const handleDietaryChange = (option) => {
        setFormData(prev => {
            const newRestrictions = prev.dietaryRestrictions.includes(option)
                ? prev.dietaryRestrictions.filter(item => item !== option)
                : [...prev.dietaryRestrictions, option];
            
            return {
                ...prev,
                dietaryRestrictions: newRestrictions
            };
        });
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                width: '90%',
                maxWidth: '500px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}>
                <h2 style={{ color: '#4c7737', marginBottom: '1.5rem' }}>Tell us about yourself</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Age</label>
                        <input
                            type="number"
                            value={formData.age}
                            onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                borderRadius: '8px',
                                border: '1px solid #ddd'
                            }}
                            required
                            min="1"
                            max="120"
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Height (cm)</label>
                        <input
                            type="number"
                            value={formData.height}
                            onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                borderRadius: '8px',
                                border: '1px solid #ddd'
                            }}
                            required
                            min="1"
                            max="300"
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Weight (kg)</label>
                        <input
                            type="number"
                            value={formData.weight}
                            onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                borderRadius: '8px',
                                border: '1px solid #ddd'
                            }}
                            required
                            min="1"
                            max="500"
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Gender</label>
                        <select
                            value={formData.gender}
                            onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                borderRadius: '8px',
                                border: '1px solid #ddd'
                            }}
                            required
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Dietary Restrictions</label>
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
                            gap: '0.5rem' 
                        }}>
                            {dietaryOptions.map((option) => (
                                <label key={option} style={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    padding: '0.5rem',
                                    backgroundColor: formData.dietaryRestrictions.includes(option) ? '#e8f5e9' : 'transparent',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}>
                                    <input
                                        type="checkbox"
                                        checked={formData.dietaryRestrictions.includes(option)}
                                        onChange={() => handleDietaryChange(option)}
                                        style={{ marginRight: '0.5rem' }}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                backgroundColor: '#f06060',
                                color: 'white',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                backgroundColor: '#4c7737',
                                color: 'white',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            Generate Recipes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserInfoModal; 