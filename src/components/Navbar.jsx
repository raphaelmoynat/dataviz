import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.jsx";


function Navbar() {
    const navigate = useNavigate();

    const { currentUser, logout } = useContext(AuthContext)
    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <a href="" className="navbar-brand">DataViz</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">


                            {currentUser ? (
                                <>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/dashboard">
                                            Dashboard
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <button className="nav-link" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>

                                </>

                            ) : (

                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">
                                            Home
                                        </Link>
                                    </li>

                                </>


                            )}

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )

}

export default Navbar;