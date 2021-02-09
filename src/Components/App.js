import RateProvider from "./RateProvider";
import NbCalculator from "./NbCalculator";
import BynChart from "./BynChart";
import BtcChart from "./BtcChart";

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>COIN STARS</h1>
      </header>
      <RateProvider>
        <NbCalculator />
        <BynChart />
        <BtcChart />
      </RateProvider>
    </div>
  );
}
