import React, { useState, useEffect } from "react";
import "./App.css";
import debounceQuery from "./utils";

function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  console.log("input", input);

  const initApiCall = async () => {
    const url = `https://api.frontendeval.com/fake/food/${input}`;
    const data = await debounceQuery(url);
    setList(data);

    try {
      const result = await fetch(url);
      const data = await result.json();
      console.log("data", data);
      setList(data);
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    if (input) {
      initApiCall();
    }
  }, [input]);
  return (
    <div>
      <h1> debounce api call</h1>
      <input type="text" value={input} onChange={handleInputChange}></input>
      {list && list.length > 0 && (
        <div className="list">
          {list &&
            list.map((item, index) => (
              <li key={index}>
                <p>{item}</p>
              </li>
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
