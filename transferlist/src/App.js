import React, { useState } from "react";
import { data } from "./data";
import "./App.css";

function App() {
  const [leftItems, setLeftItems] = useState(data);
  const [rightItems, setRightItems] = useState([]);

  const checkedList = (list, id, checked) => {
    return list.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          checked: !checked,
        };
      }
      return item;
    });
  };

  const handleClick = (id, checked, direction) => {
    if (direction === "LEFT") {
      let copyList = [...leftItems];
      copyList = checkedList(copyList, id, checked);
      setLeftItems(copyList);
    } else {
      let copyList = [...rightItems];
      copyList = checkedList(copyList, id, checked);
      setRightItems(copyList);
    }
  };

  const resetItems = (list) => {
    return list.map((item) => {
      return {
        ...item,
        checked: false,
      };
    });
  };

  const handleTransferBtn = (dir) => {
    if (dir === "LEFT_TO_RIGHT") {
      if (leftItems.length) {
        const copyList = [...leftItems];
        const checkList = copyList.filter((item) => item.checked);
        const unCheckList = copyList.filter((item) => !item.checked);
        setRightItems(resetItems([...rightItems, ...checkList]));
        setLeftItems(unCheckList);
      } else {
        const copyList = [...rightItems];
        const checkList = copyList.filter((item) => item.checked);
        const unCheckList = copyList.filter((item) => !item.checked);
        setLeftItems(resetItems([...leftItems, ...checkList]));
        setRightItems(unCheckList);
      }
    }
  };

  return (
    <div>
      <h1>transfer list</h1>
      <div className="container">
        <div className="box">
          {leftItems.map(({ title, id, checked }) => (
            <li
              onClick={() => handleClick(id, checked, "LEFT")}
              key={id}
              id={id}
              className={`item ${checked && "checked"}`}
            >
              <p>{title}</p>
              <p>{checked}</p>
            </li>
          ))}
        </div>

        <div className="actions">
          <button onClick={() => handleTransferBtn("LEFT_TO_RIGHT")}>
            left
          </button>
          <button onClick={() => handleTransferBtn("RIGHT_TO_LEFT")}>
            right
          </button>
        </div>

        <div className="box">
          {rightItems.map(({ title, id, checked }) => (
            <li
              onClick={() => handleClick(id, checked, "RIGHT")}
              key={id}
              id={id}
              className={`item ${checked && "checked"}`}
            >
              <p>{title}</p>
              <p>{checked}</p>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
