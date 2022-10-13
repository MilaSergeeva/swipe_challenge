import React, { useState, useEffect, useRef } from "react";
import { baseUrl, checkResponse } from "../../utils/api";
import appStyles from "./App.module.css";
import logo from "../../images/logo.png";
import { v4 as uuidv4 } from "uuid";
import { Rings } from "react-loader-spinner";
import { useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import CardsDeck from "../CardsDeck/CardsDeck";
import ArrowLeft from "../Controllers/ArrowLeft/ArrowLeft";
import ArrowRight from "../Controllers/ArrowRight/ArrowRight";
import DislikeBtn from "../Controllers/DislikeBtn/DislikeBtn";
import LikeBtn from "../Controllers/LikeBtn/LikeBtn";

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

  const getCurrentCard = (value) => {
    setCurrentCard({ value });
  };

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
    currentCard.value.current.classList.add(appStyles.slideRight);
    let array = cards.data;

    setTimeout(() => {
      let firstCard = array.shift();
      likedCards.length > 1
        ? setLikedCards([...likedCards, firstCard])
        : setLikedCards([firstCard]);
      setCards({ ...cards, data: array });
    }, 400);
  };
  const handleDislike = () => {
    currentCard.value.current.classList.add(appStyles.slideLeft);
    let array = cards.data;
    setTimeout(() => {
      let firstCard = array.shift();
      dislikedCards.length > 1
        ? setDislikedCards([...dislikedCards, firstCard])
        : setDislikedCards([firstCard]);
      setCards({ ...cards, data: array });
    }, 400);
  };

  useEffect(
    () => (cards.data.length > 0 ? setActive(true) : setActive(false)),
    [cards]
  );

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

  const handleDrop = () => {
    let array = cards.data;
    let firstCard = array.shift();
    likedCards.length > 1
      ? setLikedCards([...likedCards, firstCard])
      : setLikedCards([firstCard]);
    setCards({ ...cards, data: array });
  };

  const [, dropOnLikeRef] = useDrop({
    accept: "cards",
    drop() {
      handleDrop();
    },
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  });
  // const [, dropOnLikeRef] = useDrop({
  //   accept: "cards",
  //   drop() {
  //     let array = cards.data;
  //     let firstCard = array.shift();
  //     likedCards.length > 1
  //       ? setLikedCards([...likedCards, firstCard])
  //       : setLikedCards([firstCard]);
  //     setCards({ ...cards, data: array });
  //   },
  //   // collect: (monitor) => {
  //   //   return {
  //   //     isOver: monitor.isOver(),
  //   //     canDrop: monitor.canDrop(),
  //   //   };
  //   // },
  // });

  return (
    <div className={appStyles.mainBlock}>
      <a href="https://try.no/">
        <img className={appStyles.logo} src={logo} alt="logo" />
      </a>
      <div className={appStyles.btnConatainierLeft}>
        <DislikeBtn onClick={handleDislike} active={active} />
      </div>
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
        <CardsDeck cards={cards} getCurrentCard={getCurrentCard} />
      )}

      <ArrowRight onClick={handleCardsToRight} active={active} />
      <div className={appStyles.btnConatainierRight} ref={dropOnLikeRef} style={{ !isOver ? (backgroundColor:000) : ''}}>
        <LikeBtn onClick={handleLike} active={active} />
      </div>
    </div>
  );
}

export default App;
