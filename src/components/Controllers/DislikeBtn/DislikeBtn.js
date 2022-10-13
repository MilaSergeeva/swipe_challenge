import React from "react";
import appStyles from "../../App/App.module.css";

function DislikeBtn({ onClick, active }) {
  return (
    <>
      <button
        className={`${appStyles.choiceBtn} ${appStyles.dislikeBtn} ${
          !active ? appStyles.disabled : ""
        }`}
        style={{ bottom: 0 }}
        onClick={onClick}
        disabled={!active}
      />
    </>
  );
}

export default DislikeBtn;
