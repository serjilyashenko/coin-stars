import NbCalculator from "./Components/NbCalculator";
import BynChart from "./Components/BynChart";
import BtcChart from "./Components/BtcChart";
import { RateFetcherProvider } from "./Hooks/RateFetcher";

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>COIN STARS</h1>
      </header>
      <RateFetcherProvider>
        <NbCalculator />
        <BynChart />
        <BtcChart />
      </RateFetcherProvider>
    </div>
  );
}
