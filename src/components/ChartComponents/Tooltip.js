import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import * as d3 from "d3";
import { dimensionsPropsType } from "../../utils/chartUtils";
import { useChartDimensions } from "./Chart";

const styles = {
  container: {
    background: "transparent",
    border: "1px solid black",
    width: "100%",
    height: "100%",
    fontSize: "12px",
    position: "absolute",
    top: 0,
    left: 0,
  },
  tooltip: {
    position: "absolute",
    maxWidth: "300px",
    padding: "15px",
    background: "white",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15);",
    "& p": {
      margin: "3px 0px",
    },
  },
  metric: {
    marginRight: "4px",
  },
};

const Tooltip = ({
  children,
  classes,
  dimensions,
  mouse,
  data,
  colors,
  //   mousePosition = { x: 10, y: 80 },
  xScale,
  yScale,
  xAccessor,
  ...props
}) => {
  //   const dimensions = useChartDimensions();
  const xData = xScale.invert(mouse.x);

  const getDistanceFromHoveredDate = d => Math.abs(xAccessor(d) - xData);

  const closestIndex = d3.scan(
    data,
    (a, b) => getDistanceFromHoveredDate(a) - getDistanceFromHoveredDate(b)
  );
  const closestDataPoint = data[closestIndex];
  const metrics = Object.keys(closestDataPoint);
  return (
    <>
      <div
        className={classes.container}
        style={{ width: dimensions.width, height: dimensions.height }}
      ></div>
      <div
        className={classes.tooltip}
        style={{ top: `${mouse.y}px`, left: `${mouse.x}px` }}
      >
        {metrics.map((metric, i) => {
          return (
            <p key={i}>
              <span style={{ color: colors[i] }} className={classes.metric}>
                {Number(closestDataPoint[metric]).toFixed(2)}
              </span>
              <span>{metric}</span>
            </p>
          );
        })}
      </div>
    </>
  );
};

Tooltip.propTypes = {
  dimension: PropTypes.oneOf(["x", "y"]),
  dimensions: dimensionsPropsType,
  scale: PropTypes.func,
  label: PropTypes.string,
  formatTick: PropTypes.func,
};

Tooltip.defaultProps = {
  dimension: "x",
  scale: null,
  formatTick: d3.format(","),
};

export default withStyles(styles)(Tooltip);
