import React from "react";
import { useHistory } from "react-router";
import { Button } from "../components/reusable/Button";
import "../css/Page404.css";

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
