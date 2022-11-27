import React from "react";
export const Button = ({ onClick, text }) => {
  return (
    <button type="button" onClick={onClick}>
      {text}
    </button>
  );
};
