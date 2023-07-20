import React, { useState } from 'react';
import './PasswordStrengthChecker.css';

const PasswordStrengthChecker = () => {
    const [password, setPassword] = useState('');

    const checkPasswordStrength = () => {
        if (password.length === 0) return 'gray';
        if (password.length < 8) return 'red';

        const containsLetters = /[a-zA-Z]/.test(password);
        const containsDigits = /\d/.test(password);
        const containsSymbols = /[^a-zA-Z0-9]/.test(password);

        if (containsLetters && containsDigits && containsSymbols) return 'green';
        if (containsLetters && (containsSymbols || containsDigits)) return 'yellow';

        return 'red';
    };

    const getPasswordStrengthText = () => {
        if (password.length === 0) return 'Password strength:';
        if (password.length < 8) return 'Password strength: Weak';

        const containsLetters = /[a-zA-Z]/.test(password);
        const containsDigits = /\d/.test(password);
        const containsSymbols = /[^a-zA-Z0-9]/.test(password);

        if (containsLetters && containsDigits && containsSymbols) return 'Password strength: Strong';
        if (containsLetters && (containsSymbols || containsDigits)) return 'Password strength: Medium';

        return 'Password strength: Weak';
    };

    return (
        <div className="container">
            <label htmlFor="password">Enter Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="strength-indicator">
                <div className="section" style={{ backgroundColor: checkPasswordStrength() }}></div>
                <div className="section" style={{ backgroundColor: checkPasswordStrength() === 'green' ? 'green' : checkPasswordStrength() === 'yellow' ? 'yellow' : 'gray' }}></div>
                <div className="section" style={{ backgroundColor: checkPasswordStrength() === 'green' ? 'green' : 'gray' }}></div>
            </div>
            <p>{getPasswordStrengthText()}</p>
        </div>
    );
};

export default PasswordStrengthChecker;



