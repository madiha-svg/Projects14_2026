import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [freq, setFreq] = useState(undefined);
  const [yAxis, setYAxis] = useState([]);
  const [xAxis, setXAxis] = useState([]);

  useEffect(() => {
    const fetched = async () => {
      const res = await fetch(
        "https://www.random.org/integers/?num=10&min=1&max=5&col=1&base=10&format=plain&rnd=new",
      );
      const json1 = await res.text();
      const arr = json1.trim().split("\n").map(Number);
      console.log("json1", json1);
      setData(arr);
    };
    fetched();
  }, []);

  console.log("data", data);

  const Frequent = (data) => {
    let freq = {};
    for (let i = 0; i < data.length; i++) {
      if (!freq[data[i]]) {
        freq[data[i]] = 1;
      } else {
        freq[data[i]]++;
      }
    }
    return freq;
  };

  useEffect(() => {
    if (data.length > 0) {
      setFreq(Frequent(data));
    }
  }, [data]);
  console.log("freq", freq);

  useEffect(() => {
    if (freq) {
      const yAxis = Object.values(freq)
        .map((item) => item * 10)
        .sort((a, b) => a - b);

      const xAxis = Object.keys(freq).sort((a, b) => a - b);
      setXAxis(xAxis);

      setYAxis(yAxis);
    }
  }, [freq]);
  console.log("yAxis", yAxis);
  console.log("xAxis", xAxis);
  return (
    <div>
      <div className="container">
        <div className="box">
          <div
            className="box y-axis"
            style={{ height: `${yAxis && yAxis[0]}%` }}
          >
            {yAxis.map((item, index) => (
              <div key={index}>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="box1">
          <div
            className="box x-axis"
            style={{ width: `${xAxis && xAxis[0]}%` }}
          >
            {xAxis.map((item, index) => (
              <div key={index}>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
