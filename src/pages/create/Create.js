//import firestore
import {projectFirestore} from '../../firebase/config'

import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import React from "react";
//Style
import "./Create.css";


function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [Ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const history = useHistory();

  //const { postData, data, error} = useFetch('http://localhost:3000/recipes', 'POST');

  //INSERT THE NEW RECIPE FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();
    //Add recipes to db.json
    const doc = { title, Ingredients, method, cookingTime: cookingTime + ' minutes'};

    //Check if the insert works without error
    try{
      //Insert the new recipe into database
      projectFirestore.collection('recipes').add(doc);
      history.push('/');
    }catch(err){
      console.log(err);
    }
    
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !Ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  

  return (
    <div className="create">
      <h2 className="page-title">Add a new recipe</h2>

      <form onSubmit={handleSubmit}>
        {/* Insert recipe title */}
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        {/* Insert the ingredients */}
        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button className="btn" onClick={handleAdd}>
              Add
            </button>
          </div>
        </label>
        <p>Current ingredients: {Ingredients.map(i => <em key={i}>{i}, </em>)}</p>

        {/* Insert the cooking passages */}
        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>cooking time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className="btn">Submit</button>
      </form>
    </div>
  );
}

export default Create;
