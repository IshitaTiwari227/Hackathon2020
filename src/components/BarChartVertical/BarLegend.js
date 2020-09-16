import React from "react";
import withStyles from "react-jss";
import { abbreviateNumber } from "../../utils/numberFormatting";
import PropTypes from "prop-types";

const styles = {
  legendContainer: {
    width: "97%",
  },
  flexBox: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginTop: "10px",
    marginLeft: "0px",
    paddingLeft: "0%",
    marginLeft: "8%",
  },
  pRight: {
    marginRight: "10%",
    marginTop: "10px",
  },

  subHeading: {
    fontFamily: "Rubik",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "16px",
    color: "#000000",
  },
  content: {
    fontFamily: "Rubik",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "18px",
    color: "#AEB7C4",
    marginTop:"10px"
  },
};

const BarLegend = ({ classes, labels, colors, legends, hover, suffix ,hoverSuffix}) => {
  return (
    <div className={classes.legendContainer}>
      <div className={classes.flexBox}>
        {labels.map((label, i) => {
          const color = colors[i];
          return (
            <div key={i} className={classes.pRight}>
              <p className={classes.subHeading} style={{ color: color }}>
                {label}
                {/* {hover? " (" + hoverSuffix+ ")" : suffix? " (" + suffix+ ")": null} */}
              </p>
              <p className={classes.content}>{abbreviateNumber(legends[i])}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

BarLegend.propTypes = {
  /** The Labels */
  labels: PropTypes.array,
  /** Legends to access different layers of the current year stacked bar for a particular quarter*/
  legends: PropTypes.array,
  /** Colors to access color for each label of the stacked bars */
  colors: PropTypes.array,
  /** Legends to access different layers of the previous year stacked bar for a particular quarter*/
  goals: PropTypes.array,
};

BarLegend.defaultProps = {
  labels: ["500k+", "150-500k", "<150k"],
  colors: ["#130363", "#0099cc", "#FFA600"],
};

export default withStyles(styles)(BarLegend);
