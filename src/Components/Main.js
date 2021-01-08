import { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function Main() {
  const d3Ref = useRef(null);

  useEffect(() => {
    console.log(">> D3 useEffect");
    const size = 500;
    const svg = d3
      .select(d3Ref.current)
      .attr("width", size)
      .attr("height", size);
    svg.selectAll("*").remove();

    const rectWidth = 50;
    svg
      .selectAll("rect")
      .data([100, 200, 300, 400, 500])
      .enter()
      .append("rect")
      .attr("x", (d, i) => 5 + i * (rectWidth + 5))
      .attr("y", (d) => size - d)
      .attr("width", rectWidth)
      .attr("height", (d) => d)
      .attr("fill", "teal");
  }, []);

  return (
    <div>
      <svg ref={d3Ref} />
    </div>
  );
}
