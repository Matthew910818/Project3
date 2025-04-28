import React, { useState } from 'react';

function RecipeCard({ recipe, onSaveRecipe, onRemoveRecipe }) {
    const [isSelected, setIsSelected] = useState(false);

    const handleCheckboxChange = () => {
        const newSelectedState = !isSelected;
        setIsSelected(newSelectedState);
        
        if (newSelectedState) {
            onSaveRecipe && onSaveRecipe(recipe);
        } else {
            onRemoveRecipe && onRemoveRecipe(recipe);
        }
    };

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            margin: '1rem 0',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            maxWidth: '600px',
            width: '100%',
            position: 'relative'
        }}>
            <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                <label htmlFor={`recipe-${recipe.name}`} style={{ 
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    color: '#4c7737'
                }}>
                    {isSelected ? 'Saved' : 'Save Recipe'}
                </label>
                <input
                    id={`recipe-${recipe.name}`}
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleCheckboxChange}
                    style={{
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer',
                        accentColor: '#4c7737'
                    }}
                />
            </div>

            <h2 style={{ 
                color: '#4c7737',
                borderBottom: '2px solid #f06060',
                paddingBottom: '0.5rem',
                marginBottom: '1rem',
                paddingRight: '7rem'
            }}>
                {recipe.name}
            </h2>
            
            <div style={{ margin: '1rem 0' }}>
                <h3 style={{ color: '#4c7737' }}>Ingredients You Have:</h3>
                <ul style={{ marginBottom: '1rem' }}>
                    {recipe.usedIngredients.map((ingredient, index) => (
                        <li key={index} style={{ margin: '0.25rem 0' }}>
                            <span style={{ color: '#2E7C32' }}>✓</span> {ingredient}
                        </li>
                    ))}
                </ul>
                
                {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
                    <>
                        <h3 style={{ color: '#f06060' }}>Ingredients to Buy:</h3>
                        <ul style={{ marginBottom: '1rem' }}>
                            {recipe.missingIngredients.map((ingredient, index) => (
                                <li key={index} style={{ margin: '0.25rem 0' }}>
                                    <span style={{ color: '#f06060' }}>+</span> {ingredient}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
            
            <div style={{ margin: '1rem 0' }}>
                <h3 style={{ color: '#4c7737' }}>Instructions:</h3>
                <p style={{ lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                    {recipe.instructions}
                </p>
            </div>
        </div>
    );
}

export default RecipeCard; 