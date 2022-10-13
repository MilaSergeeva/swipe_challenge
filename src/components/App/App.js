import React, { useState, useEffect } from "react";
import { baseUrl, checkResponse } from "../../utils/api";
import appStyles from "./App.module.css";
import logo from "../../images/logo.png";
import { v4 as uuidv4 } from "uuid";

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

  const [likedCards, setLikedCards] = useState([]);
  const [dislikedCards, setDislikedCards] = useState([]);

  const handleCardsToRight = () => {
    let lastCard = cards.data[cards.data.length - 1];
    const newOrderOfCards = cards.data.slice(0, -1);
    newOrderOfCards.unshift(lastCard);
    setCards({ ...cards, data: newOrderOfCards });
  };

  const handleCardsToLeft = () => {
    let array = cards.data;
    let firstCard = array.shift();
    array.push(firstCard);
    setCards({ ...cards, data: array });
  };

  const handleLike = () => {
    let array = cards.data;
    let firstCard = array.shift();
    likedCards.length > 1
      ? setLikedCards([...likedCards, firstCard])
      : setLikedCards([firstCard]);
    setCards({ ...cards, data: array });
  };

  console.log(cards.data);

  const handleDislike = () => {
    let array = cards.data;
    let firstCard = array.shift();
    dislikedCards.length > 1
      ? setDislikedCards([...dislikedCards, firstCard])
      : setDislikedCards([firstCard]);
    setCards({ ...cards, data: array });
  };

  useEffect(() => {
    fetch(baseUrl)
      .then(checkResponse)
      .then(setCards({ ...cards, isLoading: true }))
      .then((res) => {
        if (res) {
          setCards({ ...cards, isLoading: false, data: res });
        } else {
          setCards({ ...cards, isLoading: false, hasError: true });
        }
      })
      .catch((err) => {
        console.log(err); // show error
      });
  }, []);

  return (
    <div className={appStyles.mainBlock}>
      <a href="https://try.no/">
        <img className={appStyles.logo} src={logo} alt="logo" />
      </a>
      <div className={appStyles.BtnConatainier}>
        <button
          className={appStyles.dislikeBtn}
          style={{ bottom: 0 }}
          onClick={handleDislike}
        />
      </div>
      <button className={appStyles.arrowL} onClick={handleCardsToLeft} />
      <ul className={appStyles.cardsDeck}>
        {cards.data.length > 0
          ? cards.data
              .slice(0, 5)
              .reverse()
              .map((el, index) => {
                return (
                  <li
                    className={`${appStyles.card}`}
                    style={
                      index === 0
                        ? {
                            top: 0,
                            left: 0,
                            backgroundImage: `url(${el.image})`,
                          }
                        : {
                            top: 13 * index,
                            left: 13 * index,
                            backgroundImage: `url(${el.image})`,
                          }
                    }
                    key={uuidv4()}
                  >
                    Like <br />
                    or <br />
                    Dislike
                    {el.id}
                  </li>
                );
              })
          : ""}
      </ul>
      <button className={appStyles.arrowR} onClick={handleCardsToRight} />
      <div className={appStyles.BtnConatainier}>
        <button className={appStyles.likeBtn} onClick={handleLike} />
      </div>
    </div>
  );
}

export default App;
