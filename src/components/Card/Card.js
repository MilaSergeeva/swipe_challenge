import React, { useEffect, useRef } from "react";
import appStyles from "../App/App.module.css";
import { useDrag } from "react-dnd";

function Card({ index, card, cards, windowDimenion, getCurrentCard, id }) {
  const currentCard = useRef();
  // console.log("is current", id, index === cards.data.length - 1, currentCard);

  useEffect(() => getCurrentCard(currentCard), []);

  const [{ isDrag }, dragRef] = useDrag({
    type: "cards",
    item: () => {
      return { id, index, card };
    },

    // collect: (monitor) => ({
    //   isDrag: monitor.isDragging(),
    // }),
  });

  dragRef(currentCard);

  return (
    !isDrag && (
      <li
        className={`${appStyles.card} `}
        style={
          index === 0
            ? {
                top: 0,
                left: 0,
                backgroundImage: `url(${card.image})`,
              }
            : windowDimenion.winWidth < 600
            ? {
                top: 8.94 * index,
                left: 8.94 * index,
                backgroundImage: `url(${card.image})`,
              }
            : {
                top: 13 * index,
                left: 13 * index,
                backgroundImage: `url(${card.image})`,
              }
        }
        ref={index === cards.data.length - 1 ? currentCard : null}
        // ref={index === cards.data.length - 1 ? dragRef : null}
      >
        Like <br />
        or <br />
        Dislike
        {card.id}
      </li>
    )
  );
}

export default Card;
