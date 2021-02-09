import { useRef } from "react";
import useBynChart from "../Hooks/Containers/useBynChart";
import useRenderLineChart from "../Hooks/useRenderLineChart";

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
