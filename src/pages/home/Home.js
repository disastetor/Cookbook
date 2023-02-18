//import firestore
import { projectFirestore } from "../../firebase/config";

//Style
import "./Home.css";

import React, { useEffect, useState } from "react";
import RecipeList from "../../components/RecipeList";

function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  /* DATA WITH FIREBASE */
  useEffect(() => {
    setIsPending(true);

    //Fetching all the data collected in 'recipes' db (REAL TIME DATA)
    const unsub = projectFirestore.collection("recipes").onSnapshot(
      (snapshot) => {
        //Check if snapshot is empty
        if (snapshot.empty) {
          setError("No recipes to load");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );
    //Cleanup function to stop the listener onSnapshot
    return () => unsub();
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}

export default Home;
