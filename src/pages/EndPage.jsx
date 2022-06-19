import React from "react";
import { useHistory } from "react-router";
import Button from '@mui/material/Button'

function TimeSheet() {
  let history = useHistory();
  const redir = () => {
    history.push("/");
  };

  return (
    <div className="mainDisp">
      <h1>Error 404: Something is missing here...</h1>
      <Button handleClick={redir} label="To Login" />
    </div>
  );
}

export default TimeSheet;
