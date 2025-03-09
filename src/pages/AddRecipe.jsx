import { useState } from "react";
import axios from "axios"; // Import Axios

import { useNavigate } from "react-router-dom";


const AddRecipe = () => {
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    description: "",
    image: "",
    ingredients: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure no field is empty
    if (!newRecipe.title || !newRecipe.description || !newRecipe.image || !newRecipe.ingredients) {
      alert("Please fill in all fields before adding a recipe.");
      return;
    }

    // Convert ingredients string into an array
    const formattedRecipe = {
      ...newRecipe,
      ingredients: newRecipe.ingredients.split(",").map((item) => item.trim()),
      id: Date.now().toString(), // Generate unique ID for the recipe
    };

    // Send a POST request to the server
    axios.post('https://backend-1-yaoz.onrender.com/api/recipes', formattedRecipe)
      .then(response => {
        alert("Recipe added successfully!");
        // Redirect to the newly added recipe’s detail page
        navigate(`/recipes/${response.data.id}`);
      })
      .catch(error => {
        alert("Error adding recipe: " + error.message);
      });

    // alert("Recipe added successfully!");
    // navigate(`/recipes/${formattedRecipe.id}`);



    alert("Recipe added successfully!");

    // Redirect to the newly added recipe’s detail page
    navigate(`/recipes/${formattedRecipe.id}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Recipe Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={newRecipe.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={newRecipe.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={newRecipe.image}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ingredients (comma-separated)</label>
          <input
            type="text"
            className="form-control"
            name="ingredients"
            value={newRecipe.ingredients}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
