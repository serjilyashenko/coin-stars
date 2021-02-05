import Main from "./Components/Main";

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>COIN STARS</h1>
      </header>
      <Main />
      {/*// Get data (byn + btc), show spinner, error, context*/}
      {/*<Main>*/}
      {/*  <NbCalculator />*/}
      {/*  <BynChart />*/}
      {/*  <BitcoinChart />*/}
      {/*</Main>*/}
    </div>
  );
}
