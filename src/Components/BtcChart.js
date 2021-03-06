import { useRef } from "react";
import useBtcChart from "../Hooks/Containers/useBtcChart";
import useRenderLineChart from "../Hooks/useRenderLineChart";

export default function BtcChart() {
  const { /*loading, error,*/ data } = useBtcChart();

  const btcChartContainer = useRef(null);
  const btcChartRef = useRef(null);

  useRenderLineChart(btcChartContainer, btcChartRef, data, "USD");

  return (
    <div ref={btcChartContainer}>
      <svg ref={btcChartRef} />
    </div>
  );
}
