import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Blueprint from "./pages/Blueprint";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#EBEBEB]">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/blueprint" element={<Blueprint />} />{" "}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
