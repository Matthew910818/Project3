import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);

  // load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('savedRecipes');
    if (stored) {
      setSavedRecipes(JSON.parse(stored));
    }
  }, []);

  // ─── remove handler ────────────────────────────────────────────────────────
  const handleRemoveRecipe = (name) => {
    const updated = savedRecipes.filter(r => r.name !== name);
    setSavedRecipes(updated);
    localStorage.setItem('savedRecipes', JSON.stringify(updated));
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
            Home
          </button>
        </Link>
        <h1 style={{ color: 'white' }}>Saved Recipes</h1>
        <div></div>
      </div>

      {/* Content */}
      <div style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {savedRecipes.length === 0
          ? <p>No recipes saved yet.</p>
          : savedRecipes.map((recipe, idx) => (
              <div key={idx} style={{
                marginBottom: '2rem',
                padding: '1.5rem',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}>
                <h2 style={{ color: '#4c7737' }}>{recipe.name}</h2>
                <h4>Ingredients You Have:</h4>
                <ul>
                  {recipe.usedIngredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
                {recipe.missingIngredients?.length > 0 && (
                  <>
                    <h4>Ingredients to Buy:</h4>
                    <ul>
                      {recipe.missingIngredients.map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                  </>
                )}
                <h4>Instructions:</h4>
                <p style={{ whiteSpace: 'pre-wrap' }}>
                  {recipe.instructions}
                </p>
                {/* ─── Remove button ──────────────────────────────────────────────── */}
                <div style={{ textAlign: 'right', marginTop: '1rem' }}>
                  <button
                    onClick={() => handleRemoveRecipe(recipe.name)}
                    style={{
                      backgroundColor: '#f06060',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  );
}

export default SavedRecipes; 