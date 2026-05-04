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
      const entries = Object.entries(freq).sort((a, b) => a[0] - b[0]);

      const xAxis = entries.map(([key]) => key);
      const yAxis = entries.map(([, value]) => value * 10);

      setXAxis(xAxis);
      setYAxis(yAxis);
    }
  }, [freq]);
  console.log("yAxis", yAxis);
  console.log("xAxis", xAxis);

  return (
    <div className="chart-container">
      <div className="chart">
        {yAxis.map((value, index) => (
          <div className="bar-wrapper" key={index}>
            <div className="bar" style={{ height: `${value}%` }}>
              <span className="bar-value">{value}</span>
            </div>
            <span className="x-label">{xAxis[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
