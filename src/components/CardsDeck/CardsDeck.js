import React, { useState, useEffect, useRef, useMemo } from "react";
import appStyles from "../App/App.module.css";
import { v4 as uuidv4 } from "uuid";
import { useDrag, useDrop } from "react-dnd";




function CardDeck() {
  
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

  const cardsDeck = useMemo(()=> cards.map(card => {
    
    return (<Card  name={sectionName}/>)
  }),[assignments])

  return (
    <ul className={appStyles.cardsDeck}>
  );
}

export default CardDeck;