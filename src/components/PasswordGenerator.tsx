import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let validChars = chars;
    if (includeNumbers) validChars += numbers;
    if (includeSymbols) validChars += symbols;

    let generated = '';
    for (let i = 0; i < length; i++) {
      generated += validChars.charAt(Math.floor(Math.random() * validChars.length));
    }
    setPassword(generated);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={password}
            readOnly
            className="flex-1 bg-gray-700 rounded-lg px-4 py-2 text-lg font-mono"
            placeholder="Generated password"
          />
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            title="Copy to clipboard"
          >
            <Copy className={copied ? 'text-green-400' : 'text-white'} />
          </button>
          <button
            onClick={generatePassword}
            className="p-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors"
            title="Generate new password"
          >
            <RefreshCw className="text-white" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Length: {length}</label>
            <input
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="rounded"
              />
              Include Numbers
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="rounded"
              />
              Include Symbols
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}