import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import { HEADER_TITLE } from "../css-values/dark-theme";
import mentalHealth from "../resources/mental-health-image.jpg";

//  Component to display page title for major sections

const componentStyles = {
  title: {
    color: HEADER_TITLE,
    fontSize: "35px",
    fontWeight: "bold"
  },
  pageTitleContainer: {
    width: "100%"
  }
};

const PageTitle = ({ title, classes, children }) => {
  return (
    <div className={classes.pageTitleContainer}>
      <h2 className={classes.title}>{children}</h2>
    </div>
  );
};

PageTitle.propTypes = {
  children: PropTypes.node,
  styles: PropTypes.object
};

export default withStyles(componentStyles)(PageTitle);
