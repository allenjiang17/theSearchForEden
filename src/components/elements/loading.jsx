import React, { useEffect, useState } from 'react';

export default function LoadingBar ({duration, callBack}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    
    const increment = 100 / (duration / 100); // Calculate the increment value based on duration
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          callBack();
          return 100;
        }
        return prev + increment;
      });
    }, 100);


    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [duration]);

  return (
    <div style={{ border: '1px solid #ccc', width: '100%', height: '30px', borderRadius: '5px', overflow: 'hidden' }}>
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: '#4caf50',
          transition: 'width 0.1s linear',
        }}
      ></div>
    </div>
  );
};