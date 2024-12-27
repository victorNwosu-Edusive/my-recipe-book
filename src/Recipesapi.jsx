import axios from 'axios';

// Base URL for the MealDB API
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Function to fetch recipes based on search query
export const fetchRecipes = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search.php?s=${query}`);
    return response.data.meals;  // The data contains an array of meals
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};


export const fetchRecipeById = async (idMeal) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
  const data = await response.json();
  return data.meals[0]; // Return the recipe details
};

// Function to fetch recipes by ingredient
export const fetchRecipesByIngredient = async (ingredient) => {
  try {
    const response = await axios.get(`${BASE_URL}/filter.php?i=${ingredient}`);
    return response.data.meals;
  } catch (error) {
    console.error('Error fetching recipes by ingredient:', error);
    return [];
  }
};
