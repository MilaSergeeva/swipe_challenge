import React from "react";
import appStyles from "../../App/App.module.css";

function ArrowLeft({ onClick, active }) {
  return (
    <>
      <button
        className={`${appStyles.arrowL} ${!active ? appStyles.disabled : ""}`}
        onClick={onClick}
        disabled={!active}
      />
    </>
  );
}

export default ArrowLeft;
