import React from 'react';
import Timer from "./components/timer";
import {Route, Routes} from "react-router-dom";
import Tasks from "./components/tasks";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
function App() {
  return (
    <>
        <Navbar />
        <Routes>
            <Route path="/" element={<Timer />} />
            <Route path="/tasks" element={<Tasks />} />
        </Routes>
        {/*<Footer />*/}
    </>
  );
}

export default App;
