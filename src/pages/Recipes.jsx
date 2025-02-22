import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { getRecipes } from "../data/recipes";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(getRecipes(false)); // Load recipes from localStorage
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Recipes</h2>
      {recipes.length === 0 ? (
        <p className="text-center">No recipes found. Try adding some!</p>
      ) : (
        <div className="row">
          {recipes.map((recipe) => (
            <div className="col-md-4 mb-4" key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;
