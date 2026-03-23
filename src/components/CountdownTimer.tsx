import { useEffect, useState } from 'react';

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: '02',
    hours: '14',
    mins: '56',
    secs: '12',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const seconds = parseInt(prev.secs, 10);
        if (seconds > 0) {
          return { ...prev, secs: (seconds - 1).toString().padStart(2, '0') };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 md:gap-8">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="text-center">
          <div className="font-headline text-4xl leading-none font-black text-white md:text-6xl">
            {value}
          </div>
          <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/40 md:text-xs">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
