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

const BarChartVerticalComponent = ({legendtotal=[45972878,25372595,44938126]}) => {
const labels = ["Positive", "Negative", "Neutral"];
const colorlegends = ["#E0E0E0","#FFA600", "#00568E"];
  

  const [legends, setLegends] = useState([45972878,25372595,44938126])
  const [hover, setHover] = useState(false);
 
  
  const data=[
    { quarter : "Mar",
    revenue2020: 43958,
    revenue2019: 17005,
    revenue2018: 40268
    },
    { quarter : "Apr",
    revenue2020: 1538001,
    revenue2019: 815371,
    revenue2018: 1670551
    },
    { quarter : "May",
    revenue2020: 594788,
    revenue2019: 327822,
    revenue2018: 565650
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
      <BarLegend
        hover={hover}
        labels={labels}
        colors={colorlegends}
        legends={legends}
      />
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

