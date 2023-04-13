import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Users } from "./components/Users";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className=" p-4">
        <Routes>
          <Route path="/" element={<Users />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
