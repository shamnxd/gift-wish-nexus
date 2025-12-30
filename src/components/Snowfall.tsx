import React from 'react';

const Snowfall: React.FC = () => {
  const snowflakes = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {snowflakes.map((i) => (
        <div
          key={i}
          className="snowflake animate-snowfall"
          style={{
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 7}s`,
            left: `${Math.random() * 100}%`,
            fontSize: `${0.5 + Math.random() * 1}rem`,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
};

export default Snowfall;
