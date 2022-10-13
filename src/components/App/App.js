import React, { useState, useEffect, useRef } from "react";
import { baseUrl, checkResponse } from "../../utils/api";
import appStyles from "./app.module.css";

import { Rings } from "react-loader-spinner";
import CardsDeck from "../CardsDeck/CardsDeck";
import ArrowLeft from "../Controllers/ArrowLeft/ArrowLeft";
import ArrowRight from "../Controllers/ArrowRight/ArrowRight";
import DislikeBtn from "../Controllers/DislikeBtn/DislikeBtn";
import LikeBtn from "../Controllers/LikeBtn/LikeBtn";
import Logo from "../Logo/Logo";

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
  const [active, setActive] = useState(false);
  const [currentCard, setCurrentCard] = useState({});
  const [currentCardRef, setCurrentCardRef] = useState({});

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

  const handleCardChoice = (cardId, choice) => {
    let chosenCard = cards.data.find((item) => item.id === cardId);

    if (choice === "like") {
      likedCards.length > 1
        ? setLikedCards([...likedCards, chosenCard])
        : setLikedCards([chosenCard]);
    } else {
      dislikedCards.length > 1
        ? setDislikedCards([...dislikedCards, chosenCard])
        : setDislikedCards([chosenCard]);
    }

    setCards({
      ...cards,
      data: cards.data.filter((item) => item.id !== cardId),
    });
  };

  const handleLikeClick = () => {
    currentCardRef.value.current.classList.add(appStyles.slideRight);

    setTimeout(() => {
      handleCardChoice(currentCard.id, "like");
    }, 400);
  };

  const handleDislikeClick = () => {
    currentCardRef.value.current.classList.add(appStyles.slideLeft);

    setTimeout(() => {
      handleCardChoice(currentCard.id, "dislike");
    }, 400);
  };

  useEffect(() => {
    if (cards.data.length > 0) {
      setActive(true);
      setCurrentCard(cards.data[0]);
    } else {
      setActive(false);
    }
  }, [cards]);

  useEffect(() => {
    fetch(baseUrl)
      .then(setCards({ ...cards, isLoading: true }))
      .then(checkResponse)
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
    <div className={appStyles.mainSection}>
      <Logo />

      <DislikeBtn
        onClick={handleDislikeClick}
        active={active}
        handleCardChoice={handleCardChoice}
      />
      <ArrowLeft onClick={handleCardsToLeft} active={active} />
      {cards.isLoading ? (
        <div className={appStyles.loaderCortainier}>
          <Rings
            height="100"
            width="100"
            color="#fff"
            radius="10"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
          />{" "}
        </div>
      ) : (
        // https://codyhouse.co/tutorials/how-stacking-cards that would be cool
        <CardsDeck
          cards={cards}
          setCurrentCardRef={(value) => {
            setCurrentCardRef({ value });
          }}
        />
      )}

      <ArrowRight onClick={handleCardsToRight} active={active} />
      <LikeBtn
        onClick={handleLikeClick}
        active={active}
        handleCardChoice={handleCardChoice}
      />
    </div>
  );
}

export default App;
