import React, { useMemo, useRef, useEffect, useState } from "react";
import { Tooltip } from "../";
import { scaleLinear, scaleBand, scaleTime } from "d3-scale";
import { max } from "d3-array";
import { select } from "d3-selection";
import { line, curveMonotoneX } from "d3-shape";
import "./style.css";

const xAxisHeight = 15;
export default ({
  data,
  eventData = [],
  dimName,
  measName,
  width,
  height,
  tooltipRender
}) => {
  const _serializedData = JSON.stringify(data);

  /********************************
   * Scales *
   ********************************/
  // X Band Scale
  const xScale = useMemo(
    () =>
      scaleBand()
        .domain(data.map(row => row[dimName]))
        .range([0, width]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [_serializedData, dimName, width, data]
  );

  const timeScale = useMemo(
    () =>
      scaleTime()
        .domain([
          new Date(data[0][dimName]),
          new Date(data[data.length - 1][dimName])
        ])
        .range([0, width]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [_serializedData, width, data, dimName]
  );

  // Y Scale
  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([0, max(data.map(row => row[measName])) * 1.5])
        .range([height - xAxisHeight, 0]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [_serializedData, height, data, measName]
  );

  /********************************
   * Render Plot *
   ********************************/
  const svgRef = useRef();
  const currentRef = svgRef.current;
  const svg = useMemo(() => select(currentRef), [currentRef]);

  const [hoverLinePos, setHoverLinePos] = useState(null);

  useEffect(() => {
    /** X Axis Labels */
    const xAxisLabelData = svg.selectAll(".x-axis-label").data([
      {
        text: "Day 0",
        x: xScale.range()[0] + xScale.bandwidth() / 2,
        textAnchor: "start"
      },
      {
        text: "Day 90",
        x: xScale.range()[1] - xScale.bandwidth() / 2,
        textAnchor: "end"
      }
    ]);
    xAxisLabelData
      .enter()
      .append("text")
      .attr("class", "x-axis-label")
      .merge(xAxisLabelData)
      .text(d => d.text)
      .attr("x", d => d.x)
      .attr("y", height)
      .style("text-anchor", d => d.textAnchor)
      .style("alignment-baseline", "ideographic");
    xAxisLabelData.exit().remove();

    /** Line */
    const lineData = svg.selectAll(".line").data([data]);
    lineData
      .enter() // Enter
      .append("path")
      .attr("class", "line")
      .merge(lineData) // Update
      .attr(
        "d",
        line()
          .x(d => xScale(d[dimName]) + xScale.bandwidth() / 2)
          .y(d => yScale(d[measName]))
          .curve(curveMonotoneX)
      );
    lineData.exit().remove(); //Exit

    /** Line Events */
    const eventGroupData = svg.selectAll(".event-group").data(eventData);
    const eventGroup = eventGroupData
      .enter()
      .append("g")
      .attr("class", "event-group")
      .merge(eventGroupData)
      .attr("transform", d => `translate(${timeScale(new Date(d.date))}, 0)`);
    eventGroupData.exit().remove();

    const eventLineData = eventGroup.selectAll(".event-line").data(d => [1]);
    eventLineData
      .enter()
      .append("rect")
      .attr("class", "event-line")
      .merge(eventLineData)
      .attr("width", 6)
      .attr("y", yScale.range()[1])
      .attr("height", yScale.range()[0]);
    eventLineData.exit().remove();

    const eventTextNameData = eventGroup
      .selectAll(".event-text-name")
      .data(d => [d]);
    eventTextNameData
      .enter()
      .append("text")
      .attr("class", "event-text-name")
      .merge(eventTextNameData)
      .attr("x", 10)
      .attr("y", 10)
      .text(d => d.name);
    eventTextNameData.exit().remove();
    const eventTextDateData = eventGroup
      .selectAll(".event-text-date")
      .data(d => [d]);
    eventTextDateData
      .enter()
      .append("text")
      .attr("class", "event-text-date")
      .merge(eventTextDateData)
      .attr("x", 10)
      .attr("y", 25)
      .text(d => d.date);
    eventTextDateData.exit().remove();

    /** Line Bands */
    const lineBandData = svg.selectAll(".line-band").data(data);
    lineBandData
      .enter() // Enter
      .append("rect")
      .attr("class", "line-band")
      .merge(lineBandData) // Update
      .attr("x", d => xScale(d[dimName]))
      .attr("width", xScale.bandwidth())
      .attr("y", yScale.range()[1])
      .attr("height", yScale.range()[0])
      .on("mouseover", d => setHoverLinePos(d));
    lineBandData.exit().remove(); // Exit
  }, [
    svg,
    _serializedData,
    xScale,
    yScale,
    height,
    data,
    eventData,
    dimName,
    measName,
    timeScale
  ]);

  /********************************
   * Hover Interaction *
   ********************************/
  useEffect(() => {
    /** Hover Dot
     * Draw a dot on the line position that is being hovered */
    const hoverDotData = svg
      .selectAll(".hover-dot")
      .data(hoverLinePos !== null ? [hoverLinePos] : []);
    hoverDotData
      .enter() // Enter
      .append("circle")
      .attr("class", "hover-dot")
      .merge(hoverDotData) // Update
      .attr("cx", d => xScale(d[dimName]) + xScale.bandwidth() / 2)
      .attr("cy", d => yScale(d[measName]))
      .attr("r", 5);
    hoverDotData.exit().remove(); // Exit
  }, [dimName, hoverLinePos, measName, svg, xScale, yScale]);

  /** Tooltip
   * Set Tooltip properties when hoverLinePos updates */
  const [tooltipLeft, setTooltipLeft] = useState(0);
  const [tooltipTop, setTooltipTop] = useState(0);
  const [tooltipPos, setTooltipPos] = useState("right");
  const [tooltipContent, setTooltipContent] = useState(null);
  useEffect(() => {
    if (hoverLinePos !== null) {
      setTooltipContent(tooltipRender(hoverLinePos));
      setTooltipLeft(xScale(hoverLinePos[dimName]) + xScale.bandwidth() / 2);
      setTooltipTop(yScale(hoverLinePos[measName]));
      setTooltipPos(
        xScale(hoverLinePos[dimName]) <
          (xScale.range()[0] + xScale.range()[1]) / 2
          ? "right"
          : "left"
      );
    }
  }, [dimName, hoverLinePos, measName, tooltipRender, xScale, yScale]);

  /** remove tooltip when leave line-chart-container */
  const containerRef = useRef();
  const currentContainerRef = containerRef.current;
  useEffect(() => {
    select(currentContainerRef).on("mouseleave", () => setHoverLinePos(null));
  }, [currentContainerRef]);

  return (
    <div className="line-chart-container" ref={containerRef}>
      <svg className="line-chart" ref={svgRef} width="100%" height={height} />
      {hoverLinePos !== null ? (
        <Tooltip left={tooltipLeft} top={tooltipTop} pos={tooltipPos}>
          {tooltipContent}
        </Tooltip>
      ) : null}
    </div>
  );
};
