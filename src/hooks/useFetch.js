//USEFETCH HOOK EDITED WITH POST METHOD

import { useState, useEffect } from "react";

export const useFetch = (url, method = "POST") => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  //States for the options of post method
  const [options, setOptions] = useState(null);

  const postData = (postData) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions) => {
      //Set pending on true while fetching the data
      setIsPending(true);

      //ERROR HANDLING
      try {
        //If controller.abort() stops a fetch request, throws a very specific error
        //that will be caught in catch block
        const res = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });
        //If the response ok is false give the error
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json = await res.json();
        console.log(res);
        //Set pending on true after fetching the data
        setIsPending(false);

        setData(json);
        setError(null);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setError("Could not fetch the data");
          console.log(error.message);
        }
      }
    };

    if (method === "GET") {
      fetchData();
    } else if (method === "POST") {
      fetchData(options);
    }

    //CLEANUP FUNCTION
    return () => {
      //Controls any fetch associated with the abort controller and stops them immediately
      controller.abort();
    };
  }, [url, options, method]);

  //Returns data property of data
  return { data, isPending, error, postData };
};
