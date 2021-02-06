import { useRef } from "react";
import useBtcChart from "../Hooks/useBtcChart";
import { useRenderLineChart } from "../Hooks/Render";

export default function BtcChart() {
  const { /*loading, error,*/ data } = useBtcChart();

  const btcChartContainer = useRef(null);
  const btcChartRef = useRef(null);
  useRenderLineChart(btcChartContainer, btcChartRef, data);

  return (
    <div ref={btcChartContainer}>
      <svg ref={btcChartRef} />
    </div>
  );
}
