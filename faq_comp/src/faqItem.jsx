import React, { useState, useEffect } from "react";

const FaqItem = ({ faq, index }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (index === 0) {
      setShow(true);
    }
  }, []);

  const handleClick = () => {
    setShow(!show);
  };
  return (
    <div>
      <button onClick={handleClick}>click here</button>
      <div>{faq.qsn}</div>
      {show && <div>{faq.ans}</div>}
    </div>
  );
};

export default FaqItem;
