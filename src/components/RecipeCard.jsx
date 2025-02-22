import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="card shadow-sm border-0">
      <img src={recipe.image} className="card-img-top" alt={recipe.title} />
      <div className="card-body">
        <h5 className="card-title">{recipe.title}</h5>
        <p className="card-text text-muted">{recipe.description.substring(0, 100)}...</p>
        <Link to={`/recipe/${recipe.id}`} className="btn btn-primary">View Recipe</Link>
      </div>
    </div>
  );
};

export default RecipeCard;
