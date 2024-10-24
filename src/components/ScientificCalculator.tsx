import React, { useState } from 'react';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState<number>(0);
  const [waitingForOperand, setWaitingForOperand] = useState(true);
  const [pendingOperator, setPendingOperator] = useState<string | null>(null);

  const operations = {
    '+': (a: number, b: number) => a + b,
    '-': (a: number, b: number) => a - b,
    '×': (a: number, b: number) => a * b,
    '÷': (a: number, b: number) => a / b,
    'sin': (a: number) => Math.sin(a),
    'cos': (a: number) => Math.cos(a),
    'tan': (a: number) => Math.tan(a),
    'sqrt': (a: number) => Math.sqrt(a),
    'x²': (a: number) => Math.pow(a, 2),
    'log': (a: number) => Math.log10(a),
    'ln': (a: number) => Math.log(a),
  };

  const handleDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleOperator = (operator: string) => {
    const operand = Number(display);

    if (operator === '=' && pendingOperator) {
      const result = operations[pendingOperator](memory, operand);
      setDisplay(String(result));
      setMemory(0);
      setPendingOperator(null);
    } else if (Object.keys(operations).includes(operator)) {
      if (['sin', 'cos', 'tan', 'sqrt', 'x²', 'log', 'ln'].includes(operator)) {
        const result = operations[operator](operand);
        setDisplay(String(result));
      } else {
        setMemory(operand);
        setPendingOperator(operator);
      }
    }
    setWaitingForOperand(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setMemory(0);
    setPendingOperator(null);
    setWaitingForOperand(true);
  };

  const buttons = [
    ['sin', 'cos', 'tan', 'C'],
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
    ['sqrt', 'x²', 'log', 'ln']
  ];

  return (
    <div className="max-w-xs mx-auto">
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <div className="text-right text-2xl font-mono overflow-hidden">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {buttons.map((row, i) => (
            <React.Fragment key={i}>
              {row.map((button) => (
                <button
                  key={button}
                  onClick={() => {
                    if (button === 'C') handleClear();
                    else if ('0123456789.'.includes(button)) handleDigit(button);
                    else handleOperator(button);
                  }}
                  className={`p-3 rounded-lg text-lg font-medium transition-colors ${
                    '0123456789.'.includes(button)
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : button === 'C'
                      ? 'bg-red-600 hover:bg-red-500'
                      : 'bg-blue-600 hover:bg-blue-500'
                  }`}
                >
                  {button}
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}