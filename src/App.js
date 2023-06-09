import React from 'react';
import Timer from "./components/timer";
import {Route, Routes} from "react-router-dom";
import Tasks from "./components/timer";
import Navbar from "./components/navbar";
function App() {
  return (
    <>
        <Navbar />
        <Routes>
            <Route path="/" element={<Timer />} />
            <Route path="/tasks" element={<Tasks />} />
        </Routes>
    </>
  );
}

export default App;
