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
    { quarter : "Jan",
      revenue2020: 13456,
      revenue2019: 23456,
      revenue2018: 33456
    },
    { quarter : "Feb",
    revenue2020: 33456,
    revenue2019: 13456,
    revenue2018: 23456
    },
    { quarter : "Mar",
    revenue2020: 12356,
    revenue2019: 34456,
    revenue2018: 23456
    },
    { quarter : "Apr",
    revenue2020: 23456,
    revenue2019: 43456,
    revenue2018: 23456
    },
    { quarter : "May",
    revenue2020: 33456,
    revenue2019: 53456,
    revenue2018: 23456
    },
    { quarter : "Jun",
    revenue2020: 12356,
    revenue2019: 34456,
    revenue2018: 23456
    },
    { quarter : "Jul",
    revenue2020: 12356,
    revenue2019: 34456,
    revenue2018: 23456
    },
    { quarter : "Aug",
    revenue2020: 13456,
    revenue2019: 23456,
    revenue2018: 33456
    },
  ]


  let i = 0;
  const touchDrag = quarter => {
    if (quarter == "Jan") {
      i = 0;
    } else if (quarter == "Feb") {
      i = 1;
    } else if (quarter == "Mar") {
      i = 2;
    } else if (quarter == "Apr") {
      i = 3;
    } else if (quarter == "May") {
      i = 4;
    } else if (quarter == "Jun") {
      i = 5;
    } else if (quarter == "Jul") {
      i = 6;
    } else {
      i = 7;
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

