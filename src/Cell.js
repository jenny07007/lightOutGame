import React from "react";

const Cell = ({ isLit, flipCellsAroundMe }) => {
  const handleFlipCell = () => {
    flipCellsAroundMe();
  };
  const classes = "cell " + (isLit ? "cell-lit" : "");
  return <td className={classes} onClick={handleFlipCell}></td>;
};

export default Cell;
