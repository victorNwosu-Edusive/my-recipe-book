import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Navbar from './components/Navbar';
import Homepage from './pages/Home';
import Categories from './pages/Categories';
import Favorites from './pages/Favorites';
import { UserProvider } from "./UserContext";
import SearchResultsPage from "./pages/SearchResults";
import RecipeDetailPage from "./pages/RecipeDetails";
import CategoryRecipesPage from "./pages/CategoriesRecipe";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />, // Navbar includes the Outlet
    children: [
      {
        index: true,
        element: <Homepage />, // Render Homepage for the index route
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "category/:category",
        element: <CategoryRecipesPage />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "search/:query",  // Dynamic route for search results
        element: <SearchResultsPage />,
      },
      {
        path: "recipe/:idMeal",  // Dynamic route for search results
        element: <RecipeDetailPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
    <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
