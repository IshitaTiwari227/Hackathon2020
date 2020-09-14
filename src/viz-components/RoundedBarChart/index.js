import React, { useRef, useMemo, useEffect, useState } from "react";
import { Tooltip } from "../";
import { scaleBand, scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { select } from "d3-selection";
import { format } from "d3-format";
import "./style.css";

export default ({
  width,
  height,
  data,
  dimName,
  barMeasName,
  symbolMeasName
}) => {
  const xAxisHeight = 20;
  const svgRef = useRef();
  const currentRef = svgRef.current;

  const xScale = useMemo(
    () =>
      scaleBand()
        .domain(data.map(row => row[dimName]))
        .range([0, width])
        .paddingInner(0.45),
    [data, dimName, width]
  );

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([
          0,
          max([
            ...data.map(row => row[barMeasName]),
            ...data.map(row => row[symbolMeasName])
          ])
        ])
        .range([height - xAxisHeight, 0]),
    [barMeasName, data, height, symbolMeasName]
  );

  const svg = useMemo(() => select(currentRef), [currentRef]);

  /********************************
   * Render *
   ********************************/
  const [tooltipData, setTooltipData] = useState(null);
  useEffect(() => {
    // X Axis
    const xAxisLabelData = svg
      .selectAll(".x-axis-label")
      .data([
        { text: `Week 1`, textAnchor: "start", x: xScale.range()[0] },
        { text: `Week ${data.length}`, textAnchor: "end", x: xScale.range()[1] }
      ]);
    xAxisLabelData
      .enter() // Enter
      .append("text")
      .attr("class", "x-axis-label")
      .style("alignment-baseline", "ideographic")
      .merge(xAxisLabelData) // Update
      .attr("x", d => d.x)
      .attr("y", height)
      .style("text-anchor", d => d.textAnchor)
      .text(d => d.text);
    xAxisLabelData.exit().remove(); // Exit

    // Bars
    const barData = svg.selectAll(".bar").data(data);
    barData
      .enter() // Enter
      .append("rect")
      .attr("class", "bar")
      .merge(barData) // Update
      .attr("x", d => xScale(d[dimName]))
      .attr("width", xScale.bandwidth())
      .attr("y", d => yScale(d[barMeasName]))
      .attr("height", d => yScale(0) - yScale(d[barMeasName]))
      .attr("rx", xScale.bandwidth() / 2)
      .on("mouseover", d => setTooltipData(d));
    barData.exit().remove(); // Exit

    // Symbols
    const symbolData = svg.selectAll(".symbol").data(data);
    symbolData
      .enter() // Enter
      .append("rect")
      .attr("class", "symbol")
      .merge(symbolData) // Update
      .attr("x", d => xScale(d[dimName]))
      .attr("width", xScale.bandwidth())
      .attr("y", d => yScale(d[symbolMeasName]) - 2)
      .attr("height", 4);
    symbolData.exit().remove();
  }, [svg, xScale, yScale, height, data, dimName, barMeasName, symbolMeasName]);

  /********************************
   * Hover Interactions *
   ********************************/
  const [tooltipLeft, setTooltipLeft] = useState(0);
  const [tooltipTop, setTooltipTop] = useState(0);
  const [tooltipPos, setTooltipPos] = useState("right");
  const [tooltipContent, setTooltipContent] = useState(null);
  useEffect(() => {
    if (tooltipData !== null) {
      setTooltipContent(
        <>
          <div className="tooltip__title">{tooltipData[dimName]}</div>
          <table className="tooltip__table">
            <tbody>
              <tr>
                <td>
                  <div className="tooltip__table__dot total" />
                </td>
                <td>Total Visits</td>
                <td className="tooltip__table__value">
                  {format(".2s")(tooltipData[barMeasName])}
                </td>
              </tr>
              <tr>
                <td>
                  <div className="tooltip__table__dot repeat" />
                </td>
                <td>Repeat Visits</td>
                <td className="tooltip__table__value">
                  {format(".2s")(tooltipData[symbolMeasName])}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      );
      setTooltipLeft(xScale(tooltipData[dimName]) + xScale.bandwidth() / 2);
      setTooltipTop(yScale(tooltipData[barMeasName] / 2));
      setTooltipPos(
        xScale(tooltipData[dimName]) <
          (xScale.range()[0] + xScale.range()[1]) / 2
          ? "right"
          : "left"
      );
    }
  }, [barMeasName, dimName, symbolMeasName, tooltipData, xScale, yScale]);

  const containerRef = useRef();
  useEffect(() => {
    select(containerRef.current).on("mouseleave", () => setTooltipData(null));
  }, []);

  return (
    <div className="rounded-bar-chart-container" ref={containerRef}>
      <svg
        className="rounded-bar-chart"
        ref={svgRef}
        width="100%"
        height={height}
      />
      {tooltipData !== null ? (
        <Tooltip left={tooltipLeft} top={tooltipTop} pos={tooltipPos}>
          {tooltipContent}
        </Tooltip>
      ) : null}
    </div>
  );
};
