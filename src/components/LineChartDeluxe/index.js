import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import * as d3 from "d3";
// Components
import Chart from "../ChartComponents/Chart";
import Axis from "../ChartComponents/CustomAxis";
import Line from "../ChartComponents/Line-Defined";
import LineChartLegend from "./lineChartLegend";

import classNames from "classnames";
// Hooks and helper functions
import { useChartDimensions } from "../../utils/chartUtils";
import moment from "moment";

const styles = {
  linechart: { width: "100%", height: "500px" },
  line: {
    strokeWidth: 2,
  },
};

const LineChartDeluxe = ({
  type,
  data,
  xAccessor,
  series,
  xLabel,
  yLabel,
  colors,
  className,
  classes,
  labels,
  seriesDefaultVal,
  seriesData,
}) => {
  // get dimensions of container
  const [ref, dimensions] = useChartDimensions({
    marginBottom: 80,
    marginLeft: 100,
    marginRight: 40,
  });

  const [tooltip, setTooltip] = useState(false);

  const [seriesVal, setseriesVal] = useState(seriesDefaultVal);

  useEffect(() => {
    setseriesVal(seriesDefaultVal);
  }, [seriesDefaultVal]);

  const touchDrag = d => {
    setTooltip(true);
    setseriesVal(Object.values(d.values[0]));
  };

  const touchOut = () => {
    setTooltip(false);
    setseriesVal(seriesDefaultVal);
  };

  const max = d3.max(
    series.map(el => {
      return d3.max(data, el);
    })
  );
  // set up scales
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, xAccessor))
    .range([0, dimensions.boundedWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([0, max])
    .range([dimensions.boundedHeight, 0])
    .nice();

  const xAccessorScaled = d => xScale(xAccessor(d));
  const y0AccessorScaled = yScale(yScale.domain()[0]);

  const formatDate = d3.timeFormat("%-b %-d");

  let bisectDate = d3.bisector(function(d) {
    return d.date;
  }).right;

  const mouseMoveFunc = event => {
    let container = event.currentTarget;
    let rect = container.getBoundingClientRect();
    let xcoord = event.touches
        ? event.touches[0].clientX
        : event.clientX - rect.left - container.clientLeft,
      xPosition = xScale.invert(xcoord),
      closestElement = bisectDate(data, xPosition),
      start = data[closestElement - 1],
      end = data[closestElement];
    if (start && end && start.date && end.date) {
      let d = xPosition - start.date > end.date - xPosition ? end : start;
      let ArrayToHide = ref.current.getElementsByClassName("AxisVertical"),
        ArrayToHideLength = ArrayToHide.length;
      for (var i = 0; i < ArrayToHideLength; i++) {
        ArrayToHide[i].style.display = "none";
      }
      let ArrayToShow = ref.current.getElementsByClassName(
          moment(d.date).format("MMDD") + "-axis"
        ),
        ArrayToShowLength = ArrayToShow.length;
      for (var i = 0; i < ArrayToShowLength; i++) {
        ArrayToShow[i].style.display = "block";
      }
      touchDrag(d);
    }
  };

  return (
    <div>
      <LineChartLegend labels={labels} colors={colors} legends={seriesVal} />
      <div
        className={classNames(classes.linechart, className)}
        ref={ref}
        onMouseMove={mouseMoveFunc}
        onMouseOut={touchOut}
        onTouchMove={mouseMoveFunc}
        //onTouchOut={touchOut}
      >
        <Chart dimensions={dimensions}>
          {series.map((line, i) => {
            console.log("data", data);
            return (
              <Line
                key={i}
                type={type}
                data={data}
                xAccessor={xAccessorScaled}
                series={d => yScale(series[i](d))}
                y0Accessor={y0AccessorScaled}
                colors={colors[i]}
                gapVal={i}
              />
            );
          })}

          <Axis
            dimension="x"
            scale={xScale}
            formatTick={formatDate}
            label={xLabel}
            numberOfTicks={5}
          />

          {tooltip && (
            <Axis
              dimension="y"
              scale={xScale}
              formatTick={formatDate}
              label={yLabel}
              numberOfTicks={3000}
            />
          )}
        </Chart>
      </div>{" "}
    </div>
  );
};

LineChartDeluxe.propTypes = {
  /* options are area or line */
  type: PropTypes.oneOf(["line", "area"]),
  /* should follow this shape...*/
  data: PropTypes.array,
  /**  function for accessing the x values for example:
  const dataAccessor = (d) => d.date */
  xAccessor: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  /**  function for accessing the y values for example:
  const temperatureAccessor = (d) => d.temp */
  series: PropTypes.array,
  /**  Need this for area charts to prevent area from inverting */
  y0Accessor: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  /** changing the interpolation will affect if the line is smooth, jagged etc 
  See options here: http://bl.ocks.org/d3indepth/b6d4845973089bc1012dec1674d3aff8 */
  interpolation: PropTypes.func,
  /** JSX node to be rendered as a child of LineChart. Useful for overriding
   * the label of the LineChart without having to fully define the button */
  LineChartChildren: PropTypes.node,
  /** className that can access the top level element of this component */
  className: PropTypes.string,
  /** touch drag functiom */
  touchDrag: PropTypes.func,
  /** touch out functiom */
  touchOut: PropTypes.func,
};

LineChartDeluxe.defaultProps = {
  type: "line",
  y0Accessor: 0,
  interpolation: d3.curveMonotoneX,
};

export default withStyles(styles)(LineChartDeluxe);
