import React from "react";
import withStyles from "react-jss";
import * as d3 from "d3";
import { LegendItem, Arc } from "../ChartComponents";
import PropTypes from "prop-types";
import { formatNumber } from "../../utils/numberFormatting";

const style = {
  wholeContainer: { margin: "0 0 2% 0" },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
  },
  groupVar: {
    position: "relative",
    display: "flex",
    margin: "1% 0% 1% 1%",
  },
  label: {
    position: "absolute",
    top: "70%",
    left: "28%",
    fontWeight: 750,
    fontSize: "26px",
    color: "black",
  },
  labelfor3: {
    position: "absolute",
    top: "78%",
    left: "28%",
    fontWeight: 750,
    fontSize: "24px",
    color: "#AEB7C4",
  },
  hideLabel: {
    display: "none",
  },
  svgVarfor3: {
    height: "160%",
    margin: "5% 0 0 0",
  },
  svgVar: {
    height: "160%",
    margin: "-5% 0 0 0",
  },
  legendContainer: {
    flex: 1,
    position: "absolute",
    left: "70%",
  },
  lowMarginLegendContainer: {
    flex: 1,
    position: "absolute",
    left: "40%",
  },
  title: {
    fontWeight: 750,
    fontSize: "26px",
  },
};

const DonutChart = ({
  classes,
  innerRadius,
  outerRadius,
  data,
  colors,
  displayTotal,
}) => {
  var pie = d3.pie().value(d => d.value)(data);
  var translate = `translate(130,130)`;
  var total = 0;
  return (
    <div className={classes.wholeContainer}>
      <div className={classes.contentContainer}>
        <div className={classes.groupVar}>
          <svg
            className={data.length > 2 ? classes.svgVarfor3 : classes.svgVar}
          >
            <g transform={translate}>
              {pie.map((d, i) => {
                total = total + d.value;
                return (
                  <Arc
                    key={`arc-${i}`}
                    data={d}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    color={colors[i]}
                    total={total}
                  />
                );
              })}
            </g>
          </svg>
          <div className={classes.legendContainer}>
            {data.map((d, i) => {
              return (
                <LegendItem key={`legend-${i}`} color={colors[i]} data={d} />
              );
            })}
          </div>
          {displayTotal && (
            <div
              className={data.length > 2 ? classes.labelfor3 : classes.label}
              style={
                formatNumber(total).length < 6
                  ? { paddingLeft: "7px" }
                  : { paddingLeft: "0px" }
              }
            >
              {formatNumber(total)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
DonutChart.propTypes = {
  /** Outer radius is the radius of the outer circle in the donut chart */
  outerRadius: PropTypes.number,
  /** Inner radius is the radius of the inner circle in the donut chart */
  innerRadius: PropTypes.number,
  /** data is the object that contains our data to be displayed in the donut chart */
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  /** Colors is an array that contains list of hexadecimal color values to be displayed in the donut chart */
  colors: PropTypes.array,
  /** True or false to show the total */
  displayTotal: PropTypes.bool,
};

DonutChart.defaultProps = {
  outerRadius: 90,
  innerRadius: 60,
  colors: ["#FFA600", "#00568E", "#E0E0E0"],
};
export default withStyles(style)(DonutChart);
