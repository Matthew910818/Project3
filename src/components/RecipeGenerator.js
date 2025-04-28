import React, { useState, useEffect } from 'react';
import { generateRecipes } from '../openaiService';
import RecipeCard from './RecipeCard';
import { useNavigate } from 'react-router-dom';
import { useFridge } from '../FridgeContext';
import { useUser } from '../UserContext';

function RecipeGenerator() {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const navigate = useNavigate();
    const { items } = useFridge();
    const { userInfo, updateUserInfo } = useUser();

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (!storedUserInfo) {
            setShowUserModal(true);
        }
    }, []);

    const handleUserInfoSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newUserInfo = {
            age: Number(formData.get('age')),
            height: Number(formData.get('height')),
            weight: Number(formData.get('weight')),
            gender: formData.get('gender'),
            dietaryRestrictions: formData.get('dietaryRestrictions')
        };
        
        updateUserInfo(newUserInfo);
        setShowUserModal(false);
        setIsLoading(true);
        try {
            const result = await generateRecipes(items);
            setRecipes(result.recipes);
        } catch (error) {
            console.error('Error generating recipes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateRecipes = async () => {
        if (!localStorage.getItem('userInfo')) {
            setShowUserModal(true);
            return;
        }
        setShowUserModal(false);
        setIsLoading(true);

        try {
            const result = await generateRecipes(items);
            setRecipes(result.recipes);
        } catch (error) {
            console.error('Error generating recipes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#f6f6f6', minHeight: '100vh', paddingBottom: '2rem' }}>
            <div style={{
                backgroundColor: '#4c7737',
                padding: '1rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        backgroundColor: '#f06060',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '15px',
                    }}
                >
                    Back to Home
                </button>
                <h1 style={{ color: 'white', margin: 0 }}>Recipe Generator</h1>
                <button
                    onClick={handleGenerateRecipes}
                    style={{
                        backgroundColor: '#f06060',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '15px',
                    }}
                >
                    Generate Recipes
                </button>
            </div>

            {showUserModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: '8px',
                        width: '90%',
                        maxWidth: '500px'
                    }}>
                        <h2 style={{ color: '#4c7737', marginBottom: '1.5rem' }}>Please Enter Your Information</h2>
                        <form onSubmit={handleUserInfoSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                                    Age:
                                    <input
                                        type="number"
                                        name="age"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            marginTop: '0.25rem',
                                            borderRadius: '4px',
                                            border: '1px solid #ccc'
                                        }}
                                    />
                                </label>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                                    Height (cm):
                                    <input
                                        type="number"
                                        name="height"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            marginTop: '0.25rem',
                                            borderRadius: '4px',
                                            border: '1px solid #ccc'
                                        }}
                                    />
                                </label>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                                    Weight (kg):
                                    <input
                                        type="number"
                                        name="weight"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            marginTop: '0.25rem',
                                            borderRadius: '4px',
                                            border: '1px solid #ccc'
                                        }}
                                    />
                                </label>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                                    Gender:
                                    <select
                                        name="gender"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            marginTop: '0.25rem',
                                            borderRadius: '4px',
                                            border: '1px solid #ccc'
                                        }}
                                    >
                                        <option value="">Select gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </label>
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                                    Dietary Restrictions:
                                    <textarea
                                        name="dietaryRestrictions"
                                        placeholder="Enter any dietary restrictions..."
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            marginTop: '0.25rem',
                                            borderRadius: '4px',
                                            border: '1px solid #ccc',
                                            minHeight: '100px'
                                        }}
                                    />
                                </label>
                            </div>
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: '#4c7737',
                                    color: 'white',
                                    padding: '0.75rem 1.5rem',
                                    border: 'none',
                                    borderRadius: '15px',
                                    cursor: 'pointer',
                                    width: '100%'
                                }}
                            >
                                Save Information
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {isLoading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <h2>Generating Recipes...</h2>
                        <p>Please wait while we create personalized recipes for you.</p>
                    </div>
                </div>
            )}

            <div style={{
                maxWidth: '800px',
                margin: '2rem auto',
                padding: '0 1rem',
            }}>
                {recipes.map((recipe, index) => (
                    <RecipeCard
                        key={index}
                        recipe={recipe}
                    />
                ))}
            </div>
        </div>
    );
}

export default RecipeGenerator; 