import React, { useState } from "react";

function App() {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const handleStart = () => {
    if (intervalId) return;

    const total = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
    setTime(total);

    const id = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setIntervalId(null);
        }
        return prev - 1;
      });
    }, 1000);

    setIntervalId(id);
  };

  const handlePause = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const handleReset = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setTime(0);
    setHours("");
    setMinutes("");
    setSeconds("");
  };

  const formatTime = () => {
    const h = Math.floor(time / 3600);
    const m = Math.floor(time % 3600) / 60;
    const s = time % 60;

    return `${h.toString().padStart(2, "0")}:
            ${m.toString().padStart(2, "0")}:
            ${s.toString().padStart(2, "0")}`;
  };
  return (
    <div>
      <h1>countdown timer</h1>
      <input
        type="text"
        placeholder="HH"
        onChange={(e) => setHours(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="MM"
        onChange={(e) => setMinutes(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="SS"
        onChange={(e) => setSeconds(e.target.value)}
      ></input>
      <button onClick={handleStart}>start</button>
      <button onClick={handlePause}>pause</button>
      <button onClick={handleReset}>reset</button>

      <h2>{formatTime()}</h2>
    </div>
  );
}

export default App;
