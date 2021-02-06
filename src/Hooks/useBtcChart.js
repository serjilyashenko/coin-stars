import { useRateFetcher } from "./RateFetcher";

export default function useBtcChart() {
  const { btcData } = useRateFetcher();
  return btcData;
}
