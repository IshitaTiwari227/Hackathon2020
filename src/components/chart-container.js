import React from "react";
import withStyles from "react-jss";

const componentStyles = {
  container: {
    width: "100%"
  },
  titleStyle: {
    marginBottom: "20px",
    fontSize: "14px",
    fontWeight: "bold",
    lineHeight: "17px"
  }
};

const ChartContainer = ({ classes, title, children, className }) => {
  const { container, titleStyle } = classes;

  return (
    <div className={`${container} ${className}`}>
      <div className={titleStyle}>{title}</div>
      {children}
    </div>
  );
};

export default withStyles(componentStyles)(ChartContainer);
