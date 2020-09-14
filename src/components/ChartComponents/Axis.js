import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import * as d3 from "d3";
import { dimensionsPropsType } from "../../utils/chartUtils";
import { useChartDimensions } from "./Chart";

// The Axis can be either horizontal or vertical
const axisOrientation = {
  x: AxisHorizontal,
  y: AxisVertical,
};

const styles = {
  ticks: {
    fontSize: "14px",
    fontFamily: "Rubik",
    fill: "#c4c4c4",
    textAnchor: "end",
  },
  yTicks: {
    fontSize: "14px",
    fontFamily: "Rubik",
    fill: "#c4c4c4",
    textAnchor: "end",
  },
  axisLine: {
    strokeWidth: "1px",
    stroke: "#c4c4c4",
  },
  axisYLine: {
    strokeWidth: "0px",
  },
  label: {
    fill: "#c4c4c4",
    textAnchor: "middle",
  },
};

const Axis = ({ dimension, ...props }) => {
  const dimensions = useChartDimensions();
  const Component = axisOrientation[dimension];
  if (!Component) return null;

  return <Component dimensions={dimensions} {...props} />;
};

Axis.propTypes = {
  dimension: PropTypes.oneOf(["x", "y"]),
  dimensions: dimensionsPropsType,
  scale: PropTypes.func,
  label: PropTypes.string,
  formatTick: PropTypes.func,
};

Axis.defaultProps = {
  dimension: "x",
  scale: null,
  formatTick: d3.format(","),
};

export default withStyles(styles)(Axis);

function AxisHorizontal({
  dimensions,
  label,
  formatTick,
  numberOfTicks = false,
  scale,
  classes,
  ...props
}) {
  const tickNum =
    dimensions.boundedWidth < 600 && numberOfTicks
      ? dimensions.boundedWidth / 100
      : dimensions.boundedWidth / 250;

  const ticks = scale.ticks(tickNum);

  return (
    <g
      className="Axis AxisHorizontal"
      transform={`translate(0, ${dimensions.boundedHeight})`}
      {...props}
    >
      <line className={classes.axisLine} x2={dimensions.boundedWidth} />

      {ticks.map((tick, i) => (
        <text
          key={tick}
          className={classes.ticks}
          transform={`translate(${scale(tick)}, 25)`}
        >
          {formatTick(tick)}
        </text>
      ))}

      {label && (
        <text
          className={classes.label}
          transform={`translate(${dimensions.boundedWidth / 2}, 50)`}
        >
          {label}
        </text>
      )}
    </g>
  );
}

function AxisVertical({
  dimensions,
  label,
  formatTick,
  numberOfTicks = false,
  scale,
  classes,
  ...props
}) {
  // if number of ticks is not set, space them every 50px or so
  const tickNum = numberOfTicks || dimensions.boundedHeight / 50;
  const ticks = scale.ticks(tickNum);

  return (
    <g className="Axis AxisVertical" {...props}>
      <line className={classes.axisYLine} y2={dimensions.boundedHeight} />

      {ticks.map((tick, i) => (
        <text
          key={tick}
          className={classes.yTicks}
          transform={`translate(-30, ${scale(tick)})`}
        >
          {formatTick(tick)}
        </text>
      ))}

      {label && (
        <text
          className={classes.label}
          style={{
            transform: `translate(-56px, ${dimensions.boundedHeight /
              2}px) rotate(-90deg)`,
          }}
        >
          {label}
        </text>
      )}
    </g>
  );
}
