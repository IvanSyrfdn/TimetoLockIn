import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flame } from 'lucide-react';

const MODES = {
  focus: { label: 'Focus', time: 25 * 60 },
  short: { label: 'Short Break', time: 5 * 60 },
  long: { label: 'Long Break', time: 15 * 60 },
};

export default function PomodoroTimer({ activeTask, onSessionComplete }) {
  const [mode, setMode] = useState('focus');
  const [timeLeft, setTimeLeft] = useState(MODES.focus.time);
  const [isRunning, setIsRunning] = useState(false);
  const totalTime = MODES[mode].time;

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (mode === 'focus' && onSessionComplete) {
        onSessionComplete();
      }
      alert(`Sesi ${MODES[mode].label} selesai!`);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setTimeLeft(MODES[newMode].time);
    setIsRunning(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-vintage-light/50 shadow-sm flex flex-col items-center">
      {/* Tabs Mode */}
      <div className="flex bg-vintage-cream/80 p-1.5 rounded-2xl gap-1 mb-6 border border-vintage-light/40">
        {Object.keys(MODES).map((key) => (
          <button
            key={key}
            onClick={() => switchMode(key)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              mode === key
                ? 'bg-vintage-dark text-vintage-cream shadow-sm'
                : 'text-vintage-dark/70 hover:text-vintage-dark'
            }`}
          >
            {MODES[key].label}
          </button>
        ))}
      </div>

      {/* Timer Display */}
      <div className="text-center my-2">
        <span className="font-mono text-5xl sm:text-6xl font-extrabold text-vintage-dark tracking-tight">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
        <p className="text-xs text-vintage-brown font-medium mt-2 flex items-center justify-center gap-1">
          <Flame className="w-4 h-4" />
          {activeTask ? `Active: ${activeTask.title}` : 'Pilih task untuk fokus'}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="flex items-center gap-2 px-6 py-3 bg-vintage-dark text-vintage-cream font-heading font-semibold rounded-2xl hover:bg-vintage-dark/90 shadow-md transition-all active:scale-95"
        >
          {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
          {isRunning ? 'Jeda' : 'Mulai'}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(MODES[mode].time);
          }}
          className="p-3 bg-vintage-cream text-vintage-dark border border-vintage-light/60 rounded-2xl hover:bg-vintage-light/20 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}