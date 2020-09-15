import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import * as d3 from "d3";
import { dimensionsPropsType } from "../../utils/chartUtils";
import { useChartDimensions } from "./Chart";
import moment from "moment";

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
  let tickNum =
    dimensions.boundedWidth < 600 && numberOfTicks
      ? dimensions.boundedWidth / 50
      : dimensions.boundedWidth / 100;

  tickNum = numberOfTicks < tickNum ? numberOfTicks : tickNum;
  let ticks = scale.ticks(tickNum);
  let tempTicks = [];
  ticks.map(item => {
    tempTicks.push(new Date(new Date(item).setHours(0, 0, 0, 0)));
  });
  ticks = tempTicks.filter(
    (date, i, self) => self.findIndex(d => d.getTime() === date.getTime()) === i
  );

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
  let tempTicks = [];
  ticks.map(item => {
    tempTicks.push(new Date(new Date(item).setHours(0, 0, 0, 0)));
  });
  let filteredticks = tempTicks.filter(
    (date, i, self) => self.findIndex(d => d.getTime() === date.getTime()) === i
  );

  return (
    <>
      {filteredticks.map((tick, i) => {
        let tempClass =
          moment(tick).format("MMDD") + "-axis Axis AxisVertical ";
        return (
          <g
            key={i}
            className={tempClass}
            //transform={`translate(${scale(tick)}, 0)`}
            {...props}
            style={{ display: "none" }}
          >
            <text
              key={i}
              className={classes.ticks}
              transform={`translate(${scale(tick)+30}, -10)`}
            >
              {formatTick(tick)}
            </text>
            <line
              y2={dimensions.boundedHeight}
              transform={`translate(${scale(tick)}, 0)`}
              stroke="#c4c4c4"
              strokeWidth="1"
            />
          </g>
        );
      })}
    </>
  );
}
