import { useEffect } from "react";
import * as d3 from "d3";
import { format } from "date-fns";

export default function useRenderLineChart(containerRef, svgRef, data) {
  useEffect(() => {
    if (!data) {
      return null;
    }

    const containerElement = containerRef.current;
    const height = 450;
    const { width } = containerElement.getBoundingClientRect();
    const margin = { top: 10, right: 100, bottom: 20, left: 60 };

    const svg = d3
      .select(svgRef.current)
      // .attr("viewBox", [0, 0, width, height]); // To handle resize like SVG
      .attr("height", height)
      .attr("width", "100%"); // !!
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

    const lastDataItem = data[data.length - 1];
    const isRise = lastDataItem.value >= data[data.length - 2].value;
    const labelGroup = svg.append("g");
    labelGroup.append("circle").attr("r", 2).attr("fill", "teal");
    labelGroup
      .append("text")
      .attr("transform", "translate( 4, 11)")
      .attr("font-size", 12)
      .attr("fill", isRise ? "green" : "red")
      .text(() => lastDataItem.value);
    labelGroup
      .append("text")
      .attr("font-size", 12)
      .attr("transform", "translate( 4, -2)")
      .attr("opacity", 0.5)
      .text(() => format(lastDataItem.date, "dd.MM"));
    labelGroup.attr(
      "transform",
      `translate(${x(lastDataItem.date)}, ${y(lastDataItem.value)})`
    );

    const resizeHandler = (entries) => {
      const { width: w } = entries?.[0]?.contentRect || {};
      x.range([margin.left, w - margin.right]);
      pathElement.attr(
        "d",
        line.x((d) => x(d.date))
      );
      xAxisElement.call(getXAxis(x, w));
      labelGroup.attr(
        "transform",
        `translate(${x(lastDataItem.date)}, ${y(lastDataItem.value)})`
      );
    };

    const resizeObserver = new ResizeObserver(resizeHandler);
    resizeObserver.observe(containerElement);

    return () => resizeObserver.unobserve(containerElement);
  }, [containerRef, svgRef, data]);
}
