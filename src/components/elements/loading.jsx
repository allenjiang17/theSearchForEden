import React, { useEffect, useState } from 'react';

export default function LoadingBar ({duration, callBack}) {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const increment = 100 / (duration / 100); // Calculate the increment value based on duration
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setCompleted(true);
          return 100;
        }
        return prev + increment;
      });
    }, 100);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [duration, completed]);

  useEffect(() => {
    if (completed) {
      console.log("completed");
      callBack();
      setCompleted(false); // Reset completion state for next loop
      setProgress(0); // Reset progress for next loop
    }
  }, [completed, callBack]);

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