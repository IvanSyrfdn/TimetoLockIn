import { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

export default function HeaderClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const formattedDate = time.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-4 py-2 rounded-2xl border border-vintage-light/50 shadow-sm">
      <div className="p-2 bg-vintage-cream rounded-xl text-vintage-dark">
        <Clock className="w-5 h-5" />
      </div>
      <div>
        <div className="font-mono text-lg font-bold text-vintage-dark leading-tight tracking-wider">
          {formattedTime} <span className="text-xs font-sans text-vintage-brown font-semibold">WIB</span>
        </div>
        <div className="text-xs text-vintage-dark/70 flex items-center gap-1 font-medium">
          <Calendar className="w-3 h-3" /> {formattedDate}
        </div>
      </div>
    </div>
  );
}