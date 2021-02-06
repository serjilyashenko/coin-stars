import { useRateFetcher } from "./RateFetcher";

export default function useBynChart() {
  const { bynData } = useRateFetcher();
  return bynData;
}
