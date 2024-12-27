import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipes } from "../Recipesapi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useUser } from "../UserContext"; // Assuming you're using a UserContext to manage user state
import { Link } from "react-router-dom";

const SearchResultsPage = () => {
  const { query } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likedRecipes, setLikedRecipes] = useState({});
  const { user, favorites, setFavorites } = useUser(); // Access user and favorites from context

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true);
      const fetchedRecipes = await fetchRecipes(query);
      setRecipes(fetchedRecipes);
      setLoading(false);
    };

    getRecipes();
  }, [query]);

  // Toggle the "liked" state for a recipe
  const toggleLike = (recipe) => {
    if (!user) {
      alert("Please log in to like recipes.");
      return;
    }

    setLikedRecipes((prev) => ({
      ...prev,
      [recipe.idMeal]: !prev[recipe.idMeal],
    }));

    setFavorites((prev) => {
      const isFavorite = prev.find((fav) => fav.idMeal === recipe.idMeal);
      if (isFavorite) {
        return prev.filter((fav) => fav.idMeal !== recipe.idMeal); // Remove from favorites
      } else {
        return [...prev, recipe]; // Add to favorites
      }
    });
  };

  return (
    <div className="bg-[#FFF5E8] p-9 pt-40 md:p-40 lg:p-40">
      <h1 className="font-globalBold text-center text-2xl md:text-4xl lg:text-4xl mb-7">
        - Search Results for "{query}" -
      </h1>

      {loading ? (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-slate-300 fill-[#FFA52F]"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-center md:justify-normal lg:justify-normal gap-5">
          {recipes && recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe.idMeal} className="w-full md:w-56 lg:w-56 bg-white p-3 pb-5 rounded-md">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="" />
                <h2 className="text-xl font-globalBold mb-4">{recipe.strMeal}</h2>
                <p className="font-global text-md mb-5">
                  <span className="px-2 p-1 font-bold text-slate-400 rounded-full text-[13px] bg-slate-200">
                    {recipe.strArea}
                  </span>{" "}
                  - {recipe.strCategory}
                </p>
                <div className="flex justify-between">
                <Link
                  to={`/recipe/${recipe.idMeal}`}
                    href={`https://www.themealdb.com/meal/${recipe.idMeal}`}
                    rel="noopener noreferrer"
                    className="p-3 text-sm rounded-md px-4 bg-[#FFA52F] text-white font-globalBold hover:bg-black duration-300"
                  >
                    View Recipe <FontAwesomeIcon icon={faBook} />
                  </Link>
                  <button
                    className="bg-black text-white p-1 px-3 rounded-md"
                    title="favorites"
                    onClick={() => toggleLike(recipe)}
                  >
                    <FontAwesomeIcon
                      icon={likedRecipes[recipe.idMeal] ? faHeartSolid : faHeartRegular}
                      className="h-5"
                    />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-md font-global">No recipes found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;