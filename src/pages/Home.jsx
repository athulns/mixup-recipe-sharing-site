import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios

import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('https://backend-1-yaoz.onrender.com/api/recipes')
      .then(response => {
        setRecipes(response.data); // Load recipes from backend
      })
      .catch(error => {
        console.error("Error fetching recipes:", error);
      });

  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center">Welcome to MixUp Recipe Book</h1>
      <p className="text-center">
        Discover and share delicious recipes from around the world.
      </p>

      {recipes.length === 0 ? (
        <div className="text-center">
          <p>No recipes found. Start by adding your first recipe!</p>
          <Link to="/add-recipe" className="btn btn-primary">
            Add Recipe
          </Link>
        </div>
      ) : (
        <>
          <h2 className="mt-4">Featured Recipes</h2>
          <div className="row">
            {recipes.slice(0, 3).map((recipe) => (
              <div className="col-md-4 mb-4" key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>

          <div className="text-center mt-3">
            <Link to="/recipes" className="btn btn-secondary">
              View All Recipes
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
