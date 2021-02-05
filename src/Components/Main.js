import { useRef } from "react";
import { useBYN, useBTC } from "../Hooks/RateFetch";
import { useRenderLine } from "../Hooks/Render";
import NbCalculator from "./NbCalculator";

export default function Main() {
  const bynChartContainer = useRef(null);
  const bynChartRef = useRef(null);
  const bynData = useBYN();
  useRenderLine(bynChartContainer, bynChartRef, bynData);

  const btcChartContainer = useRef(null);
  const btcChartRef = useRef(null);
  const btcData = useBTC();
  useRenderLine(btcChartContainer, btcChartRef, btcData);

  return (
    <>
      <NbCalculator bynData={bynData} />
      <div ref={bynChartContainer}>
        <svg ref={bynChartRef} />
      </div>
      <div ref={btcChartContainer}>
        <svg ref={btcChartRef} />
      </div>
    </>
  );
}
