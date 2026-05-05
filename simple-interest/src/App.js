import React, { useState } from "react";

function App() {
  const [principal, setPrincipal] = useState(0);
  const [rate, setRate] = useState(0);
  const [time, setTime] = useState(0);
  const [interest, setInterest] = useState(0);

  const handleInterest = () => {
    const ins = (principal * rate * time) / 100;
    setInterest(ins);
  };
  return (
    <div>
      <h1>simple interest</h1>
      <input
        type="number"
        placeholder="principal"
        onChange={(e) => setPrincipal(e.target.value)}
      ></input>
      <input
        type="number"
        placeholder="rate"
        onChange={(e) => setRate(e.target.value)}
      ></input>
      <input
        type="number"
        placeholder="time"
        onChange={(e) => setTime(e.target.value)}
      ></input>
      <button onClick={handleInterest}>calculate</button>
      <h1>interest is {interest} </h1>
    </div>
  );
}

export default App;
