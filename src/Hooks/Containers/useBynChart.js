import { useContext } from "react";
import { RateContext } from "../../Components/RateProvider";

// Container component for BynChart component
export default function useBynChart() {
  const { bynData } = useContext(RateContext);

  return bynData;
}
