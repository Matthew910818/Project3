import React, { useContext } from 'react';
import { FridgeContext } from './FridgeContext';
import { Link } from 'react-router-dom';

function RecipePage() {
    const { items: fridgeItems } = useContext(FridgeContext);

    const handleGenerateRecipes = () => {
        alert('Generating recipes using: ' + fridgeItems.map(item => `${item.quantity} × ${item.name}`).join(', '));
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
                    }}>
                        Back to fridge
                    </button>
                </Link>
                <h1 style={{ color: 'white' }}>Recipe Generator</h1>
                <div></div> {}
            </div>

            <div style={{ padding: '2rem' }}>
                {fridgeItems.length === 0 ? (
                    <p>Your fridge is empty! Go add items.</p>
                ) : (
                    <>
                        <h2>Ingredients:</h2>
                        <ul>
                            {fridgeItems.map((item, i) => (
                                <li key={i}>{item.quantity} × {item.name}</li>
                            ))}
                        </ul>

                        <button
                            onClick={handleGenerateRecipes}
                            style={{
                                marginTop: '1.5rem',
                                backgroundColor: '#f06060',
                                color: 'white',
                                border: 'none',
                                padding: '1rem 2rem',
                                fontSize: '1rem',
                                borderRadius: '6px',
                                cursor: 'pointer',
                            }}
                        >
                            Generate Recipes 
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default RecipePage;
