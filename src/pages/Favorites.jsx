import React from "react";
import { useUser } from "../UserContext";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Favorites = () => {
  const { user, favorites } = useUser();

  if (!user) {
    return (
      <div className="p-9 pt-40 md:p-40 lg:p-40 bg-[#FFF5E8] h-auto">
        <p className="font-global text-2xl md:text-4xl lg:text-4xl mb-5">
          Please login to view your favorites.
        </p>
      </div>
    );
  }

  return (
    <div className="p-9 pt-40 md:p-40 lg:p-40 bg-[#FFF5E8] h-lvh">
      <h1 className="font-global text-2xl md:text-4xl lg:text-4xl mb-6">Your Favorite Recipes</h1>
      {favorites.length > 0 ? (
        <div className="flex flex-wrap gap-5">
          {favorites.map((recipe) => (
            <div key={recipe.idMeal} className="w-full md:w-56 lg:w-56 bg-white p-3 pb-5 rounded-md">
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h2 className="text-xl font-globalBold mb-4">{recipe.strMeal}</h2>
              <a
                    href={`https://www.themealdb.com/meal/${recipe.idMeal}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-sm rounded-md px-4 bg-[#FFA52F] text-white font-globalBold hover:bg-black duration-300"
                  >
                    View Recipe <FontAwesomeIcon icon={faBook} />
                  </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-md font-global">No favorite recipes yet.</p>
      )}
    </div>
  );
};

export default Favorites;