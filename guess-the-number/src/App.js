import React, { useState } from 'react';
import './App.css';
import AnimatedNumbers from '/AnimatedNumbers';

function App() {
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(3);
  const [task, setTask] = useState('');

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  function generateRandomTask() {
    const tasks = [
      'Прочитайте вірш на вільну тему.',
      'Пострібайте три рази на місці.',
      'Розкажіть анекдот.',
      'Назвіть третю пісню зі свого плейлисту.',
      // Додайте більше завдань за потреби
    ];

    return tasks[Math.floor(Math.random() * tasks.length)];
  }

  function handleGuessChange(event) {
    setGuess(event.target.value);
  }

  function handleGuessSubmit(event) {
    event.preventDefault();
    const guessedNumber = parseInt(guess);

    if (isNaN(guessedNumber)) {
      setMessage('Будь ласка, введіть число.');
    } else {
      if (guessedNumber === targetNumber) {
        setMessage(`Вітаємо! Ви вгадали число ${targetNumber}!`);
        setTargetNumber(generateRandomNumber());
        setAttempts(3);
      } else if (guessedNumber < targetNumber) {
        setMessage('Загадане число більше.');
      } else {
        setMessage('Загадане число менше.');
      }

      if (attempts - 1 === 0) {
        setMessage(`Спроби закінчилися! Ваше завдання: ${generateRandomTask()}`);
        setTargetNumber(generateRandomNumber());
        setAttempts(3);
      } else {
        setAttempts(attempts - 1);
      }
    }
    setGuess('');
  }

  return (
      <div className="App">
        <h1>Вгадай число!</h1>
        <p>{message}</p>
        <p>Спроби: {attempts}</p>
        <form onSubmit={handleGuessSubmit}>
          <input
              type="number"
              value={guess}
              onChange={handleGuessChange}
              min="1"
              max="100"
          />
          <button type="submit">Відправити</button>
        </form>
      </div>
  );
}

export default App;
