import { useRef } from "react";
import useBynChart from "../Hooks/useBynChart";
import { useRenderLineChart } from "../Hooks/Render";

export default function BynChart() {
  const { /*loading, error,*/ data } = useBynChart();

  const bynChartContainer = useRef(null);
  const bynChartRef = useRef(null);
  useRenderLineChart(bynChartContainer, bynChartRef, data);

  return (
    <div ref={bynChartContainer}>
      <svg ref={bynChartRef} />
    </div>
  );
}
