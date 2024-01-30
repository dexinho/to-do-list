import React from "react";

export const LoadingAnimation = ({ isLoading }) => {
  console.log('ulazi')
  return (
    <div
      id="loading-animation"
      className={isLoading ? ".animate-loading-circle" : ""}
    ></div>
  );
};
