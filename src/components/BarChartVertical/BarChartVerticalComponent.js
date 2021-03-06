import React ,{ useState, useEffect } from "react";
import BarLegend from "./BarLegend";
import BarChartVertical from "./BarChart";
import withStyles from "react-jss";


const styles = {
  skeletonContainer:{
    flex : "1 0 auto", width : "97%", marginLeft:"2%"
  },
  skeleton: {
    display: "inline-block",
    marginTop: "80px",
    justifyContent: "start",
    marginLeft: "10%",
    width: "10%"
  }
};

const BarChartVerticalComponent = ({legendtotal=[123456,123456,123456]}) => {
const labels = ["Positive", "Negative", "Neutral"];
const colorlegends = ["#E0E0E0","#FFA600", "#00568E"];
  

  const [legends, setLegends] = useState([123456,123456,123456])
  const [hover, setHover] = useState(false);
 
  
  const data=[
    { quarter : "Mar",
    revenue2020: 43.42,
    revenue2019: 16.80,
    revenue2018: 39.78
    },
    { quarter : "Apr",
    revenue2020: 38.22,
    revenue2019: 20.26,
    revenue2018: 41.52
    },
    { quarter : "May",
    revenue2020: 39.97,
    revenue2019: 22.03,
    revenue2018: 38.01
    },
  ]


  let i = 0;
  const touchDrag = quarter => {
    if (quarter == "Mar") {
      i = 0;
    } else if (quarter == "Apr") {
      i = 1;
     } else {
      i = 2;
    }
    setLegends([data[i].revenue2018, data[i].revenue2019, data[i].revenue2020]);
    setHover(true);
  };

  const touchOut = () => {
    setLegends(legendtotal)
    setHover(false)
  };
 
  return (
    <div style={{ position: "relative" }}>
      {/* <BarLegend
        hover={hover}
        labels={labels}
        colors={colorlegends}
        legends={legends}
      /> */}
      <div style={{ display: "flex", position: "relative" }} >
        <BarChartVertical
          data={data}
          touchDrag={touchDrag}
          touchOut={touchOut}
        />
      </div>
    </div>
  ); }
  

export default withStyles(styles)(BarChartVerticalComponent)

