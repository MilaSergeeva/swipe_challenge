import React from "react";
import appStyles from "../../App/App.module.css";

function ArrowLeft({ onClick, active }) {
  return (
    <>
      <button
        className={`${appStyles.arrow} ${appStyles.arrowL} ${
          !active ? appStyles.disabled : ""
        }`}
        onClick={onClick}
        disabled={!active}
      />
    </>
  );
}

export default ArrowLeft;
