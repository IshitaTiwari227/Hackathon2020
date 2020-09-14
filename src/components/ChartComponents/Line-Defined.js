import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import * as d3 from "d3";
import { accessorPropsType } from "../../utils/chartUtils";

const styles = {
  linechart: { width: "100%", height: "500px" },
  line: {
    strokeWidth: 3,
    stroke: "#55b1f3",
    fill: "none",
  },
  area: {
    fill: "#55b1f3",
  },
};

const Line = ({
  type,
  data,
  xAccessor,
  series,
  colors,
  y0Accessor,
  interpolation,
  classes,
  mouse,
  key,
  gapVal,
  ...props
}) => {
  var lineGenerator = d3[type]()
    .defined(function(d) {
      return Object.values(d.values[0])[gapVal] != null;
    })
    .x(xAccessor)
    .y(series)
    .curve(interpolation);

  if (type === "area") {
    lineGenerator.y0(y0Accessor).y1(series);
  }

  return (
    <g key={key}>
      {/* <circle r={4} fill={colors} /> */}

      <path
        {...props}
        className={type === "area" ? classes.area : classes.line}
        d={lineGenerator(data)}
        style={{ stroke: colors }}
      />
    </g>
  );
};

Line.propTypes = {
  type: PropTypes.oneOf(["line", "area"]),
  data: PropTypes.array,
  xAccessor: accessorPropsType,
  series: accessorPropsType,
  y0Accessor: accessorPropsType,
  interpolation: PropTypes.func,
};

Line.defaultProps = {
  type: "line",
  y0Accessor: 0,
  interpolation: d3.curveMonotoneX,
};

export default withStyles(styles)(Line);
