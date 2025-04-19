import { useState, useEffect } from "react";

const Timer = () => {
  const [time, setTime] = useState(0);

  const formatTime = (seconds: number) => {
    const secs = seconds.toString().padStart(2, "0");
    return `${secs}`;
  };

  useEffect(() => {
    setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  }, []);

  return (
    <div className="timer">
      <h1 className="text-5xl text-white">{formatTime(time)}</h1>
    </div>
  );
};

export default Timer;
