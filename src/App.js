import { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import Die from "./components/Die";
import "./index.css";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);
  const diceElements = dice.map((dieObject) => {
    return (
      <Die
        key={dieObject.id}
        value={dieObject.value}
        isHeld={dieObject.isHeld}
        id={dieObject.id}
        hold={() => holdDice(dieObject.id)}
      />
    );
  });
  const buttonRef = useRef(null);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((dieObject) => {
        return dieObject.isHeld
          ? dieObject
          : { ...dieObject, value: Math.ceil(Math.random() * 6) };
      })
    );
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((item) => {
        return id === item.id ? { ...item, isHeld: !item.isHeld } : item;
      })
    );
  }

  function newGame() {
    if (gameWon) {
      setDice(generateAllNewDice());
    }
  }

  return (
    <div className="App">
      <div className="main-container">
        {gameWon && <Confetti />}
        <div aria-live="polite" className="sr-only">
          {gameWon && (
            <p>Congratulations! You won! Press "New Game" to start again.</p>
          )}
        </div>
        <Header />
        <div className="dice-container">{diceElements}</div>
        {(gameWon && (
          <button className="roll-dice" onClick={newGame} ref={buttonRef}>
            New Game
          </button>
        )) || (
          <button className="roll-dice" onClick={rollDice} ref={buttonRef}>
            Roll Dice
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
