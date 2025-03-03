import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

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
  return data.meals[0]; 
};

export const fetchRecipesByIngredient = async (ingredient) => {
  try {
    const response = await axios.get(`${BASE_URL}/filter.php?i=${ingredient}`);
    return response.data.meals;
  } catch (error) {
    console.error('Error fetching recipes by ingredient:', error);
    return [];
  }

  

};

export const fetchRecipesByCategory = async (category) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const data = await response.json();
    return data.meals; 
  } catch (error) {
    console.error("Error fetching recipes by category:", error);
    return [];
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const data = await response.json();
    return data.categories; // Returns the array of categories
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
