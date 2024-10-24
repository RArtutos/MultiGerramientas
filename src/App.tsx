import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  KeyRound,
  Scale,
  Timer,
  Calculator,
  QrCode,
  Image as ImageIcon,
} from 'lucide-react';
import PasswordGenerator from './components/PasswordGenerator';
import UnitConverter from './components/UnitConverter';
import StopwatchTimer from './components/StopwatchTimer';
import ScientificCalculator from './components/ScientificCalculator';
import QRCodeGenerator from './components/QRCodeGenerator';
import ImageEditor from './components/ImageEditor';

const tools = [
  { id: 'password', name: 'Password Generator', Icon: KeyRound, color: 'bg-purple-600', Component: PasswordGenerator },
  { id: 'converter', name: 'Unit Converter', Icon: Scale, color: 'bg-blue-600', Component: UnitConverter },
  { id: 'timer', name: 'Stopwatch/Timer', Icon: Timer, color: 'bg-green-600', Component: StopwatchTimer },
  { id: 'calculator', name: 'Scientific Calculator', Icon: Calculator, color: 'bg-red-600', Component: ScientificCalculator },
  { id: 'qrcode', name: 'QR Code Generator', Icon: QrCode, color: 'bg-yellow-600', Component: QRCodeGenerator },
  { id: 'image', name: 'Image Editor', Icon: ImageIcon, color: 'bg-cyan-600', Component: ImageEditor },
];

function App() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
        Universal Tools
      </h1>
      
      {!activeTool ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {tools.map(({ id, name, Icon, color }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTool(id)}
              className={`${color} rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-${color}/20`}
            >
              <Icon className="w-8 h-8" />
              <span className="text-sm font-medium text-center">{name}</span>
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setActiveTool(null)}
            className="mb-4 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            ← Back to Tools
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            {tools.find(t => t.id === activeTool)?.Component && 
              React.createElement(tools.find(t => t.id === activeTool)!.Component)}
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default App;