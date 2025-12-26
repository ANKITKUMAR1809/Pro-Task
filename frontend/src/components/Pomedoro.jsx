import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, Settings, Check, X } from 'lucide-react';

const Pomedoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // 'work' or 'break'
  const [cycles, setCycles] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    workTime: 25,
    shortBreak: 5,
    longBreak: 15,
    cyclesBeforeLongBreak: 4
  });

  const workTime = settings.workTime * 60;
  const shortBreakTime = settings.shortBreak * 60;
  const longBreakTime = settings.longBreak * 60;

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Timer finished
      clearInterval(interval);
      handleTimerEnd();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleTimerEnd = () => {
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
    audio.play();

    if (mode === 'work') {
      const newCycles = cycles + 1;
      setCycles(newCycles);

      // Check if it's time for a long break
      if (newCycles % settings.cyclesBeforeLongBreak === 0) {
        setMode('longBreak');
        setTimeLeft(longBreakTime);
      } else {
        setMode('break');
        setTimeLeft(shortBreakTime);
      }
    } else {
      setMode('work');
      setTimeLeft(workTime);
    }
    
    setIsActive(false);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? workTime : mode === 'break' ? shortBreakTime : longBreakTime);
  };

  const skipSession = () => {
    setIsActive(false);
    if (mode === 'work') {
      setMode('break');
      setTimeLeft(shortBreakTime);
    } else {
      setMode('work');
      setTimeLeft(workTime);
    }
  };

  const selectMode = (newMode) => {
    setIsActive(false);
    setMode(newMode);
    if (newMode === 'work') {
      setTimeLeft(workTime);
    } else if (newMode === 'break') {
      setTimeLeft(shortBreakTime);
    } else {
      setTimeLeft(longBreakTime);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSaveSettings = () => {
    // Update timer with new settings
    if (mode === 'work') {
      setTimeLeft(settings.workTime * 60);
    } else if (mode === 'break') {
      setTimeLeft(settings.shortBreak * 60);
    }
    setShowSettings(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Pomodoro Timer</h2>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Settings size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Progress Display */}
      <div className="relative mb-8 ">
        <div className="flex justify-center mb-4">
          <div className="relative w-64 h-64">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={mode === 'work' ? '#ef4444' : '#10b981'}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(timeLeft / (mode === 'work' ? workTime : mode === 'break' ? shortBreakTime : longBreakTime)) * 283} 283`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-gray-800">
                {formatTime(timeLeft)}
              </div>
              <div className={`mt-2 text-lg font-semibold ${mode === 'work' ? 'text-red-500' : 'text-green-500'}`}>
                {mode === 'work' ? 'Focus Time' : mode === 'break' ? 'Short Break' : 'Long Break'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => selectMode('work')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${mode === 'work' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Work
        </button>
        <button
          onClick={() => selectMode('break')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${mode === 'break' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Short Break
        </button>
        <button
          onClick={() => selectMode('longBreak')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${mode === 'longBreak' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Long Break
        </button>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={toggleTimer}
          className={`flex items-center justify-center w-14 h-14 rounded-full ${isActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors`}
        >
          {isActive ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={resetTimer}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
        >
          <RefreshCw size={20} />
        </button>
        <button
          onClick={skipSession}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-500 hover:bg-purple-600 text-white transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Stats */}
      <div className="text-center mb-4">
        <div className="text-gray-600">
          Completed Cycles: <span className="font-bold">{cycles}</span>
        </div>
        <div className="text-sm text-gray-500">
          Next long break after {settings.cyclesBeforeLongBreak - (cycles % settings.cyclesBeforeLongBreak)} cycles
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Timer Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={settings.workTime}
                  onChange={(e) => setSettings({...settings, workTime: parseInt(e.target.value) || 25})}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Break (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={settings.shortBreak}
                  onChange={(e) => setSettings({...settings, shortBreak: parseInt(e.target.value) || 5})}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Long Break (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={settings.longBreak}
                  onChange={(e) => setSettings({...settings, longBreak: parseInt(e.target.value) || 15})}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cycles before long break
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={settings.cyclesBeforeLongBreak}
                  onChange={(e) => setSettings({...settings, cyclesBeforeLongBreak: parseInt(e.target.value) || 4})}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSettings}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
              >
                <Check size={18} className="mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pomedoro;