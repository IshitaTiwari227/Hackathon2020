import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import * as d3 from "d3";
import Chart from "../ChartComponents/Chart";
import { useChartDimensions } from "../../hooks/qlikHooks/useChartDimensions";

const styles = {
  BarChartVertical: { flex : "1 0 auto", width : "97%", marginLeft:"2%"
   },
  quarterName: {
    fontFamily: "Rubik",
    fontSize: "12px",
    fill: "#AEB7C4",
    textAnchor: "end",
    fontWeight: "normal",
  },
  pRight:{
    marginRight:"2%"
  }
};

const BarChartVertical = ({
  classes,
  data,
  touchDrag,
  touchOut
}) => {
  const [ref, dimensions] = useChartDimensions({
    marginLeft: 20,
    marginTop: 60,
    height: 400,
  });
  
  const barSize2018 = data.map(el=> el.revenue2018);
  const barSize2019 = data.map(el=> el.revenue2019);
  const barSize2020 = data.map(el=> el.revenue2020);
  var dataMax = Math.max(...barSize2018,...barSize2019,...barSize2020);
  

  const xScale0 = d3
    .scaleBand()
    .domain(data.map(d => d.quarter))
    .range([0, dimensions.boundedWidth])
    .padding(0.1);

  const yScale0 = d3
    .scaleLinear()
    .domain([0,dataMax])
    .range([dimensions.boundedHeight, 0]);


  let [opacityquarter,setOpacity]=useState([1,1,1,1,1,1,1,1])

  const moveHandle = quarter => {
    touchDrag(quarter);
  };
  
  let newOpacity=[]
  const handleOpacity = quarter => {
    opacityquarter.map((row, index) => {
      if(index === quarter){
        newOpacity.splice(index, 0, 1);
      } else newOpacity.splice(index+1,0,0.3)
    })
    setOpacity(newOpacity)
};
  

  return (
    <React.Fragment>
      <div ref={ref} className={classes.BarChartVertical} >
        <Chart dimensions={dimensions}>
          {data.map((layer0, i) => {
                 const myHandleFunc = () => {
                  moveHandle(layer0.quarter);
                };
                  return (
                    <g key={i} 
                       onMouseMove={myHandleFunc}
                       onTouchMove={myHandleFunc}
                       onMouseOut={touchOut}
                       onClick={()=>handleOpacity(i)}
                       opacity={opacityquarter[i]}
                       >
                      <text
                        className={classes.quarterName}
                        x={
                          xScale0(layer0.quarter) + 40
                        }
                        y={dimensions.boundedHeight+20}
                      >
                        {layer0.quarter}
                      </text>
                      <rect  
                        width={17}
                        height={yScale0(0)-yScale0(layer0.revenue2018)}
                        x={xScale0(layer0.quarter)}
                        y={yScale0(layer0.revenue2018)}
                        fill={"#E0E0E0"}
                      />
                      <rect
                        width={17}
                        height={yScale0(0)-yScale0(layer0.revenue2019)}
                        x={xScale0(layer0.quarter)+20}
                        y={yScale0(layer0.revenue2019)}
                        fill={"#FFA600"}
                      />
                      <rect
                        width={17}
                        height={yScale0(0)-yScale0(layer0.revenue2020)}
                        x={xScale0(layer0.quarter)+40}
                        y={yScale0(layer0.revenue2020)}
                        fill={"#00568E"}
                      />
                    </g>
                  );
                })}
                ;
             
            );
          })}
        </Chart>
      </div>
    </React.Fragment>
  );
};

BarChartVertical.propTypes = {
  /** Object that defines the margins and dimensions. Requires useChartDimensions hook */
  dimensions: PropTypes.object,
  /** The data */
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  
};


export default withStyles(styles)(BarChartVertical);
