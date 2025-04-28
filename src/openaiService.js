import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

/**
 * Generate recipe suggestions based on available ingredients
 * @param {Array} ingredients - Array of ingredient objects with name and quantity
 * @returns {Promise<Object>} - Object containing suggested recipes and missing ingredients
 */
export const generateRecipes = async (ingredients) => {
    try {
        const ingredientsList = ingredients.map(item => `${item.quantity} ${item.name}`).join(', ');
        
        const prompt = `
I have the following ingredients in my fridge: ${ingredientsList}.

Please suggest 3 different recipes I can make with these ingredients. For each recipe:
1. Provide a name for the dish
2. List the ingredients needed from my fridge WITH SPECIFIC MEASUREMENTS (in grams or pounds)
3. If there are essential ingredients missing, suggest what I need to buy WITH SPECIFIC MEASUREMENTS
4. Give brief cooking instructions
5. Calculate and provide accurate nutrition information per serving:
   - Calculate calories based on ingredients used
   - Calculate protein (g) based on ingredients used
   - Calculate carbohydrates (g) based on ingredients used
   - Calculate fat (g) based on ingredients used

Format your response in JSON like this:
{
  "recipes": [
    {
      "name": "Recipe Name",
      "servings": 4,
      "usedIngredients": ["200g ingredient1 (150 calories, 8g protein)", "1 pound ingredient2 (300 calories, 15g protein)"],
      "missingIngredients": ["100g missing1", "1/2 pound missing2"],
      "instructions": "Brief cooking instructions here",
      "nutrition": {
        "perServing": {
          "calories": 450,
          "protein": 25,
          "carbs": 35,
          "fat": 12
        }
      }
    },
    ...
  ]
}

Please ensure nutrition calculations are accurate based on the actual ingredients and quantities used in each recipe.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful cooking assistant who specializes in creating recipes from available ingredients." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" }
        });

        const responseText = completion.choices[0].message.content;
        return JSON.parse(responseText);
        
    } catch (error) {
        console.error('Error generating recipes:', error);
        throw error;
    }
}; 