import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeById } from '../Recipesapi'; // Import the function to fetch a recipe by ID
import africanRecipes from '../recipes.json'; // Assuming your African recipes are in this file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { useUser } from '../UserContext'; // Assuming you have a user context for logged-in state

const RecipeDetailPage = () => {
  const { idMeal } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null); // State to store the recipe data
  const { user, favorites, setFavorites } = useUser(); // Access user and favorites from context

  // Fetch recipe data when the component mounts or idMeal changes
  useEffect(() => {
  const getRecipe = async () => {
    let fetchedRecipe;

    // Try to find African recipe first
    const africanRecipe = africanRecipes.find((r) => r.id === idMeal);

    if (africanRecipe) {
      // Normalize African recipe structure
      fetchedRecipe = { ...africanRecipe, idMeal: africanRecipe.id };
    } else {
      fetchedRecipe = await fetchRecipeById(idMeal);

      // Transform MealDB API ingredients and measures into a standardized array
      fetchedRecipe.ingredients = Object.keys(fetchedRecipe)
        .filter((key) => key.startsWith('strIngredient') && fetchedRecipe[key])
        .map((key) => {
          const index = key.replace('strIngredient', '');
          const measure = fetchedRecipe[`strMeasure${index}`] || '';
          return `${fetchedRecipe[key]} - ${measure}`.trim();
        });
    }

    setRecipe(fetchedRecipe); // Set the recipe data in state
  };

  getRecipe(); // Call the fetch function
}, [idMeal]);

const isLiked = favorites.some((fav) => fav.idMeal === recipe?.idMeal);

const toggleLike = () => {
  if (!user) {
    alert('Please log in to like recipes.');
    return;
  }

  setFavorites((prevFavorites) => {
    if (isLiked) {
      // Remove from favorites
      return prevFavorites.filter((fav) => fav.idMeal !== recipe.idMeal);
    } else {
      // Add to favorites if not already in the list
      if (!prevFavorites.some((fav) => fav.idMeal === recipe.idMeal)) {
        return [...prevFavorites, recipe];
      }
      return prevFavorites;
    }
  });
};


  if (!recipe) {
    return (
      <div className="p-9 pt-40 md:p-40 lg:p-40 bg-[#FFF5E8]">
        <div role="status">
          {/* Loading spinner */}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF5E8] p-9 pt-40 md:p-40 lg:p-40">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl">
        <h1 className="font-globalBold text-3xl md:text-4xl mb-7">{recipe.strMeal || recipe.name}</h1>
        <img src={recipe.strMealThumb || recipe.image} alt={recipe.strMeal || recipe.name} className="w-full rounded-md mb-7" />

        <div className="flex justify-between items-center">
          <button
            className="bg-black text-white text-sm p-1 px-3 rounded-md font-global flex items-center"
            onClick={toggleLike}
            title={isLiked ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FontAwesomeIcon
              icon={isLiked ? faHeartSolid : faHeartRegular}
              className="h-3 mr-3"
            />
            {isLiked ? ' Remove from Favorites' : ' Add to Favorites'}
          </button>
        </div>

        <h2 className="font-globalBold text-xl mt-7 mb-3">Ingredients</h2>
        <ul className="list-disc ml-5 font-global">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="mb-2">
              {ingredient}
            </li>
          ))}
        </ul>

        <h2 className="font-globalBold text-xl mt-7 mb-3">Instructions</h2>
        <p className="font-global text-md">{recipe.strInstructions || recipe.instructions.join(', ')}</p>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
