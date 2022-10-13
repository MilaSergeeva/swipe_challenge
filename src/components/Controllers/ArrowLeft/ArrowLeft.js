import React from "react";
import arrowLeftStyle from "./arrowLeft.module.css";
import arrowStyle from "../controllers.module.css";

function ArrowLeft({ onClick, active }) {
  return (
    <>
      <button
        className={`${arrowStyle.arrow} ${arrowLeftStyle.arrowL} ${
          !active ? arrowStyle.disabled : ""
        }`}
        onClick={onClick}
        disabled={!active}
      />
    </>
  );
}

export default ArrowLeft;
