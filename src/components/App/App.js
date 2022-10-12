import "./App.css";
import React, { useState, useEffect } from "react";
import { baseUrl, checkResponse } from "../../utils/api";

//get cards from API
//show deck of cards
//add functionality to the swipe(arrow) buttons
//add functionality to like and dislike buttons
//like and dislike on drag and drop

function App() {
  const [cards, setCards] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  useEffect(() => {
    fetch(baseUrl)
      .then(checkResponse)
      .then(setCards({ ...cards, isLoading: true }))
      .then((res) => {
        console.log(res);
        if (res && res.success) {
          setCards({ ...cards, isLoading: false, data: res });
        } else {
          setCards({ ...cards, isLoading: false, hasError: true });
        }
      })
      .catch((err) => {
        console.log(err); // show error
      });
  }, []);

  console.log(cards);

  return <div className="App"></div>;
}

export default App;
