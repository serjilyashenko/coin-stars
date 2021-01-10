import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useBYN } from "../Hooks/RateFetch";

export default function Main() {
  const containerRef = useRef(null);
  const d3Ref = useRef(null);
  const data = useBYN();

  useEffect(() => {
    if (!data) {
      return null;
    }

    const containerElement = containerRef.current;
    const height = 450;
    const { width } = containerElement.getBoundingClientRect();
    const margin = { top: 10, right: 40, bottom: 20, left: 60 };

    const svg = d3
      .select(d3Ref.current)
      // .attr("viewBox", [0, 0, width, height]); // To handle resize like SVG
      .attr("height", height)
      .attr("width", width);
    svg.selectAll("*").remove();

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.value), d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const getXAxis = (x, width) =>
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0);
    const xAxisElement = svg
      .append("g")
      .call(getXAxis(x))
      .attr("transform", `translate(0, ${height - margin.bottom})`);

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call((g) =>
          g
            .select(".tick:last-of-type text")
            .clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(data.y)
        );
    svg.append("g").call(yAxis);

    const line = d3
      .line()
      .defined((d) => !isNaN(d.value))
      .x((d) => x(d.date))
      .y((d) => y(d.value));

    const pathElement = svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

    const resizeHandler = (entries) => {
      const { width: w } = entries?.[0]?.contentRect || {};
      x.range([margin.left, w - margin.right]);
      pathElement.attr(
        "d",
        line.x((d) => x(d.date))
      );
      xAxisElement.call(getXAxis(x, w));
    };

    const resizeObserver = new ResizeObserver(resizeHandler);
    resizeObserver.observe(containerElement);

    return () => resizeObserver.unobserve(containerElement);
  }, [data]);

  return (
    <div ref={containerRef}>
      <svg ref={d3Ref} />
    </div>
  );
}
