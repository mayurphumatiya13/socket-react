import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

function App() {
  const [id, setId] = useState("");

  const sendId = () => {
    localStorage.setItem("myData", id);
    window.location.href = "/home";
  };

  return (
    <Router>
      <div>
        <h1>Chat App</h1>

        <div>
          <input type="text" onChange={(e) => setId(e.target.value)} />
          <button onClick={sendId}>Send</button>
        </div>
        <Routes>
          <Route path="/home" element={<Home message={id} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
