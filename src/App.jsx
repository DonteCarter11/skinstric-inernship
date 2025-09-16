import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Pages/Home";
import TestingPage from "./Pages/TestingPage"
import Camera from "./Pages/Camera"
import Analysis from "./Pages/Analysis"
import Demographics from "./Pages/Demographics"

function App() {
  return (
    <div >
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testing" element={<TestingPage />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/demographics" element={<Demographics />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;