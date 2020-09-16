import React from "react";
import DonutChart from ".";


var colors = [ "#E0E0E0","#FFA600", "#00568E"];
// export const basic = () => (
//   <DonutChart data={data} outerRadius={40} innerRadius={20} colors={colors} />
// );

 const DonutChartComponent = ({data,displayTotal}) => (
  <DonutChart
    data={data}
    outerRadius={70}
    innerRadius={45}
    colors={colors}
    displayTotal={displayTotal}
    overall
  />
);
export default DonutChartComponent