import React, { useState } from 'react';
import QRCode from 'qrcode.react';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrSize, setQrSize] = useState(256);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or URL"
          className="w-full bg-gray-700 rounded-lg px-4 py-2"
        />

        <div>
          <label className="block text-sm font-medium mb-1">Size: {qrSize}px</label>
          <input
            type="range"
            min="128"
            max="512"
            step="32"
            value={qrSize}
            onChange={(e) => setQrSize(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex justify-center">
          {text && (
            <div className="bg-white p-4 rounded-lg">
              <QRCode
                id="qr-code"
                value={text}
                size={qrSize}
                level="H"
                includeMargin
              />
            </div>
          )}
        </div>

        {text && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Take a screenshot to save the QR code.
          </p>
        )}
      </div>
    </div>
  );
}
