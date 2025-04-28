import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import MyFridge from './MyFridge';
import RecipePage from './RecipePage';
import SavedRecipes from './SavedRecipes';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/fridge" element={<MyFridge />} />
                <Route path="/recipes" element={<RecipePage />} />
                <Route path="/saved" element={<SavedRecipes />} />
            </Routes>
        </Router>
    );
}

export default App;
