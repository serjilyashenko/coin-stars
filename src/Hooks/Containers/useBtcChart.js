import { useContext } from "react";
import { RateContext } from "../../Components/RateProvider";

// Container component for BtcChart component
export default function useBtcChart() {
  const { btcData } = useContext(RateContext);
  return btcData;
}
