import React from 'react';
import { useUser } from '../UserContext';

function NutritionTracker() {
    const { dailyNutrition, dailyTargets } = useUser();

    const calculateProgress = (current, target) => {
        if (!target) return 0;
        const progress = (current / target) * 100;
        return Math.min(progress, 100); 
    };

    if (!dailyTargets) {
        return (
            <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ color: '#4c7737', marginBottom: '1rem' }}>Daily Nutrition Tracker</h2>
                <p>Please set up your user information to see nutrition tracking.</p>
            </div>
        );
    }

    return (
        <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ color: '#4c7737', marginBottom: '1.5rem' }}>Daily Nutrition Tracker</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span>Calories</span>
                        <span>{dailyNutrition.calories}kcal / {dailyTargets.calories}kcal</span>
                    </div>
                    <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '4px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: `${calculateProgress(dailyNutrition.calories, dailyTargets.calories)}%`,
                            height: '100%',
                            backgroundColor: '#4c7737',
                            transition: 'width 0.3s ease'
                        }} />
                    </div>
                </div>

                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span>Protein</span>
                        <span>{dailyNutrition.protein}g / {dailyTargets.protein}g</span>
                    </div>
                    <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '4px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: `${calculateProgress(dailyNutrition.protein, dailyTargets.protein)}%`,
                            height: '100%',
                            backgroundColor: '#4c7737',
                            transition: 'width 0.3s ease'
                        }} />
                    </div>
                </div>

                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span>Carbohydrates</span>
                        <span>{dailyNutrition.carbs}g / {dailyTargets.carbs}g</span>
                    </div>
                    <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '4px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: `${calculateProgress(dailyNutrition.carbs, dailyTargets.carbs)}%`,
                            height: '100%',
                            backgroundColor: '#4c7737',
                            transition: 'width 0.3s ease'
                        }} />
                    </div>
                </div>

                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span>Fat</span>
                        <span>{dailyNutrition.fat}g / {dailyTargets.fat}g</span>
                    </div>
                    <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '4px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: `${calculateProgress(dailyNutrition.fat, dailyTargets.fat)}%`,
                            height: '100%',
                            backgroundColor: '#4c7737',
                            transition: 'width 0.3s ease'
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NutritionTracker; 