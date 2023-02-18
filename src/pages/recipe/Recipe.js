//import firestore
import {projectFirestore} from '../../firebase/config'

//Style
import "./Recipe.css";

import React from "react";
import { useEffect, useState } from "react";
//Use useParams to fetch the parameters contained in db.json so we can show the page with dynamic id
import { useParams, useHistory } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

function Recipe() {

  const { id } = useParams();
  const { mode } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    setIsPending(true);

    //need to retrive the information of the article with a specific id
    const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc) => {
      //Check if the recipe exist
      if(doc.exists) {
        setIsPending(false);
        setRecipe(doc.data());
      }else{
        setIsPending(false);
        setError('Cant load the recipe')
      }
    }, (err) => {
      setError(err.message);
      setIsPending(false);
    })

    //Cleanup function to stop the listener onSnapshot
    return () => unsub();

  }, [id]);

  //Handle click to update the recipe
  const handleClick = () => {
    projectFirestore.collection('recipes').doc(id).update({
      title: 'Some title'
    })
  }

  const history = useHistory();
  //Redirect to homepage if, for exemple, the user tries to go to a url with inexistent id
  useEffect(() => {
    //The user is redirected only if there is an actual error
    if(error) {
      //history.goBack();
      setTimeout(() => {
        //Return to the homepage
        history.push('/');
      }, 2000);
    }
  }, [error, history])

  return (
    <div className={`recipe ${mode}`}>
      {/* While is loading */}
      {isPending && <div className='loading'>Loading...</div>}

      {/* If there is an error */}
      {error && <div className='error'>{error}</div>}

      {/* Print the information about the article */}
      {recipe && (
        <div>
          <h2 className='page-title'>{recipe.title}</h2>
          <p>Cooking Time: {recipe.cookingTime}</p>
          {/* Ingredient is use as key because they are unique (doubt but ok) */}
          <ul>{recipe.ingredients?.map(ingredient => <li key={ingredient}>{ingredient}</li>)}</ul>
          <p>{recipe.method}</p>
          <button onClick={handleClick}>Update recipe</button>
        </div>
      )}
    </div>
  );
}

export default Recipe;
