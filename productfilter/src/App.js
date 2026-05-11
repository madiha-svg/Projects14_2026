import React, { useState } from "react";
import { items } from "./items";

function App() {
  const [active, setActive] = useState(0);
  // const [data, setData] = useState(items);

  const categories = [...new Set(items.map((item) => item.category))];

  const handleClick = (index) => {
    setActive(index);
  };

  const filteredItems = items.filter(
    (item) => item.category === categories[active],
  );

  return (
    <div>
      <h1>product filter</h1>
      <div>
        {categories.map((category, index) => (
          <button key={index} onClick={() => handleClick(index)}>
            {category}
          </button>
        ))}
      </div>
      <br />
      <br />
      <div>
        {filteredItems.map((item, index) => (
          <div key={index}>
            <h3>{item.name}</h3>
            <p>{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
