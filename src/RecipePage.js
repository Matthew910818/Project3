import React, { useContext, useState, useEffect } from 'react';
import { FridgeContext } from './FridgeContext';
import { Link } from 'react-router-dom';
import { generateRecipes } from './openaiService';
import RecipeCard from './components/RecipeCard';

function RecipePage() {
    const { items: fridgeItems } = useContext(FridgeContext);
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // ─── load any previously saved recipes from localStorage ─────────────────
    useEffect(() => {
        const stored = localStorage.getItem('savedRecipes');
        if (stored) {
            setSavedRecipes(JSON.parse(stored));
        }
    }, []);


    const handleGenerateRecipes = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const result = await generateRecipes(fridgeItems);
            setRecipes(result.recipes);
        } catch (err) {
            console.error("Error generating recipes:", err);
            setError("Failed to generate recipes. Please check your API key and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveRecipe = (recipe) => {
        if (!savedRecipes.some(r => r.name === recipe.name)) {
            const updated = [...savedRecipes, recipe];
            setSavedRecipes(updated);
            localStorage.setItem('savedRecipes', JSON.stringify(updated));
        }
    };

    const handleRemoveRecipe = (recipe) => {
        const updated = savedRecipes.filter(r => r.name !== recipe.name);
        setSavedRecipes(updated);
        localStorage.setItem('savedRecipes', JSON.stringify(updated));
    };

    return (
        <div style={{ backgroundColor: '#f6f6f6', minHeight: '100vh' }}>
            <div style={{
                backgroundColor: '#4c7737',
                padding: '1rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Link to="/fridge">
                    <button style={{
                        backgroundColor: '#f06060',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '15px',
                    }}>
                        Back to fridge
                    </button>
                </Link>
                <h1 style={{ color: 'white' }}>Recipe Generator</h1>
                <div></div> {}
            </div>

            {/* Success message */}
            {saveSuccess && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    backgroundColor: '#4c7737',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '8px',
                    zIndex: 1000,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                    animation: 'fadeIn 0.3s'
                }}>
                    Recipe saved successfully! ✓
                </div>
            )}

            <div style={{ 
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                {fridgeItems.length === 0 ? (
                    <p>Your fridge is empty! Go add items.</p>
                ) : (
                    <>
                        {recipes.length === 0 && !isLoading ? (
                            <div style={{
                                backgroundColor: 'white',
                                padding: '2rem',
                                borderRadius: '12px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                width: '100%',
                                maxWidth: '600px',
                                textAlign: 'center',
                                position: 'relative',
                                paddingBottom: '5rem'
                            }}>
                                <h2>Ingredients:</h2>
                                <ul style={{
                                    listStyleType: 'none',
                                    padding: 0,
                                    margin: '1.5rem 0',
                                    textAlign: 'left',
                                    display: 'inline-block'
                                }}>
                                    {fridgeItems.map((item, i) => (
                                        <li key={i} style={{
                                            padding: '8px 16px',
                                            margin: '8px 0',
                                            backgroundColor: '#f9f9f9',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <span style={{ marginRight: '10px' }}>🍽️</span>
                                            {item.quantity} × {item.name}
                                        </li>
                                    ))}
                                </ul>

                                <div style={{
                                    position: 'absolute',
                                    bottom: '1.5rem',
                                    left: '0',
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    <button
                                        onClick={handleGenerateRecipes}
                                        style={{
                                            backgroundColor: '#f06060',
                                            color: 'white',
                                            border: 'none',
                                            padding: '1rem 2rem',
                                            fontSize: '1rem',
                                            borderRadius: '15px',
                                            cursor: 'pointer',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                        }}
                                    >
                                        Generate Recipes 
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div style={{ width: '100%' }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '1.5rem'
                                }}>
                                    <h2 style={{ color: '#4c7737' }}>Recipes Suggestions</h2>
                                    <button
                                        onClick={() => setRecipes([])}
                                        style={{
                                            backgroundColor: '#f06060',
                                            color: 'white',
                                            border: 'none',
                                            padding: '0.5rem 1rem',
                                            fontSize: '0.9rem',
                                            borderRadius: '15px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Back to Ingredients
                                    </button>
                                </div>

                                {isLoading ? (
                                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                                        <p>Generating delicious recipes for you...</p>
                                        <div style={{ margin: '1rem', fontSize: '2rem' }}>🍳</div>
                                    </div>
                                ) : error ? (
                                    <div style={{ 
                                        color: 'red', 
                                        backgroundColor: '#ffeeee', 
                                        padding: '1rem', 
                                        borderRadius: '8px',
                                        marginBottom: '1rem'
                                    }}>
                                        {error}
                                    </div>
                                ) : (
                                    <div>
                                        {recipes.map((recipe, index) => (
                                            <RecipeCard 
                                                key={index} 
                                                recipe={recipe}
                                                onSaveRecipe={handleSaveRecipe}
                                                onRemoveRecipe={handleRemoveRecipe}
                                            />
                                        ))}
                                    </div>
                                )}

                                {!isLoading && !error && (
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                                        <button
                                            onClick={handleGenerateRecipes}
                                            style={{
                                                backgroundColor: '#4c7737',
                                                color: 'white',
                                                border: 'none',
                                                padding: '0.8rem 1.5rem',
                                                fontSize: '1rem',
                                                borderRadius: '15px',
                                                cursor: 'pointer',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                            }}
                                        >
                                            Generate New Recipes
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default RecipePage;
