import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios


const Recipes = () => {
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
