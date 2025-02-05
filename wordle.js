import React, { useState } from "react";
import "./wordle.css";

const WORDS = ["doors", "photo", "frame", "radio", "cable"];
const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

const Wordle = () => {
  const [targetWord, setTargetWord] = useState(getRandomWord);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const handleGuess = () => {
    if (currentGuess.length !== 5 || guesses.length >= 6 || gameOver) return;

    if (!WORDS.includes(currentGuess)) {
      setMessage("Invalid word!");
      return;
    }
    setMessage("");

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    setCurrentGuess("");

    if (currentGuess === targetWord) {
      setGameOver(true);
      setMessage("You won!");
    } else if (newGuesses.length >= 6) {
      setGameOver(true);
      setMessage(`Game over! The word was ${targetWord}`);
    }
  };

  const getLetterColor = (letter, index) => {
    if (targetWord[index] === letter) return "green";
    if (targetWord.includes(letter)) return "yellow";
    return "gray";
  };

  const handleNewGame = () => {
    setTargetWord(getRandomWord);
    setGuesses([]);
    setCurrentGuess("");
    setGameOver(false);
    setMessage("");
  };

  return (
    <div className="wordle-container">
      <h1>Wordle Clone</h1>
      <div className="grid">
        {guesses.map((word, i) => (
          <div key={i} className="word-row">
            {word.split("").map((letter, j) => (
              <span key={j} className={letter `${getLetterColor(letter, j)}`}>
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>
      {!gameOver && (
        <div>
          <input
            type="text"
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value.toLowerCase())}
            maxLength={5}
          />
          <button onClick={handleGuess}>Submit</button>
        </div>
      )}
      {message && <p>{message}</p>}
      <button onClick={handleNewGame}>New Game</button>
    </div>
  );
};

export default Wordle;