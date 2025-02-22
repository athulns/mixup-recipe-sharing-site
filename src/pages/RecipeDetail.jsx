import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRecipes } from "../data/recipes";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const allRecipes = getRecipes();
    setRecipes(allRecipes);

    // Convert ID to number (if applicable) and find the current recipe
    const selectedRecipe = allRecipes.find((r) => r.id === id);
    setRecipe(selectedRecipe);
  }, [id]);

  // Function to navigate between recipes
  const handleNavigate = (direction) => {
    if (recipes.length === 0 || !recipe) return;

    const currentIndex = recipes.findIndex((r) => r.id === id);
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === "prev") {
      newIndex = currentIndex === 0 ? recipes.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === recipes.length - 1 ? 0 : currentIndex + 1;
    }

    // 🔹 Correct URL structure (`/recipe/:id` NOT `/recipes/:id`)
    navigate(`/recipe/${recipes[newIndex].id}`);
  };

  if (!recipe) return <h2 className="text-center mt-5">Recipe Not Found</h2>;

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left: Recipe Image */}
        <div className="col-md-6 d-flex align-items-center">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="img-fluid rounded shadow"
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </div>

        {/* Right: Recipe Details */}
        <div className="col-md-6">
          <h2>{recipe.title}</h2>
          <p className="text-muted">{recipe.description}</p>

          <h4>Ingredients:</h4>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Navigation Buttons (Fixed URL Issue) */}
      <div className="d-flex justify-content-center mt-5 mb-3">
        <button className="btn btn-outline-secondary me-3" onClick={() => handleNavigate("prev")}>
          ← Previous Recipe
        </button>
        <button className="btn btn-outline-secondary" onClick={() => handleNavigate("next")}>
          Next Recipe →
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;
