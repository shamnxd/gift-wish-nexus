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
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${10 + Math.random() * 8}s`,
            left: `${Math.random() * 100}%`,
            fontSize: `${0.4 + Math.random() * 0.6}rem`,
            opacity: 0.4 + Math.random() * 0.3,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
};

export default Snowfall;
