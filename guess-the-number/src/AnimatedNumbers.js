
import React, { useState, useEffect } from 'react';
import './AnimatedNumbers.css';

function AnimatedNumbers() {
    const [numbers, setNumbers] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newNumbers = [];
            for (let i = 0; i < 10; i++) {
                newNumbers.push(Math.floor(Math.random() * 10));
            }
            setNumbers(newNumbers);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="animated-numbers">
            {numbers.map((number, index) => (
                <span key={index} className="number">
          {number}
        </span>
            ))}
        </div>
    );
}

export default AnimatedNumbers;



