import React, { useEffect, useMemo, useRef } from "react";
import { scaleLinear } from "d3-scale";
import { pack, hierarchy } from "d3-hierarchy";
import { select } from "d3-selection";
import { min, max, extent } from "d3-array";
import "./style.css";

export default ({ width, height, data: childData, dimName, measName }) => {
  const data = { children: childData };
  const _serializedData = JSON.stringify(data);

  const svgRef = useRef();
  const currentRef = svgRef.current;
  const svg = useMemo(() => select(currentRef), [currentRef]);

  const minDimension = useMemo(() => {
    return max([min([width, height]), 1]);
  }, [width, height]);

  const colorScale = useMemo(
    () =>
      scaleLinear()
        .domain(extent(childData.map(row => row[measName])))
        .range(["#E2D9B9", "#DEB00D"]),
    [_serializedData, measName, childData] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    const bubblePack = pack(data)
      .size([minDimension, minDimension])
      .padding(5);

    const nodes = hierarchy(data).sum(d => d[measName]);

    const bubbleData = svg
      .selectAll(".node")
      .data(bubblePack(nodes).descendants());
    const bubbleUpdate = bubbleData
      .enter() // Enter
      .filter(d => !d.children)
      .append("g")
      .attr("class", "node")
      .merge(bubbleData) // Update
      .attr("transform", d => `translate(${d.x}, ${d.y})`);
    bubbleData.exit().remove(); // Exit

    bubbleUpdate
      .append("circle")
      .attr("r", d => d.r)
      .style("fill", d => colorScale(d.data[measName]));

    bubbleUpdate
      .append("text")
      .attr("class", "bubble-text")
      .text(d => `${d.data[dimName]}`);

    bubbleUpdate
      .append("text")
      .attr("class", "bubble-text")
      .attr("y", 15)
      .text(d => `${d.data[measName]}`);
  }, [minDimension, _serializedData, data, colorScale, svg, measName, dimName]);

  return (
    <svg ref={svgRef} className="bubble-chart" width="100%" height={height} />
  );
};
