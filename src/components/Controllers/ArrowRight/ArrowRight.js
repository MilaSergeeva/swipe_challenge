import React from "react";
import appStyles from "../../App/App.module.css";

function ArrowRight({ onClick, active }) {
  return (
    <>
      <button
        className={`${appStyles.arrowR} ${!active ? appStyles.disabled : ""}`}
        onClick={onClick}
        disabled={!active}
      />
    </>
  );
}

export default ArrowRight;
