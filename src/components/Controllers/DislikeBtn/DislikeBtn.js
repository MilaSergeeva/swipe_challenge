import React from "react";
import dislikeBtnStyle from "./dislikeBtn.module.css";
import arrowStyle from "../controllers.module.css";
import { useDrop } from "react-dnd";

function DislikeBtn({ onClick, active, handleCardChoice }) {
  const [{ isOverOnDislike }, dropOnDislikeRef] = useDrop({
    accept: "cards",
    drop(item) {
      handleCardChoice(item.id, "dislike");
    },
    collect: (monitor) => {
      return {
        isOverOnDislike: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  });

  return (
    <>
      <button
        className={`${arrowStyle.choiceBtn} ${dislikeBtnStyle.dislikeBtn} ${
          !active ? arrowStyle.disabled : ""
        } ${isOverOnDislike && dislikeBtnStyle.btnConatainierLeftOnDrop}`}
        style={{ bottom: 0 }}
        onClick={onClick}
        disabled={!active}
        ref={dropOnDislikeRef}
      />
    </>
  );
}

export default DislikeBtn;
