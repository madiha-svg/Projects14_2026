import React, { useState } from "react";

function App() {
  let tabs = [
    {
      qsn: "what is react",
      ans: "react is react",
    },
    {
      qsn: "what is javascript",
      ans: "javascript is javascript",
    },
    {
      qsn: "what is redux",
      ans: "redux is redux",
    },
  ];

  const [active, setActive] = useState(0);
  const handleClick = (index) => {
    setActive(index);
  };
  return (
    <div>
      <h1> custom tabs</h1>
      <div>
        {tabs.map((item, index) => (
          <button key={index} onClick={() => handleClick(index)}>
            {item.qsn}
          </button>
        ))}
      </div>
      <div>
        <h2>{tabs[active].ans}</h2>
      </div>
    </div>
  );
}

export default App;
