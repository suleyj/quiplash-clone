import { useState, useEffect } from "react";

const Timer = () => {
  const [time, setTime] = useState(60); // Start from 60 seconds

  const formatTime = (seconds: number) => {
    const secs = seconds.toString().padStart(2, "0");
    return `${secs}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          console.log("Timer done!");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="timer">
      <h1 className="text-5xl text-white">{formatTime(time)}</h1>
    </div>
  );
};

export default Timer;
