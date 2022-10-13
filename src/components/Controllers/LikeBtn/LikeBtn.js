import React from "react";
import likeBtnStyle from "./likeBtn.module.css";
import arrowStyle from "../controllers.module.css";
import { useDrop } from "react-dnd";

function LikeBtn({ onClick, active, handleCardChoice }) {
  const [{ isOverOnLike }, dropOnLikeRef] = useDrop({
    accept: "cards",
    drop(item) {
      handleCardChoice(item.id, "like");
    },
    collect: (monitor) => {
      return {
        isOverOnLike: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  });

  return (
    <>
      <button
        className={`${arrowStyle.choiceBtn} ${likeBtnStyle.likeBtn} ${
          !active ? arrowStyle.disabled : ""
        } ${isOverOnLike && likeBtnStyle.btnConatainierRightOnDrop}`}
        style={{ bottom: 0 }}
        onClick={onClick}
        disabled={!active}
        ref={dropOnLikeRef}
      />
    </>
  );
}

export default LikeBtn;
