//import firestore
import { projectFirestore } from "../firebase/config";

import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Trashcan from "../assets/trash-can.svg";
// styles
import "./RecipeList.css";

export default function RecipeList({ recipes }) {
  const { mode } = useTheme();

  //Check if there is a recipe with the requested search
  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>;
  }

  //DELETE RECIPE FUNCTION
  const handleClick = (id) => {
    projectFirestore.collection("recipes").doc(id).delete();
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img
            className="delete"
            src={Trashcan}
            onClick={() => handleClick(recipe.id)}
            alt="Trash can"
          />
        </div>
      ))}
    </div>
  );
}
