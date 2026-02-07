import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#EBEBEB]">
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
