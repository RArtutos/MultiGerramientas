import React, { useState } from 'react';

const conversions = {
  length: {
    meters: { to: 'feet', factor: 3.28084 },
    feet: { to: 'meters', factor: 0.3048 },
    kilometers: { to: 'miles', factor: 0.621371 },
    miles: { to: 'kilometers', factor: 1.60934 }
  },
  weight: {
    kilograms: { to: 'pounds', factor: 2.20462 },
    pounds: { to: 'kilograms', factor: 0.453592 }
  },
  temperature: {
    celsius: { to: 'fahrenheit', formula: (c: number) => (c * 9/5) + 32 },
    fahrenheit: { to: 'celsius', formula: (f: number) => (f - 32) * 5/9 }
  }
};

export default function UnitConverter() {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meters');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  const handleConvert = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    const conversion = conversions[category as keyof typeof conversions][fromUnit];
    if (conversion.formula) {
      setResult(conversion.formula(numValue).toFixed(2));
    } else {
      setResult((numValue * conversion.factor).toFixed(2));
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-gray-700 rounded-lg px-4 py-2"
        >
          {Object.keys(conversions).map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="w-full bg-gray-700 rounded-lg px-4 py-2"
        >
          {Object.keys(conversions[category as keyof typeof conversions]).map(unit => (
            <option key={unit} value={unit}>
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </option>
          ))}
        </select>

        <div className="flex gap-4">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            className="flex-1 bg-gray-700 rounded-lg px-4 py-2"
          />
          <button
            onClick={handleConvert}
            className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Convert
          </button>
        </div>

        {result && (
          <div className="bg-gray-700 rounded-lg px-4 py-3">
            <p className="text-lg">
              {value} {fromUnit} = {result} {conversions[category as keyof typeof conversions][fromUnit].to}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}