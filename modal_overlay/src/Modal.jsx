import React, { useState } from "react";
import Accept from "./Accept";

function Modal() {
  const [accept, setAccept] = useState(false);

  const handleAccept = () => {
    setAccept(true);
  };
  return (
    <>
      <button>X</button>
      <p>click the button below to accept the offer</p>
      <button onClick={handleAccept}>accept offer</button>
      {accept && <Accept />}
    </>
  );
}

export default Modal;
