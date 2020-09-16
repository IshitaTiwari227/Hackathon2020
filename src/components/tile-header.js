import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import { SECONDARY, HIGHLIGHT } from "../css-values/dark-theme";

// This component holds everything for the header section of each tile such as the title and data toggle.
const componentStyles = {
  tileHeaderContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "25px 0px"
  },
  tileHeaderContainer__showDivider: {
    borderBottom: ["0.5px", "solid", "rgba(151,151,151,0.73)"]
  },
  utilityContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: "auto",
    alignItems: "center"
  },
  tileTitle: {
    fontSize: "18px",
    color: SECONDARY,
    fontWeight: "bold",
    letterSpacing: "2px",
    lineHeight: "18px",
    textTransform: "uppercase"
  },
  inactive: {
    fontSize: "10px",
    color: SECONDARY,
    lineHeight: "11px",
    fontWeight: "bold",
    letterSpacing: "1px",
    textTransform: "uppercase",
    cursor: "pointer"
  },
  active: {
    fontSize: "10px",
    color: HIGHLIGHT,
    lineHeight: "11px",
    fontWeight: "bold",
    letterSpacing: "1px",
    textTransform: "uppercase",
    cursor: "pointer"
  },
  image: {
    paddingLeft: "5px",
    cursor: "pointer"
  },
  spacer: {
    width: "25px"
  },
  marginTop: {
    marginTop: "60px"
  }
};

const TileHeaderComponent = ({
  classes,
  title,
  showDivider = true
}) => {

  return (
    <div
      className={`${classes.tileHeaderContainer} ${
        showDivider ? classes.tileHeaderContainer__showDivider : ""
      }`}
    >
      <div className={classes.tileTitle}>{title}</div>
    </div>
  );
};

TileHeaderComponent.propTypes = {
  children: PropTypes.node,
  handleMarketplaceChange: PropTypes.func,
  showMarketplaceToggle: PropTypes.bool
};

export default withStyles(componentStyles)(TileHeaderComponent);
