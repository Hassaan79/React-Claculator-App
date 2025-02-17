// src/components/Calculator.js

import React, { useState, useEffect } from 'react';
import '../App.css';
import './Calculator.css';
import { evaluate } from 'mathjs';

function Calculator() {
  const [expression, setExpression] = useState('');

  // Handle Button Clicks
  const handleClick = (value) => {
    if (value === 'C') {
      setExpression('');
    } else if (value === '=') {
      try {
        const result = evaluate(expression);
        setExpression(result.toString());
      } catch (error) {
        setExpression('Error');
        setTimeout(() => setExpression(''), 1500);
      }
    } else if (value === '±') {
      if (expression) {
        if (expression.charAt(0) === '-') {
          setExpression(expression.substring(1));
        } else {
          setExpression('-' + expression);
        }
      }
    } else if (value === '%') {
      try {
        const result = evaluate(expression + '/100');
        setExpression(result.toString());
      } catch {
        setExpression('Error');
        setTimeout(() => setExpression(''), 1500);
      }
    } else {
      setExpression(expression + value);
    }
  };

  // Handle Keyboard Input
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (/[\d.+\-*/^()%]/.test(key)) {
        setExpression((prev) => prev + key);
      } else if (key === 'Enter' || key === '=') {
        try {
          const result = evaluate(expression);
          setExpression(result.toString());
        } catch {
          setExpression('Error');
          setTimeout(() => setExpression(''), 1500);
        }
      } else if (key === 'Backspace') {
        setExpression((prev) => prev.slice(0, -1));
      } else if (key.toLowerCase() === 'c') {
        setExpression('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expression]);

  // Buttons to Display
  const buttons = [
    { label: 'C', className: 'function' },
    { label: '±', className: 'function' },
    { label: '%', className: 'function' },
    { label: '/', className: 'operator' },
    { label: '7' },
    { label: '8' },
    { label: '9' },
    { label: '*', className: 'operator' },
    { label: '4' },
    { label: '5' },
    { label: '6' },
    { label: '-', className: 'operator' },
    { label: '1' },
    { label: '2' },
    { label: '3' },
    { label: '+', className: 'operator' },
    { label: '0', className: 'zero' },
    { label: '.', className: 'decimal' },
    { label: '=', className: 'equal' },
  ];

  return (
    <div className="calculator">
      <div className="display">
        {expression || '0'}
      </div>
      <div className="keypad">
        {buttons.map((button) => (
          <button
            key={button.label}
            onClick={() => handleClick(button.label)}
            className={`button ${button.className || ''}`.trim()}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
