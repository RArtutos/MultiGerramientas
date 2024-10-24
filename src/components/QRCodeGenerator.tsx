import React, { useState } from 'react';
import QRCode from 'qrcode.react';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrSize, setQrSize] = useState(256);

  const downloadQR = () => {
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qrcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

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
          <button
            onClick={downloadQR}
            className="w-full py-2 bg-yellow-600 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Download QR Code
          </button>
        )}
      </div>
    </div>
  );
}