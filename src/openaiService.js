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
2. List the ingredients needed from my fridge
3. If there are essential ingredients missing, suggest what I need to buy
4. Give brief cooking instructions

Format your response in JSON like this:
{
  "recipes": [
    {
      "name": "Recipe Name",
      "usedIngredients": ["ingredient1", "ingredient2"],
      "missingIngredients": ["missing1", "missing2"],
      "instructions": "Brief cooking instructions here"
    },
    ...
  ]
}
`;

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