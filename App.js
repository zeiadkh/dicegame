import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [numOfRolls, setNum] = React.useState(0);
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const startTime = new Date();

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      incRollsNum();
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      // let rollsNum= numOfRolls-1
      setTenzies(false);
      setDice(allNewDice);
    }
  }
  //high Socre
  function incRollsNum() {
    if (!tenzies) {
      setNum((oldn) => oldn + 1);
      return numOfRolls;
    } else {
      setNum(0);
      const highScore = +localStorage.getItem("highScore");
      if (numOfRolls < highScore || highScore === 0) {
        localStorage.setItem("highScore", `${numOfRolls}`);
      }
    }
  }

  React.useEffect(() => {
    if (tenzies) {
      const highScore = +localStorage.getItem("highScore");
      if (numOfRolls < highScore || highScore === 0) {
        localStorage.setItem("highScore", `${numOfRolls}`);
      }
    }
  }, [tenzies, numOfRolls]);

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id
          ? Object.assign({}, die, { isHeld: !die.isHeld })
          : die;
      })
    );
  }
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="hs">
        
        The Best Score Is {localStorage.getItem("highScore")}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
