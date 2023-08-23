import React, { useState } from 'react';
import './DiceGame.css';

function DiceGame() {
    const [player1Guess, setPlayer1Guess] = useState('');
    const [player2Guess, setPlayer2Guess] = useState('');
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');
    const [result, setResult] = useState('');
    const [players, setPlayers] = useState([]);
    const [rolling, setRolling] = useState(false);
    const [diceValue, setDiceValue] = useState(1);

    const addPlayerToTable = (name, guess, result) => {
        const updatedPlayers = [...players, `${name}: Догадка - ${guess}, Результат - ${result}`];
        setPlayers(updatedPlayers);
    };
    const clearResults = () => {
        setResult('');
        setPlayers([]);
    };
    const rollDice = () => {
        setRolling(true);
        setTimeout(() => {
            const randomNumber = Math.floor(Math.random() * 6) + 1;
            setDiceValue(randomNumber);

            setRolling(false);

            const guess1Diff = Math.abs(randomNumber - parseInt(player1Guess));
            const guess2Diff = Math.abs(randomNumber - parseInt(player2Guess));


            if (player1Guess !== '' && player2Guess !== '') {
                if (Math.abs(player1Guess - diceValue) < Math.abs(player2Guess - diceValue)) {
                    addPlayerToTable(player1Name, player1Guess, 'Перемога');
                } else if (Math.abs(player2Guess - diceValue) < Math.abs(player1Guess - diceValue)) {
                    addPlayerToTable(player2Name, player2Guess, 'Перемога');
                } else {
                    addPlayerToTable(player1Name, player1Guess, 'Нічия');
                    addPlayerToTable(player2Name, player2Guess, 'Нічия');
                }
            }
        }, 1000);
    };
    const [loserTask, setLoserTask] = useState('');
    const loserTasks = [
        "Зіграти простеньку пісню на піаніно",
        "Зробити 10 віджимань",
        "Прочитати вірш відомого поета відзаду",
        // Додайте ще завдань за вашим бажанням
    ];

    return (
        <div className="Wrapper">
        <div className="DiceGame">
            <div className="left-section">
                <h2>Таблиця гравців</h2>
                <ul className="players-list">
                    {players.map((player, index) => (
                        <li key={index}>{player}</li>
                    ))}
                </ul>
                <button className="clear-button" onClick={clearResults}>
                    Очистити результати
                </button>
            </div>
            <div className="right-section">
                <h1>Протестуй свою вдачу</h1>
                <div className="dice">
                    <div className={`cube rolling-${rolling ? 'start' : 'end'}`}>
                        <div className="face front"></div>
                        <div className="face back"></div>
                        <div className="face right"></div>
                        <div className="face left"></div>
                        <div className="face top"></div>
                        <div className="face bottom"></div>
                    </div>
                </div>
                <div className="loser-task">
                    {loserTask && <p>Завдання для програвшого: {loserTask}</p>}
                </div>
                <div className="input-section">
                    <input
                        type="text"
                        placeholder="Ім'я Гравця 1"
                        value={player1Name}
                        onChange={(e) => setPlayer1Name(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Введіть свою догадку, Гравець 1"
                        value={player1Guess}
                        onChange={(e) => setPlayer1Guess(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Ім'я Гравця 2"
                        value={player2Name}
                        onChange={(e) => setPlayer2Name(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Введіть свою догадку, Гравець 2"
                        value={player2Guess}
                        onChange={(e) => setPlayer2Guess(e.target.value)}
                    />
                    <button onClick={rollDice} disabled={rolling}>
                        {rolling ? 'Підкидання...' : 'Підкинути кубик'}
                    </button>

                </div>

            </div>
            <div className="winner-message">
                {players.length > 0 && players[players.length - 1].includes('Перемога') && (
                    <p>{players[players.length - 1].split(':')[0]} виграв!</p>
                )}
            </div>
        </div>
        </div>
    );
}

export default DiceGame;


