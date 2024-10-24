import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, Clock } from 'lucide-react';

export default function StopwatchTimer() {
  const [isStopwatch, setIsStopwatch] = useState(true);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timerInput, setTimerInput] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    let interval: number;
    
    if (isRunning) {
      interval = setInterval(() => {
        if (isStopwatch) {
          setTime(t => t + 1);
        } else {
          setTime(t => {
            if (t <= 0) {
              setIsRunning(false);
              return 0;
            }
            return t - 1;
          });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, isStopwatch]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartTimer = () => {
    if (!isStopwatch && !isRunning) {
      setTime(timerInput.minutes * 60 + timerInput.seconds);
    }
    setIsRunning(prev => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setTimerInput({ minutes: 0, seconds: 0 });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsStopwatch(true)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            isStopwatch ? 'bg-green-600' : 'bg-gray-700'
          }`}
        >
          Stopwatch
        </button>
        <button
          onClick={() => setIsStopwatch(false)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            !isStopwatch ? 'bg-green-600' : 'bg-gray-700'
          }`}
        >
          Timer
        </button>
      </div>

      <div className="text-center">
        <div className="text-6xl font-mono mb-6">
          {formatTime(time)}
        </div>

        {!isStopwatch && !isRunning && (
          <div className="flex justify-center gap-4 mb-6">
            <input
              type="number"
              min="0"
              value={timerInput.minutes}
              onChange={(e) => setTimerInput(prev => ({ ...prev, minutes: parseInt(e.target.value) || 0 }))}
              className="w-20 bg-gray-700 rounded-lg px-3 py-2 text-center"
              placeholder="Min"
            />
            <input
              type="number"
              min="0"
              max="59"
              value={timerInput.seconds}
              onChange={(e) => setTimerInput(prev => ({ ...prev, seconds: parseInt(e.target.value) || 0 }))}
              className="w-20 bg-gray-700 rounded-lg px-3 py-2 text-center"
              placeholder="Sec"
            />
          </div>
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={handleStartTimer}
            className="p-3 rounded-full bg-green-600 hover:bg-green-500 transition-colors"
          >
            {isRunning ? <Pause /> : <Play />}
          </button>
          <button
            onClick={handleReset}
            className="p-3 rounded-full bg-red-600 hover:bg-red-500 transition-colors"
          >
            <RefreshCw />
          </button>
        </div>
      </div>
    </div>
  );
}