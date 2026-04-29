import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const getNums = () => {
    const list = [];
    for (let i = 0; i <= 7; i++) {
      list.push(i);
      list.push(i);
    }
    return list;
  };
  const [nums, setNums] = useState(getNums());
  const [stage, setStage] = useState("init");
  const [opened, setOpened] = useState([]);
  const [solvedList, setSolvedList] = useState([]);

  const randomNums = () => {
    const copyNums = [...nums];
    return copyNums.sort(() => Math.random() - 0.5);
  };

  const handleStart = () => {
    setStage("play");
    setNums(randomNums());
    setSolvedList([]);
  };
  console.log("nums", nums);

  const handleClick = (index) => {
    setOpened((prev) => {
      if (prev.length >= 2) {
        return prev;
      }
      return [...prev, index];
    });
  };

  console.log("opened", opened);

  useEffect(() => {
    if (opened.length === 2) {
      setTimeout(() => {
        const id1 = opened[0];
        const id2 = opened[1];
        if (nums[id1] === nums[id2]) {
          setSolvedList((prev) => [...prev, nums[id1]]);
        }
        setOpened([]);
      }, 1000);
    }
  }, [opened]);

  const getClassName = (num, index) => {
    if (solvedList.includes(num)) {
      return "remove";
    } else if (opened.includes(index)) {
      return "show";
    } else {
      return "";
    }
  };

  useEffect(() => {
    if (solvedList.length === 8) {
      setStage("end");
    }
  }, [solvedList]);

  return (
    <div>
      <h1>memory game</h1>
      {stage === "init" && <button onClick={handleStart}>Play game</button>}
      {stage === "play" && (
        <div className="game">
          <div className="cards">
            {nums.map((num, i) => (
              <div
                className={`card ${getClassName(num, i)}`}
                key={i}
                onClick={() => handleClick(num, i)}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      )}
      {stage === "end" && (
        <div>
          <h1>you won!!!</h1>
          <button onClick={handleStart}>play again</button>
        </div>
      )}
    </div>
  );
}

export default App;
