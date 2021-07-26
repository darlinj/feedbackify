import React from "react";

const TitleBar = (params) => {
  return (
    <div data-testid="title">
      <h1>{params.title}</h1>
    </div>
  );
};

export default TitleBar;
