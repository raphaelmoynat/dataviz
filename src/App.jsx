import Navbar from "./components/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";




function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />

                </Routes>
            </Router>

        </div>
    )
}

export default App;

