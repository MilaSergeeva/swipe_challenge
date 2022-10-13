import React, { useState, useEffect, useRef } from "react";
import { baseUrl, checkResponse } from "../../utils/api";
import appStyles from "./App.module.css";
import logo from "../../images/logo.png";
import { v4 as uuidv4 } from "uuid";
import { Rings } from "react-loader-spinner";
import { useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

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

  const currentCard = useRef({});

  const [likedCards, setLikedCards] = useState([]);
  const [dislikedCards, setDislikedCards] = useState([]);
  const [active, setActive] = useState(false);
  const [windowDimenion, detectWindowDimenion] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectWindowDimenion({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    console.log(windowDimenion);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimenion]);

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
    currentCard.current.classList.add(appStyles.slideRight);
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
    currentCard.current.classList.add(appStyles.slideLeft);
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

  const [, dragRef] = useDrag({
    type: "cards",
    item: currentCard.current.id,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropOnLikeRef] = useDrop({
    accept: "cards",
    drop() {
      let array = cards.data;
      let firstCard = array.shift();
      likedCards.length > 1
        ? setLikedCards([...likedCards, firstCard])
        : setLikedCards([firstCard]);
      setCards({ ...cards, data: array });
    },
    // collect: (monitor) => {
    //   return {
    //     isOver: monitor.isOver(),
    //     canDrop: monitor.canDrop(),
    //   };
    // },
  });

  return (
    <div className={appStyles.mainBlock}>
      <a href="https://try.no/">
        <img className={appStyles.logo} src={logo} alt="logo" />
      </a>
      <div className={appStyles.BtnConatainierLeft}>
        <button
          className={`${appStyles.dislikeBtn} ${
            !active ? appStyles.disabled : ""
          }`}
          style={{ bottom: 0 }}
          onClick={handleDislike}
          disabled={!active}
        />
      </div>
      <button
        className={`${appStyles.arrowL} ${!active ? appStyles.disabled : ""}`}
        onClick={handleCardsToLeft}
        disabled={!active}
      />
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
        <ul className={appStyles.cardsDeck}>
          {cards.data.length > 0
            ? cards.data
                .slice(0, 5)
                .reverse()
                .map((el, index) => {
                  return (
                    <li
                      className={`${appStyles.card} `}
                      style={
                        index === 0
                          ? {
                              top: 0,
                              left: 0,
                              backgroundImage: `url(${el.image})`,
                            }
                          : windowDimenion.winWidth < 600
                          ? {
                              top: 8.94 * index,
                              left: 8.94 * index,
                              backgroundImage: `url(${el.image})`,
                            }
                          : {
                              top: 13 * index,
                              left: 13 * index,
                              backgroundImage: `url(${el.image})`,
                            }
                      }
                      // ref={index === cards.data.length - 1 ? currentCard : null}
                      ref={index === cards.data.length - 1 ? dragRef : null}
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
      )}

      <button
        className={`${appStyles.arrowR} ${!active ? appStyles.disabled : ""}`}
        onClick={handleCardsToRight}
        disabled={!active}
      />
      <div className={appStyles.BtnConatainierRight} ref={dropOnLikeRef}>
        <button
          className={`${appStyles.likeBtn} ${
            !active ? appStyles.disabled : ""
          }`}
          onClick={handleLike}
          disabled={!active}
        />
      </div>
    </div>
  );
}

export default App;
