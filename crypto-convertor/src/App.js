import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  let arr = ["usd", "eur", "gbp", "cny", "jpy"];
  const [currency, setCurrency] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [convertedCurr, setConvertedCurr] = useState(0);
  const [isUp, setIsUp] = useState(true);
  const [diff, setDiff] = useState(0);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setCurrency(val);
  };

  const handleCurrencyType = (e) => {
    const type = e.target.value;

    setSelectedCurrency(type);
  };

  const fetchCurrencyInfo = async () => {
    try {
      const url = `https://api.frontendeval.com/fake/crypto/${selectedCurrency}`;
      const result = await fetch(url);
      const data = await result.json();
      const val1 = data.value;
      const showCurr = currency * val1;
      setConvertedCurr(showCurr.toFixed(2));
      console.log(currency * val1);
      const prevVal = window.sessionStorage.getItem("prevVal");
      const diff = showCurr.toFixed(2) - prevVal;
      diff < 0 ? setIsUp(false) : setIsUp(true);
      setDiff(diff.toFixed(2));
      window.sessionStorage.setItem("prev", showCurr.toFixed(2));
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    let time;
    time = setInterval(() => {
      fetchCurrencyInfo();
    }, 2000);

    return () => {
      clearInterval(time);
    };
  }, [currency, selectedCurrency]);

  return (
    <div>
      <h1>crypto convertor app</h1>
      <div className="wrapper">
        <input
          type="number"
          value={currency}
          onChange={handleInputChange}
        ></input>
        <select
          onChange={handleCurrencyType}
          name="currency"
          value={selectedCurrency}
        >
          {arr.map((item) => (
            <option key={item} value={item}>
              {item.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <div className="curr-info">
        <div>{convertedCurr}</div>
        <div>WUC</div>
        <div className={isUp ? "green" : "red"}>
          <span>{isUp ? "↑" : "↓"}</span>
          <span>{diff}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
