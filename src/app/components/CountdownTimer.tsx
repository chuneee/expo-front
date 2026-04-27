import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-3">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div
          key={unit}
          className="flex flex-col items-center bg-white/5 border border-white/10 px-4 py-3 min-w-[70px]"
        >
          <span className="text-3xl md:text-4xl tabular-nums">
            {value.toString().padStart(2, '0')}
          </span>
          <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">
            {unit === 'days'
              ? 'dias'
              : unit === 'hours'
                ? 'horas'
                : unit === 'minutes'
                  ? 'min'
                  : 'seg'}
          </span>
        </div>
      ))}
    </div>
  );
}
