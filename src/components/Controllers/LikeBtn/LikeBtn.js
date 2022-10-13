import React from "react";
import appStyles from "../../App/App.module.css";

function LikeBtn({ onClick, active }) {
  return (
    <>
      <button
        className={`${appStyles.likeBtn} ${!active ? appStyles.disabled : ""}`}
        style={{ bottom: 0 }}
        onClick={onClick}
        disabled={!active}
      />
    </>
  );
}

export default LikeBtn;
