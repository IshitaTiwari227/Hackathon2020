import React from "react";
import DonutChart from ".";


var colors = ["#FFA600", "#00568E", "#E0E0E0"];
const data = [
  {
    type: "Positive Tweets",
    value: 4800987,
    oldValue: 2600678,
    percentageValue: 86,
  },
  {
    type: "Negative Tweets",
    value: 42005875,
    oldValue: 860089798,
    percentageValue: 75,
  },
  {
    type: "Neutral Tweets",
    value: 37890588,
    oldValue: 8600768,
    percentageValue: 58,
  },
];
// export const basic = () => (
//   <DonutChart data={data} outerRadius={40} innerRadius={20} colors={colors} />
// );

 const DonutChartComponent = () => (
  <DonutChart
    data={data}
    outerRadius={70}
    innerRadius={45}
    colors={colors}
    displayTotal={true}
  />
);
export default DonutChartComponent