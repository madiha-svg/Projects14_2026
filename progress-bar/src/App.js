import React, { useState } from "react";
import "./App.css";
function App() {
  const [progress, setProgress] = useState(0);

  const handleIncrease = () => {
    if (progress < 100) {
      setProgress(progress + 10);
    }
  };

  const handleDecrease = () => {
    if (progress > 0) {
      setProgress(progress - 10);
    }
  };
  return (
    <div className="container">
      <h1>progress bar</h1>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}>
          {progress}%
        </div>
      </div>
      <div className="buttons">
        <button onClick={handleDecrease}>-</button>
        <button onClick={handleIncrease}>+</button>
      </div>
    </div>
  );
}

export default App;
