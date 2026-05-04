import React, { useState } from "react";
import "./App.css";

const App = () => {
  const TODO = "TODO";
  const DOING = "DOING";
  const DONE = "DONE";
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [dragTask, setDragTask] = useState(null);

  const handleKeydown = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      const obj = {
        title: value,
        status: TODO,
        id: Date.now(),
      };
      setTasks((prev) => [...prev, obj]);
      setValue("");
    }
  };

  console.log("tasks", tasks);
  console.log("value", value);

  const handleDrag = (e, task) => {
    setDragTask(task);
  };

  console.log("dragTask", dragTask);

  const handleDragNDrop = (status) => {
    let copyTask = [...tasks];
    copyTask = copyTask.map((item) => {
      if (dragTask.id === item.id) {
        item.status = status;
      }
      return item;
    });
    setTasks(copyTask);
    setDragTask(null);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrop = (e) => {
    const status = e.currentTarget("data-status");
    console.log("edrop", status);
    if (status === TODO) {
      handleDragNDrop(TODO);
    } else if (status === DOING) {
      handleDragNDrop(DOING);
    } else if (status === DONE) {
      handleDragNDrop(DONE);
    }
  };

  return (
    <div className="app">
      <h1> task manager</h1>
      <input
        type="text"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onKeyDown={handleKeydown}
      ></input>
      <div className="todo" data-status={TODO}>
        <h2>todo</h2>
        <div className="todo-task">
          {tasks.length &&
            tasks.map(
              (task) =>
                task.status === TODO && (
                  <div
                    className="task-list"
                    onDrag={(e) => handleDrag(e, task)}
                    draggable
                    key={task.id}
                    onDragOver={onDragOver}
                  >
                    <p>{task.title}</p>
                    <div></div>
                    <div className="btns">
                      <button className="pencil">✏️</button>
                      <button className="delete">🗑️</button>
                    </div>
                  </div>
                ),
            )}
        </div>
      </div>

      <div
        className="doing"
        data-status={DOING}
        onDrop={handleOnDrop}
        onDragOver={onDragOver}
      >
        <h2>doing</h2>
        <div className="doing-task">
          {tasks.length > 0 &&
            tasks.map(
              (task) =>
                task.status === DOING && (
                  <div
                    className="doing-list"
                    onDrag={(e) => handleDrag(e, task)}
                    draggable
                    key={task.id}
                  >
                    <p>{task.title}</p>
                    <div></div>
                    <div className="btns">
                      <button className="pencil">✏️</button>
                      <button className="delete">🗑️</button>
                    </div>
                  </div>
                ),
            )}
        </div>
      </div>

      <div className="done" data-status={DONE}>
        <h2>done</h2>
        <div className="done-task">
          {tasks.length > 0 &&
            tasks.map(
              (task) =>
                task.status === DONE && (
                  <div
                    className="done-list"
                    onDrag={(e) => handleDrag(e, task)}
                    draggable
                    key={task.id}
                    onDragOver={onDragOver}
                  >
                    <p>{task.title}</p>
                    <div></div>
                    <div className="btns">
                      <button className="pencil">✏️</button>
                      <button className="delete">🗑️</button>
                    </div>
                  </div>
                ),
            )}
        </div>
      </div>
    </div>
  );
};

export default App;
