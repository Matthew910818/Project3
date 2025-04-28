import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [userInfo, setUserInfo] = useState(null);
    const [dailyNutrition, setDailyNutrition] = useState({
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
    });

    useEffect(() => {
        const savedUserInfo = localStorage.getItem('userInfo');
        const savedNutrition = localStorage.getItem('dailyNutrition');
        
        if (savedUserInfo) {
            setUserInfo(JSON.parse(savedUserInfo));
        }
        if (savedNutrition) {
            setDailyNutrition(JSON.parse(savedNutrition));
        }
    }, []);

    const updateUserInfo = (newInfo) => {
        setUserInfo(newInfo);
        localStorage.setItem('userInfo', JSON.stringify(newInfo));
    };

    const updateNutrition = (recipe) => {
        const nutritionInfo = recipe.nutrition?.perServing || recipe.nutrition;
        
        if (!nutritionInfo) {
            console.warn('No nutrition information found for recipe:', recipe.name);
            return;
        }

        const newNutrition = {
            calories: dailyNutrition.calories + nutritionInfo.calories,
            protein: dailyNutrition.protein + nutritionInfo.protein,
            carbs: dailyNutrition.carbs + nutritionInfo.carbs,
            fat: dailyNutrition.fat + nutritionInfo.fat
        };
        
        setDailyNutrition(newNutrition);
        localStorage.setItem('dailyNutrition', JSON.stringify(newNutrition));
    };

    const resetDailyNutrition = () => {
        const resetNutrition = {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0
        };
        setDailyNutrition(resetNutrition);
        localStorage.setItem('dailyNutrition', JSON.stringify(resetNutrition));
    };

    const calculateDailyTargets = () => {
        if (!userInfo) return null;

        const { age, height, weight, gender } = userInfo;
        
        let bmr;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        const dailyCalories = Math.round(bmr * 1.55);

        return {
            calories: dailyCalories,
            protein: Math.round(weight * 2.2), 
            carbs: Math.round(dailyCalories * 0.5 / 4), 
            fat: Math.round(dailyCalories * 0.3 / 9) 
        };
    };

    return (
        <UserContext.Provider value={{
            userInfo,
            updateUserInfo,
            dailyNutrition,
            updateNutrition,
            resetDailyNutrition,
            dailyTargets: calculateDailyTargets()
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
} 