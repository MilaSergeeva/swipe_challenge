import React from "react";
import arrowRightStyle from "./arrowRight.module.css";
import arrowStyle from "../controllers.module.css";

function ArrowRight({ onClick, active }) {
  return (
    <>
      <button
        className={`${arrowStyle.arrow} ${arrowRightStyle.arrowR} ${
          !active ? arrowStyle.disabled : ""
        }`}
        onClick={onClick}
        disabled={!active}
      />
    </>
  );
}

export default ArrowRight;
