import Header from "./components/Header";
import Die from "./components/Die";
import "./index.css";

function App() {
  return (
    <div className="App">
      <div className="main-container">
        <Header />
        <div className="dice-container">
          <Die value={1} />
          <Die value={1} />
          <Die value={1} />
          <Die value={1} />
          <Die value={1} />
          <Die value={1} />
          <Die value={1} />
          <Die value={1} />
          <Die value={1} />
          <Die value={1} />
        </div>
        <button className="roll-dice">Roll Dice</button>
      </div>
    </div>
  );
}

export default App;
