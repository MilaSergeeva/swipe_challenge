import React, { useState, useEffect, useRef, useMemo } from "react";
import appStyles from "../App/App.module.css";
import { v4 as uuidv4 } from "uuid";
import { useDrag, useDrop } from "react-dnd";
import Card from "../Card/Card";

function CardDeck({ cards, getCurrentCard }) {
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

  const cardsDeck = useMemo(
    () =>
      cards.data
        .slice(0, 5)
        .reverse()
        .map((card, index) => {
          return (
            <Card
              key={uuidv4()}
              card={card}
              index={index}
              cards={cards}
              windowDimenion={windowDimenion}
              getCurrentCard={getCurrentCard}
              id={card.id}
            />
          );
        }),
    [cards]
  );

  return (
    <ul className={appStyles.cardsDeck}>
      {cards.data.length > 0 ? cardsDeck : ""}
    </ul>
  );
}

export default CardDeck;
