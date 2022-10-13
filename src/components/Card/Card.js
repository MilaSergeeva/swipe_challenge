import React, { useState, useEffect, useRef } from "react";
import appStyles from "../App/App.module.css";
import { v4 as uuidv4 } from "uuid";
import { useDrag, useDrop } from "react-dnd";

function Card() {
  const [, dragRef] = useDrag({
    type: "cards",
    item: currentCard.current.id,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

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
}

export default Card;
