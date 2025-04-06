import Navbar from "./components/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";




function App() {
    return (
        <div>
            <AuthProvider>
                    <Router>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/dashboard" element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>}
                            />
                        </Routes>
                    </Router>
            </AuthProvider>

        </div>
    )
}

export default App;

