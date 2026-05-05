import React, { useState } from "react";
import Modal from "./Modal";

function App() {
  const [show, setShow] = useState(false);

  const handleModal = () => {
    setShow(true);
  };
  return (
    <div>
      <button onClick={handleModal}>show offer</button>

      {show && <Modal />}
    </div>
  );
}

export default App;
