import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext';
import RecipeCard from './components/RecipeCard';
import NutritionTracker from './components/NutritionTracker';

function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [addedToDaily, setAddedToDaily] = useState({});
  const { updateNutrition, resetDailyNutrition } = useUser();

  useEffect(() => {
    const stored = localStorage.getItem('savedRecipes');
    if (stored) {
      setSavedRecipes(JSON.parse(stored));
    }
  }, []);

  // ─── remove handler ────────────────────────────────────────────────────────
  const handleRemoveRecipe = (recipe) => {
    const updated = savedRecipes.filter(r => r.name !== recipe.name);
    setSavedRecipes(updated);
    localStorage.setItem('savedRecipes', JSON.stringify(updated));
  };

  const handleAddToDaily = (recipe) => {
    updateNutrition(recipe);
    setAddedToDaily(prev => ({
      ...prev,
      [recipe.name]: true
    }));
    setTimeout(() => {
      setAddedToDaily(prev => ({
        ...prev,
        [recipe.name]: false
      }));
    }, 2000);
  };

  return (
    <div style={{ backgroundColor: '#f6f6f6', minHeight: '100vh' }}>
      {/* Navbar */}
      <div style={{
        backgroundColor: '#4c7737',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Link to="/">
          <button style={{
            backgroundColor: '#f06060',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '15px',
          }}>
            Back to Home
          </button>
        </Link>
        <h1 style={{ color: 'white', margin: 0 }}>Saved Recipes</h1>
        <button
          onClick={resetDailyNutrition}
          style={{
            backgroundColor: '#f06060',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '15px',
          }}
        >
          Reset Daily Nutrition
        </button>
      </div>

      {/* Content */}
      <div style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <NutritionTracker />
        </div>

        {savedRecipes.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
            <p>No saved recipes yet. Go generate some recipes!</p>
            <Link to="/recipes">
              <button style={{
                backgroundColor: '#4c7737',
                color: 'white',
                padding: '0.5rem 1rem',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '15px',
                marginTop: '1rem'
              }}>
                Generate Recipes
              </button>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {savedRecipes.map((recipe, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                <h2 style={{ 
                  color: '#4c7737',
                  borderBottom: '2px solid #f06060',
                  paddingBottom: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  {recipe.name}
                </h2>

                <div style={{ marginBottom: '1rem' }}>
                  <h3 style={{ color: '#4c7737', marginBottom: '0.5rem' }}>Ingredients You Have:</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {recipe.usedIngredients.map((ingredient, idx) => (
                      <li key={idx} style={{ margin: '0.25rem 0' }}>
                        <span style={{ color: '#2E7C32', marginRight: '0.5rem' }}>✓</span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ color: '#f06060', marginBottom: '0.5rem' }}>Ingredients to Buy:</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {recipe.missingIngredients.map((ingredient, idx) => (
                        <li key={idx} style={{ margin: '0.25rem 0' }}>
                          <span style={{ color: '#f06060', marginRight: '0.5rem' }}>+</span>
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div style={{ marginBottom: '1rem' }}>
                  <h3 style={{ color: '#4c7737', marginBottom: '0.5rem' }}>Instructions:</h3>
                  <p style={{ lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                    {recipe.instructions}
                  </p>
                </div>

                <div style={{ 
                  display: 'flex', 
                  gap: '1rem',
                  marginTop: '1rem',
                  justifyContent: 'flex-end',
                  alignItems: 'center'
                }}>
                  {addedToDaily[recipe.name] && (
                    <span style={{ 
                      color: '#4c7737',
                      fontWeight: 'bold'
                    }}>
                      ✓ Added to daily nutrition!
                    </span>
                  )}
                  <button
                    onClick={() => handleAddToDaily(recipe)}
                    style={{
                      backgroundColor: '#4c7737',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '15px',
                    }}
                  >
                    Add to Daily Nutrition
                  </button>
                  <button
                    onClick={() => handleRemoveRecipe(recipe)}
                    style={{
                      backgroundColor: '#f06060',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '15px',
                    }}
                  >
                    Remove Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedRecipes; 