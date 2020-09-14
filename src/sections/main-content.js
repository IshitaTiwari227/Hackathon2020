import React from "react";
import withStyles from "react-jss";
import { Route } from "react-router-dom"; // cant say "import {BrowserRouter as Router} or it breaks"
import VisitBehaviorPage from "./visit-behavior";

const componentStyles = {
  bg: {
    overflow: "hidden",
    background:
      "linear-gradient(180deg, rgba(106, 113, 134, 0.88) 0%, #6A7186 100%)",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  body: {
    padding: "20px",
    overflow: "auto",
    flexGrow: 1,
    width: "calc(100% - 40px)"
  }
};

const MainContentContainer = ({ classes }) => {
  return (
    <div className={classes.bg}>
      <VisitBehaviorPage />
    </div>
  );
};

export default withStyles(componentStyles)(MainContentContainer);
