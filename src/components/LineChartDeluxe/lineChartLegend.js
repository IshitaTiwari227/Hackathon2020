import React from "react";
import withStyles from "react-jss";
import { formatNumber } from "../../utils/numberFormatting";
import PropTypes from "prop-types";

const styles = {
  box: {
    padding: "25px 0px 0px 45px",
    marginLeft:"35px"
  },
  flexBox: {
    display: "flex",
    flexDirection: "row",
  },
  pRight: {
    paddingRight: "90px",
  },
  heading: {
    fontFamily: "Rubik",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "18px",
    color: "#000000",
    marginTop: 0,
  },
  subHeading: {
    fontFamily: "Rubik",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "18px",
    color: "#000000",
  },
  content: {
    fontFamily: "Rubik",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "18px",
    color: "#AEB7C4",
  },
};

const lineChartLegend = ({ classes, labels, colors, legends }) => {
  return (
    <div className={classes.box}>
      <div className={classes.flexBox}>
        {labels.map((label, i) => {
          const color = colors[i];
          return (
            <div key={i} className={classes.pRight}>
              <p className={classes.subHeading} style={{ color: color }}>
                {label}
              </p>
              <p className={classes.content}>{formatNumber(legends[i])}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

lineChartLegend.propTypes = {
  /** The Labels */
  labels: PropTypes.array,
  /** Legends to access values of different legends of the line chart*/
  legends: PropTypes.array,
  /** Colors to access color for each label of the line chart */
  colors: PropTypes.array,
};

lineChartLegend.defaultProps = {
  colors: ["#55b1f3", "#555af3", "#f3d155"],
};

export default withStyles(styles)(lineChartLegend);
