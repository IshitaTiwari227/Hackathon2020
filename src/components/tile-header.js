import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
//import Switch from "@material-ui/core/Switch";
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
  toggleState = "Marketplace",
  handleMarketplaceChange,
  onPrint = false,
  onExport = false,
  showMarketplaceToggle,
  showDivider = true
}) => {
  // const [Toggle, setToggle] = useState(toggleState);
  // console.log('show toggle', showMarketplaceToggle);
  // const firstUpdate = useRef(true);

  // useEffect(() => {
  //   if (firstUpdate.current) {
  //     firstUpdate.current = false;
  //     return;
  //   }
  //   if (handleMarketplaceChange) handleMarketplaceChange(Toggle);
  // }, [Toggle, handleMarketplaceChange]);

  return (
    <div
      className={`${classes.tileHeaderContainer} ${
        showDivider ? classes.tileHeaderContainer__showDivider : ""
      }`}
    >
      <div className={classes.tileTitle}>{title}</div>
      {/* <div className={classes.utilityContainer}>
        {showMarketplaceToggle ? (
          <>
            <div
              className={
                Toggle === "Marketplace"
                  ? classes.active
                  : classes.inactive
              }
              onClick={() => setToggle("Marketplace")}
            >
              Marketplace
            </div>
            <Switch
              color="default"
              checked={Toggle === "Condé Nast" ? true : false}
              value="Marketplace"
              onChange={() =>
                setToggle(
                  Toggle === "Condé Nast" ? "Marketplace" : "Condé Nast"
                )
              }
            />
            <div
              className={
                Toggle === "Condé Nast" ? classes.active : classes.inactive
              }
              onClick={() => setToggle("Condé Nast")}
            >
              Condé Nast
            </div>
          </>
        ) : null}

        <div className={classes.spacer} />
        {onExport ? (
          <img
            alt="PDF Export"
            className={classes.image}
            onClick={onExport}
          />
        ) : null}
        {onPrint ? (
          <img
            alt="PDF Export"
            className={classes.image}
            onClick={onPrint}
          />
        ) : null}
      </div> */}
    </div>
  );
};

TileHeaderComponent.propTypes = {
  children: PropTypes.node,
  handleMarketplaceChange: PropTypes.func,
  showMarketplaceToggle: PropTypes.bool
};

export default withStyles(componentStyles)(TileHeaderComponent);
