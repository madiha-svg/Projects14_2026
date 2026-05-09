import React, { useState } from "react";
import "./App.css";

function App() {
  let arr = [-100, -10, -1];
  let arr1 = [+100, +10, +1];

  const [value, setValue] = useState(0);
  const [history, setHistory] = useState([]);
  const [redoList, setRedoList] = useState([]);
  const [undoCount, setUndoCount] = useState(0);

  const maintainHistory = (key, prev, curr) => {
    console.log(key, prev, curr);
    const obj = {
      action: key,
      prev,
      curr,
    };

    const copyHistory = [...history];
    copyHistory.unshift(obj);
    setHistory(copyHistory);
  };

  const handleClick = (key) => {
    const val = parseInt(key);
    maintainHistory(key, value, val + value);
    setValue((prev) => prev + val);
  };

  const handleUndo = () => {
    if (history.length) {
      if (undoCount + 1 > 5) {
        alert("you can't undo beyond limit= 5");
        return;
      }
      const copyHist = [...history];
      const firstItem = copyHist.shift();
      setHistory(copyHist);
      setValue(firstItem.prev);
      const copyRedoList = [...redoList];
      copyRedoList.push(firstItem);
      setRedoList(copyRedoList);
    }
  };

  const handleRedo = () => {
    if (redoList.length) {
      const copyRedoList = [...redoList];
      const poppedValue = copyRedoList.pop();
      setRedoList(copyRedoList);
      const { action, prev, curr } = poppedValue;
      setValue(curr);
      maintainHistory(action, prev, curr);
    }
  };
  return (
    <div>
      <h1>undoable counter</h1>
      <button onClick={handleUndo}>undo</button>
      <button onClick={handleRedo}>redo</button>
      <div>
        {arr.map((btn) => (
          <button onClick={() => handleClick(btn)}>{btn}</button>
        ))}
      </div>

      <div>
        <div>
          {arr1.map((btn1) => (
            <button onClick={() => handleClick(btn1)}>{btn1}</button>
          ))}
        </div>
        <div>{value}</div>

        <div className="history">
          {history.map((item) => {
            return (
              <div className="row">
                <div>{item.action}</div>
                <div>{`[ ${item.prev} -> ${item.curr} ]`}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
