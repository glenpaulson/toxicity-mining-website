import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Blueprint from "./pages/Blueprint";
import Footer from "./components/Footer";
import Proposal from "./pages/Proposal";
import Team from "./pages/Team";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#EBEBEB]">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/blueprint" element={<Blueprint />} />{" "}
            <Route path="/proposal" element={<Proposal />} />{" "}
            <Route path="/team" element={<Team />} />{" "}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
