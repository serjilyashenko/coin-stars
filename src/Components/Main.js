import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useBYN } from "../Hooks/RateFetch";

export default function Main() {
  const d3Ref = useRef(null);
  const data = useBYN();

  useEffect(() => {
    console.log(">> D3 useEffect", data);

    if (!data) {
      return null;
    }

    const height = 800;
    const width = 600;
    const margin = { top: 0, right: 40, bottom: 0, left: 40 };

    const svg = d3.select(d3Ref.current).attr("viewBox", [0, 0, width, height]);
    svg.selectAll("*").remove();

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // const radius = 2;
    // svg
    //   .selectAll("circle")
    //   .data(data)
    //   .enter()
    //   .append("circle")
    //   .attr("cx", (d) => x(d.date))
    //   .attr("cy", (d) => y(d.value))
    //   .attr("r", radius)
    //   .attr("fill", "teal");

    const line = d3
      .line()
      .defined((d) => !isNaN(d.value))
      .x((d) => x(d.date))
      .y((d) => y(d.value));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);
  }, [data]);

  return (
    <div>
      <svg ref={d3Ref} />
    </div>
  );
}
