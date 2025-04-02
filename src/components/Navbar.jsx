import {Link, useNavigate} from "react-router-dom";


function Navbar() {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate("/");

    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <a href="" className="navbar-brand">DataViz</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/register">
                                    Register
                                </Link>
                            </li>

                            <li className="nav-item">
                                <button className="nav-link" onClick={logout}>
                                    Logout
                                </button>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )

}

export default Navbar;