// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div style={{ backgroundColor: '#f6f6f6', minHeight: '100vh' }}>
            <div style={{
                backgroundColor: '#4c7737',
                padding: '2rem',
                textAlign: 'center',
            }}>
                <h1 style={{ color: 'white' }}>Welcome to FreshSaver!</h1>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2rem',
                padding: '4rem',
                flexWrap: 'wrap',
            }}>
                <Link to="/fridge">
                    <button style={buttonStyle}>My Fridge</button>
                </Link>

                <Link to="/recipes">
                    <button style={buttonStyle}>Recipe Generator</button>
                </Link>

                <Link to="/saved">
                    <button style={buttonStyle}>Saved Recipes</button>
                </Link>
            </div>
        </div>
    );
}

const buttonStyle = {
    backgroundColor: '#f06060',
    color: 'white',
    padding: '2rem 3rem',
    fontSize: '1.5rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    minWidth: '200px',
    textAlign: 'center',
};

export default Home;
