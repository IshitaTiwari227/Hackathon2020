import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import TileHeaderComponent from "./tile-header";
import { PRIMARY, SECONDARY } from "../css-values/dark-theme";

const componentStyles = {
  tileContainer: {
    margin: "35px 35px",
    padding: "10px 25px 38px",
    width: "calc(100% - 120px)",
    borderRadius: "5px",
    display: "flex",
    backgroundColor: PRIMARY,
    flexGrow: 1,
    flexDirection: "column"
  },
  contentContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    color: SECONDARY,
    fontSize: "12px",
    fontWeight: "500"
  }
};

const TileComponent = ({
  classes,
  title,
  children,
  onMarketplaceChange,
  showMarketplaceToggle,
  showDivider = true
}) => {
  return (
    <div className={classes.tileContainer}>
      {title !== undefined ? (
        <TileHeaderComponent
          title={title}
          showMarketplaceToggle={showMarketplaceToggle}
          showDivider={showDivider}
        handleMarketplaceChange={onMarketplaceChange ? toggleValue => onMarketplaceChange(toggleValue) : null}
        />
      ) : null}
      <div className={classes.contentContainer}>{children}</div>
    </div>
  );
};

TileComponent.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onIndexChange: PropTypes.func
};

export default withStyles(componentStyles)(TileComponent);
