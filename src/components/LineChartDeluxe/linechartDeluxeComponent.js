import React, { useState, useEffect } from "react";
import LineChartDeluxe from ".";
import * as d3 from "d3";


const today = new Date();
const length = 31;
const firstDate = d3.timeDay.offset(today, -length);

const data = [
  {
    date: d3.timeDay.offset(firstDate, 0),
    values: [
      {
        seriesOne: 65.04024341487923,
        seriesTwo: 56.98498443375875,
        seriesThree: 27.540866023099174,
      },
    ],
  },
  {
    date: d3.timeDay.offset(firstDate, 30),
    values: [
      {
        seriesOne: 61.47900486019636,
        seriesTwo: 57.11347117540754,
        seriesThree: 36.194101673870016,
      },
    ],
  },
  {
    date: d3.timeDay.offset(firstDate, 30),
    values: [
      {
        seriesOne: 65.8136226957432,
        seriesTwo: 47.50928932302956,
        seriesThree: 48.4978019111979,
      },
    ],
  },
  // {
  //   date: d3.timeDay.offset(firstDate, 3),
  //   values: [
  //     {
  //       seriesOne: 66.76682980915267,
  //       seriesTwo: 49.66490862463783,
  //       seriesThree: 32.987753746220164,
  //     },
  //   ],
  // },
  // // {
  // //   date: d3.timeDay.offset(firstDate, 4),
  // //   values: [
  // //     {
  // //       seriesOne: 70.0702369798001,
  // //       seriesTwo: 59.390854995043796,
  // //       seriesThree: 49.008983354948576,
  // //     },
  // //   ],
  // // },
  // {
  //   date: d3.timeDay.offset(firstDate, 4),
  //   values: [
  //     {
  //       seriesOne: 70.0702369798001,
  //       seriesTwo: 56.700883397194104,
  //       seriesThree: 70.0702369798001,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 5),
  //   values: [
  //     {
  //       seriesOne: 77.78685658274674,
  //       seriesTwo: 56.700883397194104,
  //       seriesThree: 31.380558398407324,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 6),
  //   values: [
  //     {
  //       seriesOne: 66.8758953699332,
  //       seriesTwo: 50.74462318119769,
  //       seriesThree: 32.89963417476366,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 7),
  //   values: [
  //     {
  //       seriesOne: 65.63471756039446,
  //       seriesTwo: 45.74790913244734,
  //       seriesThree: 36.77124770123858,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 8),
  //   values: [
  //     {
  //       seriesOne: 59.76015035604541,
  //       seriesTwo: 43.69186691188558,
  //       seriesThree: 48.51750187214028,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 9),
  //   values: [
  //     {
  //       seriesOne: 67.44870915543265,
  //       seriesTwo: 46.45009952742073,
  //       seriesThree: 35.81397950610756,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 10),
  //   values: [
  //     {
  //       seriesOne: 65.76924048095566,
  //       seriesTwo: 52.17398163772309,
  //       seriesThree: 46.8331377657689,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 11),
  //   values: [
  //     {
  //       seriesOne: 64.15696249672362,
  //       seriesTwo: 47.702474648077626,
  //       seriesThree: 49.38052192819589,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 12),
  //   values: [
  //     {
  //       seriesOne: 70.59266965414784,
  //       seriesTwo: 46.85918846679932,
  //       seriesThree: 36.829026295442475,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 13),
  //   values: [
  //     {
  //       seriesOne: 70.03150013193934,
  //       seriesTwo: 48.1077101241861,
  //       seriesThree: 40.25666937454828,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 14),
  //   values: [
  //     {
  //       seriesOne: 71.65848062361411,
  //       seriesTwo: 52.8731495450931,
  //       seriesThree: 29.61754932153646,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 15),
  //   values: [
  //     {
  //       seriesOne: 69.4183030619021,
  //       seriesTwo: 45.06842140716746,
  //       seriesThree: 40.062953850167666,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 16),
  //   values: [
  //     {
  //       seriesOne: 73.0836957684741,
  //       seriesTwo: 48.825253208418715,
  //       seriesThree: 31.5105579029545,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 17),
  //   values: [
  //     {
  //       seriesOne: 66.14201640799715,
  //       seriesTwo: 51.405170090837025,
  //       seriesThree: 42.13135650974721,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 18),
  //   values: [
  //     {
  //       seriesOne: 74.81452462436557,
  //       seriesTwo: 57.2054986921573,
  //       seriesThree: 47.429224031189506,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 19),
  //   values: [
  //     {
  //       seriesOne: 72.3523831627895,
  //       seriesTwo: 48.45221385467811,
  //       seriesThree: 33.97270739983761,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 19),
  //   values: [
  //     {
  //       seriesOne: 53.94850700990467,
  //       seriesTwo: 35.03756353116912,
  //       seriesThree: 33.97270739983761,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 20),
  //   values: [
  //     {
  //       seriesOne: 67.7032461284711,
  //       seriesTwo: 53.94850700990467,
  //       seriesThree: 35.03756353116912,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 21),
  //   values: [
  //     {
  //       seriesOne: 69.39205446451464,
  //       seriesTwo: 49.487191982752194,
  //       seriesThree: 41.59893862108971,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 22),
  //   values: [
  //     {
  //       seriesOne: 74.29099457320389,
  //       seriesTwo: 49.7491418975605,
  //       seriesThree: 47.20992509667752,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 23),
  //   values: [
  //     {
  //       seriesOne: 70.42565599102838,
  //       seriesTwo: 60.96597557746768,
  //       seriesThree: 40.15162636914027,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 24),
  //   values: [
  //     {
  //       seriesOne: 72.50816577513062,
  //       seriesTwo: 48.25639301507034,
  //       seriesThree: 49.72078471415879,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 25),
  //   values: [
  //     {
  //       seriesOne: 70.23827572812314,
  //       seriesTwo: 57.19085654472307,
  //       seriesThree: 41.35396837373187,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 25),
  //   values: [
  //     {
  //       seriesOne: 40.12301485330936,
  //       seriesTwo: 57.19085654472307,
  //       seriesThree: 56.29224134140295,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 26),
  //   values: [
  //     {
  //       seriesOne: 83.222733802327,
  //       seriesTwo: 51.701877036094345,
  //       seriesThree: 40.12301485330936,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 27),
  //   values: [
  //     {
  //       seriesOne: 69.73776544605641,
  //       seriesTwo: 56.29224134140295,
  //       seriesThree: 29.782282413102642,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 28),
  //   values: [
  //     {
  //       seriesOne: 66.0346451480108,
  //       seriesTwo: 42.05200533296523,
  //       seriesThree: 34.539288217518276,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 29),
  //   values: [
  //     {
  //       seriesOne: 69.70246838004685,
  //       seriesTwo: 38.7238298466587,
  //       seriesThree: 41.1966227696003,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 30),
  //   values: [
  //     {
  //       seriesOne: 77.17285729668265,
  //       seriesTwo: 56.74123464569139,
  //       seriesThree: 45.25615718145136,
  //     },
  //   ],
  // },
  // {
  //   date: d3.timeDay.offset(firstDate, 31),
  //   values: [
  //     {
  //       seriesOne: 77.17285729668265,
  //       seriesTwo: 56.74123464569139,
  //       seriesThree: 45.25615718145136,
  //     },
  //   ],
  // },
];

console.log(data)

Array.prototype.sum = function(prop) {
  var total = 0;
  for (var i = 0, _len = this.length; i < _len; i++) {
    total += this[i][prop];
  }
  return total;
};

const labels = ["Positive Tweets ", "Neutral Tweets", "Negative Tweets"];
const colors = ["#E0E0E0", "#00568E","#FFA600"];
 const LineChartDeluxeComponent = () => {
  const seriesData = data.map(d => {
    return d.values[0];
  });
  const seriesOneVal = seriesData.sum("seriesOne");
  const seriesTwoVal = seriesData.sum("seriesTwo");
  const seriesThreeVal = seriesData.sum("seriesThree");
  const parseDate = d3.timeParse("%Y-%m-%d");
  const dateAccessor = d => d.date;
  const seriesOneAccessor = d => d.values[0].seriesOne;
  const seriesTwoAccessor = d => d.values[0].seriesTwo;
  const seriesThreeAccessor = d => d.values[0].seriesThree;
  return (
    <>
      <LineChartDeluxe
        type={"line"}
        data={data}
        seriesData={seriesData}
        xAccessor={dateAccessor}
        series={[seriesOneAccessor, seriesTwoAccessor, seriesThreeAccessor]}
        labels={labels}
        colors={colors}
        seriesDefaultVal={[seriesOneVal, seriesTwoVal, seriesThreeVal]}
      ></LineChartDeluxe>
    </>
  );
};

export default LineChartDeluxeComponent
